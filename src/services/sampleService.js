import api from './api';
import { Sample } from '../models';

/**
 * Sample service
 * Handles sample management and operations
 */
const sampleService = {
  /**
   * Get all samples
   * @param {Object} params - Query parameters
   * @returns {Promise<Array<Sample>>} - List of samples
   */
  getAllSamples: async (params = {}) => {
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });

      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await api.get(`/samples${query}`);
      
      // Convert to Sample instances
      return response.map(sample => new Sample(sample));
    } catch (error) {
      console.error('Get all samples error:', error);
      throw error;
    }
  },

  /**
   * Get marketplace samples
   * @param {Object} params - Query parameters
   * @returns {Promise<Array<Sample>>} - List of marketplace samples
   */
  getMarketplaceSamples: async (params = {}) => {
    try {
      // Add marketplace filter
      const marketplaceParams = {
        ...params,
        isPublic: true,
      };

      return await sampleService.getAllSamples(marketplaceParams);
    } catch (error) {
      console.error('Get marketplace samples error:', error);
      throw error;
    }
  },

  /**
   * Get user samples
   * @param {string} userId - User ID
   * @returns {Promise<Array<Sample>>} - List of user samples
   */
  getUserSamples: async (userId) => {
    try {
      const response = await api.get(`/samples/user/${userId}`);
      
      // Convert to Sample instances
      return response.map(sample => new Sample(sample));
    } catch (error) {
      console.error('Get user samples error:', error);
      throw error;
    }
  },

  /**
   * Get sample by ID
   * @param {string} sampleId - Sample ID
   * @returns {Promise<Sample>} - Sample instance
   */
  getSampleById: async (sampleId) => {
    try {
      const response = await api.get(`/samples/${sampleId}`);
      
      // Return Sample instance
      return new Sample(response);
    } catch (error) {
      console.error('Get sample by ID error:', error);
      throw error;
    }
  },

  /**
   * Create new sample
   * @param {Object} sampleData - Sample data
   * @param {File} audioFile - Audio file
   * @param {File} coverArtFile - Cover art file (optional)
   * @returns {Promise<Sample>} - Created sample
   */
  createSample: async (sampleData, audioFile, coverArtFile = null) => {
    try {
      // Upload audio file
      const uploadResponse = await api.uploadFile('/samples/upload', audioFile, {
        sampleData: JSON.stringify(sampleData),
        hasCoverArt: !!coverArtFile,
      });

      // If cover art is provided, upload it
      if (coverArtFile) {
        await api.uploadFile(`/samples/${uploadResponse.sampleId}/cover`, coverArtFile);
      }

      // Return Sample instance
      return new Sample(uploadResponse);
    } catch (error) {
      console.error('Create sample error:', error);
      throw error;
    }
  },

  /**
   * Update sample
   * @param {string} sampleId - Sample ID
   * @param {Object} sampleData - Updated sample data
   * @returns {Promise<Sample>} - Updated sample
   */
  updateSample: async (sampleId, sampleData) => {
    try {
      const response = await api.put(`/samples/${sampleId}`, sampleData);
      
      // Return Sample instance
      return new Sample(response);
    } catch (error) {
      console.error('Update sample error:', error);
      throw error;
    }
  },

  /**
   * Delete sample
   * @param {string} sampleId - Sample ID
   * @returns {Promise<boolean>} - Deletion result
   */
  deleteSample: async (sampleId) => {
    try {
      await api.delete(`/samples/${sampleId}`);
      return true;
    } catch (error) {
      console.error('Delete sample error:', error);
      throw error;
    }
  },

  /**
   * Verify sample
   * @param {File} audioFile - Audio file to verify
   * @returns {Promise<Object>} - Verification results
   */
  verifySample: async (audioFile) => {
    try {
      const response = await api.uploadFile('/samples/verify', audioFile);
      return response;
    } catch (error) {
      console.error('Verify sample error:', error);
      throw error;
    }
  },

  /**
   * Search samples
   * @param {string} query - Search query
   * @param {Object} filters - Search filters
   * @returns {Promise<Array<Sample>>} - Search results
   */
  searchSamples: async (query, filters = {}) => {
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      
      if (query) {
        queryParams.append('q', query);
      }
      
      // Add filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            // Handle range filters (e.g., bpmRange, priceRange)
            queryParams.append(`${key}Min`, value[0]);
            queryParams.append(`${key}Max`, value[1]);
          } else {
            queryParams.append(key, value);
          }
        }
      });

      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await api.get(`/samples/search${queryString}`);
      
      // Convert to Sample instances
      return response.map(sample => new Sample(sample));
    } catch (error) {
      console.error('Search samples error:', error);
      throw error;
    }
  },
};

export default sampleService;

