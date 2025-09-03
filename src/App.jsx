import React, { useState } from 'react';
import { Home, Music, Shield, Briefcase, DollarSign, Menu, X } from 'lucide-react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SampleMarketplace from './components/SampleMarketplace';
import SampleVerification from './components/SampleVerification';
import ConciergeService from './components/ConciergeService';
import RightsManagement from './components/RightsManagement';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user] = useState({
    email: 'demo@samplesync.com',
    subscriptionTier: 'pro'
  });

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'marketplace', name: 'Sample Marketplace', icon: Music },
    { id: 'verification', name: 'Sample Verification', icon: Shield },
    { id: 'concierge', name: 'Concierge Service', icon: Briefcase },
    { id: 'rights', name: 'Rights Management', icon: DollarSign },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'marketplace':
        return <SampleMarketplace />;
      case 'verification':
        return <SampleVerification />;
      case 'concierge':
        return <ConciergeService />;
      case 'rights':
        return <RightsManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SS</span>
            </div>
            <h1 className="text-xl font-bold text-text-primary">SampleSync</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded-md"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-accent text-white'
                        : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Subscription Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Pro Plan</p>
                <p className="text-xs opacity-90">Unlimited access</p>
              </div>
              <div className="text-2xl">🎵</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <Header user={user} />

        {/* Mobile menu button */}
        <div className="lg:hidden p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Page content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;