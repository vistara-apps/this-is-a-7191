import React, { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import SampleCard from './SampleCard';
import Button from './Button';
import Modal from './Modal';

const SampleMarketplace = () => {
  const [samples] = useState([
    {
      id: 1,
      title: "Funk Break 01",
      artist: "Groove Masters",
      price: 29.99,
      bpm: 120,
      key: "C",
      duration: 180,
      clearedStatus: "cleared",
      genre: "Hip Hop"
    },
    {
      id: 2,
      title: "Jazz Piano Loop",
      artist: "Smooth Sounds",
      price: 34.99,
      bpm: 95,
      key: "Fm",
      duration: 240,
      clearedStatus: "cleared",
      genre: "Jazz"
    },
    {
      id: 3,
      title: "Trap Percussion",
      artist: "Beat Factory",
      price: 19.99,
      bpm: 140,
      key: "Am",
      duration: 120,
      clearedStatus: "pending",
      genre: "Trap"
    },
    {
      id: 4,
      title: "Vintage Vocal",
      artist: "Retro Records",
      price: 49.99,
      bpm: 110,
      key: "G",
      duration: 200,
      clearedStatus: "cleared",
      genre: "Soul"
    },
    {
      id: 5,
      title: "Electronic Bass",
      artist: "Synth Studios",
      price: 24.99,
      bpm: 128,
      key: "Dm",
      duration: 160,
      clearedStatus: "cleared",
      genre: "Electronic"
    },
    {
      id: 6,
      title: "Rock Guitar Riff",
      artist: "Power Chords",
      price: 39.99,
      bpm: 115,
      key: "E",
      duration: 210,
      clearedStatus: "uncleared",
      genre: "Rock"
    }
  ]);

  const [filteredSamples, setFilteredSamples] = useState(samples);
  const [selectedSample, setSelectedSample] = useState(null);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    bpmRange: [60, 200],
    priceRange: [0, 100],
    clearedOnly: false
  });

  const handleLicense = (sample) => {
    setSelectedSample(sample);
    setShowLicenseModal(true);
  };

  const completeLicense = () => {
    alert(`License purchased for "${selectedSample.title}" - $${selectedSample.price}`);
    setShowLicenseModal(false);
    setSelectedSample(null);
  };

  const applyFilters = () => {
    let filtered = samples;
    
    if (filters.genre) {
      filtered = filtered.filter(sample => sample.genre === filters.genre);
    }
    
    if (filters.clearedOnly) {
      filtered = filtered.filter(sample => sample.clearedStatus === 'cleared');
    }
    
    filtered = filtered.filter(sample => 
      sample.bpm >= filters.bpmRange[0] && sample.bpm <= filters.bpmRange[1]
    );
    
    filtered = filtered.filter(sample => 
      sample.price >= filters.priceRange[0] && sample.price <= filters.priceRange[1]
    );
    
    setFilteredSamples(filtered);
  };

  React.useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Sample Marketplace</h1>
          <p className="text-text-secondary">Browse and license pre-cleared samples</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary">
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
          <Button variant="secondary">
            <Grid size={16} />
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-surface rounded-lg shadow-card p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-md"
            value={filters.genre}
            onChange={(e) => setFilters({...filters, genre: e.target.value})}
          >
            <option value="">All Genres</option>
            <option value="Hip Hop">Hip Hop</option>
            <option value="Jazz">Jazz</option>
            <option value="Trap">Trap</option>
            <option value="Soul">Soul</option>
            <option value="Electronic">Electronic</option>
            <option value="Rock">Rock</option>
          </select>
          
          <div>
            <label className="block text-sm text-text-secondary mb-1">BPM Range</label>
            <input 
              type="range" 
              min="60" 
              max="200" 
              value={filters.bpmRange[1]}
              onChange={(e) => setFilters({...filters, bpmRange: [60, parseInt(e.target.value)]})}
              className="w-full"
            />
            <span className="text-xs text-text-secondary">60 - {filters.bpmRange[1]} BPM</span>
          </div>
          
          <div>
            <label className="block text-sm text-text-secondary mb-1">Price Range</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
              className="w-full"
            />
            <span className="text-xs text-text-secondary">$0 - ${filters.priceRange[1]}</span>
          </div>
          
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox"
              checked={filters.clearedOnly}
              onChange={(e) => setFilters({...filters, clearedOnly: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm text-text-primary">Pre-cleared only</span>
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSamples.map((sample) => (
          <SampleCard
            key={sample.id}
            sample={sample}
            variant="licensable"
            onLicense={handleLicense}
          />
        ))}
      </div>

      {/* License Modal */}
      <Modal
        isOpen={showLicenseModal}
        onClose={() => setShowLicenseModal(false)}
        title="License Sample"
      >
        {selectedSample && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-text-primary">{selectedSample.title}</h3>
              <p className="text-text-secondary">by {selectedSample.artist}</p>
              <p className="font-bold text-accent text-lg">${selectedSample.price}</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-text-primary">License Terms:</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Unlimited commercial use</li>
                <li>• Credit required</li>
                <li>• No resale or redistribution</li>
                <li>• Instant download</li>
              </ul>
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button variant="primary" onClick={completeLicense} className="flex-1">
                Purchase License - ${selectedSample.price}
              </Button>
              <Button variant="secondary" onClick={() => setShowLicenseModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SampleMarketplace;