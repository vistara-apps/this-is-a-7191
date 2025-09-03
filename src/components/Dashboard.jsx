import React, { useState } from 'react';
import { Music, Shield, Briefcase, DollarSign, TrendingUp, Users } from 'lucide-react';

const Dashboard = () => {
  const [stats] = useState({
    totalLicenses: 24,
    activeProjects: 8,
    monthlyRevenue: 1250,
    samplesCleared: 156,
    recentActivity: [
      { id: 1, type: 'license', title: 'Licensed "Funk Break 01"', time: '2h ago' },
      { id: 2, type: 'verification', title: 'Track scan completed', time: '4h ago' },
      { id: 3, type: 'royalty', title: 'Royalty payment received', time: '1d ago' },
    ]
  });

  const StatCard = ({ icon: Icon, title, value, trend, color = 'accent' }) => (
    <div className="bg-surface rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color} bg-opacity-10`}>
          <Icon className={`h-6 w-6 text-${color}`} />
        </div>
        {trend && (
          <div className="flex items-center text-green-600 text-sm">
            <TrendingUp size={14} className="mr-1" />
            +{trend}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-text-primary mb-1">{value}</h3>
      <p className="text-text-secondary text-sm">{title}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Music}
          title="Total Licenses"
          value={stats.totalLicenses}
          trend={12}
          color="accent"
        />
        <StatCard
          icon={Shield}
          title="Active Projects"
          value={stats.activeProjects}
          trend={8}
          color="green-500"
        />
        <StatCard
          icon={DollarSign}
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue}`}
          trend={15}
          color="purple-500"
        />
        <StatCard
          icon={Briefcase}
          title="Samples Cleared"
          value={stats.samplesCleared}
          color="orange-500"
        />
      </div>

      {/* Activity Feed */}
      <div className="bg-surface rounded-lg shadow-card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {stats.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-text-primary">{activity.title}</span>
              </div>
              <span className="text-text-secondary text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-lg shadow-card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:border-accent cursor-pointer transition-colors">
            <Music className="h-6 w-6 text-accent mb-2" />
            <h3 className="font-medium text-text-primary">Browse Samples</h3>
            <p className="text-sm text-text-secondary">Find pre-cleared samples</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:border-accent cursor-pointer transition-colors">
            <Shield className="h-6 w-6 text-accent mb-2" />
            <h3 className="font-medium text-text-primary">Verify Track</h3>
            <p className="text-sm text-text-secondary">Scan for uncleared samples</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:border-accent cursor-pointer transition-colors">
            <Users className="h-6 w-6 text-accent mb-2" />
            <h3 className="font-medium text-text-primary">Request Concierge</h3>
            <p className="text-sm text-text-secondary">Get help with licensing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;