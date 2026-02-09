package com.project.order_management_system.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Order number is required")
    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference("user-orders")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    @JsonManagedReference("order-items")
    private List<OrderItem> items = new ArrayList<>();

    @NotNull(message = "Total amount is required")
    @Column(nullable = false, precision = 10, scale = 2)
    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @Column(length = 500)
    private String shippingAddress;

    @Column(length = 1000)
    private String notes;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        calculateTotal();
    }

    // Helper method to add items
    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }

    // Helper method to remove items
    public void removeItem(OrderItem item) {
        items.remove(item);
        item.setOrder(null);
    }

    // Calculate total with NULL safety
    public void calculateTotal() {
        this.totalAmount = items.stream()
                .map(OrderItem::getSubtotal)
                .filter(subtotal -> subtotal != null) // ← FILTER OUT NULLS
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}