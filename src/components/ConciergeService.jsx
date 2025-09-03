import React, { useState } from 'react';
import { User, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';

const ConciergeService = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      title: "Clear Amen Break sample",
      artist: "The Winstons",
      status: "in_progress",
      submittedDate: "2024-01-15",
      priority: "high",
      assignedAgent: "Sarah Johnson",
      notes: "Contacted rights holder, awaiting response"
    },
    {
      id: 2,
      title: "License James Brown - Funky Drummer",
      artist: "James Brown",
      status: "completed",
      submittedDate: "2024-01-10",
      priority: "medium",
      assignedAgent: "Mike Chen",
      notes: "License secured - $500 upfront + 15% royalty split"
    },
    {
      id: 3,
      title: "Clear vocal sample - Unknown artist",
      artist: "Unknown",
      status: "pending",
      submittedDate: "2024-01-18",
      priority: "low",
      assignedAgent: null,
      notes: "Pending assignment"
    }
  ]);

  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    artist: '',
    albumTitle: '',
    year: '',
    priority: 'medium',
    notes: '',
    audioFile: null
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'in_progress': return <Clock size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handleSubmitRequest = () => {
    const request = {
      id: requests.length + 1,
      title: newRequest.title,
      artist: newRequest.artist,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
      priority: newRequest.priority,
      assignedAgent: null,
      notes: 'Request submitted, pending review'
    };
    
    setRequests([request, ...requests]);
    setNewRequest({
      title: '',
      artist: '',
      albumTitle: '',
      year: '',
      priority: 'medium',
      notes: '',
      audioFile: null
    });
    setShowNewRequestModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Concierge Service</h1>
          <p className="text-text-secondary">Let our team handle sample clearance for you</p>
        </div>
        <Button variant="primary" onClick={() => setShowNewRequestModal(true)}>
          New Request
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg shadow-card p-4 text-center">
          <div className="text-2xl font-bold text-text-primary">{requests.length}</div>
          <div className="text-text-secondary text-sm">Total Requests</div>
        </div>
        <div className="bg-surface rounded-lg shadow-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {requests.filter(r => r.status === 'in_progress').length}
          </div>
          <div className="text-text-secondary text-sm">In Progress</div>
        </div>
        <div className="bg-surface rounded-lg shadow-card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {requests.filter(r => r.status === 'completed').length}
          </div>
          <div className="text-text-secondary text-sm">Completed</div>
        </div>
        <div className="bg-surface rounded-lg shadow-card p-4 text-center">
          <div className="text-2xl font-bold text-accent">85%</div>
          <div className="text-text-secondary text-sm">Success Rate</div>
        </div>
      </div>

      {/* Request List */}
      <div className="bg-surface rounded-lg shadow-card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Your Requests</h2>
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="capitalize">{request.status.replace('_', ' ')}</span>
                  </div>
                  <span className={`text-sm font-medium ${getPriorityColor(request.priority)}`}>
                    {request.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
                <span className="text-text-secondary text-sm">
                  Submitted: {new Date(request.submittedDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="mb-3">
                <h3 className="font-semibold text-text-primary">{request.title}</h3>
                <p className="text-text-secondary">by {request.artist}</p>
              </div>
              
              {request.assignedAgent && (
                <div className="flex items-center space-x-2 mb-2">
                  <User size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    Assigned to: {request.assignedAgent}
                  </span>
                </div>
              )}
              
              <div className="flex items-center space-x-2 mb-3">
                <MessageSquare size={14} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">{request.notes}</span>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
                {request.status === 'in_progress' && (
                  <Button variant="secondary" size="sm">
                    Message Agent
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-surface rounded-lg shadow-card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              1
            </div>
            <h3 className="font-medium text-text-primary mb-2">Submit Request</h3>
            <p className="text-text-secondary text-sm">
              Provide details about the sample you need cleared
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              2
            </div>
            <h3 className="font-medium text-text-primary mb-2">We Handle It</h3>
            <p className="text-text-secondary text-sm">
              Our experts research rights holders and negotiate terms
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              3
            </div>
            <h3 className="font-medium text-text-primary mb-2">Get Licensed</h3>
            <p className="text-text-secondary text-sm">
              Receive your license agreement and use the sample legally
            </p>
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      <Modal
        isOpen={showNewRequestModal}
        onClose={() => setShowNewRequestModal(false)}
        title="New Concierge Request"
      >
        <div className="space-y-4">
          <Input
            label="Sample Title"
            placeholder="e.g., Amen Break"
            value={newRequest.title}
            onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
          />
          
          <Input
            label="Original Artist"
            placeholder="e.g., The Winstons"
            value={newRequest.artist}
            onChange={(e) => setNewRequest({...newRequest, artist: e.target.value})}
          />
          
          <Input
            label="Album Title (if known)"
            placeholder="e.g., Amen, My Brother"
            value={newRequest.albumTitle}
            onChange={(e) => setNewRequest({...newRequest, albumTitle: e.target.value})}
          />
          
          <Input
            label="Year (if known)"
            placeholder="e.g., 1969"
            value={newRequest.year}
            onChange={(e) => setNewRequest({...newRequest, year: e.target.value})}
          />
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Priority Level
            </label>
            <select
              value={newRequest.priority}
              onChange={(e) => setNewRequest({...newRequest, priority: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="low">Low - No rush</option>
              <option value="medium">Medium - Standard timeline</option>
              <option value="high">High - Urgent</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Additional Notes
            </label>
            <textarea
              rows={3}
              placeholder="Provide any additional context about the sample..."
              value={newRequest.notes}
              onChange={(e) => setNewRequest({...newRequest, notes: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button variant="primary" onClick={handleSubmitRequest} className="flex-1">
              Submit Request
            </Button>
            <Button variant="secondary" onClick={() => setShowNewRequestModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConciergeService;