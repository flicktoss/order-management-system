import axiosInstance from './axiosInstance';

/**
 * Register a new user
 * @param {Object} data - Registration data
 * @param {string} data.name - User name
 * @param {string} data.email - User email
 * @param {string} data.password - User password
 * @param {string} data.phone - User phone (10 digits)
 * @param {string} data.address - User address
 * @returns {Promise<Object>} Auth response with token
 */
export const register = async (data) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
};

/**
 * Login user
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} Auth response with token
 */
export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};
