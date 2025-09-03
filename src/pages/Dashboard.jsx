import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import { useSamples } from '../context/SampleContext';
import Dashboard from '../components/Dashboard';
import { LoadingIndicator } from '../components/common';

/**
 * Dashboard page component
 * @returns {JSX.Element} - Dashboard page
 */
const DashboardPage = () => {
  const { user } = useAuth();
  const { projects, isLoading: projectsLoading } = useProjects();
  const { marketplaceSamples, isLoading: samplesLoading } = useSamples();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          samplesCleared: 24,
          monthlyRevenue: 1250.75,
          recentActivity: [
            {
              id: 'activity1',
              type: 'project',
              title: 'New project created: Summer Vibes Remix',
              time: '2 hours ago',
            },
            {
              id: 'activity2',
              type: 'license',
              title: 'Sample "Funk Break 01" licensed',
              time: '1 day ago',
            },
            {
              id: 'activity3',
              type: 'project',
              title: 'Royalty payment received: $125.50',
              time: '3 days ago',
            },
          ],
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setIsLoading(false);
      }
    };

    if (!projectsLoading && !samplesLoading) {
      fetchStats();
    }
  }, [projectsLoading, samplesLoading]);

  // Loading state
  if (isLoading || projectsLoading || samplesLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingIndicator size="lg" />
      </div>
    );
  }

  return <Dashboard stats={stats} />;
};

export default DashboardPage;

