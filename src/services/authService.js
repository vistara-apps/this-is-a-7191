import api from './api';
import { User } from '../models';

/**
 * Authentication service
 * Handles user authentication and profile management
 */
const authService = {
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<User>} - Authenticated user
   */
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Store token in localStorage
      localStorage.setItem('authToken', response.token);
      
      // Return user instance
      return new User(response.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<User>} - Registered user
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      // Store token in localStorage
      localStorage.setItem('authToken', response.token);
      
      // Return user instance
      return new User(response.user);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  logout: async () => {
    try {
      // Call logout endpoint to invalidate token on server
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Remove token from localStorage
      localStorage.removeItem('authToken');
    }
  },

  /**
   * Get current user profile
   * @returns {Promise<User>} - Current user
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      
      // Return user instance
      return new User(response);
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  /**
   * Update user profile
   * @param {Object} userData - Updated user data
   * @returns {Promise<User>} - Updated user
   */
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      
      // Return user instance
      return new User(response);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  /**
   * Change password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<void>}
   */
  changePassword: async (currentPassword, newPassword) => {
    try {
      await api.put('/auth/password', {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<void>}
   */
  requestPasswordReset: async (email) => {
    try {
      await api.post('/auth/password/reset', { email });
    } catch (error) {
      console.error('Request password reset error:', error);
      throw error;
    }
  },

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} newPassword - New password
   * @returns {Promise<void>}
   */
  resetPassword: async (token, newPassword) => {
    try {
      await api.post('/auth/password/reset/confirm', {
        token,
        newPassword,
      });
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },
};

export default authService;

