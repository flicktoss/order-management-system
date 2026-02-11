package com.project.order_management_system.service;

import com.project.order_management_system.entity.Product;
import com.project.order_management_system.exception.ResourceNotFoundException;
import com.project.order_management_system.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    @Cacheable(value = "products", key = "'all'")
    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        log.info("Fetching all products from database");
        return productRepository.findAll();
    }

    /**
     * Get products by category
     */
    @Cacheable(value = "products", key = "'category:' + #category")
    @Transactional(readOnly = true)
    public List<Product> getProductsByCategory(String category) {
        log.info("Fetching products for category: {} from database", category);
        return productRepository.findByCategory(category);
    }

    /**
     * Get only active products
     */
    @Cacheable(value = "products", key = "'active'")
    @Transactional(readOnly = true)
    public List<Product> getActiveProducts() {
        log.info("Fetching active products from database");
        return productRepository.findByActiveTrue();
    }

    @Cacheable(value = "products", key = "#id")
    @Transactional(readOnly = true)
    public Product getProductById(Long id) {
        log.info("Fetching product with ID: {} from database", id);
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
    }

    @CacheEvict(value = "products", allEntries = true)
    @Transactional
    public Product updateProduct(Product product) {
        log.info("Updating product with ID: {}, evicting cache", product.getId());
        return productRepository.save(product);
    }
}