package com.project.order_management_system.repository;

import com.project.order_management_system.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByActiveTrue();

    List<Product> findByCategory(String category);

    @Query("SELECT p FROM Product p WHERE p.active = true AND p.stock > 0")
    List<Product> findAvailableProducts();

    boolean existsByName(String name);
}