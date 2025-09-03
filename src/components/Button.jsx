import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-lg';
  
  const variants = {
    primary: 'bg-accent text-white hover:bg-blue-600 disabled:bg-gray-300',
    secondary: 'bg-gray-100 text-primary hover:bg-gray-200 disabled:bg-gray-100',
    icon: 'bg-transparent text-text-secondary hover:bg-gray-100 p-2'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;