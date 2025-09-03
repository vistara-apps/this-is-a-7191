import React from 'react';
import { Loader } from 'lucide-react';

/**
 * Button component
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Button component
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  // Base button styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent';

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-white text-text-primary border border-gray-300 hover:bg-gray-50 focus:ring-gray-500';
      case 'outline':
        return 'bg-transparent text-accent border border-accent hover:bg-accent hover:bg-opacity-10 focus:ring-accent';
      case 'ghost':
        return 'bg-transparent text-text-primary hover:bg-gray-100 focus:ring-gray-500';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      case 'success':
        return 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500';
      case 'icon':
        return 'bg-transparent text-text-primary hover:bg-gray-100 focus:ring-gray-500 p-2 rounded-full';
      case 'primary':
      default:
        return 'bg-accent text-white hover:bg-accent-dark focus:ring-accent';
    }
  };

  // Size styles
  const getSizeStyles = () => {
    if (variant === 'icon') {
      switch (size) {
        case 'sm':
          return 'p-1';
        case 'lg':
          return 'p-3';
        case 'md':
        default:
          return 'p-2';
      }
    }

    switch (size) {
      case 'xs':
        return 'text-xs px-2 py-1';
      case 'sm':
        return 'text-sm px-3 py-1.5';
      case 'lg':
        return 'text-base px-6 py-3';
      case 'xl':
        return 'text-lg px-8 py-4';
      case 'md':
      default:
        return 'text-sm px-4 py-2';
    }
  };

  // Width styles
  const getWidthStyles = () => {
    return fullWidth ? 'w-full' : '';
  };

  // Disabled styles
  const getDisabledStyles = () => {
    return disabled || loading ? 'opacity-50 cursor-not-allowed' : '';
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${getVariantStyles()} ${getSizeStyles()} ${getWidthStyles()} ${getDisabledStyles()} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <Loader size={16} className="animate-spin mr-2" />
      )}
      {children}
    </button>
  );
};

export default Button;

