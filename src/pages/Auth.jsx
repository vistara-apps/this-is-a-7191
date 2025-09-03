import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

/**
 * Auth page component
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Auth page
 */
const Auth = ({ mode = 'login' }) => {
  const navigate = useNavigate();
  const { login, register, isLoading, error } = useAuth();
  const [formMode, setFormMode] = useState(mode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [formError, setFormError] = useState('');

  /**
   * Handle form input change
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Handle form submission
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    try {
      if (formMode === 'login') {
        await login(formData.email, formData.password);
        navigate('/dashboard');
      } else {
        await register(formData);
        navigate('/dashboard');
      }
    } catch (err) {
      setFormError(err.message || 'Authentication failed');
    }
  };

  /**
   * Toggle between login and register forms
   */
  const toggleMode = () => {
    setFormMode(prev => prev === 'login' ? 'register' : 'login');
    setFormError('');
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl shadow-card max-w-md w-full p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">SS</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary ml-3">SampleSync</h1>
        </div>

        <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
          {formMode === 'login' ? 'Sign In' : 'Create Account'}
        </h2>

        {(formError || error) && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {formError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {formMode === 'register' && (
            <>
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </>
          )}

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading
              ? 'Processing...'
              : formMode === 'login'
                ? 'Sign In'
                : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-accent hover:underline"
          >
            {formMode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

