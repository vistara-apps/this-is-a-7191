import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Input component
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Input component
 */
const Input = forwardRef(({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  // Base input styles
  const baseInputStyles = 'block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent';
  
  // Input state styles
  const getInputStateStyles = () => {
    if (error) {
      return 'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500';
    }
    if (disabled) {
      return 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed';
    }
    return 'border-gray-300 text-text-primary placeholder-gray-400';
  };

  // Width styles
  const getWidthStyles = () => {
    return fullWidth ? 'w-full' : '';
  };

  return (
    <div className={`${getWidthStyles()} ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-text-primary mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={`${baseInputStyles} ${getInputStateStyles()}`}
          {...props}
        />
        
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-text-secondary'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

