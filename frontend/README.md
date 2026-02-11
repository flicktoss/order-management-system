# Order Management System - Frontend

Production-grade React frontend built with **Vite**, **Tailwind CSS**, and **strict design system adherence**.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Backend server running on `http://localhost:8082`

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🎨 Design System

This application uses a **strict Tailwind theme** with semantic color tokens. **No hardcoded colors** are allowed.

### Theme Tokens (tailwind.config.js)

- **Primary Colors**: `primary`, `secondary`, `accent`
- **Backgrounds**: `background`, `surface`, `border`  
- **Status**: `success`, `warning`, `error`, `info`
- **Text**: `muted`, `disabled`
- **Interactions**: `accent-hover`, `surface-hover`

### Usage Example

```jsx
// ✅ CORRECT - Using theme tokens
<button className="bg-accent text-white hover:bg-accent-hover">
  Click Me
</button>

// ❌ WRONG - Hardcoded colors
<button className="bg-blue-500 text-white hover:bg-blue-600">
  Click Me
</button>
```

## 📁 Project Structure

```
src/
├── api/              # API integration layer
├── auth/             # Authentication context & guards
├── components/       # Reusable UI components
├── pages/            # Application pages
├── utils/            # Helper functions
├── App.jsx           # Main app with routing
├── main.jsx          # React entry point
└── index.css         # Global styles with Tailwind
```

## 🔐 Authentication

- JWT-based authentication
- Token stored in localStorage
- Auto-refresh on page reload
- Auto-logout on 401

### User Roles

- **USER**: Can browse products, place orders, view own orders
- **ADMIN**: Full access including order management and user list

## 📄 Pages

### Public
- `/login` - User login
- `/register` - User registration

### User Pages
- `/products` - Browse products with search/filter
- `/products/:id` - Product details
- `/cart` - Shopping cart & checkout
- `/orders` - User's order history
- `/orders/:id` - Order details

### Admin Pages
- `/admin/orders` - All orders with status management
- `/admin/users` - User list

## 🛠️ Key Features

- ✅ Strict Tailwind theming (zero hardcoded colors)
- ✅ Role-based access control
- ✅ Form validation with error handling
- ✅ Loading states & loaders
- ✅ Responsive design
- ✅ Clean, maintainable code structure

## 🔧 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8082/api/v1
```

## 📦 Dependencies

- **react** & **react-dom** - UI library
- **react-router-dom** - Routing
- **axios** - HTTP client
- **tailwindcss** - Styling

## 🧪 Testing the Application

1. Start the backend server
2. Start the frontend: `npm run dev`
3. Register a new user
4. Browse products and place an order
5. Test admin features (create an ADMIN user via backend)

## 🎯 Best Practices Implemented

- ✅ Centralized API layer with interceptors
- ✅ Global authentication state (Context API)
- ✅ Protected routes with role checking
- ✅ Reusable component library
- ✅ Consistent error handling
- ✅ Loading states for async operations
- ✅ Input validation
- ✅ Clean code organization

## 🚨 Important Notes

- **NO hardcoded colors** - All colors come from `tailwind.config.js`
- Use the `btn`, `input`, `card`, `badge` classes from `index.css`
- Follow the established component patterns
- Maintain consistent spacing and typography

## 📝 License

MIT
