package com.project.order_management_system.entity;

public enum OrderStatus {
    PENDING,        // Order created, awaiting processing
    CONFIRMED,      // Order confirmed, ready to ship
    PROCESSING,     // Being prepared
    SHIPPED,        // On the way
    DELIVERED,      // Delivered to customer
    CANCELLED,      // Cancelled by user/admin
    FAILED          // Payment or processing failed
}