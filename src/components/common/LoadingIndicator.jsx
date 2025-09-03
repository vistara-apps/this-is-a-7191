import React from 'react';

/**
 * LoadingIndicator component
 * Displays a loading spinner
 * @param {Object} props - Component props
 * @returns {JSX.Element} - LoadingIndicator component
 */
const LoadingIndicator = ({
  size = 'md',
  color = 'accent',
  className = '',
}) => {
  // Size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4 border-2';
      case 'lg':
        return 'w-10 h-10 border-4';
      case 'xl':
        return 'w-12 h-12 border-4';
      case 'md':
      default:
        return 'w-6 h-6 border-2';
    }
  };

  // Color styles
  const getColorStyles = () => {
    switch (color) {
      case 'white':
        return 'border-white border-t-transparent';
      case 'primary':
        return 'border-primary border-t-transparent';
      case 'accent':
      default:
        return 'border-accent border-t-transparent';
    }
  };

  return (
    <div className={`${className}`}>
      <div
        className={`${getSizeStyles()} ${getColorStyles()} rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingIndicator;

