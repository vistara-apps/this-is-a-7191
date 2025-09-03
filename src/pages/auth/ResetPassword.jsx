import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Music, Check, ArrowLeft } from 'lucide-react';
import { authService } from '../../services';
import Button from '../../components/Button';
import Input from '../../components/Input';

/**
 * ResetPassword page component
 * @returns {JSX.Element} - ResetPassword page
 */
const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);

  // Extract token from URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get('token');
    
    if (tokenParam) {
      setToken(tokenParam);
      
      // Validate token (in a real app, this would be an API call)
      // For now, we'll assume the token is valid
      setIsTokenValid(true);
    } else {
      setIsTokenValid(false);
    }
  }, [location]);

  /**
   * Handle input change
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Validate form
   * @returns {boolean} - Validation result
   */
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Reset password
      await authService.resetPassword(token, formData.password);
      
      // Show success message
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Password reset error:', error);
      
      // Handle specific error cases
      if (error.message === 'Invalid or expired token') {
        setIsTokenValid(false);
      } else {
        setErrors({
          form: 'An error occurred. Please try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // If token is invalid, show error message
  if (!isTokenValid) {
    return (
      <div className="flex min-h-screen bg-bg">
        <div className="flex flex-col justify-center w-full max-w-md p-6 mx-auto">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Music size={24} className="text-white" />
              </div>
              <h1 className="ml-2 text-2xl font-bold text-text-primary">SampleSync</h1>
            </div>
            <h2 className="text-2xl font-bold text-text-primary">Invalid Reset Link</h2>
            <p className="text-text-secondary">
              The password reset link is invalid or has expired.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-text-secondary mb-6">
              Please request a new password reset link.
            </p>
            <Link to="/forgot-password">
              <Button className="flex items-center justify-center mx-auto">
                Request New Link
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <div className="flex flex-col justify-center w-full max-w-md p-6 mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Music size={24} className="text-white" />
            </div>
            <h1 className="ml-2 text-2xl font-bold text-text-primary">SampleSync</h1>
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Reset Password</h2>
          <p className="text-text-secondary">
            Enter your new password
          </p>
        </div>
        
        {isSuccess ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={24} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              Password Reset Successful
            </h3>
            <p className="text-text-secondary mb-6">
              Your password has been reset successfully. You will be redirected to the login page.
            </p>
            <Link to="/login">
              <Button
                variant="secondary"
                className="flex items-center justify-center mx-auto"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back to Login
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.form && (
              <div className="p-3 text-sm text-red-600 bg-red-100 rounded-lg">
                {errors.form}
              </div>
            )}
            
            <Input
              label="New Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              helperText="Password must be at least 8 characters"
              error={errors.password}
              required
              fullWidth
            />
            
            <Input
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.confirmPassword}
              required
              fullWidth
            />
            
            <Button
              type="submit"
              fullWidth
              loading={isLoading}
            >
              Reset Password
            </Button>
            
            <div className="text-center">
              <Link to="/login" className="text-accent hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

