# Create Admin Account - Postman Guide

## 🔐 Register New Admin Account

### API Endpoint
```
POST http://localhost:8082/api/v1/auth/register
```

### Headers
```
Content-Type: application/json
```

### Request Body (JSON)

#### Option 1: Admin Account
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "Admin@123",
  "phone": "9876543210",
  "address": "123 Admin Street, New York, NY 10001",
  "role": "ADMIN"
}
```

#### Option 2: Another Admin Account
```json
{
  "name": "Super Admin",
  "email": "superadmin@example.com",
  "password": "SuperAdmin@2024",
  "phone": "9876543211",
  "address": "456 Executive Ave, San Francisco, CA 94102",
  "role": "ADMIN"
}
```

#### Option 3: Regular User Account
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "User@123",
  "phone": "9876543212",
  "address": "789 User Lane, Chicago, IL 60601",
  "role": "USER"
}
```

---

## 📋 Field Requirements

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `name` | String | ✅ Yes | Not blank | Full name of user |
| `email` | String | ✅ Yes | Valid email format, unique | User's email address |
| `password` | String | ✅ Yes | Min 8 characters | User's password |
| `phone` | String | ✅ Yes | Exactly 10 digits | Phone number (e.g., "9876543210") |
| `address` | String | ❌ No | - | Full address |
| `role` | String | ❌ No | "ADMIN" or "USER" | User role (default: "USER") |

---

## ✅ Expected Success Response

**Status Code:** `201 Created`

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTcwNzQ4MzYwMCwiZXhwIjoxNzA3NTcwMDAwfQ.abc123...",
  "email": "admin@example.com",
  "name": "Admin User",
  "role": "ADMIN"
}
```

**Save the `token`** - you'll need it for authenticated requests!

---

## ❌ Common Errors

### 1. Email Already Exists
```json
{
  "timestamp": "2024-02-09T16:30:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Email already exists"
}
```
**Solution:** Use a different email address.

---

### 2. Validation Errors
```json
{
  "timestamp": "2024-02-09T16:30:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": [
    "Email is required",
    "Password must be at least 8 characters",
    "Phone must be 10 digits"
  ]
}
```
**Solution:** Check all required fields and validation rules.

---

### 3. Invalid Email Format
```json
{
  "timestamp": "2024-02-09T16:30:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid email format"
}
```
**Solution:** Use a valid email format (e.g., user@example.com).

---

## 🔄 Complete Workflow in Postman

### Step 1: Create New Request
1. Click **New** → **HTTP Request**
2. Set method to **POST**
3. Enter URL: `http://localhost:8082/api/v1/auth/register`

### Step 2: Set Headers
1. Click **Headers** tab
2. Add: `Content-Type` = `application/json`

### Step 3: Add Body
1. Click **Body** tab
2. Select **raw**
3. Select **JSON** from dropdown
4. Paste one of the JSON examples above

### Step 4: Send Request
1. Click **Send**
2. Check response status (should be **201 Created**)
3. **Copy the token** from response

### Step 5: Use Token for Product Creation
Now you can use this token to create products:

**POST** `http://localhost:8082/api/v1/products`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```

**Body:**
```json
{
  "name": "Sample Product",
  "description": "This is a test product",
  "price": 99.99,
  "stock": 50,
  "active": true,
  "category": "Electronics",
  "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
}
```

---

## 🎯 Quick Test Credentials

### Pre-existing Admin (from data.sql)
```
Email: admin@demo.com
Password: password123
```

### Create Your Own Admin
Use the registration endpoint above with:
```json
{
  "name": "Your Name",
  "email": "youremail@example.com",
  "password": "YourPassword123",
  "phone": "1234567890",
  "address": "Your Address",
  "role": "ADMIN"
}
```

---

## 🔑 Password Requirements

- ✅ Minimum 8 characters
- ✅ No special character requirements (but recommended)
- ✅ Case-sensitive

**Examples of valid passwords:**
- `password123`
- `Admin@2024`
- `MySecurePass!`
- `Test1234`

---

## 📞 Phone Number Format

- ✅ Must be exactly **10 digits**
- ✅ No spaces, dashes, or special characters
- ✅ Only numbers

**Valid:** `9876543210`  
**Invalid:** `987-654-3210`, `+91 9876543210`, `987 654 3210`

---

## 🚀 Next Steps After Registration

1. ✅ **Save your token** from the registration response
2. ✅ **Test login** with your new credentials
3. ✅ **Create products** using the token
4. ✅ **View products** at `/api/v1/products`

---

## 💡 Pro Tips

1. **Save credentials** - Store your test accounts in Postman environment variables
2. **Token expiry** - Tokens expire after 24 hours (86400000ms)
3. **Multiple admins** - You can create multiple admin accounts for testing
4. **Role matters** - Only ADMIN role can create/update/delete products
5. **Fresh start** - Backend has been restarted, all classloader issues resolved!

---

## ✅ Backend Status

✅ **Backend is running:** `http://localhost:8082`  
✅ **Classloader issue fixed** - Fresh restart completed  
✅ **Total products in DB:** 67  
✅ **Ready to accept requests!**

**Try it now!** 🎉
