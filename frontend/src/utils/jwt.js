/**
 * Decode JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if expired
 */
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

/**
 * Get user from token
 * @param {string} token - JWT token
 * @returns {Object|null} User data or null
 */
export const getUserFromToken = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return null;
  
  return {
    email: decoded.sub,
    role: decoded.role,
  };
};

/**
 * Check if user is admin
 * @param {Object} user - User object
 * @returns {boolean} True if admin
 */
export const isAdmin = (user) => {
  return user && user.role === 'ADMIN';
};

/**
 * Check if user is regular user
 * @param {Object} user - User object
 * @returns {boolean} True if user
 */
export const isUser = (user) => {
  return user && user.role === 'USER';
};
