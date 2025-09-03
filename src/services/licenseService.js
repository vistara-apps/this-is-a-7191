import api from './api';
import { LicenseAgreement } from '../models';

/**
 * License service
 * Handles license management and operations
 */
const licenseService = {
  /**
   * Get all licenses for user
   * @returns {Promise<Array<LicenseAgreement>>} - List of licenses
   */
  getUserLicenses: async () => {
    try {
      const response = await api.get('/licenses');
      
      // Convert to LicenseAgreement instances
      return response.map(license => new LicenseAgreement(license));
    } catch (error) {
      console.error('Get user licenses error:', error);
      throw error;
    }
  },

  /**
   * Get license by ID
   * @param {string} licenseId - License ID
   * @returns {Promise<LicenseAgreement>} - License instance
   */
  getLicenseById: async (licenseId) => {
    try {
      const response = await api.get(`/licenses/${licenseId}`);
      
      // Return LicenseAgreement instance
      return new LicenseAgreement(response);
    } catch (error) {
      console.error('Get license by ID error:', error);
      throw error;
    }
  },

  /**
   * Get licenses for a project
   * @param {string} projectId - Project ID
   * @returns {Promise<Array<LicenseAgreement>>} - List of licenses
   */
  getProjectLicenses: async (projectId) => {
    try {
      const response = await api.get(`/licenses/project/${projectId}`);
      
      // Convert to LicenseAgreement instances
      return response.map(license => new LicenseAgreement(license));
    } catch (error) {
      console.error('Get project licenses error:', error);
      throw error;
    }
  },

  /**
   * Get licenses for a sample
   * @param {string} sampleId - Sample ID
   * @returns {Promise<Array<LicenseAgreement>>} - List of licenses
   */
  getSampleLicenses: async (sampleId) => {
    try {
      const response = await api.get(`/licenses/sample/${sampleId}`);
      
      // Convert to LicenseAgreement instances
      return response.map(license => new LicenseAgreement(license));
    } catch (error) {
      console.error('Get sample licenses error:', error);
      throw error;
    }
  },

  /**
   * Create new license
   * @param {Object} licenseData - License data
   * @returns {Promise<LicenseAgreement>} - Created license
   */
  createLicense: async (licenseData) => {
    try {
      const response = await api.post('/licenses', licenseData);
      
      // Return LicenseAgreement instance
      return new LicenseAgreement(response);
    } catch (error) {
      console.error('Create license error:', error);
      throw error;
    }
  },

  /**
   * Update license
   * @param {string} licenseId - License ID
   * @param {Object} licenseData - Updated license data
   * @returns {Promise<LicenseAgreement>} - Updated license
   */
  updateLicense: async (licenseId, licenseData) => {
    try {
      const response = await api.put(`/licenses/${licenseId}`, licenseData);
      
      // Return LicenseAgreement instance
      return new LicenseAgreement(response);
    } catch (error) {
      console.error('Update license error:', error);
      throw error;
    }
  },

  /**
   * Complete license payment
   * @param {string} licenseId - License ID
   * @param {Object} paymentData - Payment data
   * @returns {Promise<LicenseAgreement>} - Updated license
   */
  completeLicensePayment: async (licenseId, paymentData) => {
    try {
      const response = await api.post(`/licenses/${licenseId}/payment`, paymentData);
      
      // Return LicenseAgreement instance
      return new LicenseAgreement(response);
    } catch (error) {
      console.error('Complete license payment error:', error);
      throw error;
    }
  },

  /**
   * Cancel license
   * @param {string} licenseId - License ID
   * @returns {Promise<LicenseAgreement>} - Updated license
   */
  cancelLicense: async (licenseId) => {
    try {
      const response = await api.post(`/licenses/${licenseId}/cancel`);
      
      // Return LicenseAgreement instance
      return new LicenseAgreement(response);
    } catch (error) {
      console.error('Cancel license error:', error);
      throw error;
    }
  },

  /**
   * Get license template
   * @param {string} licenseType - License type
   * @returns {Promise<Object>} - License template
   */
  getLicenseTemplate: async (licenseType) => {
    try {
      const response = await api.get(`/licenses/templates/${licenseType}`);
      return response;
    } catch (error) {
      console.error('Get license template error:', error);
      throw error;
    }
  },
};

export default licenseService;

