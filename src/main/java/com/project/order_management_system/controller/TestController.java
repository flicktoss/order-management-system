package com.project.order_management_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @GetMapping("/redis")
    public String testRedis() {
        try {
            redisTemplate.opsForValue().set("test-key", "Hello Redis!");
            String value = (String) redisTemplate.opsForValue().get("test-key");
            return "Redis is working! Value: " + value;
        } catch (Exception e) {
            return "Redis connection failed: " + e.getMessage();
        }
    }

    @GetMapping("/health")
    public String health() {
        return "Application is running!";
    }
}