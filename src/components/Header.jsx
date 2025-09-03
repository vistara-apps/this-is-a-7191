import React, { useState } from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import Button from './Button';

/**
 * Header component
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Header component
 */
const Header = ({ user, onSearch, onMenuClick }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New sample available', time: '2h ago' },
    { id: 2, message: 'License request approved', time: '1d ago' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  /**
   * Toggle notifications dropdown
   */
  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
  };

  return (
    <header className="bg-surface border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Button variant="icon" onClick={onMenuClick}>
            <Menu size={20} />
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SS</span>
            </div>
            <h1 className="text-xl font-bold text-text-primary">SampleSync</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={16} />
            <input
              type="text"
              placeholder="Search samples..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Button variant="icon" onClick={toggleNotifications}>
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </Button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-surface rounded-lg shadow-lg z-50 overflow-hidden">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-medium text-text-primary">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {notifications.map(notification => (
                        <div key={notification.id} className="p-3 hover:bg-gray-50">
                          <p className="text-sm text-text-primary">{notification.message}</p>
                          <p className="text-xs text-text-secondary mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 text-center text-text-secondary">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-2 border-t border-gray-200 text-center">
                  <button className="text-sm text-accent hover:underline">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="hidden sm:inline-block text-sm font-medium text-text-primary">
              {user?.email || 'Demo User'}
            </span>
            <span className="text-xs px-2 py-1 bg-accent text-white rounded-full">
              {user?.subscriptionTier?.charAt(0).toUpperCase() + user?.subscriptionTier?.slice(1) || 'Free'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

