import React, { useState, useEffect } from 'react';
import { Search, Filter, Play, Pause, Download, ShoppingCart } from 'lucide-react';
import { useSamples } from '../context/SampleContext';
import { useLicenses } from '../context/LicenseContext';
import { SampleCardSkeleton } from './common/SkeletonLoader';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';

/**
 * SampleMarketplace component
 * @returns {JSX.Element} - SampleMarketplace component
 */
const SampleMarketplace = () => {
  const { marketplaceSamples, isLoading, searchSamples } = useSamples();
  const { licenses, createLicense, isLoading: licensesLoading } = useLicenses();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    bpmRange: [0, 200],
    priceRange: [0, 100],
    clearedOnly: false,
  });
  const [filteredSamples, setFilteredSamples] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Filter samples when search query or filters change
  useEffect(() => {
    if (!isLoading) {
      const results = searchSamples(searchQuery, filters);
      setFilteredSamples(results);
    }
  }, [searchQuery, filters, marketplaceSamples, isLoading, searchSamples]);

  /**
   * Handle search input change
   * @param {Object} e - Event object
   */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Handle filter change
   * @param {string} filterName - Filter name
   * @param {any} value - Filter value
   */
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
  };

  /**
   * Handle play/pause sample
   * @param {Object} sample - Sample to play/pause
   */
  const handlePlaySample = (sample) => {
    if (selectedSample && selectedSample.sampleId === sample.sampleId) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedSample(sample);
      setIsPlaying(true);
    }
  };

  /**
   * Handle license sample
   * @param {Object} sample - Sample to license
   */
  const handleLicenseSample = (sample) => {
    setSelectedSample(sample);
    setIsLicenseModalOpen(true);
  };

  /**
   * Complete license purchase
   */
  const completePurchase = async () => {
    try {
      if (!selectedSample) return;

      // Create license
      await createLicense({
        sampleId: selectedSample.sampleId,
        licenseType: 'standard',
        fee: selectedSample.marketplacePrice,
        royaltyRate: selectedSample.royaltyRate || 15,
      });

      // Close modal
      setIsLicenseModalOpen(false);
      setSelectedSample(null);

      // Show success message
      alert('License purchased successfully!');
    } catch (error) {
      console.error('Error purchasing license:', error);
      alert('Failed to purchase license. Please try again.');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Sample Marketplace</h1>
          <p className="text-text-secondary">Browse and license pre-cleared samples for your projects.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <SampleCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Sample Marketplace</h1>
        <p className="text-text-secondary">Browse and license pre-cleared samples for your projects.</p>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
          <input
            type="text"
            placeholder="Search samples by name, artist, genre..."
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          onClick={() => setIsFilterModalOpen(true)}
          variant="secondary"
          className="flex items-center"
        >
          <Filter size={18} className="mr-2" />
          Filters
        </Button>
      </div>
      
      {/* Samples grid */}
      {filteredSamples.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSamples.map((sample) => (
            <div key={sample.sampleId} className="bg-surface rounded-lg shadow-card overflow-hidden">
              {/* Waveform visualization */}
              <div className="h-48 bg-gray-100 relative">
                {sample.waveform ? (
                  <img
                    src={sample.waveform}
                    alt="Audio waveform"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">
                    <Music size={48} className="text-white opacity-50" />
                  </div>
                )}
                
                {/* Play button */}
                <button
                  onClick={() => handlePlaySample(sample)}
                  className="absolute bottom-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                >
                  {selectedSample?.sampleId === sample.sampleId && isPlaying ? (
                    <Pause size={20} className="text-accent" />
                  ) : (
                    <Play size={20} className="text-accent ml-1" />
                  )}
                </button>
                
                {/* Sample status badge */}
                <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
                  sample.clearedStatus === 'cleared' ? 'bg-green-100 text-green-800' :
                  sample.clearedStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  sample.clearedStatus === 'uncleared' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {sample.clearedStatus.charAt(0).toUpperCase() + sample.clearedStatus.slice(1)}
                </div>
              </div>
              
              {/* Sample info */}
              <div className="p-4">
                <h3 className="font-bold text-text-primary text-lg mb-1">{sample.title}</h3>
                <p className="text-text-secondary mb-3">{sample.artist}</p>
                
                <div className="flex justify-between text-sm mb-3">
                  <div className="text-text-secondary">
                    {sample.bpm} BPM
                  </div>
                  <div className="text-text-secondary">
                    {sample.key}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-bold text-accent">{sample.getLicensePrice(true)}</span>
                  <Button
                    onClick={() => handleLicenseSample(sample)}
                    size="sm"
                    className="flex items-center"
                  >
                    <ShoppingCart size={16} className="mr-1" />
                    License
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-surface rounded-lg">
          <Music size={48} className="mx-auto text-text-secondary opacity-50 mb-4" />
          <h3 className="text-xl font-medium text-text-primary mb-2">No samples found</h3>
          <p className="text-text-secondary mb-6">Try adjusting your search or filters.</p>
          <Button
            onClick={() => {
              setSearchQuery('');
              setFilters({
                genre: '',
                bpmRange: [0, 200],
                priceRange: [0, 100],
                clearedOnly: false,
              });
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
      
      {/* License modal */}
      <Modal
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
        title="License Sample"
      >
        {selectedSample && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Music size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary">{selectedSample.title}</h3>
                <p className="text-text-secondary">{selectedSample.artist}</p>
              </div>
            </div>
            
            <div className="border-t border-b border-gray-200 py-4">
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">License Type</span>
                <span className="font-medium text-text-primary">Standard</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Price</span>
                <span className="font-medium text-text-primary">{selectedSample.getLicensePrice(true)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Royalty Rate</span>
                <span className="font-medium text-text-primary">{selectedSample.royaltyRate || 15}%</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-text-primary">License Terms</h4>
              <ul className="list-disc list-inside text-text-secondary space-y-1">
                <li>Worldwide distribution rights</li>
                <li>Use in unlimited projects</li>
                <li>Credit required: "{selectedSample.artist} - {selectedSample.title}"</li>
                <li>Royalty rate: {selectedSample.royaltyRate || 15}% of revenue</li>
                <li>No resale or redistribution of the sample</li>
              </ul>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={() => setIsLicenseModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={completePurchase}
            loading={licensesLoading}
          >
            Complete Purchase
          </Button>
        </div>
      </Modal>
      
      {/* Filter modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filter Samples"
        size="sm"
      >
        <div className="space-y-6">
          {/* Genre filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Genre
            </label>
            <select
              value={filters.genre}
              onChange={(e) => handleFilterChange('genre', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">All Genres</option>
              <option value="Hip Hop">Hip Hop</option>
              <option value="Electronic">Electronic</option>
              <option value="Jazz">Jazz</option>
              <option value="Soul">Soul</option>
              <option value="Rock">Rock</option>
              <option value="Pop">Pop</option>
              <option value="Trap">Trap</option>
            </select>
          </div>
          
          {/* BPM range filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              BPM Range: {filters.bpmRange[0]} - {filters.bpmRange[1]}
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="200"
                value={filters.bpmRange[0]}
                onChange={(e) => handleFilterChange('bpmRange', [parseInt(e.target.value), filters.bpmRange[1]])}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="200"
                value={filters.bpmRange[1]}
                onChange={(e) => handleFilterChange('bpmRange', [filters.bpmRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
          
          {/* Price range filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.priceRange[0]}
                onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
          
          {/* Cleared only filter */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="clearedOnly"
              checked={filters.clearedOnly}
              onChange={(e) => handleFilterChange('clearedOnly', e.target.checked)}
              className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
            />
            <label htmlFor="clearedOnly" className="ml-2 block text-sm text-text-primary">
              Show only cleared samples
            </label>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={() => {
              setFilters({
                genre: '',
                bpmRange: [0, 200],
                priceRange: [0, 100],
                clearedOnly: false,
              });
            }}
          >
            Reset
          </Button>
          <Button
            onClick={() => setIsFilterModalOpen(false)}
          >
            Apply Filters
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SampleMarketplace;

