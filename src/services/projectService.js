import api from './api';
import { Project } from '../models';

/**
 * Project service
 * Handles project management and operations
 */
const projectService = {
  /**
   * Get all projects for user
   * @returns {Promise<Array<Project>>} - List of projects
   */
  getUserProjects: async () => {
    try {
      const response = await api.get('/projects');
      
      // Convert to Project instances
      return response.map(project => new Project(project));
    } catch (error) {
      console.error('Get user projects error:', error);
      throw error;
    }
  },

  /**
   * Get project by ID
   * @param {string} projectId - Project ID
   * @returns {Promise<Project>} - Project instance
   */
  getProjectById: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}`);
      
      // Return Project instance
      return new Project(response);
    } catch (error) {
      console.error('Get project by ID error:', error);
      throw error;
    }
  },

  /**
   * Create new project
   * @param {Object} projectData - Project data
   * @param {File} audioFile - Audio file (optional)
   * @param {File} coverArtFile - Cover art file (optional)
   * @returns {Promise<Project>} - Created project
   */
  createProject: async (projectData, audioFile = null, coverArtFile = null) => {
    try {
      // Create project
      const response = await api.post('/projects', projectData);
      
      const projectId = response.projectId;

      // Upload audio file if provided
      if (audioFile) {
        await api.uploadFile(`/projects/${projectId}/audio`, audioFile);
      }

      // Upload cover art if provided
      if (coverArtFile) {
        await api.uploadFile(`/projects/${projectId}/cover`, coverArtFile);
      }

      // Return Project instance
      return new Project(response);
    } catch (error) {
      console.error('Create project error:', error);
      throw error;
    }
  },

  /**
   * Update project
   * @param {string} projectId - Project ID
   * @param {Object} projectData - Updated project data
   * @returns {Promise<Project>} - Updated project
   */
  updateProject: async (projectId, projectData) => {
    try {
      const response = await api.put(`/projects/${projectId}`, projectData);
      
      // Return Project instance
      return new Project(response);
    } catch (error) {
      console.error('Update project error:', error);
      throw error;
    }
  },

  /**
   * Delete project
   * @param {string} projectId - Project ID
   * @returns {Promise<boolean>} - Deletion result
   */
  deleteProject: async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);
      return true;
    } catch (error) {
      console.error('Delete project error:', error);
      throw error;
    }
  },

  /**
   * Add collaborator to project
   * @param {string} projectId - Project ID
   * @param {Object} collaborator - Collaborator data
   * @returns {Promise<Project>} - Updated project
   */
  addCollaborator: async (projectId, collaborator) => {
    try {
      const response = await api.post(`/projects/${projectId}/collaborators`, collaborator);
      
      // Return Project instance
      return new Project(response);
    } catch (error) {
      console.error('Add collaborator error:', error);
      throw error;
    }
  },

  /**
   * Update collaborator split
   * @param {string} projectId - Project ID
   * @param {string} collaboratorId - Collaborator user ID
   * @param {number} split - New split percentage
   * @returns {Promise<Project>} - Updated project
   */
  updateCollaboratorSplit: async (projectId, collaboratorId, split) => {
    try {
      const response = await api.put(`/projects/${projectId}/collaborators/${collaboratorId}`, {
        split,
      });
      
      // Return Project instance
      return new Project(response);
    } catch (error) {
      console.error('Update collaborator split error:', error);
      throw error;
    }
  },

  /**
   * Remove collaborator from project
   * @param {string} projectId - Project ID
   * @param {string} collaboratorId - Collaborator user ID
   * @returns {Promise<Project>} - Updated project
   */
  removeCollaborator: async (projectId, collaboratorId) => {
    try {
      const response = await api.delete(`/projects/${projectId}/collaborators/${collaboratorId}`);
      
      // Return Project instance
      return new Project(response);
    } catch (error) {
      console.error('Remove collaborator error:', error);
      throw error;
    }
  },

  /**
   * Add sample to project
   * @param {string} projectId - Project ID
   * @param {Object} sample - Sample data
   * @returns {Promise<Project>} - Updated project
   */
  addSample: async (projectId, sample) => {
    try {
      const response = await api.post(`/projects/${projectId}/samples`, sample);
      
      // Return Project instance
      return new Project(response);
    } catch (error) {
      console.error('Add sample error:', error);
      throw error;
    }
  },

  /**
   * Remove sample from project
   * @param {string} projectId - Project ID
   * @param {string} sampleId - Sample ID
   * @returns {Promise<Project>} - Updated project
   */
  removeSample: async (projectId, sampleId) => {
    try {
      const response = await api.delete(`/projects/${projectId}/samples/${sampleId}`);
      
      // Return Project instance
      return new Project(response);
    } catch (error) {
      console.error('Remove sample error:', error);
      throw error;
    }
  },

  /**
   * Get project earnings
   * @param {string} projectId - Project ID
   * @param {Object} params - Query parameters (e.g., timeframe)
   * @returns {Promise<Object>} - Earnings data
   */
  getProjectEarnings: async (projectId, params = {}) => {
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });

      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await api.get(`/projects/${projectId}/earnings${query}`);
      
      return response;
    } catch (error) {
      console.error('Get project earnings error:', error);
      throw error;
    }
  },
};

export default projectService;

