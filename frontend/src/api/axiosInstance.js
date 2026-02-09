import axios from 'axios';

// Base API configuration - using environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082/api/v1';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized - Token expired or invalid
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      // Return the error response for component-level handling
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Network error
      return Promise.reject({
        message: 'Network error. Please check your connection.',
      });
    } else {
      return Promise.reject({
        message: 'An unexpected error occurred.',
      });
    }
  }
);

export default axiosInstance;
