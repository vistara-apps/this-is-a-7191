import React, { createContext, useContext, useState, useEffect } from 'react';
import { LicenseAgreement } from '../models';
import { useAuth } from './AuthContext';

// Create context
const LicenseContext = createContext();

/**
 * LicenseProvider component for managing license agreements state
 * @param {Object} props - Component props
 * @returns {JSX.Element} - LicenseProvider component
 */
export const LicenseProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [licenses, setLicenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch licenses when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchLicenses();
    } else {
      setLicenses([]);
    }
  }, [isAuthenticated, user]);

  /**
   * Fetch user licenses
   * @returns {Promise<void>} - Fetch result
   */
  const fetchLicenses = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, we'll use mock data
      const mockLicenses = [
        {
          agreementId: 'license1',
          projectId: 'project1',
          sampleId: 'sample2',
          licensee: {
            userId: 'user123',
            name: 'Demo User',
          },
          licensor: {
            userId: 'smooth123',
            name: 'Smooth Sounds',
          },
          terms: {
            usageType: 'commercial',
            distribution: 'unlimited',
            modification: 'allowed',
          },
          licenseType: 'standard',
          usageRights: ['streaming', 'download', 'physical'],
          restrictions: ['resale', 'redistribution'],
          fee: 34.99,
          royaltyRate: 15,
          creditRequirement: 'Sample by Smooth Sounds',
          territory: 'worldwide',
          startDate: '2024-01-15T00:00:00Z',
          endDate: null,
          status: 'active',
          paymentStatus: 'paid',
          paymentDate: '2024-01-15T12:30:45Z',
          paymentMethod: 'credit_card',
          transactionId: 'txn_123456789',
        },
        {
          agreementId: 'license2',
          projectId: 'project2',
          sampleId: 'sample1',
          licensee: {
            userId: 'user123',
            name: 'Demo User',
          },
          licensor: {
            userId: 'groove456',
            name: 'Groove Masters',
          },
          terms: {
            usageType: 'commercial',
            distribution: 'unlimited',
            modification: 'allowed',
          },
          licenseType: 'standard',
          usageRights: ['streaming', 'download', 'physical'],
          restrictions: ['resale', 'redistribution'],
          fee: 29.99,
          royaltyRate: 20,
          creditRequirement: 'Sample by Groove Masters',
          territory: 'worldwide',
          startDate: '2024-01-20T00:00:00Z',
          endDate: null,
          status: 'pending',
          paymentStatus: 'unpaid',
          paymentDate: null,
          paymentMethod: '',
          transactionId: '',
        }
      ];

      // Convert to LicenseAgreement instances
      const licenseInstances = mockLicenses.map(license => new LicenseAgreement(license));
      
      setLicenses(licenseInstances);
    } catch (err) {
      console.error('Fetch licenses error:', err);
      setError(err.message || 'Failed to fetch licenses');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get a license by ID
   * @param {string} licenseId - License ID
   * @returns {LicenseAgreement|null} - License instance or null if not found
   */
  const getLicenseById = (licenseId) => {
    return licenses.find(license => license.agreementId === licenseId) || null;
  };

  /**
   * Get licenses for a project
   * @param {string} projectId - Project ID
   * @returns {Array} - Project licenses
   */
  const getProjectLicenses = (projectId) => {
    return licenses.filter(license => license.projectId === projectId);
  };

  /**
   * Get licenses for a sample
   * @param {string} sampleId - Sample ID
   * @returns {Array} - Sample licenses
   */
  const getSampleLicenses = (sampleId) => {
    return licenses.filter(license => license.sampleId === sampleId);
  };

  /**
   * Create a new license agreement
   * @param {Object} licenseData - License data
   * @returns {Promise<LicenseAgreement>} - Created license
   */
  const createLicense = async (licenseData) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, we'll create a mock license
      const newLicense = new LicenseAgreement({
        agreementId: `license${licenses.length + 1}`,
        ...licenseData,
        licensee: {
          userId: user.userId,
          name: user.fullName,
        },
        startDate: new Date().toISOString(),
        status: 'pending',
        paymentStatus: 'unpaid',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Update state
      setLicenses(prevLicenses => [...prevLicenses, newLicense]);

      return newLicense;
    } catch (err) {
      console.error('Create license error:', err);
      setError(err.message || 'Failed to create license');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update a license
   * @param {string} licenseId - License ID
   * @param {Object} licenseData - Updated license data
   * @returns {Promise<LicenseAgreement>} - Updated license
   */
  const updateLicense = async (licenseId, licenseData) => {
    try {
      setIsLoading(true);
      setError(null);

      const existingLicense = getLicenseById(licenseId);
      
      if (!existingLicense) {
        throw new Error('License not found');
      }

      // TODO: Replace with actual API call
      // For now, we'll update the license locally
      const updatedLicense = new LicenseAgreement({
        ...existingLicense.toObject(),
        ...licenseData,
        updatedAt: new Date().toISOString(),
      });

      // Update state
      setLicenses(prevLicenses => 
        prevLicenses.map(license => 
          license.agreementId === licenseId ? updatedLicense : license
        )
      );

      return updatedLicense;
    } catch (err) {
      console.error('Update license error:', err);
      setError(err.message || 'Failed to update license');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Complete license payment
   * @param {string} licenseId - License ID
   * @param {Object} paymentData - Payment data
   * @returns {Promise<LicenseAgreement>} - Updated license
   */
  const completeLicensePayment = async (licenseId, paymentData) => {
    try {
      setIsLoading(true);
      setError(null);

      const existingLicense = getLicenseById(licenseId);
      
      if (!existingLicense) {
        throw new Error('License not found');
      }

      // TODO: Replace with actual API call
      // For now, we'll update the license locally
      const updatedLicense = await updateLicense(licenseId, {
        status: 'active',
        paymentStatus: 'paid',
        paymentDate: new Date().toISOString(),
        paymentMethod: paymentData.paymentMethod,
        transactionId: paymentData.transactionId,
      });

      return updatedLicense;
    } catch (err) {
      console.error('Complete license payment error:', err);
      setError(err.message || 'Failed to complete license payment');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Cancel a license
   * @param {string} licenseId - License ID
   * @returns {Promise<LicenseAgreement>} - Updated license
   */
  const cancelLicense = async (licenseId) => {
    try {
      setIsLoading(true);
      setError(null);

      const existingLicense = getLicenseById(licenseId);
      
      if (!existingLicense) {
        throw new Error('License not found');
      }

      // TODO: Replace with actual API call
      // For now, we'll update the license locally
      const updatedLicense = await updateLicense(licenseId, {
        status: 'terminated',
      });

      return updatedLicense;
    } catch (err) {
      console.error('Cancel license error:', err);
      setError(err.message || 'Failed to cancel license');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    licenses,
    isLoading,
    error,
    fetchLicenses,
    getLicenseById,
    getProjectLicenses,
    getSampleLicenses,
    createLicense,
    updateLicense,
    completeLicensePayment,
    cancelLicense,
  };

  return <LicenseContext.Provider value={value}>{children}</LicenseContext.Provider>;
};

/**
 * Hook for using license context
 * @returns {Object} - License context
 */
export const useLicenses = () => {
  const context = useContext(LicenseContext);
  
  if (!context) {
    throw new Error('useLicenses must be used within a LicenseProvider');
  }
  
  return context;
};

export default LicenseContext;

