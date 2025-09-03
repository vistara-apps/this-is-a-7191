import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Music, 
  Shield, 
  Briefcase, 
  DollarSign, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button';

/**
 * AppLayout component
 * Main layout for authenticated pages
 * @returns {JSX.Element} - AppLayout component
 */
const AppLayout = () => {
  const { user, logout, hasPermission } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: Home,
      permission: null,
    },
    {
      path: '/marketplace',
      label: 'Marketplace',
      icon: Music,
      permission: 'view_marketplace',
    },
    {
      path: '/verification',
      label: 'Verification',
      icon: Shield,
      permission: 'view_verification',
    },
    {
      path: '/concierge',
      label: 'Concierge',
      icon: Briefcase,
      permission: 'use_concierge',
    },
    {
      path: '/rights',
      label: 'Rights',
      icon: DollarSign,
      permission: 'manage_rights',
    },
  ];

  // Filter nav items based on user permissions
  const filteredNavItems = navItems.filter(item => 
    !item.permission || hasPermission(item.permission)
  );

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  /**
   * Toggle mobile menu
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Close mobile menu
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-bg">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-64 flex-col bg-surface border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Music size={20} className="text-white" />
            </div>
            <h1 className="ml-2 text-xl font-bold text-text-primary">SampleSync</h1>
          </div>
        </div>
        
        <nav className="flex-1 px-4 pb-4">
          <ul className="space-y-1">
            {filteredNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-accent text-white' 
                      : 'text-text-secondary hover:bg-gray-100'}
                  `}
                >
                  <item.icon size={20} className="mr-3" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              {user?.firstName?.charAt(0) || 'U'}
            </div>
            <div className="ml-3">
              <p className="font-medium text-text-primary">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-text-secondary">
                {user?.subscriptionTier === 'free' ? 'Free Plan' : 'Pro Plan'}
              </p>
            </div>
          </div>
          
          <Button
            variant="secondary"
            fullWidth
            onClick={handleLogout}
            className="flex items-center justify-center"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-surface border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Music size={20} className="text-white" />
            </div>
            <h1 className="ml-2 text-xl font-bold text-text-primary">SampleSync</h1>
          </div>
          
          <div className="flex items-center">
            <button
              className="p-2 text-text-primary hover:bg-gray-100 rounded-full"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50" onClick={closeMobileMenu}>
          <div className="absolute top-0 right-0 bottom-0 w-64 bg-surface" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  {user?.firstName?.charAt(0) || 'U'}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-text-primary">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {user?.subscriptionTier === 'free' ? 'Free Plan' : 'Pro Plan'}
                  </p>
                </div>
              </div>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-1">
                {filteredNavItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center px-4 py-3 rounded-lg transition-colors
                        ${isActive 
                          ? 'bg-accent text-white' 
                          : 'text-text-secondary hover:bg-gray-100'}
                      `}
                      onClick={closeMobileMenu}
                    >
                      <item.icon size={20} className="mr-3" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="p-4 border-t border-gray-200">
              <Button
                variant="secondary"
                fullWidth
                onClick={handleLogout}
                className="flex items-center justify-center"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop header */}
        <header className="hidden md:flex items-center justify-between bg-surface border-b border-gray-200 p-4">
          <h2 className="text-xl font-bold text-text-primary">
            {filteredNavItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
          </h2>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-text-secondary hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
            <button className="p-2 text-text-secondary hover:bg-gray-100 rounded-full">
              <Settings size={20} />
            </button>
            <button className="p-2 text-text-secondary hover:bg-gray-100 rounded-full">
              <User size={20} />
            </button>
          </div>
        </header>
        
        {/* Page content */}
        <div className="flex-1 overflow-auto p-6 md:p-8 mt-16 md:mt-0">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;

