import React, { useState } from 'react';
import { Play, Pause, Download, ShoppingCart, Clock } from 'lucide-react';
import Button from './Button';

const SampleCard = ({ sample, variant = 'licensable', onLicense, onPreview }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    onPreview && onPreview(sample, !isPlaying);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-surface rounded-lg shadow-card p-4 hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg mb-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <Button variant="icon" onClick={handlePlay} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white">
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </Button>
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {sample.bpm} BPM
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-text-primary truncate">{sample.title}</h3>
        <p className="text-sm text-text-secondary">{sample.artist}</p>
        
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span className="flex items-center space-x-1">
            <Clock size={12} />
            <span>{formatDuration(sample.duration)}</span>
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded-full">{sample.key}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-accent">${sample.price}</span>
          <div className="flex space-x-1">
            {sample.clearedStatus === 'cleared' && (
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => onLicense && onLicense(sample)}
                className="flex items-center space-x-1"
              >
                <ShoppingCart size={12} />
                <span>License</span>
              </Button>
            )}
            {variant === 'preview' && (
              <Button variant="secondary" size="sm">
                <Download size={12} />
              </Button>
            )}
          </div>
        </div>
        
        <div className="text-xs">
          <span className={`px-2 py-1 rounded-full ${
            sample.clearedStatus === 'cleared' 
              ? 'bg-green-100 text-green-800' 
              : sample.clearedStatus === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {sample.clearedStatus === 'cleared' ? 'Pre-cleared' : 
             sample.clearedStatus === 'pending' ? 'Pending clearance' : 'Uncleared'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SampleCard;