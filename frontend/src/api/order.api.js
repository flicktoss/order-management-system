import axiosInstance from './axiosInstance';

/**
 * Create a new order
 * @param {Object} orderData - Order data
 * @param {number} orderData.userId - User ID
 * @param {Array} orderData.items - Order items [{productId, quantity}]
 * @param {string} orderData.shippingAddress - Shipping address
 * @param {string} orderData.notes - Optional notes
 * @returns {Promise<Object>} Created order details
 */
export const createOrder = async (orderData) => {
  const response = await axiosInstance.post('/orders', orderData);
  return response.data;
};

/**
 * Get order by ID
 * @param {number} id - Order ID
 * @returns {Promise<Object>} Order details
 */
export const getOrderById = async (id) => {
  const response = await axiosInstance.get(`/orders/${id}`);
  return response.data;
};

/**
 * Get order by order number
 * @param {string} orderNumber - Unique order number
 * @returns {Promise<Object>} Order details
 */
export const getOrderByOrderNumber = async (orderNumber) => {
  const response = await axiosInstance.get(`/orders/order-number/${orderNumber}`);
  return response.data;
};

/**
 * Get all orders for a user
 * @param {number} userId - User ID
 * @returns {Promise<Array>} List of user's orders
 */
export const getOrdersByUserId = async (userId) => {
  const response = await axiosInstance.get(`/orders/user/${userId}`);
  return response.data;
};

/**
 * Get all orders (admin)
 * @returns {Promise<Array>} List of all orders
 */
export const getAllOrders = async () => {
  const response = await axiosInstance.get('/orders');
  return response.data;
};

/**
 * Update order status
 * @param {number} id - Order ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated order
 */
export const updateOrderStatus = async (id, status) => {
  const response = await axiosInstance.put(`/orders/${id}/status`, { status });
  return response.data;
};

/**
 * Cancel order
 * @param {number} id - Order ID
 * @returns {Promise<Object>} Success message
 */
export const cancelOrder = async (id) => {
  const response = await axiosInstance.delete(`/orders/${id}`);
  return response.data;
};
