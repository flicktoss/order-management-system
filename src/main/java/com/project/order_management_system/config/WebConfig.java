package com.project.order_management_system.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

@Configuration
public class WebConfig {

  /**
   * Primary ObjectMapper for REST API endpoints (HTTP requests/responses).
   * This is separate from the Redis ObjectMapper to avoid type information
   * issues.
   */
  @Bean
  @Primary
  public ObjectMapper objectMapper() {
    return Jackson2ObjectMapperBuilder.json()
        .build();
  }
}
