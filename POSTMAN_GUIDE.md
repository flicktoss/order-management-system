# Postman API Guide - Order Management System

## Base URL
```
http://localhost:8082
```

---

## 📝 Step 1: Get Authentication Token

Before creating products, you need to login and get a JWT token.

### Option A: Login with Existing Admin User

**Endpoint:** `POST /api/v1/auth/login`

**URL:** 
```
http://localhost:8082/api/v1/auth/login
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "admin@demo.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTY...",
  "email": "admin@demo.com",
  "name": "Admin User",
  "role": "ADMIN"
}
```

**Copy the `token` value** - you'll need it for creating products!

---

### Option B: Register a New Admin User

**Endpoint:** `POST /api/v1/auth/register`

**URL:** 
```
http://localhost:8082/api/v1/auth/register
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Admin User",
  "email": "admin@demo.com",
  "password": "password123",
  "phone": "9876543210",
  "address": "123 Admin Street, New York, NY 10001",
  "role": "ADMIN"
}
```

---

## 🛍️ Step 2: Create Products

**Endpoint:** `POST /api/v1/products`

**URL:** 
```
http://localhost:8082/api/v1/products
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```

⚠️ **Important:** Replace `YOUR_TOKEN_HERE` with the actual token you received from login!

**Example Header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTY...
```

---

## 📦 Product JSON Examples

### Example 1: Laptop
```json
{
  "name": "Dell XPS 13",
  "description": "Ultra-thin laptop with 11th Gen Intel Core i7",
  "price": 1499.99,
  "stock": 30,
  "active": true,
  "category": "Electronics",
  "imageUrl": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400"
}
```

### Example 2: Smartphone
```json
{
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with A17 Pro chip and titanium design",
  "price": 999.99,
  "stock": 50,
  "active": true,
  "category": "Electronics",
  "imageUrl": "https://images.unsplash.com/photo-1592286927505-2fd0e3a9e75d?w=400"
}
```

### Example 3: Headphones
```json
{
  "name": "Sony WH-1000XM5",
  "description": "Premium noise-cancelling wireless headphones",
  "price": 399.99,
  "stock": 40,
  "active": true,
  "category": "Electronics",
  "imageUrl": "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400"
}
```

### Example 4: Office Chair
```json
{
  "name": "Herman Miller Aeron",
  "description": "Ergonomic office chair with lumbar support",
  "price": 699.99,
  "stock": 20,
  "active": true,
  "category": "Office",
  "imageUrl": "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400"
}
```

### Example 5: External SSD
```json
{
  "name": "Samsung T7 SSD 2TB",
  "description": "Portable SSD with USB 3.2 Gen 2, up to 1050MB/s",
  "price": 199.99,
  "stock": 60,
  "active": true,
  "category": "Storage",
  "imageUrl": "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400"
}
```

---

## 📋 Required Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | ✅ Yes | Product name (2-100 characters) |
| `description` | String | ❌ No | Product description (max 1000 chars) |
| `price` | Number | ✅ Yes | Product price (must be > 0.01) |
| `stock` | Integer | ✅ Yes | Stock quantity (must be >= 0) |
| `active` | Boolean | ❌ No | Is product active? (default: true) |
| `category` | String | ✅ Yes | Product category |
| `imageUrl` | String | ❌ No | URL to product image |

---

## 🔍 Step 3: Verify Products Were Created

**Endpoint:** `GET /api/v1/products`

**URL:** 
```
http://localhost:8082/api/v1/products
```

**Headers:**
```
(No authentication required for GET requests)
```

This will return all products in the database.

---

## 🎯 Complete Postman Workflow

### 1️⃣ Login Request
- Method: `POST`
- URL: `http://localhost:8082/api/v1/auth/login`
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "email": "admin@demo.com",
    "password": "password123"
  }
  ```
- **Copy the token from response**

### 2️⃣ Create Product Request
- Method: `POST`
- URL: `http://localhost:8082/api/v1/products`
- Headers: 
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN`
- Body: (Use any product JSON example above)

### 3️⃣ Get All Products
- Method: `GET`
- URL: `http://localhost:8082/api/v1/products`
- Headers: None required

---

## ⚠️ Common Errors

### 403 Forbidden
```json
{
  "message": "Access Denied"
}
```
**Solution:** Make sure you're using an ADMIN account and the token is valid.

### 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```
**Solution:** Check that your Authorization header is correct: `Authorization: Bearer YOUR_TOKEN`

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": ["Price is required", "Stock cannot be negative"]
}
```
**Solution:** Check that all required fields are present and valid.

---

## 🎨 Unsplash Image URLs (Free to use)

You can use these URLs for product images:

```
Laptops: https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400
Phones: https://images.unsplash.com/photo-1592286927505-2fd0e3a9e75d?w=400
Headphones: https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400
Keyboards: https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400
Mice: https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400
Monitors: https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400
Chairs: https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400
Desks: https://images.unsplash.com/photo-1595515106969-1ce29566ff2c?w=400
```

---

## ✅ Quick Test

1. **Start Postman**
2. **Create a new request**
3. **Login** and copy the token
4. **Create a product** using the token
5. **View all products** to verify

Done! 🎉
