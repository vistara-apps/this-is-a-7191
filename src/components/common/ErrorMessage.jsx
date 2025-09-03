import React, { useState } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from '../Button';

/**
 * ErrorMessage component
 * Displays error information with optional details
 * @param {Object} props - Component props
 * @returns {JSX.Element} - ErrorMessage component
 */
const ErrorMessage = ({
  title = 'Error',
  message = 'An error occurred.',
  error = null,
  errorInfo = null,
  onReset = null,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  /**
   * Toggle error details visibility
   */
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-bg">
      <div className="w-full max-w-md bg-surface rounded-lg shadow-card p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle size={24} className="text-red-600" />
          </div>
          <h2 className="ml-3 text-xl font-bold text-text-primary">{title}</h2>
        </div>
        
        <p className="text-text-secondary mb-6">{message}</p>
        
        <div className="space-y-4">
          {(error || errorInfo) && (
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleDetails}
              fullWidth
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          )}
          
          {showDetails && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto max-h-60">
              {error && (
                <div className="mb-2">
                  <p className="font-medium text-text-primary">Error:</p>
                  <pre className="text-sm text-red-600 whitespace-pre-wrap">
                    {error.toString()}
                  </pre>
                </div>
              )}
              
              {errorInfo && (
                <div>
                  <p className="font-medium text-text-primary">Component Stack:</p>
                  <pre className="text-sm text-text-secondary whitespace-pre-wrap">
                    {errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>
          )}
          
          {onReset && (
            <Button
              onClick={onReset}
              fullWidth
              className="flex items-center justify-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;

