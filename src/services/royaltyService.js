import api from './api';
import { RoyaltyStatement } from '../models';

/**
 * Royalty service
 * Handles royalty statements and operations
 */
const royaltyService = {
  /**
   * Get all royalty statements for user
   * @param {Object} params - Query parameters (e.g., timeframe)
   * @returns {Promise<Array<RoyaltyStatement>>} - List of royalty statements
   */
  getUserStatements: async (params = {}) => {
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });

      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await api.get(`/royalties/statements${query}`);
      
      // Convert to RoyaltyStatement instances
      return response.map(statement => new RoyaltyStatement(statement));
    } catch (error) {
      console.error('Get user statements error:', error);
      throw error;
    }
  },

  /**
   * Get royalty statement by ID
   * @param {string} statementId - Statement ID
   * @returns {Promise<RoyaltyStatement>} - Royalty statement
   */
  getStatementById: async (statementId) => {
    try {
      const response = await api.get(`/royalties/statements/${statementId}`);
      
      // Return RoyaltyStatement instance
      return new RoyaltyStatement(response);
    } catch (error) {
      console.error('Get statement by ID error:', error);
      throw error;
    }
  },

  /**
   * Get royalty statements for a project
   * @param {string} projectId - Project ID
   * @param {Object} params - Query parameters (e.g., timeframe)
   * @returns {Promise<Array<RoyaltyStatement>>} - List of royalty statements
   */
  getProjectStatements: async (projectId, params = {}) => {
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });

      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await api.get(`/royalties/projects/${projectId}/statements${query}`);
      
      // Convert to RoyaltyStatement instances
      return response.map(statement => new RoyaltyStatement(statement));
    } catch (error) {
      console.error('Get project statements error:', error);
      throw error;
    }
  },

  /**
   * Get royalty earnings summary
   * @param {Object} params - Query parameters (e.g., timeframe)
   * @returns {Promise<Object>} - Earnings summary
   */
  getEarningsSummary: async (params = {}) => {
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });

      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await api.get(`/royalties/summary${query}`);
      
      return response;
    } catch (error) {
      console.error('Get earnings summary error:', error);
      throw error;
    }
  },

  /**
   * Get platform breakdown
   * @param {Object} params - Query parameters (e.g., timeframe)
   * @returns {Promise<Object>} - Platform breakdown
   */
  getPlatformBreakdown: async (params = {}) => {
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });

      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await api.get(`/royalties/platforms${query}`);
      
      return response;
    } catch (error) {
      console.error('Get platform breakdown error:', error);
      throw error;
    }
  },

  /**
   * Download statement as PDF
   * @param {string} statementId - Statement ID
   * @returns {Promise<Blob>} - PDF blob
   */
  downloadStatementPdf: async (statementId) => {
    try {
      const response = await fetch(`${api.API_BASE_URL}/royalties/statements/${statementId}/pdf`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to download statement PDF');
      }
      
      return await response.blob();
    } catch (error) {
      console.error('Download statement PDF error:', error);
      throw error;
    }
  },

  /**
   * Download statement as CSV
   * @param {string} statementId - Statement ID
   * @returns {Promise<Blob>} - CSV blob
   */
  downloadStatementCsv: async (statementId) => {
    try {
      const response = await fetch(`${api.API_BASE_URL}/royalties/statements/${statementId}/csv`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to download statement CSV');
      }
      
      return await response.blob();
    } catch (error) {
      console.error('Download statement CSV error:', error);
      throw error;
    }
  },
};

export default royaltyService;

