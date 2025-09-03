import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';

/**
 * Register page component
 * @returns {JSX.Element} - Register page
 */
const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
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
      
      // Register user
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle specific error cases
      if (error.message === 'Email already in use') {
        setErrors({
          email: 'This email is already registered',
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
          <h2 className="text-2xl font-bold text-text-primary">Create an account</h2>
          <p className="text-text-secondary">Join SampleSync to manage your samples</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.form && (
            <div className="p-3 text-sm text-red-600 bg-red-100 rounded-lg">
              {errors.form}
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              error={errors.firstName}
              required
              fullWidth
            />
            
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              error={errors.lastName}
              required
              fullWidth
            />
          </div>
          
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
          
          <Input
            label="Password"
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
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.confirmPassword}
            required
            fullWidth
          />
          
          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-text-secondary">
              I agree to the{' '}
              <a href="#" className="text-accent hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-accent hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>
          
          <Button
            type="submit"
            fullWidth
            loading={isLoading}
            className="flex items-center justify-center"
          >
            <UserPlus size={18} className="mr-2" />
            Create Account
          </Button>
        </form>
        
        <p className="mt-8 text-center text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">
            Sign in
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

export default Register;

