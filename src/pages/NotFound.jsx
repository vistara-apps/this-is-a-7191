import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/Button';

/**
 * NotFound page component
 * @returns {JSX.Element} - NotFound page
 */
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-bg">
      <div className="w-full max-w-md text-center">
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Page Not Found</h2>
        <p className="text-text-secondary mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button className="flex items-center justify-center mx-auto">
            <Home size={18} className="mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

