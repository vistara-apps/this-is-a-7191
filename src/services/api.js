/**
 * Base API service
 * Handles API requests with error handling and authentication
 */

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.samplesync.com';

/**
 * Get authentication token from localStorage
 * @returns {string|null} - Authentication token
 */
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Create request headers with authentication
 * @param {Object} customHeaders - Custom headers to include
 * @returns {Object} - Request headers
 */
const createHeaders = (customHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Handle API response
 * @param {Response} response - Fetch response
 * @returns {Promise<any>} - Response data
 * @throws {Error} - API error
 */
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    // Handle authentication errors
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    // Format error message
    const errorMessage = isJson && data.message ? data.message : 'An error occurred';
    throw new Error(errorMessage);
  }

  return data;
};

/**
 * Make API request with retry logic
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Request options
 * @param {number} retries - Number of retries
 * @returns {Promise<any>} - Response data
 */
const apiRequest = async (endpoint, options = {}, retries = 3) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, options);
    return await handleResponse(response);
  } catch (error) {
    // Retry on network errors or 5xx server errors
    if (retries > 0 && (error.name === 'TypeError' || (error.response && error.response.status >= 500))) {
      console.warn(`API request failed, retrying... (${retries} retries left)`);
      return apiRequest(endpoint, options, retries - 1);
    }
    
    throw error;
  }
};

/**
 * API service methods
 */
const api = {
  /**
   * Make GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} customHeaders - Custom headers
   * @returns {Promise<any>} - Response data
   */
  get: (endpoint, customHeaders = {}) => {
    return apiRequest(endpoint, {
      method: 'GET',
      headers: createHeaders(customHeaders),
    });
  },

  /**
   * Make POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} customHeaders - Custom headers
   * @returns {Promise<any>} - Response data
   */
  post: (endpoint, data, customHeaders = {}) => {
    return apiRequest(endpoint, {
      method: 'POST',
      headers: createHeaders(customHeaders),
      body: JSON.stringify(data),
    });
  },

  /**
   * Make PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} customHeaders - Custom headers
   * @returns {Promise<any>} - Response data
   */
  put: (endpoint, data, customHeaders = {}) => {
    return apiRequest(endpoint, {
      method: 'PUT',
      headers: createHeaders(customHeaders),
      body: JSON.stringify(data),
    });
  },

  /**
   * Make PATCH request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} customHeaders - Custom headers
   * @returns {Promise<any>} - Response data
   */
  patch: (endpoint, data, customHeaders = {}) => {
    return apiRequest(endpoint, {
      method: 'PATCH',
      headers: createHeaders(customHeaders),
      body: JSON.stringify(data),
    });
  },

  /**
   * Make DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} customHeaders - Custom headers
   * @returns {Promise<any>} - Response data
   */
  delete: (endpoint, customHeaders = {}) => {
    return apiRequest(endpoint, {
      method: 'DELETE',
      headers: createHeaders(customHeaders),
    });
  },

  /**
   * Upload file
   * @param {string} endpoint - API endpoint
   * @param {File} file - File to upload
   * @param {Object} additionalData - Additional form data
   * @returns {Promise<any>} - Response data
   */
  uploadFile: (endpoint, file, additionalData = {}) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add additional data to form data
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return apiRequest(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        // Don't set Content-Type, let the browser set it with the boundary
      },
      body: formData,
    });
  },
};

export default api;

