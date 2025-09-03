import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Music, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';

/**
 * Login page component
 * @returns {JSX.Element} - Login page
 */
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Get redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

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
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      
      await login(formData.email, formData.password);
      
      // Redirect to the page user was trying to access or dashboard
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific error cases
      if (error.message === 'Invalid credentials') {
        setErrors({
          password: 'Invalid email or password',
        });
      } else {
        setErrors({
          form: 'An error occurred. Please try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center w-full max-w-md p-6 mx-auto lg:w-1/2">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Music size={24} className="text-white" />
            </div>
            <h1 className="ml-2 text-2xl font-bold text-text-primary">SampleSync</h1>
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Welcome back</h2>
          <p className="text-text-secondary">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.form && (
            <div className="p-3 text-sm text-red-600 bg-red-100 rounded-lg">
              {errors.form}
            </div>
          )}
          
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            error={errors.email}
            required
            fullWidth
          />
          
          <div>
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
              required
              fullWidth
            />
            <div className="flex justify-end mt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-accent hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          
          <Button
            type="submit"
            fullWidth
            loading={isLoading}
            className="flex items-center justify-center"
          >
            <LogIn size={18} className="mr-2" />
            Sign In
          </Button>
        </form>
        
        <p className="mt-8 text-center text-text-secondary">
          Don't have an account?{' '}
          <Link to="/register" className="text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      
      {/* Right side - Image (visible on large screens) */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-r from-accent to-primary">
        <div className="flex flex-col items-center justify-center h-full p-12 text-white">
          <h2 className="mb-4 text-3xl font-bold">Clear, license, and monetize your sampled music</h2>
          <p className="mb-8 text-lg text-center">
            SampleSync helps you navigate the complex world of sample clearance and rights management.
          </p>
          <div className="grid grid-cols-2 gap-6 max-w-md">
            <div className="p-4 bg-white bg-opacity-10 rounded-lg">
              <h3 className="mb-2 text-lg font-medium">Sample Marketplace</h3>
              <p className="text-sm">Browse and license pre-cleared samples instantly.</p>
            </div>
            <div className="p-4 bg-white bg-opacity-10 rounded-lg">
              <h3 className="mb-2 text-lg font-medium">Sample Verification</h3>
              <p className="text-sm">Scan your tracks for uncleared samples before distribution.</p>
            </div>
            <div className="p-4 bg-white bg-opacity-10 rounded-lg">
              <h3 className="mb-2 text-lg font-medium">Concierge Service</h3>
              <p className="text-sm">Get expert help with sample clearance and licensing.</p>
            </div>
            <div className="p-4 bg-white bg-opacity-10 rounded-lg">
              <h3 className="mb-2 text-lg font-medium">Rights Management</h3>
              <p className="text-sm">Manage project rights, collaborators, and royalty splits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

