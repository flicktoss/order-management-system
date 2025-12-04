package com.project.order_management_system.service;

import com.project.order_management_system.entity.Product;
import com.project.order_management_system.exception.ResourceNotFoundException;
import com.project.order_management_system.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Get products by category
     */
    @Transactional(readOnly = true)
    public List<Product> getProductsByCategory(String category) {
        log.info("Fetching products for category: {}", category);
        return productRepository.findByCategory(category);
    }

    /**
     * Get only active products
     */
    @Transactional(readOnly = true)
    public List<Product> getActiveProducts() {
        log.info("Fetching active products");
        return productRepository.findByActiveTrue();
    }

    @Transactional(readOnly = true)
    public Product getProductById(Long id) {
        log.info("Fetching product with ID: {}", id);
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
    }
}