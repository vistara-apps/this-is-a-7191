import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import Button from './Button';

const Header = ({ user, onSearch }) => {
  return (
    <header className="bg-surface border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SS</span>
            </div>
            <h1 className="text-xl font-bold text-text-primary">SampleSync</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={16} />
            <input
              type="text"
              placeholder="Search samples..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
          </div>
          
          <Button variant="icon">
            <Bell size={20} />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-sm font-medium text-text-primary">
              {user?.email || 'Demo User'}
            </span>
            <span className="text-xs px-2 py-1 bg-accent text-white rounded-full">
              Pro
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;