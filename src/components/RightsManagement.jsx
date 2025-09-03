import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Calendar, Download } from 'lucide-react';
import Button from './Button';

const RightsManagement = () => {
  const [projects] = useState([
    {
      id: 1,
      title: "Summer Vibes Remix",
      status: "active",
      releaseDate: "2024-01-15",
      totalEarnings: 2450.75,
      monthlyEarnings: 325.50,
      platforms: ["Spotify", "Apple Music", "YouTube"],
      collaborators: [
        { name: "Producer X", split: 40 },
        { name: "Original Artist", split: 35 },
        { name: "You", split: 25 }
      ],
      samples: [
        { title: "Jazz Piano Loop", clearanceStatus: "cleared", royaltySplit: 15 }
      ]
    },
    {
      id: 2,
      title: "Hip Hop Freestyle",
      status: "pending",
      releaseDate: "2024-02-01",
      totalEarnings: 0,
      monthlyEarnings: 0,
      platforms: ["Pending distribution"],
      collaborators: [
        { name: "MC Flow", split: 50 },
        { name: "You", split: 50 }
      ],
      samples: [
        { title: "Amen Break", clearanceStatus: "pending", royaltySplit: 20 }
      ]
    },
    {
      id: 3,
      title: "Electronic Dance Track",
      status: "active",
      releaseDate: "2023-12-10",
      totalEarnings: 5672.25,
      monthlyEarnings: 892.10,
      platforms: ["Spotify", "Beatport", "SoundCloud"],
      collaborators: [
        { name: "DJ Synth", split: 30 },
        { name: "Vocalist", split: 20 },
        { name: "You", split: 50 }
      ],
      samples: []
    }
  ]);

  const [selectedProject, setSelectedProject] = useState(projects[0]);

  const totalEarnings = projects.reduce((sum, project) => sum + project.totalEarnings, 0);
  const monthlyEarnings = projects.reduce((sum, project) => sum + project.monthlyEarnings, 0);
  const activeProjects = projects.filter(p => p.status === 'active').length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Rights Management</h1>
        <p className="text-text-secondary">Track your remix rights and manage royalty collections</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-accent bg-opacity-10">
              <DollarSign className="h-6 w-6 text-accent" />
            </div>
            <div className="flex items-center text-green-600 text-sm">
              <TrendingUp size={14} className="mr-1" />
              +12%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-1">${totalEarnings.toFixed(2)}</h3>
          <p className="text-text-secondary text-sm">Total Earnings</p>
        </div>

        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500 bg-opacity-10">
              <Calendar className="h-6 w-6 text-green-500" />
            </div>
            <div className="flex items-center text-green-600 text-sm">
              <TrendingUp size={14} className="mr-1" />
              +8%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-1">${monthlyEarnings.toFixed(2)}</h3>
          <p className="text-text-secondary text-sm">This Month</p>
        </div>

        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-500 bg-opacity-10">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-1">{activeProjects}</h3>
          <p className="text-text-secondary text-sm">Active Projects</p>
        </div>

        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-orange-500 bg-opacity-10">
              <TrendingUp className="h-6 w-6 text-orange-500" />
            </div>
            <div className="flex items-center text-green-600 text-sm">
              <TrendingUp size={14} className="mr-1" />
              +15%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-1">23.5K</h3>
          <p className="text-text-secondary text-sm">Monthly Streams</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project List */}
        <div className="bg-surface rounded-lg shadow-card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Your Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedProject.id === project.id 
                    ? 'border-accent bg-blue-50' 
                    : 'border-gray-200 hover:border-accent'
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-text-primary">{project.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Released: {new Date(project.releaseDate).toLocaleDateString()}</span>
                  <span className="font-semibold text-accent">${project.totalEarnings.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">{selectedProject.title}</h2>
            <Button variant="secondary" size="sm">
              <Download size={14} className="mr-1" />
              Export
            </Button>
          </div>

          {/* Earnings */}
          <div className="mb-6">
            <h3 className="font-medium text-text-primary mb-3">Earnings Breakdown</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-accent">${selectedProject.totalEarnings.toFixed(2)}</div>
                <div className="text-text-secondary text-sm">Total Earnings</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">${selectedProject.monthlyEarnings.toFixed(2)}</div>
                <div className="text-text-secondary text-sm">This Month</div>
              </div>
            </div>
          </div>

          {/* Collaborators */}
          <div className="mb-6">
            <h3 className="font-medium text-text-primary mb-3">Royalty Splits</h3>
            <div className="space-y-2">
              {selectedProject.collaborators.map((collab, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-text-primary">{collab.name}</span>
                  <span className="font-medium text-accent">{collab.split}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Samples Used */}
          {selectedProject.samples.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-text-primary mb-3">Samples Used</h3>
              <div className="space-y-2">
                {selectedProject.samples.map((sample, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded">
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary">{sample.title}</span>
                      <span className="text-text-secondary text-sm">{sample.royaltySplit}% split</span>
                    </div>
                    <div className={`text-xs mt-1 ${
                      sample.clearanceStatus === 'cleared' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {sample.clearanceStatus === 'cleared' ? 'Cleared' : 'Pending clearance'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Platforms */}
          <div>
            <h3 className="font-medium text-text-primary mb-3">Distribution Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject.platforms.map((platform, index) => (
                <span key={index} className="px-3 py-1 bg-accent text-white text-sm rounded-full">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface rounded-lg shadow-card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-text-primary">Royalty payment received for "Summer Vibes Remix"</span>
            </div>
            <span className="text-text-secondary text-sm">2h ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-text-primary">New stream milestone reached - 10K streams</span>
            </div>
            <span className="text-text-secondary text-sm">1d ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-text-primary">Sample clearance updated for "Hip Hop Freestyle"</span>
            </div>
            <span className="text-text-secondary text-sm">3d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightsManagement;