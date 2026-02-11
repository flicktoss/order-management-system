# 🚀 API Quick Reference - Order Management System

## 📍 Base URL
```
http://localhost:8082
```

---

## 🔐 Authentication Endpoints

### 1. Register (Create Account)
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "Admin@123",
  "phone": "9876543210",
  "address": "123 Admin Street, NY",
  "role": "ADMIN"
}
```

### 2. Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@demo.com",
  "password": "password123"
}
```

**Response:** Copy the `token` value!

---

## 🛍️ Product Endpoints

### 1. Get All Products
```http
GET /api/v1/products
```
No authentication required ✅

### 2. Get Available Products (Active only)
```http
GET /api/v1/products/available
```
No authentication required ✅

### 3. Get Product by ID
```http
GET /api/v1/products/{id}
```
Example: `GET /api/v1/products/1`

### 4. Get Products by Category
```http
GET /api/v1/products/category/{category}
```
Example: `GET /api/v1/products/category/Electronics`

### 5. Create Product (ADMIN only)
```http
POST /api/v1/products
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "stock": 50,
  "active": true,
  "category": "Electronics",
  "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
}
```

---

## 📦 Order Endpoints

### 1. Create Order
```http
POST /api/v1/orders
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
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
  "shippingAddress": "123 Main St, City, State 12345",
  "notes": "Please deliver before 5 PM"
}
```

### 2. Get My Orders
```http
GET /api/v1/orders/my-orders
Authorization: Bearer YOUR_TOKEN
```

### 3. Get Order by ID
```http
GET /api/v1/orders/{id}
Authorization: Bearer YOUR_TOKEN
```

### 4. Get All Orders (ADMIN only)
```http
GET /api/v1/orders
Authorization: Bearer YOUR_TOKEN
```

---

## 👤 User Endpoints

### Get Current User Profile
```http
GET /api/v1/users/me
Authorization: Bearer YOUR_TOKEN
```

---

## 🎯 Quick Start in Postman

### Step 1: Login
```
POST http://localhost:8082/api/v1/auth/login
Body: { "email": "admin@demo.com", "password": "password123" }
```
→ Copy the token

### Step 2: Create Product
```
POST http://localhost:8082/api/v1/products
Headers: Authorization: Bearer YOUR_TOKEN
Body: { "name": "Test Product", "price": 99.99, "stock": 10, "category": "Electronics" }
```

### Step 3: View Products
```
GET http://localhost:8082/api/v1/products
```

---

## 🔑 Pre-configured Test Accounts

### Admin Account
```
Email: admin@demo.com
Password: password123
Role: ADMIN
```

### Regular Users
```
Email: john.doe@demo.com
Password: password123
Role: USER

Email: jane.smith@demo.com
Password: password123
Role: USER
```

---

## 📊 Product Categories

- Electronics
- Accessories
- Office
- Storage

---

## ✅ Required Fields

### Product
- ✅ name (2-100 chars)
- ✅ price (> 0.01)
- ✅ stock (>= 0)
- ✅ category
- ❌ description (optional)
- ❌ imageUrl (optional)
- ❌ active (default: true)

### User Registration
- ✅ name
- ✅ email (unique, valid format)
- ✅ password (min 8 chars)
- ✅ phone (exactly 10 digits)
- ❌ address (optional)
- ❌ role (default: USER)

### Order
- ✅ items (array with productId & quantity)
- ❌ shippingAddress (optional)
- ❌ notes (optional)

---

## 🎨 Sample Image URLs

```
Laptops: https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400
Phones: https://images.unsplash.com/photo-1592286927505-2fd0e3a9e75d?w=400
Headphones: https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400
Keyboards: https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400
Monitors: https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400
Chairs: https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400
```

---

## 🚨 Common Issues & Solutions

### 403 Forbidden
- ❌ Not logged in as ADMIN
- ✅ Login with admin account and use the token

### 401 Unauthorized
- ❌ Missing or invalid token
- ✅ Add header: `Authorization: Bearer YOUR_TOKEN`

### 500 Internal Server Error (ClassLoader)
- ❌ DevTools classloader conflict after long runtime
- ✅ Restart backend: Stop Java process and run `.\mvnw spring-boot:run`

### Empty Product List
- ❌ Database empty or connection issue
- ✅ Check backend logs, DataInitializer should add products on startup

---

## 📱 Frontend URLs

```
Home: http://localhost:5173/
Products: http://localhost:5173/products
Product Details: http://localhost:5173/products/{id}
Cart: http://localhost:5173/cart
Orders: http://localhost:5173/orders
```

---

## ✅ Current System Status

✅ **Backend:** Running on port 8082  
✅ **Frontend:** Running on port 5173  
✅ **Database:** PostgreSQL with 67 products  
✅ **Classloader Issue:** Fixed (fresh restart)  
✅ **Demo Data:** Loaded automatically  

---

## 📚 Full Documentation

- **Postman Guide:** `POSTMAN_GUIDE.md`
- **Admin Creation:** `CREATE_ADMIN_GUIDE.md`
- **Backend Docs:** `backend_documentation.md`

---

## 🎉 Ready to Test!

1. Open Postman
2. Login to get token
3. Create products
4. View in frontend at http://localhost:5173/products

**Everything is set up and ready to go!** 🚀
