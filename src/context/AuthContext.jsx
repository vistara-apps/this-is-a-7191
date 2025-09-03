import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../models';

// Create context
const AuthContext = createContext();

/**
 * AuthProvider component for managing authentication state
 * @param {Object} props - Component props
 * @returns {JSX.Element} - AuthProvider component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check for token in localStorage
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        // TODO: Replace with actual API call to validate token and get user data
        // For now, we'll use mock data
        const mockUserData = {
          userId: 'user123',
          email: 'demo@samplesync.com',
          firstName: 'Demo',
          lastName: 'User',
          subscriptionTier: 'pro',
          subscriptionStatus: 'active',
          isEmailVerified: true,
        };

        const userData = mockUserData;
        const userInstance = new User(userData);
        
        setUser(userInstance);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Authentication error:', err);
        setError(err.message || 'Authentication failed');
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<void>} - Login result
   */
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, we'll use mock data
      if (email === 'demo@samplesync.com' && password === 'password') {
        const mockUserData = {
          userId: 'user123',
          email: 'demo@samplesync.com',
          firstName: 'Demo',
          lastName: 'User',
          subscriptionTier: 'pro',
          subscriptionStatus: 'active',
          isEmailVerified: true,
        };

        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('authToken', mockToken);
        
        const userInstance = new User(mockUserData);
        setUser(userInstance);
        setIsAuthenticated(true);
        
        return userInstance;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<void>} - Registration result
   */
  const register = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, we'll use mock data
      const mockUserData = {
        userId: 'user123',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        subscriptionTier: 'free',
        subscriptionStatus: 'inactive',
        isEmailVerified: false,
      };

      const mockToken = 'mock-jwt-token';
      
      localStorage.setItem('authToken', mockToken);
      
      const userInstance = new User(mockUserData);
      setUser(userInstance);
      setIsAuthenticated(true);
      
      return userInstance;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user
   * @returns {void}
   */
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  /**
   * Update user profile
   * @param {Object} userData - Updated user data
   * @returns {Promise<User>} - Updated user
   */
  const updateProfile = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, we'll update the local user state
      const updatedUserData = { ...user.toObject(), ...userData };
      const userInstance = new User(updatedUserData);
      
      setUser(userInstance);
      
      return userInstance;
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'Profile update failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Check if user has a specific permission
   * @param {string} permission - Permission to check
   * @returns {boolean} - Whether user has the permission
   */
  const hasPermission = (permission) => {
    if (!isAuthenticated || !user) {
      return false;
    }

    // Define permissions based on subscription tier
    const tierPermissions = {
      free: ['view_marketplace', 'view_verification'],
      basic: [
        'view_marketplace', 
        'view_verification', 
        'use_verification', 
        'license_samples'
      ],
      pro: [
        'view_marketplace', 
        'view_verification', 
        'use_verification', 
        'license_samples', 
        'use_concierge', 
        'manage_rights'
      ],
      enterprise: [
        'view_marketplace', 
        'view_verification', 
        'use_verification', 
        'license_samples', 
        'use_concierge', 
        'manage_rights',
        'bulk_verification',
        'priority_support'
      ],
    };

    const userTier = user.subscriptionTier || 'free';
    const userPermissions = tierPermissions[userTier] || [];

    return userPermissions.includes(permission);
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook for using auth context
 * @returns {Object} - Auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;

