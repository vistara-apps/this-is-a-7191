import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, FileAudio } from 'lucide-react';
import FileUploadForm from './FileUploadForm';
import Button from './Button';

const SampleVerification = () => {
  const [scanResults, setScanResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleUpload = async (file) => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setScanResults({
        filename: file.name,
        duration: "3:24",
        detectedSamples: [
          {
            id: 1,
            title: "Amen Break",
            artist: "The Winstons",
            timestamp: "0:45 - 0:48",
            confidence: 95,
            riskLevel: "high",
            status: "uncleared"
          },
          {
            id: 2,
            title: "Funky Drummer",
            artist: "James Brown",
            timestamp: "1:22 - 1:26",
            confidence: 88,
            riskLevel: "medium",
            status: "cleared"
          },
          {
            id: 3,
            title: "Think Break",
            artist: "Lyn Collins",
            timestamp: "2:10 - 2:14",
            confidence: 76,
            riskLevel: "low",
            status: "unknown"
          }
        ],
        overallRisk: "medium"
      });
      setIsScanning(false);
    }, 3000);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'cleared': return <CheckCircle className="text-green-600" size={16} />;
      case 'uncleared': return <AlertTriangle className="text-red-600" size={16} />;
      default: return <Clock className="text-yellow-600" size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Sample Verification</h1>
        <p className="text-text-secondary">Scan your tracks to identify potentially uncleared samples</p>
      </div>

      {/* Upload Form */}
      <div className="bg-surface rounded-lg shadow-card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Upload Track for Analysis</h2>
        {!isScanning && !scanResults && (
          <FileUploadForm variant="sampleVerification" onUpload={handleUpload} />
        )}
        
        {isScanning && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-text-primary font-medium">Analyzing audio...</p>
            <p className="text-text-secondary text-sm">This may take a few moments</p>
          </div>
        )}
      </div>

      {/* Results */}
      {scanResults && (
        <div className="space-y-6">
          {/* Overview */}
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <FileAudio className="text-accent" size={24} />
                <div>
                  <h3 className="font-semibold text-text-primary">{scanResults.filename}</h3>
                  <p className="text-text-secondary text-sm">Duration: {scanResults.duration}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(scanResults.overallRisk)}`}>
                {scanResults.overallRisk.toUpperCase()} RISK
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-text-primary">{scanResults.detectedSamples.length}</div>
                <div className="text-text-secondary text-sm">Samples Detected</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {scanResults.detectedSamples.filter(s => s.status === 'uncleared').length}
                </div>
                <div className="text-text-secondary text-sm">Uncleared</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {scanResults.detectedSamples.filter(s => s.status === 'cleared').length}
                </div>
                <div className="text-text-secondary text-sm">Pre-cleared</div>
              </div>
            </div>
          </div>

          {/* Detected Samples */}
          <div className="bg-surface rounded-lg shadow-card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Detected Samples</h3>
            <div className="space-y-4">
              {scanResults.detectedSamples.map((sample) => (
                <div key={sample.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(sample.status)}
                      <div>
                        <h4 className="font-medium text-text-primary">{sample.title}</h4>
                        <p className="text-text-secondary text-sm">by {sample.artist}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(sample.riskLevel)}`}>
                        {sample.confidence}% match
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Timestamp: {sample.timestamp}</span>
                    <div className="flex space-x-2">
                      {sample.status === 'uncleared' && (
                        <Button variant="primary" size="sm">
                          Request Clearance
                        </Button>
                      )}
                      <Button variant="secondary" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-surface rounded-lg shadow-card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Recommended Actions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-text-primary">Clear uncleared samples</p>
                  <p className="text-text-secondary text-sm">Use our concierge service to handle licensing</p>
                </div>
                <Button variant="primary">
                  Start Concierge Request
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-text-primary">Generate clearance report</p>
                  <p className="text-text-secondary text-sm">Download detailed analysis for your records</p>
                </div>
                <Button variant="secondary">
                  Download Report
                </Button>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="secondary" onClick={() => setScanResults(null)}>
              Scan Another Track
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleVerification;