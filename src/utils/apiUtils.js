/**
 * Utility functions for API operations
 */

/**
 * Formats error messages from API responses
 * @param {Error|Object} error - Error object or API error response
 * @returns {string} - Formatted error message
 */
export const formatErrorMessage = (error) => {
  if (!error) {
    return 'An unknown error occurred';
  }
  
  // Handle ApiError instances
  if (error.name === 'ApiError') {
    if (error.data && error.data.message) {
      return error.data.message;
    }
    return error.message || `Error ${error.status || ''}`;
  }
  
  // Handle network errors
  if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
    return 'Network error. Please check your internet connection.';
  }
  
  // Handle abort errors (timeouts)
  if (error.name === 'AbortError') {
    return 'Request timed out. Please try again.';
  }
  
  // Handle validation errors
  if (error.data && error.data.errors) {
    const errorMessages = Object.values(error.data.errors)
      .flat()
      .join(', ');
    return errorMessages || error.message;
  }
  
  // Default error message
  return error.message || 'An unexpected error occurred';
};

/**
 * Creates a query string from an object of parameters
 * @param {Object} params - Query parameters
 * @returns {string} - Query string
 */
export const createQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }
  
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => queryParams.append(`${key}[]`, item));
      } else {
        queryParams.append(key, value);
      }
    }
  });
  
  return queryParams.toString();
};

/**
 * Parses a file size to a human-readable format
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Validates a file against allowed types and size limits
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @param {string[]} options.allowedTypes - Allowed MIME types
 * @param {number} options.maxSize - Maximum file size in bytes
 * @returns {Object} - Validation result
 */
export const validateFile = (file, { allowedTypes = [], maxSize = 0 } = {}) => {
  const result = { valid: true, errors: [] };
  
  // Check file type
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    result.valid = false;
    result.errors.push(`File type ${file.type} is not supported. Allowed types: ${allowedTypes.join(', ')}`);
  }
  
  // Check file size
  if (maxSize > 0 && file.size > maxSize) {
    result.valid = false;
    result.errors.push(`File size exceeds the limit of ${formatFileSize(maxSize)}`);
  }
  
  return result;
};

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttles a function call
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

