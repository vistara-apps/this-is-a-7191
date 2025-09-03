import React, { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import Button from './Button';

const FileUploadForm = ({ variant = 'sampleVerification', onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (uploadedFile) => {
    if (uploadedFile.type.startsWith('audio/')) {
      setFile(uploadedFile);
    } else {
      alert('Please upload an audio file');
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    
    setUploading(true);
    try {
      // Simulate upload and processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      onUpload && onUpload(file);
      setFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-accent bg-blue-50' 
            : file 
            ? 'border-green-400 bg-green-50'
            : 'border-gray-300 hover:border-accent'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {!file ? (
          <div className="space-y-2">
            <Upload className="mx-auto h-12 w-12 text-text-secondary" />
            <div>
              <p className="text-lg font-medium text-text-primary">
                Drop your audio file here
              </p>
              <p className="text-sm text-text-secondary">
                or click to browse (MP3, WAV, FLAC supported)
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-3">
            <File className="h-8 w-8 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-text-primary">{file.name}</p>
              <p className="text-sm text-text-secondary">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button variant="icon" onClick={removeFile}>
              <X size={16} />
            </Button>
          </div>
        )}
      </div>

      {file && (
        <div className="flex space-x-2">
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={uploading}
            className="flex-1"
          >
            {uploading ? 'Processing...' : 
             variant === 'sampleVerification' ? 'Scan for Samples' : 'Upload'}
          </Button>
          <Button variant="secondary" onClick={removeFile}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploadForm;