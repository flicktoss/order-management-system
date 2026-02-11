package com.project.order_management_system.controller;

import com.project.order_management_system.entity.Product;
import com.project.order_management_system.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;

    /**
     * Get all products
     * GET /api/v1/products
     */
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        log.info("Received get all products request");
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    /**
     * Get available products (in stock)
     * GET /api/v1/products/available
     */
    @GetMapping("/available")
    public ResponseEntity<List<Product>> getAvailableProducts() {
        log.info("Received get available products request");
        List<Product> products = productService.getActiveProducts();
        return ResponseEntity.ok(products);
    }

    /**
     * Get product by ID
     * GET /api/v1/products/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        log.info("Received get product request for ID: {}", id);
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    /**
     * Get products by category
     * GET /api/v1/products/category/{category}
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        log.info("Received get products by category request: {}", category);
        List<Product> products = productService.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }
}