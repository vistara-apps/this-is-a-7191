/**
 * Audio Fingerprinting service for sample detection and verification
 * This service integrates with audio fingerprinting APIs to identify samples within tracks
 */

import api from './api';
import { validateFile, formatFileSize } from '../utils/apiUtils';

// Audio fingerprinting API endpoints
const ENDPOINTS = {
  ANALYZE: '/audio/analyze',
  IDENTIFY: '/audio/identify',
  VERIFY: '/audio/verify',
  RESULTS: '/audio/results',
};

// Allowed audio file types
const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/x-wav',
  'audio/flac',
  'audio/x-flac',
  'audio/aac',
  'audio/x-m4a',
];

// Maximum file size (50MB)
const MAX_FILE_SIZE = 50 * 1024 * 1024;

/**
 * Audio Fingerprinting service for sample detection and verification
 */
const audioFingerprinting = {
  /**
   * Validate audio file before upload
   * @param {File} file - Audio file to validate
   * @returns {Object} - Validation result
   */
  validateAudioFile: (file) => {
    return validateFile(file, {
      allowedTypes: ALLOWED_AUDIO_TYPES,
      maxSize: MAX_FILE_SIZE,
    });
  },
  
  /**
   * Upload and analyze an audio file to detect samples
   * @param {File} audioFile - Audio file to analyze
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} - Analysis job
   */
  analyzeAudio: async (audioFile, options = {}) => {
    // Validate file
    const validation = audioFingerprinting.validateAudioFile(audioFile);
    if (!validation.valid) {
      throw new Error(validation.errors.join('. '));
    }
    
    // Create form data
    const formData = new FormData();
    formData.append('file', audioFile);
    
    // Add options
    Object.entries(options).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    // Make API request
    return api.post(ENDPOINTS.ANALYZE, formData, {}, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  /**
   * Get analysis results
   * @param {string} jobId - Analysis job ID
   * @returns {Promise<Object>} - Analysis results
   */
  getAnalysisResults: async (jobId) => {
    return api.get(`${ENDPOINTS.RESULTS}/${jobId}`);
  },
  
  /**
   * Poll for analysis results until complete
   * @param {string} jobId - Analysis job ID
   * @param {number} interval - Polling interval in milliseconds
   * @param {number} timeout - Maximum polling time in milliseconds
   * @returns {Promise<Object>} - Analysis results
   */
  pollAnalysisResults: async (jobId, interval = 2000, timeout = 120000) => {
    const startTime = Date.now();
    
    const poll = async () => {
      // Check if timeout exceeded
      if (Date.now() - startTime > timeout) {
        throw new Error('Analysis timeout exceeded');
      }
      
      // Get current results
      const results = await audioFingerprinting.getAnalysisResults(jobId);
      
      // If analysis is complete, return results
      if (results.status === 'completed') {
        return results;
      }
      
      // If analysis failed, throw error
      if (results.status === 'failed') {
        throw new Error(results.error || 'Analysis failed');
      }
      
      // Wait for the specified interval
      await new Promise(resolve => setTimeout(resolve, interval));
      
      // Poll again
      return poll();
    };
    
    return poll();
  },
  
  /**
   * Identify a sample from an audio snippet
   * @param {File} audioFile - Audio snippet file
   * @returns {Promise<Object>} - Identification results
   */
  identifySample: async (audioFile) => {
    // Validate file
    const validation = audioFingerprinting.validateAudioFile(audioFile);
    if (!validation.valid) {
      throw new Error(validation.errors.join('. '));
    }
    
    // Create form data
    const formData = new FormData();
    formData.append('file', audioFile);
    
    // Make API request
    return api.post(ENDPOINTS.IDENTIFY, formData, {}, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  /**
   * Verify if a track contains specific samples
   * @param {File} audioFile - Audio file to verify
   * @param {Array} sampleIds - IDs of samples to check for
   * @returns {Promise<Object>} - Verification results
   */
  verifySamples: async (audioFile, sampleIds) => {
    // Validate file
    const validation = audioFingerprinting.validateAudioFile(audioFile);
    if (!validation.valid) {
      throw new Error(validation.errors.join('. '));
    }
    
    // Create form data
    const formData = new FormData();
    formData.append('file', audioFile);
    
    // Add sample IDs
    if (Array.isArray(sampleIds) && sampleIds.length > 0) {
      sampleIds.forEach((id, index) => {
        formData.append(`sampleIds[${index}]`, id);
      });
    }
    
    // Make API request
    return api.post(ENDPOINTS.VERIFY, formData, {}, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  /**
   * Get supported audio formats
   * @returns {Array} - List of supported audio formats
   */
  getSupportedFormats: () => {
    return ALLOWED_AUDIO_TYPES.map(type => type.replace('audio/', '').toUpperCase());
  },
  
  /**
   * Get maximum file size
   * @returns {string} - Formatted maximum file size
   */
  getMaxFileSize: () => {
    return formatFileSize(MAX_FILE_SIZE);
  },
};

export default audioFingerprinting;

