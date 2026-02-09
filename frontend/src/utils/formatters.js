/**
 * Format currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

/**
 * Format date
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Format date (short)
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Truncate text
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text
 */
export const truncate = (text, length = 50) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Validate email
 * @param {string} email - Email address
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate phone
 * @param {string} phone - Phone number
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

/**
 * Validate password strength
 * @param {string} password - Password
 * @returns {Object} {valid: boolean, errors: string[]}
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one digit');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[@#$%^&+=]/.test(password)) {
    errors.push('Password must contain at least one special character (@#$%^&+=)');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};
