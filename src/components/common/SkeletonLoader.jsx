import React from 'react';

/**
 * SkeletonLoader component
 * Displays a skeleton loading placeholder
 * @param {Object} props - Component props
 * @returns {JSX.Element} - SkeletonLoader component
 */
const SkeletonLoader = ({
  variant = 'rectangle',
  width = '100%',
  height = '20px',
  count = 1,
  className = '',
}) => {
  // Base skeleton styles
  const baseStyles = 'animate-pulse bg-gray-200 rounded';

  // Determine variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'circle':
        return 'rounded-full';
      case 'text':
        return 'h-4 rounded';
      case 'card':
        return 'rounded-lg';
      case 'rectangle':
      default:
        return 'rounded';
    }
  };

  // Create skeleton items
  const renderSkeletons = () => {
    const skeletons = [];
    
    for (let i = 0; i < count; i++) {
      skeletons.push(
        <div
          key={i}
          className={`${baseStyles} ${getVariantStyles()} ${className}`}
          style={{
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            marginBottom: i < count - 1 ? '0.5rem' : 0,
          }}
        />
      );
    }
    
    return skeletons;
  };

  return <>{renderSkeletons()}</>;
};

/**
 * SampleCardSkeleton component
 * Displays a skeleton loading placeholder for a sample card
 * @returns {JSX.Element} - SampleCardSkeleton component
 */
export const SampleCardSkeleton = () => {
  return (
    <div className="bg-surface rounded-lg shadow-card p-4">
      <SkeletonLoader variant="rectangle" height={180} className="mb-3" />
      <SkeletonLoader variant="text" width="70%" className="mb-2" />
      <SkeletonLoader variant="text" width="50%" className="mb-3" />
      <div className="flex justify-between mb-3">
        <SkeletonLoader variant="text" width={60} />
        <SkeletonLoader variant="text" width={40} />
      </div>
      <div className="flex justify-between">
        <SkeletonLoader variant="text" width={50} />
        <SkeletonLoader variant="rectangle" width={80} height={30} />
      </div>
    </div>
  );
};

/**
 * ProjectCardSkeleton component
 * Displays a skeleton loading placeholder for a project card
 * @returns {JSX.Element} - ProjectCardSkeleton component
 */
export const ProjectCardSkeleton = () => {
  return (
    <div className="bg-surface rounded-lg shadow-card p-4 border border-gray-200">
      <div className="flex justify-between mb-2">
        <SkeletonLoader variant="text" width="60%" />
        <SkeletonLoader variant="rectangle" width={60} height={24} />
      </div>
      <SkeletonLoader variant="text" width="40%" className="mb-3" />
      <div className="flex justify-between text-sm mb-3">
        <SkeletonLoader variant="text" width={100} />
        <SkeletonLoader variant="text" width={80} />
      </div>
    </div>
  );
};

/**
 * DashboardStatsSkeleton component
 * Displays a skeleton loading placeholder for dashboard stats
 * @returns {JSX.Element} - DashboardStatsSkeleton component
 */
export const DashboardStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <SkeletonLoader variant="circle" width={40} height={40} />
            <SkeletonLoader variant="text" width={40} />
          </div>
          <SkeletonLoader variant="text" width="40%" height={30} className="mb-1" />
          <SkeletonLoader variant="text" width="60%" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;

