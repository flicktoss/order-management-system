import axiosInstance from './axiosInstance';

/**
 * Get all users
 * @returns {Promise<Array>} List of all users
 */
export const getAllUsers = async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

/**
 * Get user by ID
 * @param {number} id - User ID
 * @returns {Promise<Object>} User details
 */
export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};
