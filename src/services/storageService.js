/**
 * Storage service for file management
 * This service integrates with cloud storage APIs for file upload, download, and management
 */

import api from './api';
import { validateFile } from '../utils/apiUtils';

// Storage API endpoints
const ENDPOINTS = {
  UPLOAD: '/storage/upload',
  DOWNLOAD: '/storage/download',
  FILES: '/storage/files',
  PRESIGNED_URL: '/storage/presigned-url',
};

/**
 * Storage service for file management
 */
const storageService = {
  /**
   * Upload a file to storage
   * @param {File} file - File to upload
   * @param {Object} options - Upload options
   * @param {string} options.folder - Folder path
   * @param {string} options.visibility - File visibility (public, private)
   * @param {Object} options.metadata - File metadata
   * @param {Array} options.allowedTypes - Allowed file types
   * @param {number} options.maxSize - Maximum file size in bytes
   * @returns {Promise<Object>} - Uploaded file information
   */
  uploadFile: async (file, options = {}) => {
    const {
      folder = '',
      visibility = 'private',
      metadata = {},
      allowedTypes = [],
      maxSize = 0,
    } = options;
    
    // Validate file if options provided
    if (allowedTypes.length > 0 || maxSize > 0) {
      const validation = validateFile(file, { allowedTypes, maxSize });
      if (!validation.valid) {
        throw new Error(validation.errors.join('. '));
      }
    }
    
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('visibility', visibility);
    
    // Add metadata
    if (Object.keys(metadata).length > 0) {
      formData.append('metadata', JSON.stringify(metadata));
    }
    
    // Make API request
    return api.post(ENDPOINTS.UPLOAD, formData, {}, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  /**
   * Get a presigned URL for direct upload
   * @param {Object} options - Presigned URL options
   * @param {string} options.fileName - File name
   * @param {string} options.fileType - File MIME type
   * @param {string} options.folder - Folder path
   * @param {string} options.visibility - File visibility (public, private)
   * @param {Object} options.metadata - File metadata
   * @returns {Promise<Object>} - Presigned URL information
   */
  getPresignedUploadUrl: async (options = {}) => {
    const {
      fileName,
      fileType,
      folder = '',
      visibility = 'private',
      metadata = {},
    } = options;
    
    if (!fileName || !fileType) {
      throw new Error('File name and type are required');
    }
    
    return api.post(ENDPOINTS.PRESIGNED_URL, {
      fileName,
      fileType,
      folder,
      visibility,
      metadata,
      operation: 'upload',
    });
  },
  
  /**
   * Upload a file directly to a presigned URL
   * @param {string} presignedUrl - Presigned URL
   * @param {File} file - File to upload
   * @param {Object} fields - Additional fields for the upload
   * @returns {Promise<Response>} - Upload response
   */
  uploadToPresignedUrl: async (presignedUrl, file, fields = {}) => {
    const formData = new FormData();
    
    // Add additional fields
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    // Add file last
    formData.append('file', file);
    
    // Upload directly to the presigned URL
    return fetch(presignedUrl, {
      method: 'POST',
      body: formData,
    });
  },
  
  /**
   * Get a file download URL
   * @param {string} fileId - File ID
   * @param {Object} options - Download options
   * @param {number} options.expiresIn - URL expiration time in seconds
   * @returns {Promise<Object>} - Download URL information
   */
  getDownloadUrl: async (fileId, options = {}) => {
    const { expiresIn = 3600 } = options;
    
    return api.get(`${ENDPOINTS.DOWNLOAD}/${fileId}`, { expiresIn });
  },
  
  /**
   * List files in a folder
   * @param {Object} options - List options
   * @param {string} options.folder - Folder path
   * @param {number} options.limit - Maximum number of files to return
   * @param {string} options.nextToken - Pagination token
   * @returns {Promise<Object>} - File list
   */
  listFiles: async (options = {}) => {
    const {
      folder = '',
      limit = 100,
      nextToken,
    } = options;
    
    return api.get(ENDPOINTS.FILES, {
      folder,
      limit,
      nextToken,
    });
  },
  
  /**
   * Delete a file
   * @param {string} fileId - File ID
   * @returns {Promise<Object>} - Deletion result
   */
  deleteFile: async (fileId) => {
    return api.delete(`${ENDPOINTS.FILES}/${fileId}`);
  },
  
  /**
   * Get file metadata
   * @param {string} fileId - File ID
   * @returns {Promise<Object>} - File metadata
   */
  getFileMetadata: async (fileId) => {
    return api.get(`${ENDPOINTS.FILES}/${fileId}/metadata`);
  },
  
  /**
   * Update file metadata
   * @param {string} fileId - File ID
   * @param {Object} metadata - New metadata
   * @returns {Promise<Object>} - Updated file metadata
   */
  updateFileMetadata: async (fileId, metadata) => {
    return api.patch(`${ENDPOINTS.FILES}/${fileId}/metadata`, { metadata });
  },
};

export default storageService;

