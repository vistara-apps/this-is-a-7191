import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { AuthProvider } from '../context/AuthContext';
import { SampleProvider } from '../context/SampleContext';
import { ProjectProvider } from '../context/ProjectContext';
import { LicenseProvider } from '../context/LicenseContext';

/**
 * Root component for the application routing
 * Sets up the router and context providers
 * @returns {JSX.Element} - Root component
 */
const Routes = () => {
  return (
    <Router>
      <AuthProvider>
        <SampleProvider>
          <ProjectProvider>
            <LicenseProvider>
              <AppRoutes />
            </LicenseProvider>
          </ProjectProvider>
        </SampleProvider>
      </AuthProvider>
    </Router>
  );
};

export default Routes;

