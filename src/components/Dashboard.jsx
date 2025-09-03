import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Shield, Briefcase, DollarSign, ChevronRight, BarChart2, Users, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import { useSamples } from '../context/SampleContext';
import { DashboardStatsSkeleton } from './common/SkeletonLoader';
import Button from './Button';

/**
 * Dashboard component
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Dashboard component
 */
const Dashboard = ({ stats }) => {
  const { user, hasPermission } = useAuth();
  const { projects, isLoading: projectsLoading } = useProjects();
  const { marketplaceSamples, isLoading: samplesLoading } = useSamples();

  // Loading state
  if (projectsLoading || samplesLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
          <p className="text-text-secondary">Welcome back, {user?.firstName || 'User'}!</p>
        </div>
        
        <DashboardStatsSkeleton />
      </div>
    );
  }

  // Dashboard stats
  const dashboardStats = [
    {
      id: 'marketplace',
      title: 'Sample Marketplace',
      value: marketplaceSamples.length,
      label: 'Available Samples',
      icon: Music,
      color: 'bg-blue-500',
      path: '/marketplace',
      permission: 'view_marketplace',
    },
    {
      id: 'verification',
      title: 'Sample Verification',
      value: stats?.samplesCleared || 0,
      label: 'Samples Cleared',
      icon: Shield,
      color: 'bg-green-500',
      path: '/verification',
      permission: 'view_verification',
    },
    {
      id: 'concierge',
      title: 'Concierge Service',
      value: '24/7',
      label: 'Support Available',
      icon: Briefcase,
      color: 'bg-purple-500',
      path: '/concierge',
      permission: 'use_concierge',
    },
    {
      id: 'rights',
      title: 'Rights Management',
      value: `$${stats?.monthlyRevenue?.toFixed(2) || '0.00'}`,
      label: 'Monthly Revenue',
      icon: DollarSign,
      color: 'bg-amber-500',
      path: '/rights',
      permission: 'manage_rights',
    },
  ];

  // Filter stats based on user permissions
  const filteredStats = dashboardStats.filter(stat => 
    !stat.permission || hasPermission(stat.permission)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
        <p className="text-text-secondary">Welcome back, {user?.firstName || 'User'}!</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStats.map((stat) => (
          <div key={stat.id} className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <Link to={stat.path} className="text-accent hover:underline flex items-center">
                <span className="text-sm">View</span>
                <ChevronRight size={16} />
              </Link>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">{stat.value}</h3>
            <p className="text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>
      
      {/* Recent Projects */}
      <div className="bg-surface rounded-lg shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-primary">Recent Projects</h2>
          <Link to="/rights">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
        
        {projects.length > 0 ? (
          <div className="space-y-4">
            {projects.slice(0, 3).map((project) => (
              <div key={project.projectId} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium text-text-primary">{project.projectName}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'active' ? 'bg-green-100 text-green-800' :
                    project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-3">{project.trackTitle}</p>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center text-text-secondary">
                    <Clock size={14} className="mr-1" />
                    <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-text-secondary">
                    <Users size={14} className="mr-1" />
                    <span>{project.collaborators.length} collaborators</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-text-secondary mb-4">You don't have any projects yet.</p>
            <Button>Create Your First Project</Button>
          </div>
        )}
      </div>
      
      {/* Recent Activity */}
      <div className="bg-surface rounded-lg shadow-card p-6">
        <h2 className="text-xl font-bold text-text-primary mb-4">Recent Activity</h2>
        
        {stats?.recentActivity && stats.recentActivity.length > 0 ? (
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'project' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'license' ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {activity.type === 'project' ? (
                    <BarChart2 size={16} />
                  ) : activity.type === 'license' ? (
                    <Shield size={16} />
                  ) : (
                    <Clock size={16} />
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-text-primary">{activity.title}</p>
                  <p className="text-xs text-text-secondary">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-text-secondary">No recent activity to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

