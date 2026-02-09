# Order Management System - Backend Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Database Schema](#database-schema)
5. [API Documentation](#api-documentation)
6. [Security & Authentication](#security--authentication)
7. [Features](#features)
8. [Configuration](#configuration)
9. [Error Handling](#error-handling)
10. [Caching Strategy](#caching-strategy)

---

## 🎯 Project Overview

**Order Management System** is a robust Spring Boot RESTful API backend for managing e-commerce orders, products, and users. The system provides comprehensive order processing capabilities with inventory management, JWT-based authentication, and Redis caching.

**Base URL**: `http://localhost:8082`

**Version**: 0.0.1-SNAPSHOT

---

## 🛠️ Technology Stack

### Core Framework
- **Spring Boot**: 3.5.7
- **Java**: 17
- **Maven**: Build tool

### Dependencies
| Dependency | Version | Purpose |
|------------|---------|---------|
| Spring Boot Starter Web | 3.5.7 | RESTful API development |
| Spring Boot Starter Data JPA | 3.5.7 | Database ORM |
| Spring Boot Starter Security | 3.5.7 | Security framework |
| Spring Boot Starter Data Redis | 3.5.7 | Redis caching |
| Spring Boot Starter Validation | 3.5.7 | Bean validation |
| PostgreSQL | Latest | Production database |
| Lombok | Latest | Reduce boilerplate code |
| JJWT | 0.12.3 | JWT token generation/validation |
| Spring Dotenv | 4.0.0 | Environment variable management |

### Infrastructure
- **PostgreSQL 15**: Primary database
- **Redis 7**: Caching layer
- **Docker Compose**: Container orchestration

---

## 🏗️ Architecture

### Layered Architecture

```
┌─────────────────────────────────────┐
│         Controllers                 │  ← REST API Endpoints
├─────────────────────────────────────┤
│         Services                    │  ← Business Logic
├─────────────────────────────────────┤
│         Repositories                │  ← Data Access Layer
├─────────────────────────────────────┤
│         Entities                    │  ← Domain Models
└─────────────────────────────────────┘
```

### Package Structure

```
com.project.order_management_system
├── config/               # Configuration classes
│   └── RedisConfig.java
├── controller/           # REST Controllers
│   ├── AuthController.java
│   ├── OrderController.java
│   ├── ProductController.java
│   ├── UserController.java
│   └── TestController.java
├── dto/                  # Data Transfer Objects
│   ├── AuthResponse.java
│   ├── CreateOrderRequest.java
│   ├── ErrorResponse.java
│   ├── LoginRequest.java
│   ├── OrderItemRequest.java
│   ├── OrderResponse.java
│   └── RegisterRequest.java
├── entity/               # Database Entities
│   ├── Order.java
│   ├── OrderItem.java
│   ├── OrderStatus.java (enum)
│   ├── Product.java
│   ├── Role.java (enum)
│   └── User.java
├── exception/            # Exception Handling
│   ├── GlobalExceptionHandler.java
│   ├── InsufficientStockException.java
│   └── ResourceNotFoundException.java
├── repository/           # Data Access Layer
│   ├── OrderRepository.java
│   ├── ProductRepository.java
│   └── UserRepository.java
├── security/             # Security Components
│   ├── CustomUserDetailsService.java
│   ├── JwtAuthenticationFilter.java
│   ├── JwtTokenProvider.java
│   └── SecurityConfig.java
└── service/              # Business Logic
    ├── AuthService.java
    ├── OrderService.java
    └── ProductService.java
```

---

## 💾 Database Schema

### Entity Relationship Diagram

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│    User     │1      * │    Order     │1      * │  OrderItem  │
├─────────────┤◄────────┤──────────────┤◄────────┤─────────────┤
│ id (PK)     │         │ id (PK)      │         │ id (PK)     │
│ name        │         │ orderNumber  │         │ quantity    │
│ email       │         │ user_id (FK) │         │ price       │
│ password    │         │ totalAmount  │         │ subtotal    │
│ phone       │         │ status       │         │ order_id (FK)│
│ address     │         │ shippingAddr │         │ product_id   │
│ role        │         │ notes        │         └─────────────┘
│ createdAt   │         │ createdAt    │                │
│ updatedAt   │         │ updatedAt    │                │
└─────────────┘         └──────────────┘                │
                                                         │
                        ┌──────────────┐                │
                        │   Product    │                │
                        ├──────────────┤◄───────────────┘
                        │ id (PK)      │*
                        │ name         │
                        │ description  │
                        │ price        │
                        │ stock        │
                        │ active       │
                        │ imageUrl     │
                        │ category     │
                        └──────────────┘
```

### Table Descriptions

#### **users** Table
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-incremented user ID |
| name | VARCHAR(255) | NOT NULL | User's full name |
| email | VARCHAR(255) | NOT NULL, UNIQUE | User's email address |
| password | VARCHAR(255) | NOT NULL | BCrypt hashed password |
| phone | VARCHAR(10) | NOT NULL | 10-digit phone number |
| address | TEXT | NULLABLE | User's address |
| role | VARCHAR(50) | NOT NULL, DEFAULT 'USER' | USER or ADMIN |
| created_at | TIMESTAMP | NOT NULL | Account creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last update timestamp |

#### **products** Table
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-incremented product ID |
| name | VARCHAR(100) | NOT NULL | Product name |
| description | VARCHAR(1000) | NULLABLE | Product description |
| price | DECIMAL(10,2) | NOT NULL, >0 | Product price |
| stock | INTEGER | NOT NULL, ≥0 | Available stock quantity |
| active | BOOLEAN | NOT NULL, DEFAULT TRUE | Product availability status |
| image_url | VARCHAR(255) | NULLABLE | Product image URL |
| category | VARCHAR(255) | NOT NULL | Product category |

#### **orders** Table
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-incremented order ID |
| order_number | VARCHAR(255) | NOT NULL, UNIQUE | Unique order identifier |
| user_id | BIGINT | NOT NULL, FOREIGN KEY | Reference to users table |
| total_amount | DECIMAL(10,2) | NOT NULL, ≥0 | Total order amount |
| status | VARCHAR(50) | NOT NULL | Order status enum |
| shipping_address | VARCHAR(500) | NULLABLE | Delivery address |
| notes | VARCHAR(1000) | NULLABLE | Order notes |
| created_at | TIMESTAMP | NOT NULL | Order creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last update timestamp |

#### **order_items** Table
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-incremented item ID |
| order_id | BIGINT | NOT NULL, FOREIGN KEY | Reference to orders table |
| product_id | BIGINT | NOT NULL, FOREIGN KEY | Reference to products table |
| quantity | INTEGER | NOT NULL, ≥1 | Quantity ordered |
| price | DECIMAL(10,2) | NOT NULL | Price at time of order |
| subtotal | DECIMAL(10,2) | NOT NULL | quantity × price |

### Enums

#### **Role**
```java
USER    // Regular customer
ADMIN   // System administrator
```

#### **OrderStatus**
```java
PENDING      // Order created, awaiting processing
CONFIRMED    // Order confirmed, ready to ship
PROCESSING   // Being prepared
SHIPPED      // On the way
DELIVERED    // Delivered to customer
CANCELLED    // Cancelled by user/admin
FAILED       // Payment or processing failed
```

---

## 📡 API Documentation

### Base Configuration
- **Server Port**: 8082
- **Base Path**: `/api/v1`
- **Content-Type**: `application/json`
- **Authentication**: Bearer Token (JWT)

---

## 🔐 Authentication APIs

### 1. Register User
**Endpoint**: `POST /api/v1/auth/register`

**Description**: Register a new user account

**Access**: Public

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongP@ss123",
  "phone": "9876543210",
  "address": "123 Main Street, City, State, ZIP",
  "role": "USER"
}
```

**Validation Rules**:
- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `password`: Required, minimum 8 characters, must contain:
  - At least one digit
  - At least one lowercase letter
  - At least one uppercase letter
  - At least one special character (@#$%^&+=)
- `phone`: Required, exactly 10 digits
- `address`: Required, 10-500 characters
- `role`: Optional, defaults to USER

**Response** (201 Created):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER"
}
```

**Error Responses**:
- `400 Bad Request`: Validation errors or email already exists
- `500 Internal Server Error`: Server error

**Service Function**: `AuthService.register(RegisterRequest)`

---

### 2. Login
**Endpoint**: `POST /api/v1/auth/login`

**Description**: Authenticate user and receive JWT token

**Access**: Public

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "StrongP@ss123"
}
```

**Validation Rules**:
- `email`: Required, valid email format
- `password`: Required

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid credentials
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server error

**Service Function**: `AuthService.login(LoginRequest)`

---

## 📦 Product APIs

### 3. Get All Products
**Endpoint**: `GET /api/v1/products`

**Description**: Retrieve all products (including inactive)

**Access**: Public

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "stock": 50,
    "active": true,
    "imageUrl": "https://example.com/laptop.jpg",
    "category": "Electronics"
  }
]
```

**Service Function**: `ProductService.getAllProducts()`

**Caching**: Cached with key `products:all`

---

### 4. Get Available Products
**Endpoint**: `GET /api/v1/products/available`

**Description**: Retrieve only active products

**Access**: Public

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "stock": 50,
    "active": true,
    "imageUrl": "https://example.com/laptop.jpg",
    "category": "Electronics"
  }
]
```

**Service Function**: `ProductService.getActiveProducts()`

**Caching**: Cached with key `products:active`

---

### 5. Get Product by ID
**Endpoint**: `GET /api/v1/products/{id}`

**Description**: Retrieve a specific product by ID

**Access**: Public

**Path Parameters**:
- `id` (Long): Product ID

**Response** (200 OK):
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "stock": 50,
  "active": true,
  "imageUrl": "https://example.com/laptop.jpg",
  "category": "Electronics"
}
```

**Error Responses**:
- `404 Not Found`: Product not found

**Service Function**: `ProductService.getProductById(Long)`

**Caching**: Cached with key `products:{id}`

---

### 6. Get Products by Category
**Endpoint**: `GET /api/v1/products/category/{category}`

**Description**: Retrieve all products in a specific category

**Access**: Public

**Path Parameters**:
- `category` (String): Product category

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "stock": 50,
    "active": true,
    "imageUrl": "https://example.com/laptop.jpg",
    "category": "Electronics"
  }
]
```

**Service Function**: `ProductService.getProductsByCategory(String)`

**Caching**: Cached with key `products:category:{category}`

---

## 🛒 Order APIs

### 7. Create Order
**Endpoint**: `POST /api/v1/orders`

**Description**: Create a new order with items

**Access**: Authenticated (USER, ADMIN)

**Request Headers**:
```
Authorization: Bearer {token}
```

**Request Body**:
```json
{
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 3,
      "quantity": 1
    }
  ],
  "shippingAddress": "123 Main Street, City, State, ZIP",
  "notes": "Please deliver before 5 PM"
}
```

**Validation Rules**:
- `userId`: Required
- `items`: Required, at least one item
- `items[].productId`: Required
- `items[].quantity`: Required, minimum 1
- `shippingAddress`: Required, 10-500 characters
- `notes`: Optional, maximum 1000 characters

**Response** (201 Created):
```json
{
  "id": 1,
  "orderNumber": "ORD-1707398400000-A1B2C3D4",
  "userId": 1,
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "items": [
    {
      "id": 1,
      "productId": 1,
      "productName": "Laptop",
      "quantity": 2,
      "price": 999.99,
      "subtotal": 1999.98
    },
    {
      "id": 2,
      "productId": 3,
      "productName": "Mouse",
      "quantity": 1,
      "price": 29.99,
      "subtotal": 29.99
    }
  ],
  "totalAmount": 2029.97,
  "status": "PENDING",
  "shippingAddress": "123 Main Street, City, State, ZIP",
  "notes": "Please deliver before 5 PM",
  "createdAt": "2024-02-08T10:30:00",
  "updatedAt": "2024-02-08T10:30:00"
}
```

**Business Logic**:
1. Validates user exists
2. Validates all products exist
3. Checks stock availability for each product
4. Deducts stock from inventory
5. Generates unique order number (format: `ORD-{timestamp}-{UUID}`)
6. Calculates subtotals and total amount
7. Sets status to PENDING
8. Evicts order and userOrders cache

**Error Responses**:
- `400 Bad Request`: Validation errors or insufficient stock
- `404 Not Found`: User or product not found
- `500 Internal Server Error`: Server error

**Service Function**: `OrderService.createOrder(CreateOrderRequest)`

---

### 8. Get Order by ID
**Endpoint**: `GET /api/v1/orders/{id}`

**Description**: Retrieve a specific order by ID

**Access**: Authenticated (USER, ADMIN)

**Path Parameters**:
- `id` (Long): Order ID

**Response** (200 OK):
```json
{
  "id": 1,
  "orderNumber": "ORD-1707398400000-A1B2C3D4",
  "userId": 1,
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "items": [...],
  "totalAmount": 2029.97,
  "status": "PENDING",
  "shippingAddress": "123 Main Street, City, State, ZIP",
  "notes": "Please deliver before 5 PM",
  "createdAt": "2024-02-08T10:30:00",
  "updatedAt": "2024-02-08T10:30:00"
}
```

**Error Responses**:
- `404 Not Found`: Order not found

**Service Function**: `OrderService.getOrderById(Long)`

**Caching**: Cached with key `orders:{id}`

---

### 9. Get Order by Order Number
**Endpoint**: `GET /api/v1/orders/order-number/{orderNumber}`

**Description**: Retrieve a specific order by its unique order number

**Access**: Authenticated (USER, ADMIN)

**Path Parameters**:
- `orderNumber` (String): Unique order number

**Response** (200 OK): Same as Get Order by ID

**Error Responses**:
- `404 Not Found`: Order not found

**Service Function**: `OrderService.getOrderByOrderNumber(String)`

**Caching**: Cached with key `orders:orderNumber:{orderNumber}`

---

### 10. Get Orders by User ID
**Endpoint**: `GET /api/v1/orders/user/{userId}`

**Description**: Retrieve all orders for a specific user

**Access**: Authenticated (USER, ADMIN)

**Path Parameters**:
- `userId` (Long): User ID

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "orderNumber": "ORD-1707398400000-A1B2C3D4",
    "userId": 1,
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "items": [...],
    "totalAmount": 2029.97,
    "status": "PENDING",
    "shippingAddress": "123 Main Street, City, State, ZIP",
    "createdAt": "2024-02-08T10:30:00",
    "updatedAt": "2024-02-08T10:30:00"
  }
]
```

**Error Responses**:
- `404 Not Found`: User not found

**Service Function**: `OrderService.getOrdersByUserId(Long)`

**Caching**: Cached with key `userOrders:{userId}`

---

### 11. Get All Orders
**Endpoint**: `GET /api/v1/orders`

**Description**: Retrieve all orders (typically admin function)

**Access**: Authenticated (USER, ADMIN)

**Response** (200 OK): Array of order objects

**Service Function**: `OrderService.getAllOrders()`

---

### 12. Update Order Status
**Endpoint**: `PUT /api/v1/orders/{id}/status`

**Description**: Update the status of an order

**Access**: Authenticated (USER, ADMIN)

**Path Parameters**:
- `id` (Long): Order ID

**Request Body**:
```json
{
  "status": "CONFIRMED"
}
```

**Valid Status Values**:
- `PENDING`
- `CONFIRMED`
- `PROCESSING`
- `SHIPPED`
- `DELIVERED`
- `CANCELLED`
- `FAILED`

**Business Logic**:
- Cannot change status of CANCELLED or DELIVERED orders
- Validates status transitions

**Response** (200 OK): Updated order object

**Error Responses**:
- `400 Bad Request`: Invalid status or transition
- `404 Not Found`: Order not found

**Service Function**: `OrderService.updateOrderStatus(Long, OrderStatus)`

**Cache Impact**: Evicts orders and userOrders cache

---

### 13. Cancel Order
**Endpoint**: `DELETE /api/v1/orders/{id}`

**Description**: Cancel an order and restore inventory

**Access**: Authenticated (USER, ADMIN)

**Path Parameters**:
- `id` (Long): Order ID

**Business Logic**:
1. Validates order exists
2. Checks if order can be cancelled (not SHIPPED or DELIVERED)
3. Restores stock for all order items
4. Sets order status to CANCELLED

**Response** (200 OK):
```json
{
  "message": "Order cancelled successfully"
}
```

**Error Responses**:
- `400 Bad Request`: Order cannot be cancelled (already shipped/delivered)
- `404 Not Found`: Order not found

**Service Function**: `OrderService.cancelOrder(Long)`

**Cache Impact**: Evicts orders and userOrders cache

---

### 14. Order Health Check
**Endpoint**: `GET /api/v1/orders/health`

**Description**: Health check endpoint for order service

**Access**: Authenticated (USER, ADMIN)

**Response** (200 OK):
```json
{
  "status": "UP",
  "service": "Order Service",
  "timestamp": "2024-02-08T10:30:00"
}
```

---

## 👥 User APIs

### 15. Get All Users
**Endpoint**: `GET /api/v1/users`

**Description**: Retrieve all registered users

**Access**: Authenticated (USER, ADMIN)

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "$2a$10$...",
    "phone": "9876543210",
    "address": "123 Main Street, City, State, ZIP",
    "role": "USER",
    "createdAt": "2024-02-08T10:00:00",
    "updatedAt": "2024-02-08T10:00:00"
  }
]
```

**Repository Function**: `UserRepository.findAll()`

---

### 16. Get User by ID
**Endpoint**: `GET /api/v1/users/{id}`

**Description**: Retrieve a specific user by ID

**Access**: Authenticated (USER, ADMIN)

**Path Parameters**:
- `id` (Long): User ID

**Response** (200 OK): User object

**Error Responses**:
- `404 Not Found`: User not found

**Repository Function**: `UserRepository.findById(Long)`

---

## 🧪 Test APIs

### 17. Redis Test
**Endpoint**: `GET /api/test/redis`

**Description**: Test Redis connectivity

**Access**: Public

**Response** (200 OK):
```
Redis is working! Value: Hello Redis!
```

**Error Response**:
```
Redis connection failed: {error message}
```

---

### 18. Application Health
**Endpoint**: `GET /api/test/health`

**Description**: Application health check

**Access**: Public

**Response** (200 OK):
```
Application is running!
```

---

## 🔐 Security & Authentication

### JWT (JSON Web Token) Authentication

#### **JwtTokenProvider**
Handles JWT token generation and validation.

**Methods**:
- `generateToken(UserDetails)`: Generate token without role
- `generateToken(UserDetails, String role)`: Generate token with role claim
- `validateToken(String, UserDetails)`: Validate token authenticity
- `extractUsername(String)`: Extract username from token
- `extractExpiration(String)`: Get token expiration date

**Configuration**:
- **Secret Key**: From environment variable `JWT_SECRET`
- **Expiration**: 86400000ms (24 hours)
- **Algorithm**: HMAC-SHA256

**Token Structure**:
```json
{
  "sub": "user@example.com",
  "role": "USER",
  "iat": 1707398400,
  "exp": 1707484800
}
```

---

#### **JwtAuthenticationFilter**
Intercepts HTTP requests to validate JWT tokens.

**Process Flow**:
1. Extract JWT from `Authorization` header (Bearer token)
2. Validate token signature and expiration
3. Load user details from database
4. Set authentication in SecurityContext
5. Continue filter chain

**Header Format**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

#### **CustomUserDetailsService**
Loads user details for authentication.

**Methods**:
- `loadUserByUsername(String email)`: Fetch user by email and create UserDetails

**Authorities**: `ROLE_{USER|ADMIN}`

---

### Spring Security Configuration

#### **SecurityConfig**

**Password Encoding**: BCrypt

**Session Management**: STATELESS (no server-side sessions)

**Endpoint Authorization**:

| Endpoint Pattern | Access Level |
|------------------|--------------|
| `/api/v1/auth/**` | Public (permitAll) |
| `/api/v1/products/**` | Public (permitAll) |
| `/api/v1/users/**` | Authenticated (USER, ADMIN) |
| `/api/v1/orders/**` | Authenticated (USER, ADMIN) |
| All others | Authenticated |

**CSRF**: Disabled (stateless API)

**Filter Chain**:
1. JwtAuthenticationFilter (before UsernamePasswordAuthenticationFilter)
2. Standard Spring Security filters

---

## ✨ Features

### 1. **User Management**
- User registration with role assignment (USER/ADMIN)
- Email-based authentication
- Password encryption with BCrypt
- Comprehensive input validation
- Unique email constraint

### 2. **Product Catalog**
- Product listing with filtering
- Category-based organization
- Stock management
- Active/inactive product status
- Product image URLs
- Decimal precision for pricing

### 3. **Order Processing**
- Complete order lifecycle management
- Automatic order number generation
- Multi-item order support
- Real-time inventory deduction
- Order status tracking (7 statuses)
- Order cancellation with stock restoration
- Shipping address management
- Order notes/comments

### 4. **Inventory Management**
- Real-time stock tracking
- Stock validation during order creation
- Automatic stock deduction
- Stock restoration on cancellation
- Insufficient stock exception handling

### 5. **Authentication & Authorization**
- JWT-based stateless authentication
- Role-based access control (RBAC)
- Token expiration management
- Secure password storage
- Custom UserDetailsService

### 6. **Caching Strategy**
- Redis-based distributed caching
- Automatic cache eviction on data changes
- Cached endpoints:
  - All products
  - Active products
  - Products by category
  - Individual products
  - Individual orders
  - User orders

### 7. **Error Handling**
- Global exception handler
- Custom exceptions:
  - ResourceNotFoundException
  - InsufficientStockException
- Validation error details
- Standardized error responses

### 8. **Data Validation**
- Bean validation annotations
- Email format validation
- Password strength requirements
- Phone number format validation
- Address length constraints
- Quantity constraints
- Price/amount constraints

### 9. **Audit & Timestamps**
- Automatic created_at timestamps
- Automatic updated_at timestamps
- CreationTimestamp annotation
- UpdateTimestamp annotation

### 10. **Transaction Management**
- @Transactional support
- Read-only transactions for queries
- Rollback on exceptions
- Database consistency

---

## ⚙️ Configuration

### Application Properties
**File**: `src/main/resources/application.properties`

```properties
# Application
spring.application.name=order-management
server.port=8082

# PostgreSQL Configuration
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Data Initialization
spring.sql.init.mode=never
spring.jpa.defer-datasource-initialization=true

# Logging
logging.level.com.project.order_management_system=DEBUG
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE

# Error handling
server.error.include-message=always
server.error.include-binding-errors=always

# Redis Configuration
spring.data.redis.host=${REDIS_HOST}
spring.data.redis.port=${REDIS_PORT}
spring.data.redis.password=${REDIS_PASSWORD}
spring.cache.type=redis
spring.cache.redis.time-to-live=3600000

# JWT Configuration
jwt.secret=${JWT_SECRET}
jwt.expiration=86400000

# Spring Security
spring.security.user.name=admin
spring.security.user.password=admin
```

---

### Environment Variables
**File**: `.env`

```properties
# Database Configuration
DB_URL=jdbc:postgresql://localhost:5432/order_db
DB_USERNAME=postgres
DB_PASSWORD=postgresql

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=njasani6618

# JWT Configuration
JWT_SECRET=4Z8Qx5Ym9Kp2Wn7Rt3Uv6Jh8Lf0Gb5Dc1Sa4Ez9Xy2Qw7Mn3Vb6Nk1Hg8Jt5Rl2Pd9Cf0Xs4Yw7Zm1Qn3Kb8Hv6Ft2Gs5Jl9Rw0Px4Dy7Mc1Vn6Tb3Kg8Hl5Qs2Fy9Jx0Wz4Nm7Pb1Rd6Ct3Gv8Ks5Lh
```

---

### Docker Compose
**File**: `docker-compose.yml`

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: order_db
    environment:
      POSTGRES_DB: order_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - order-network

  redis:
    image: redis:7-alpine
    container_name: order_redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - order-network
    command: redis-server --appendonly yes

volumes:
  postgres_data:
  redis_data:

networks:
  order-network:
    driver: bridge
```

---

### Redis Configuration
**Class**: `RedisConfig.java`

**Features**:
- Lettuce connection factory
- Redis template with JSON serialization
- String key serialization
- Generic Jackson JSON value serialization
- TTL: 3600000ms (1 hour)

**Beans**:
- `redisConnectionFactory()`: Creates Lettuce connection
- `redisTemplate()`: Configures Redis operations template
- `cacheManager()`: Spring Cache abstraction (implicit)

---

## 🚨 Error Handling

### GlobalExceptionHandler

Centralized exception handling for all controllers using `@RestControllerAdvice`.

#### Exception Types

**1. ResourceNotFoundException**
- **HTTP Status**: 404 Not Found
- **Response**:
```json
{
  "timestamp": "2024-02-08T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Order not found with id: '123'",
  "path": "/api/v1/orders/123"
}
```

---

**2. InsufficientStockException**
- **HTTP Status**: 400 Bad Request
- **Response**:
```json
{
  "timestamp": "2024-02-08T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Insufficient stock for product 'Laptop'. Requested: 10, Available: 5",
  "path": "/api/v1/orders"
}
```

---

**3. MethodArgumentNotValidException**
- **HTTP Status**: 400 Bad Request
- **Response**:
```json
{
  "timestamp": "2024-02-08T10:30:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "Input validation failed",
  "path": "/api/v1/auth/register",
  "details": [
    "email: Please provide a valid email address",
    "password: Password must be at least 8 characters"
  ]
}
```

---

**4. Generic Exception**
- **HTTP Status**: 500 Internal Server Error
- **Response**:
```json
{
  "timestamp": "2024-02-08T10:30:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred: {error details}",
  "path": "/api/v1/orders"
}
```

---

## 💾 Caching Strategy

### Redis Caching

**Purpose**: Reduce database load and improve response times

**Cache Provider**: Redis 7 (in-memory data store)

**TTL**: 3600000ms (1 hour)

**Serialization**: JSON (GenericJackson2JsonRedisSerializer)

---

### Cached Operations

#### **Products**
| Operation | Cache Key | Eviction Trigger |
|-----------|-----------|------------------|
| Get All Products | `products:all` | Product update |
| Get Active Products | `products:active` | Product update |
| Get Product by ID | `products:{id}` | Product update |
| Get by Category | `products:category:{category}` | Product update |

#### **Orders**
| Operation | Cache Key | Eviction Trigger |
|-----------|-----------|------------------|
| Get Order by ID | `orders:{id}` | Order update/create/cancel |
| Get by Order Number | `orders:orderNumber:{orderNumber}` | Order update/create/cancel |
| Get User Orders | `userOrders:{userId}` | Order update/create/cancel |

---

### Cache Annotations

**@Cacheable**: Cache method result
```java
@Cacheable(value = "products", key = "#id")
public Product getProductById(Long id) { ... }
```

**@CacheEvict**: Evict cache on data modification
```java
@CacheEvict(value = {"orders", "userOrders"}, allEntries = true)
public OrderResponse createOrder(CreateOrderRequest request) { ... }
```

---

## 📊 Repository Layer

### UserRepository

**Interface**: `JpaRepository<User, Long>`

**Custom Methods**:
- `Optional<User> findByEmail(String email)` - Find user by email
- `boolean existsByEmail(String email)` - Check email existence

---

### ProductRepository

**Interface**: `JpaRepository<Product, Long>`

**Custom Methods**:
- `List<Product> findByActiveTrue()` - Get active products
- `List<Product> findByCategory(String category)` - Get products by category
- `@Query List<Product> findAvailableProducts()` - Get active products with stock > 0

---

### OrderRepository

**Interface**: `JpaRepository<Order, Long>`

**Custom Methods**:
- `Optional<Order> findByOrderNumber(String orderNumber)` - Find by order number
- `List<Order> findByUserId(Long userId)` - Get user's orders
- `List<Order> findByStatus(OrderStatus status)` - Get orders by status
- `@Query List<Order> findByUserIdAndStatus(Long userId, OrderStatus status)` - Filter by user and status
- `@Query List<Order> findOrdersBetweenDates(LocalDateTime start, LocalDateTime end)` - Date range query
- `@Query long countOrdersByUserId(Long userId)` - Count user orders

---

## 🔄 Service Layer

### AuthService

**Dependencies**: UserRepository, PasswordEncoder, JwtTokenProvider, AuthenticationManager

**Methods**:
- `AuthResponse register(RegisterRequest)` - Register new user
- `AuthResponse login(LoginRequest)` - Authenticate and generate token

**Features**:
- Email uniqueness validation
- Password encryption
- JWT token generation
- Role assignment

---

### OrderService

**Dependencies**: OrderRepository, UserRepository, ProductRepository

**Methods**:
- `OrderResponse createOrder(CreateOrderRequest)` - Create order
- `OrderResponse getOrderById(Long)` - Get order by ID
- `OrderResponse getOrderByOrderNumber(String)` - Get order by number
- `List<OrderResponse> getOrdersByUserId(Long)` - Get user orders
- `List<OrderResponse> getAllOrders()` - Get all orders
- `OrderResponse updateOrderStatus(Long, OrderStatus)` - Update status
- `void cancelOrder(Long)` - Cancel order

**Features**:
- Stock validation and deduction
- Order number generation
- Total calculation
- Status transition validation
- Stock restoration on cancellation

---

### ProductService

**Dependencies**: ProductRepository

**Methods**:
- `List<Product> getAllProducts()` - Get all products
- `List<Product> getProductsByCategory(String)` - Filter by category
- `List<Product> getActiveProducts()` - Get active products
- `Product getProductById(Long)` - Get product by ID
- `Product updateProduct(Product)` - Update product

---

## 📈 Performance Optimizations

1. **Redis Caching**: Frequently accessed data cached
2. **Lazy Loading**: FetchType.LAZY for ManyToOne relationships
3. **Eager Loading**: FetchType.EAGER for critical data (OrderItem.Product)
4. **Read-Only Transactions**: Query methods marked @Transactional(readOnly = true)
5. **Connection Pooling**: Spring Boot default HikariCP
6. **Index Recommendations**:
   - `users(email)` - Unique index
   - `orders(order_number)` - Unique index
   - `orders(user_id)` - Foreign key index
   - `order_items(order_id)` - Foreign key index
   - `order_items(product_id)` - Foreign key index

---

## 🧰 Development Tools

- **Lombok**: Reduces boilerplate code with annotations
  - `@Data`: Getters, setters, toString, equals, hashCode
  - `@Builder`: Builder pattern
  - `@RequiredArgsConstructor`: Constructor injection
  - `@Slf4j`: Logging
- **Spring DevTools**: Hot reload during development
- **Maven**: Dependency management and build automation

---

## 📝 Logging

**Framework**: SLF4J with Logback

**Log Levels**:
- `DEBUG`: Application and Hibernate SQL
- `TRACE`: SQL binding parameters

**Key Logged Events**:
- User registration/login
- Order creation/updates
- Product queries
- Cache operations
- Error exceptions

**Example Logs**:
```
2024-02-08 10:30:00 INFO  AuthController - Received registration request for email: john@example.com
2024-02-08 10:30:05 INFO  AuthService - User registered successfully with ID: 1
2024-02-08 10:35:12 INFO  OrderService - Creating order for user ID: 1
2024-02-08 10:35:15 INFO  OrderService - Order created successfully with order number: ORD-1707398115000-A1B2C3D4
```

---

## 🚀 Getting Started

### Prerequisites
- Java 17
- Maven
- Docker & Docker Compose

### Running the Application

1. **Start Infrastructure**:
```bash
docker-compose up -d
```

2. **Configure Environment**:
Create `.env` file with required variables

3. **Run Application**:
```bash
./mvnw spring-boot:run
```

4. **Access API**:
```
http://localhost:8082/api/v1
```

---

## 📚 API Summary

### Endpoint Overview

| Category | Method | Endpoint | Auth Required |
|----------|--------|----------|---------------|
| **Authentication** |
| Register | POST | `/api/v1/auth/register` | No |
| Login | POST | `/api/v1/auth/login` | No |
| **Products** |
| Get All | GET | `/api/v1/products` | No |
| Get Available | GET | `/api/v1/products/available` | No |
| Get by ID | GET | `/api/v1/products/{id}` | No |
| Get by Category | GET | `/api/v1/products/category/{category}` | No |
| **Orders** |
| Create Order | POST | `/api/v1/orders` | Yes |
| Get by ID | GET | `/api/v1/orders/{id}` | Yes |
| Get by Number | GET | `/api/v1/orders/order-number/{orderNumber}` | Yes |
| Get User Orders | GET | `/api/v1/orders/user/{userId}` | Yes |
| Get All Orders | GET | `/api/v1/orders` | Yes |
| Update Status | PUT | `/api/v1/orders/{id}/status` | Yes |
| Cancel Order | DELETE | `/api/v1/orders/{id}` | Yes |
| Health Check | GET | `/api/v1/orders/health` | Yes |
| **Users** |
| Get All Users | GET | `/api/v1/users` | Yes |
| Get User by ID | GET | `/api/v1/users/{id}` | Yes |
| **Testing** |
| Redis Test | GET | `/api/test/redis` | No |
| Health Check | GET | `/api/test/health` | No |

**Total Endpoints**: 18

---

## 🎯 Conclusion

This Order Management System backend provides a complete, production-ready RESTful API with modern best practices including JWT authentication, Redis caching, comprehensive validation, and robust error handling. The layered architecture ensures maintainability and scalability.
