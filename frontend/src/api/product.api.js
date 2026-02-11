import axiosInstance from './axiosInstance';

/**
 * Get all products
 * @returns {Promise<Array>} List of all products
 */
export const getAllProducts = async () => {
  const response = await axiosInstance.get('/products');
  return response.data;
};

/**
 * Get all available (active) products
 * @returns {Promise<Array>} List of available products
 */
export const getAvailableProducts = async () => {
  const response = await axiosInstance.get('/products/available');
  return response.data;
};

/**
 * Get product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product details
 */
export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

/**
 * Get products by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} List of products in category
 */
export const getProductsByCategory = async (category) => {
  const response = await axiosInstance.get(`/products/category/${category}`);
  return response.data;
};
