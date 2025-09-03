import api from './api';

/**
 * Concierge service
 * Handles concierge service requests and operations
 */
const conciergeService = {
  /**
   * Get all concierge requests for user
   * @returns {Promise<Array<Object>>} - List of concierge requests
   */
  getUserRequests: async () => {
    try {
      const response = await api.get('/concierge/requests');
      return response;
    } catch (error) {
      console.error('Get user requests error:', error);
      throw error;
    }
  },

  /**
   * Get concierge request by ID
   * @param {string} requestId - Request ID
   * @returns {Promise<Object>} - Concierge request
   */
  getRequestById: async (requestId) => {
    try {
      const response = await api.get(`/concierge/requests/${requestId}`);
      return response;
    } catch (error) {
      console.error('Get request by ID error:', error);
      throw error;
    }
  },

  /**
   * Create new concierge request
   * @param {Object} requestData - Request data
   * @returns {Promise<Object>} - Created request
   */
  createRequest: async (requestData) => {
    try {
      const response = await api.post('/concierge/requests', requestData);
      return response;
    } catch (error) {
      console.error('Create request error:', error);
      throw error;
    }
  },

  /**
   * Cancel concierge request
   * @param {string} requestId - Request ID
   * @returns {Promise<Object>} - Updated request
   */
  cancelRequest: async (requestId) => {
    try {
      const response = await api.post(`/concierge/requests/${requestId}/cancel`);
      return response;
    } catch (error) {
      console.error('Cancel request error:', error);
      throw error;
    }
  },

  /**
   * Get messages for a concierge request
   * @param {string} requestId - Request ID
   * @returns {Promise<Array<Object>>} - List of messages
   */
  getRequestMessages: async (requestId) => {
    try {
      const response = await api.get(`/concierge/requests/${requestId}/messages`);
      return response;
    } catch (error) {
      console.error('Get request messages error:', error);
      throw error;
    }
  },

  /**
   * Send message for a concierge request
   * @param {string} requestId - Request ID
   * @param {string} message - Message text
   * @returns {Promise<Object>} - Created message
   */
  sendMessage: async (requestId, message) => {
    try {
      const response = await api.post(`/concierge/requests/${requestId}/messages`, {
        message,
      });
      return response;
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  },

  /**
   * Upload file for a concierge request
   * @param {string} requestId - Request ID
   * @param {File} file - File to upload
   * @returns {Promise<Object>} - Upload result
   */
  uploadFile: async (requestId, file) => {
    try {
      const response = await api.uploadFile(`/concierge/requests/${requestId}/files`, file);
      return response;
    } catch (error) {
      console.error('Upload file error:', error);
      throw error;
    }
  },

  /**
   * Get pricing information
   * @returns {Promise<Object>} - Pricing information
   */
  getPricing: async () => {
    try {
      const response = await api.get('/concierge/pricing');
      return response;
    } catch (error) {
      console.error('Get pricing error:', error);
      throw error;
    }
  },
};

export default conciergeService;

