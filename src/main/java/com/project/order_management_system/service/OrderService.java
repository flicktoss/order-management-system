package com.project.order_management_system.service;

import com.project.order_management_system.dto.CreateOrderRequest;
import com.project.order_management_system.dto.OrderResponse;
import com.project.order_management_system.entity.*;
import com.project.order_management_system.exception.InsufficientStockException;
import com.project.order_management_system.exception.ResourceNotFoundException;
import com.project.order_management_system.repository.OrderRepository;
import com.project.order_management_system.repository.ProductRepository;
import com.project.order_management_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @CacheEvict(value = { "orders", "userOrders", "products" }, allEntries = true)
    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        log.info("Creating order for user ID: {}", request.getUserId());

        // 1. Validate user exists
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));

        // 2. Create order
        Order order = Order.builder()
                .orderNumber(generateOrderNumber())
                .user(user)
                .status(OrderStatus.PENDING)
                .shippingAddress(request.getShippingAddress())
                .notes(request.getNotes())
                .totalAmount(BigDecimal.ZERO)
                .build();

        // 3. Process each order item
        for (var itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "id", itemRequest.getProductId()));

            // Check stock availability
            if (product.getStock() < itemRequest.getQuantity()) {
                throw new InsufficientStockException(
                        product.getName(),
                        itemRequest.getQuantity(),
                        product.getStock());
            }

            // Deduct stock
            product.setStock(product.getStock() - itemRequest.getQuantity());
            productRepository.save(product);
            // Note: Product cache is now evicted because we added "products" to CacheEvict

            // Create order item with EXPLICIT subtotal calculation
            BigDecimal itemPrice = product.getPrice();
            Integer itemQuantity = itemRequest.getQuantity();
            BigDecimal itemSubtotal = itemPrice.multiply(BigDecimal.valueOf(itemQuantity));

            OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .quantity(itemQuantity)
                    .price(itemPrice)
                    .subtotal(itemSubtotal) // ← EXPLICITLY SET SUBTOTAL
                    .build();

            order.addItem(orderItem);
        }

        // 4. Calculate total
        order.calculateTotal();

        // 5. Save order
        Order savedOrder = orderRepository.save(order);
        log.info("Order created successfully with order number: {}", savedOrder.getOrderNumber());

        return mapToOrderResponse(savedOrder);
    }

    @Cacheable(value = "orders", key = "#id")
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long id) {
        log.info("Fetching order with ID: {} from database", id);

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));

        return mapToOrderResponse(order);
    }

    @Cacheable(value = "orders", key = "'orderNumber:' + #orderNumber")
    @Transactional(readOnly = true)
    public OrderResponse getOrderByOrderNumber(String orderNumber) {
        log.info("Fetching order with order number: {} from database", orderNumber);

        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "orderNumber", orderNumber));

        return mapToOrderResponse(order);
    }

    @Cacheable(value = "userOrders", key = "#userId")
    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByUserId(Long userId) {
        log.info("Fetching orders for user ID: {} from database", userId);

        // Validate user exists
        userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        List<Order> orders = orderRepository.findByUserId(userId);

        return orders.stream()
                .map(this::mapToOrderResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        log.info("Fetching all orders");

        return orderRepository.findAll().stream()
                .map(this::mapToOrderResponse)
                .collect(Collectors.toList());
    }

    @CacheEvict(value = { "orders", "userOrders" }, allEntries = true)
    @Transactional
    public OrderResponse updateOrderStatus(Long id, OrderStatus newStatus) {
        log.info("Updating order {} to status: {}, evicting cache", id, newStatus);

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));

        // Validate status transition (business logic)
        validateStatusTransition(order.getStatus(), newStatus);

        order.setStatus(newStatus);
        Order updatedOrder = orderRepository.save(order);

        log.info("Order {} status updated to: {}", id, newStatus);

        return mapToOrderResponse(updatedOrder);
    }

    @CacheEvict(value = { "orders", "userOrders", "products" }, allEntries = true)
    @Transactional
    public void cancelOrder(Long id) {
        log.info("Cancelling order: {}, evicting cache", id);

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));

        // Only allow cancellation if order is not shipped or delivered
        if (order.getStatus() == OrderStatus.SHIPPED ||
                order.getStatus() == OrderStatus.DELIVERED) {
            throw new IllegalStateException("Cannot cancel order that is already " + order.getStatus());
        }

        // Restore stock for each item
        for (OrderItem item : order.getItems()) {
            Product product = item.getProduct();
            product.setStock(product.getStock() + item.getQuantity());
            productRepository.save(product);
        }

        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);

        log.info("Order {} cancelled successfully", id);
    }

    // Helper methods

    private String generateOrderNumber() {
        return "ORD-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private void validateStatusTransition(OrderStatus currentStatus, OrderStatus newStatus) {
        // Define valid transitions
        if (currentStatus == OrderStatus.CANCELLED || currentStatus == OrderStatus.DELIVERED) {
            throw new IllegalStateException("Cannot change status of " + currentStatus + " order");
        }

        // Add more validation rules as needed
    }

    private OrderResponse mapToOrderResponse(Order order) {
        List<OrderResponse.OrderItemResponse> itemResponses = order.getItems().stream()
                .map(item -> OrderResponse.OrderItemResponse.builder()
                        .id(item.getId())
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .subtotal(item.getSubtotal())
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .userId(order.getUser().getId())
                .userName(order.getUser().getName())
                .userEmail(order.getUser().getEmail())
                .items(itemResponses)
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .shippingAddress(order.getShippingAddress())
                .notes(order.getNotes())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }
}