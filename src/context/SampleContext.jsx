import React, { createContext, useContext, useState, useEffect } from 'react';
import { Sample } from '../models';
import { useAuth } from './AuthContext';

// Create context
const SampleContext = createContext();

/**
 * SampleProvider component for managing samples state
 * @param {Object} props - Component props
 * @returns {JSX.Element} - SampleProvider component
 */
export const SampleProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [samples, setSamples] = useState([]);
  const [marketplaceSamples, setMarketplaceSamples] = useState([]);
  const [userSamples, setUserSamples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch samples when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchSamples();
    } else {
      setSamples([]);
      setMarketplaceSamples([]);
      setUserSamples([]);
    }
  }, [isAuthenticated]);

  /**
   * Fetch all samples
   * @returns {Promise<void>} - Fetch result
   */
  const fetchSamples = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, we'll use mock data
      const mockSamples = [
        {
          sampleId: 'sample1',
          title: "Funk Break 01",
          artist: "Groove Masters",
          description: "Classic funk drum break",
          duration: 180,
          bpm: 120,
          key: "C",
          genre: "Hip Hop",
          tags: ["funk", "drums", "break"],
          audioUrl: "https://example.com/samples/funk-break-01.mp3",
          previewUrl: "https://example.com/samples/funk-break-01-preview.mp3",
          licenseType: "standard",
          clearedStatus: "cleared",
          marketplacePrice: 29.99,
          isPublic: true,
        },
        {
          sampleId: 'sample2',
          title: "Jazz Piano Loop",
          artist: "Smooth Sounds",
          description: "Mellow jazz piano progression",
          duration: 240,
          bpm: 95,
          key: "Fm",
          genre: "Jazz",
          tags: ["jazz", "piano", "loop"],
          audioUrl: "https://example.com/samples/jazz-piano-loop.mp3",
          previewUrl: "https://example.com/samples/jazz-piano-loop-preview.mp3",
          licenseType: "standard",
          clearedStatus: "cleared",
          marketplacePrice: 34.99,
          isPublic: true,
        },
        {
          sampleId: 'sample3',
          title: "Trap Percussion",
          artist: "Beat Factory",
          description: "Modern trap percussion pattern",
          duration: 120,
          bpm: 140,
          key: "Am",
          genre: "Trap",
          tags: ["trap", "percussion", "drums"],
          audioUrl: "https://example.com/samples/trap-percussion.mp3",
          previewUrl: "https://example.com/samples/trap-percussion-preview.mp3",
          licenseType: "standard",
          clearedStatus: "pending",
          marketplacePrice: 19.99,
          isPublic: true,
        },
        {
          sampleId: 'sample4',
          title: "Vintage Vocal",
          artist: "Retro Records",
          description: "Soulful vintage vocal sample",
          duration: 200,
          bpm: 110,
          key: "G",
          genre: "Soul",
          tags: ["vocal", "soul", "vintage"],
          audioUrl: "https://example.com/samples/vintage-vocal.mp3",
          previewUrl: "https://example.com/samples/vintage-vocal-preview.mp3",
          licenseType: "exclusive",
          clearedStatus: "cleared",
          marketplacePrice: 49.99,
          isPublic: true,
        },
        {
          sampleId: 'sample5',
          title: "Electronic Bass",
          artist: "Synth Studios",
          description: "Deep electronic bass line",
          duration: 160,
          bpm: 128,
          key: "Dm",
          genre: "Electronic",
          tags: ["bass", "electronic", "synth"],
          audioUrl: "https://example.com/samples/electronic-bass.mp3",
          previewUrl: "https://example.com/samples/electronic-bass-preview.mp3",
          licenseType: "standard",
          clearedStatus: "cleared",
          marketplacePrice: 24.99,
          isPublic: true,
        },
        {
          sampleId: 'sample6',
          title: "Rock Guitar Riff",
          artist: "Power Chords",
          description: "Energetic rock guitar riff",
          duration: 210,
          bpm: 115,
          key: "E",
          genre: "Rock",
          tags: ["guitar", "rock", "riff"],
          audioUrl: "https://example.com/samples/rock-guitar-riff.mp3",
          previewUrl: "https://example.com/samples/rock-guitar-riff-preview.mp3",
          licenseType: "standard",
          clearedStatus: "uncleared",
          marketplacePrice: 39.99,
          isPublic: true,
        }
      ];

      // Convert to Sample instances
      const sampleInstances = mockSamples.map(sample => new Sample(sample));
      
      setSamples(sampleInstances);
      
      // Filter marketplace samples (public samples)
      const marketplace = sampleInstances.filter(sample => sample.isPublic);
      setMarketplaceSamples(marketplace);
      
      // Filter user samples (owned by user)
      const userSamplesList = sampleInstances.filter(sample => sample.uploadedBy === 'user123');
      setUserSamples(userSamplesList);
    } catch (err) {
      console.error('Fetch samples error:', err);
      setError(err.message || 'Failed to fetch samples');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get a sample by ID
   * @param {string} sampleId - Sample ID
   * @returns {Sample|null} - Sample instance or null if not found
   */
  const getSampleById = (sampleId) => {
    return samples.find(sample => sample.sampleId === sampleId) || null;
  };

  /**
   * Search samples by query
   * @param {string} query - Search query
   * @param {Object} filters - Search filters
   * @returns {Array} - Filtered samples
   */
  const searchSamples = (query, filters = {}) => {
    if (!query && Object.keys(filters).length === 0) {
      return marketplaceSamples;
    }

    return marketplaceSamples.filter(sample => {
      // Search by query
      const matchesQuery = !query || 
        sample.title.toLowerCase().includes(query.toLowerCase()) ||
        sample.artist.toLowerCase().includes(query.toLowerCase()) ||
        sample.description.toLowerCase().includes(query.toLowerCase()) ||
        sample.genre.toLowerCase().includes(query.toLowerCase()) ||
        (sample.tags && sample.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())));

      // Apply filters
      const matchesGenre = !filters.genre || sample.genre === filters.genre;
      const matchesBpm = !filters.bpmRange || 
        (sample.bpm >= filters.bpmRange[0] && sample.bpm <= filters.bpmRange[1]);
      const matchesPrice = !filters.priceRange || 
        (sample.marketplacePrice >= filters.priceRange[0] && sample.marketplacePrice <= filters.priceRange[1]);
      const matchesClearedStatus = !filters.clearedOnly || sample.clearedStatus === 'cleared';

      return matchesQuery && matchesGenre && matchesBpm && matchesPrice && matchesClearedStatus;
    });
  };

  /**
   * Upload a new sample
   * @param {Object} sampleData - Sample data
   * @param {File} audioFile - Audio file
   * @returns {Promise<Sample>} - Uploaded sample
   */
  const uploadSample = async (sampleData, audioFile) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, we'll create a mock sample
      const newSample = new Sample({
        sampleId: `sample${samples.length + 1}`,
        ...sampleData,
        uploadedBy: 'user123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Update state
      setSamples(prevSamples => [...prevSamples, newSample]);
      
      if (newSample.isPublic) {
        setMarketplaceSamples(prevSamples => [...prevSamples, newSample]);
      }
      
      setUserSamples(prevSamples => [...prevSamples, newSample]);

      return newSample;
    } catch (err) {
      console.error('Upload sample error:', err);
      setError(err.message || 'Failed to upload sample');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update a sample
   * @param {string} sampleId - Sample ID
   * @param {Object} sampleData - Updated sample data
   * @returns {Promise<Sample>} - Updated sample
   */
  const updateSample = async (sampleId, sampleData) => {
    try {
      setIsLoading(true);
      setError(null);

      const existingSample = getSampleById(sampleId);
      
      if (!existingSample) {
        throw new Error('Sample not found');
      }

      // TODO: Replace with actual API call
      // For now, we'll update the sample locally
      const updatedSample = new Sample({
        ...existingSample.toObject(),
        ...sampleData,
        updatedAt: new Date().toISOString(),
      });

      // Update state
      setSamples(prevSamples => 
        prevSamples.map(sample => 
          sample.sampleId === sampleId ? updatedSample : sample
        )
      );
      
      setMarketplaceSamples(prevSamples => 
        prevSamples.map(sample => 
          sample.sampleId === sampleId ? updatedSample : sample
        ).filter(sample => sample.isPublic)
      );
      
      setUserSamples(prevSamples => 
        prevSamples.map(sample => 
          sample.sampleId === sampleId ? updatedSample : sample
        )
      );

      return updatedSample;
    } catch (err) {
      console.error('Update sample error:', err);
      setError(err.message || 'Failed to update sample');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete a sample
   * @param {string} sampleId - Sample ID
   * @returns {Promise<boolean>} - Deletion result
   */
  const deleteSample = async (sampleId) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, we'll delete the sample locally
      
      // Update state
      setSamples(prevSamples => 
        prevSamples.filter(sample => sample.sampleId !== sampleId)
      );
      
      setMarketplaceSamples(prevSamples => 
        prevSamples.filter(sample => sample.sampleId !== sampleId)
      );
      
      setUserSamples(prevSamples => 
        prevSamples.filter(sample => sample.sampleId !== sampleId)
      );

      return true;
    } catch (err) {
      console.error('Delete sample error:', err);
      setError(err.message || 'Failed to delete sample');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    samples,
    marketplaceSamples,
    userSamples,
    isLoading,
    error,
    fetchSamples,
    getSampleById,
    searchSamples,
    uploadSample,
    updateSample,
    deleteSample,
  };

  return <SampleContext.Provider value={value}>{children}</SampleContext.Provider>;
};

/**
 * Hook for using sample context
 * @returns {Object} - Sample context
 */
export const useSamples = () => {
  const context = useContext(SampleContext);
  
  if (!context) {
    throw new Error('useSamples must be used within a SampleProvider');
  }
  
  return context;
};

export default SampleContext;

