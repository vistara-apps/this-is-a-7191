import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Music, Send, ArrowLeft } from 'lucide-react';
import { authService } from '../../services';
import Button from '../../components/Button';
import Input from '../../components/Input';

/**
 * ForgotPassword page component
 * @returns {JSX.Element} - ForgotPassword page
 */
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Handle input change
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  /**
   * Validate form
   * @returns {boolean} - Validation result
   */
  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    
    return true;
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
      
      // Request password reset
      await authService.requestPasswordReset(email);
      
      // Show success message
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset request error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
          <h2 className="text-2xl font-bold text-text-primary">Forgot Password</h2>
          <p className="text-text-secondary">
            Enter your email to reset your password
          </p>
        </div>
        
        {isSubmitted ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={24} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              Check your email
            </h3>
            <p className="text-text-secondary mb-6">
              We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
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
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              error={error}
              required
              fullWidth
            />
            
            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              className="flex items-center justify-center"
            >
              <Send size={18} className="mr-2" />
              Send Reset Link
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

export default ForgotPassword;

