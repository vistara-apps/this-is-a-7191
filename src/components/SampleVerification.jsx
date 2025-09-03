import React, { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle, Music, X, Info } from 'lucide-react';
import { useSamples } from '../context/SampleContext';
import Button from './Button';
import Modal from './Modal';

/**
 * SampleVerification component
 * @returns {JSX.Element} - SampleVerification component
 */
const SampleVerification = () => {
  const { samples, isLoading } = useSamples();
  
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  /**
   * Handle file selection
   * @param {Object} e - Event object
   */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  /**
   * Handle file upload and verification
   */
  const handleVerification = async () => {
    if (!file) return;

    try {
      setIsUploading(true);

      // Simulate API call for sample verification
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock verification results
      const mockResults = {
        trackName: file.name.replace(/\.[^/.]+$/, ""),
        detectedSamples: [
          {
            sampleId: 'sample1',
            title: "Funk Break 01",
            artist: "Groove Masters",
            confidence: 95,
            timestamp: "0:15-0:30",
            clearedStatus: "cleared",
            riskLevel: "low",
          },
          {
            sampleId: 'sample3',
            title: "Trap Percussion",
            artist: "Beat Factory",
            confidence: 87,
            timestamp: "1:05-1:20",
            clearedStatus: "pending",
            riskLevel: "medium",
          },
          {
            sampleId: 'sample6',
            title: "Rock Guitar Riff",
            artist: "Power Chords",
            confidence: 92,
            timestamp: "2:10-2:25",
            clearedStatus: "uncleared",
            riskLevel: "high",
          },
        ],
        overallRisk: "medium",
      };

      setScanResults(mockResults);
      setIsResultModalOpen(true);
    } catch (error) {
      console.error('Verification error:', error);
      alert('Failed to verify sample. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * View sample details
   * @param {Object} sample - Sample to view
   */
  const viewSampleDetails = (sample) => {
    setSelectedSample(sample);
    setIsSampleModalOpen(true);
  };

  /**
   * Get risk level color
   * @param {string} riskLevel - Risk level
   * @returns {string} - CSS color class
   */
  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Sample Verification</h1>
        <p className="text-text-secondary">Verify your tracks for uncleared samples before distribution.</p>
      </div>
      
      {/* Upload section */}
      <div className="bg-surface rounded-lg shadow-card p-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mb-4">
            <Upload size={28} className="text-accent" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2">Upload Your Track</h2>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Upload your track to scan for samples. We'll identify any samples and check their clearance status.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4">
              <input
                type="file"
                id="track-upload"
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="track-upload"
                className="cursor-pointer block text-center"
              >
                {file ? (
                  <div className="flex items-center justify-center">
                    <Music size={24} className="text-accent mr-2" />
                    <span className="text-text-primary font-medium">{file.name}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                      }}
                      className="ml-2 text-text-secondary hover:text-text-primary"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-text-primary font-medium mb-1">
                      Drag and drop your audio file here
                    </p>
                    <p className="text-text-secondary text-sm">
                      or click to browse (MP3, WAV, AIFF)
                    </p>
                  </div>
                )}
              </label>
            </div>
            
            <Button
              onClick={handleVerification}
              disabled={!file || isUploading}
              loading={isUploading}
              fullWidth
            >
              Verify Track
            </Button>
          </div>
        </div>
      </div>
      
      {/* How it works section */}
      <div className="bg-surface rounded-lg shadow-card p-8">
        <h2 className="text-xl font-bold text-text-primary mb-6">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Upload size={20} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-text-primary mb-2">1. Upload Your Track</h3>
            <p className="text-text-secondary text-sm">
              Upload your track in MP3, WAV, or AIFF format.
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <Music size={20} className="text-purple-600" />
            </div>
            <h3 className="font-medium text-text-primary mb-2">2. Scan for Samples</h3>
            <p className="text-text-secondary text-sm">
              Our AI analyzes your track to identify any samples used.
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <h3 className="font-medium text-text-primary mb-2">3. Get Clearance Status</h3>
            <p className="text-text-secondary text-sm">
              Receive a detailed report with clearance status and risk assessment.
            </p>
          </div>
        </div>
      </div>
      
      {/* Results modal */}
      <Modal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        title="Verification Results"
        size="lg"
      >
        {scanResults && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-text-primary text-lg">{scanResults.trackName}</h3>
                <p className="text-text-secondary">Scan completed</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(scanResults.overallRisk)}`}>
                {scanResults.overallRisk.charAt(0).toUpperCase() + scanResults.overallRisk.slice(1)} Risk
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-text-primary mb-3">Detected Samples ({scanResults.detectedSamples.length})</h4>
              
              <div className="space-y-4">
                {scanResults.detectedSamples.map((sample) => (
                  <div
                    key={sample.sampleId}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between mb-2">
                      <h5 className="font-medium text-text-primary">{sample.title}</h5>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(sample.riskLevel)}`}>
                        {sample.riskLevel.charAt(0).toUpperCase() + sample.riskLevel.slice(1)} Risk
                      </div>
                    </div>
                    <p className="text-text-secondary text-sm mb-3">By {sample.artist}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm mb-3">
                      <div className="text-text-secondary">
                        <span className="font-medium">Confidence:</span> {sample.confidence}%
                      </div>
                      <div className="text-text-secondary">
                        <span className="font-medium">Timestamp:</span> {sample.timestamp}
                      </div>
                      <div className="text-text-secondary">
                        <span className="font-medium">Status:</span>{' '}
                        <span className={
                          sample.clearedStatus === 'cleared' ? 'text-green-600' :
                          sample.clearedStatus === 'pending' ? 'text-yellow-600' :
                          'text-red-600'
                        }>
                          {sample.clearedStatus.charAt(0).toUpperCase() + sample.clearedStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => viewSampleDetails(sample)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {scanResults.overallRisk !== 'low' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Attention Required</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Your track contains samples that require clearance before distribution.
                        Use our Concierge Service to help clear these samples.
                      </p>
                    </div>
                    <div className="mt-3">
                      <Button
                        variant="secondary"
                        size="sm"
                      >
                        Request Clearance Help
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
      
      {/* Sample details modal */}
      <Modal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        title="Sample Details"
      >
        {selectedSample && (
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Music size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary">{selectedSample.title}</h3>
                <p className="text-text-secondary">By {selectedSample.artist}</p>
                <div className={`mt-2 inline-block px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(selectedSample.riskLevel)}`}>
                  {selectedSample.riskLevel.charAt(0).toUpperCase() + selectedSample.riskLevel.slice(1)} Risk
                </div>
              </div>
            </div>
            
            <div className="border-t border-b border-gray-200 py-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Confidence</span>
                <span className="font-medium text-text-primary">{selectedSample.confidence}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Timestamp</span>
                <span className="font-medium text-text-primary">{selectedSample.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Status</span>
                <span className={`font-medium ${
                  selectedSample.clearedStatus === 'cleared' ? 'text-green-600' :
                  selectedSample.clearedStatus === 'pending' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {selectedSample.clearedStatus.charAt(0).toUpperCase() + selectedSample.clearedStatus.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Info size={20} className="text-text-secondary mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-text-primary">What This Means</h4>
                  <p className="text-text-secondary text-sm mt-1">
                    {selectedSample.clearedStatus === 'cleared' ? (
                      "This sample is already cleared and can be used in your track. Make sure to follow the license terms."
                    ) : selectedSample.clearedStatus === 'pending' ? (
                      "This sample is in the process of being cleared. You should wait for clearance before distributing your track."
                    ) : (
                      "This sample is not cleared. You need to obtain a license before using it in your track."
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle size={20} className="text-text-secondary mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-text-primary">Recommended Action</h4>
                  <p className="text-text-secondary text-sm mt-1">
                    {selectedSample.clearedStatus === 'cleared' ? (
                      "No action needed. You can proceed with distribution."
                    ) : selectedSample.clearedStatus === 'pending' ? (
                      "Wait for clearance to be completed or contact our Concierge Service for updates."
                    ) : (
                      "Use our Concierge Service to help clear this sample or replace it with a cleared alternative."
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            {selectedSample.clearedStatus !== 'cleared' && (
              <div className="flex justify-end">
                <Button>
                  Request Clearance
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SampleVerification;

