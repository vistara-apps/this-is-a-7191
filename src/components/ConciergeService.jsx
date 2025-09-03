import React, { useState } from 'react';
import { Briefcase, Clock, CheckCircle, AlertTriangle, ChevronRight, MessageSquare, Search, Music } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';

/**
 * ConciergeService component
 * @returns {JSX.Element} - ConciergeService component
 */
const ConciergeService = () => {
  const { user } = useAuth();
  
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestForm, setRequestForm] = useState({
    sampleArtist: '',
    sampleTitle: '',
    sampleLink: '',
    projectName: '',
    additionalInfo: '',
  });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Mock concierge requests
  const [requests, setRequests] = useState([
    {
      id: 'req1',
      sampleArtist: 'Classic Soul Band',
      sampleTitle: 'Summer Nights',
      projectName: 'Urban Remix Project',
      status: 'completed',
      createdAt: '2024-01-15T12:00:00Z',
      updatedAt: '2024-01-20T15:30:00Z',
      messages: [
        { id: 'msg1', sender: 'user', text: 'I need help clearing this sample for my upcoming release.', timestamp: '2024-01-15T12:00:00Z' },
        { id: 'msg2', sender: 'agent', text: 'We\'ll start the clearance process right away. We\'ll contact the rights holders and negotiate terms.', timestamp: '2024-01-15T14:30:00Z' },
        { id: 'msg3', sender: 'agent', text: 'Good news! We\'ve received approval from the rights holders. The license fee will be $250 with a 15% royalty rate.', timestamp: '2024-01-18T10:15:00Z' },
        { id: 'msg4', sender: 'user', text: 'That sounds great! Please proceed with the license.', timestamp: '2024-01-18T11:45:00Z' },
        { id: 'msg5', sender: 'agent', text: 'License has been finalized and added to your account. You can now use the sample in your project.', timestamp: '2024-01-20T15:30:00Z' },
      ],
      result: {
        licenseObtained: true,
        fee: 250,
        royaltyRate: 15,
        terms: 'Worldwide distribution, credit required',
      },
    },
    {
      id: 'req2',
      sampleArtist: 'Jazz Quartet',
      sampleTitle: 'Midnight Blues',
      projectName: 'Electronic Fusion',
      status: 'in_progress',
      createdAt: '2024-01-25T09:45:00Z',
      updatedAt: '2024-01-28T16:20:00Z',
      messages: [
        { id: 'msg1', sender: 'user', text: 'I want to use this jazz sample in my new electronic track.', timestamp: '2024-01-25T09:45:00Z' },
        { id: 'msg2', sender: 'agent', text: 'Thanks for your request. We\'ll begin the process of identifying and contacting the rights holders.', timestamp: '2024-01-25T11:30:00Z' },
        { id: 'msg3', sender: 'agent', text: 'We\'ve identified the rights holders and have sent them a clearance request. Waiting for their response.', timestamp: '2024-01-28T16:20:00Z' },
      ],
    },
    {
      id: 'req3',
      sampleArtist: 'Funk Masters',
      sampleTitle: 'Groove City',
      projectName: 'Hip Hop Collection',
      status: 'pending',
      createdAt: '2024-01-30T14:10:00Z',
      updatedAt: '2024-01-30T14:10:00Z',
      messages: [
        { id: 'msg1', sender: 'user', text: 'Need to clear this funk sample for my hip hop album.', timestamp: '2024-01-30T14:10:00Z' },
      ],
    },
  ]);

  /**
   * Handle input change for request form
   * @param {Object} e - Event object
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Submit concierge request
   */
  const submitRequest = async () => {
    try {
      setIsSubmitting(true);

      // Validate form
      if (!requestForm.sampleArtist || !requestForm.sampleTitle || !requestForm.projectName) {
        alert('Please fill in all required fields.');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create new request
      const newRequest = {
        id: `req${requests.length + 1}`,
        sampleArtist: requestForm.sampleArtist,
        sampleTitle: requestForm.sampleTitle,
        sampleLink: requestForm.sampleLink,
        projectName: requestForm.projectName,
        additionalInfo: requestForm.additionalInfo,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
          {
            id: `msg1`,
            sender: 'user',
            text: `I need help clearing "${requestForm.sampleTitle}" by ${requestForm.sampleArtist} for my project "${requestForm.projectName}".${requestForm.additionalInfo ? ` Additional info: ${requestForm.additionalInfo}` : ''}`,
            timestamp: new Date().toISOString(),
          },
        ],
      };

      // Add to requests
      setRequests(prev => [newRequest, ...prev]);

      // Reset form and close modal
      setRequestForm({
        sampleArtist: '',
        sampleTitle: '',
        sampleLink: '',
        projectName: '',
        additionalInfo: '',
      });
      setIsRequestModalOpen(false);
    } catch (error) {
      console.error('Submit request error:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * View request details
   * @param {Object} request - Request to view
   */
  const viewRequestDetails = (request) => {
    setSelectedRequest(request);
    setIsDetailsModalOpen(true);
  };

  /**
   * Format date
   * @param {string} dateString - Date string
   * @returns {string} - Formatted date
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  /**
   * Get status badge
   * @param {string} status - Request status
   * @returns {JSX.Element} - Status badge
   */
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            In Progress
          </span>
        );
      case 'pending':
        return (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
            Failed
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Concierge Service</h1>
          <p className="text-text-secondary">Let our experts handle your sample clearance needs.</p>
        </div>
        <Button
          onClick={() => setIsRequestModalOpen(true)}
          className="flex items-center"
        >
          <Briefcase size={18} className="mr-2" />
          New Request
        </Button>
      </div>
      
      {/* Service overview */}
      <div className="bg-surface rounded-lg shadow-card p-6">
        <h2 className="text-xl font-bold text-text-primary mb-4">How Our Concierge Service Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Search size={18} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-text-primary mb-2">1. Submit Your Request</h3>
            <p className="text-text-secondary text-sm">
              Tell us which sample you need cleared and provide any relevant information.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <MessageSquare size={18} className="text-purple-600" />
            </div>
            <h3 className="font-medium text-text-primary mb-2">2. We Handle Negotiations</h3>
            <p className="text-text-secondary text-sm">
              Our team identifies rights holders and negotiates license terms on your behalf.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <CheckCircle size={18} className="text-green-600" />
            </div>
            <h3 className="font-medium text-text-primary mb-2">3. Get Your License</h3>
            <p className="text-text-secondary text-sm">
              Once approved, we'll finalize the license and add it to your account.
            </p>
          </div>
        </div>
      </div>
      
      {/* Requests list */}
      <div className="bg-surface rounded-lg shadow-card overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-text-primary">Your Requests</h2>
        </div>
        
        {requests.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {requests.map((request) => (
              <div
                key={request.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-text-primary">{request.sampleTitle}</h3>
                    <p className="text-text-secondary text-sm">By {request.sampleArtist}</p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-text-secondary text-sm">
                    <Clock size={14} className="mr-1" />
                    <span>Requested on {formatDate(request.createdAt)}</span>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => viewRequestDetails(request)}
                    className="flex items-center"
                  >
                    View Details
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-text-secondary mb-4">You don't have any concierge requests yet.</p>
            <Button onClick={() => setIsRequestModalOpen(true)}>
              Create Your First Request
            </Button>
          </div>
        )}
      </div>
      
      {/* New request modal */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title="New Concierge Request"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Sample Artist"
              name="sampleArtist"
              value={requestForm.sampleArtist}
              onChange={handleInputChange}
              placeholder="e.g., James Brown"
              required
            />
            <Input
              label="Sample Title"
              name="sampleTitle"
              value={requestForm.sampleTitle}
              onChange={handleInputChange}
              placeholder="e.g., Funky Drummer"
              required
            />
          </div>
          
          <Input
            label="Sample Link (optional)"
            name="sampleLink"
            value={requestForm.sampleLink}
            onChange={handleInputChange}
            placeholder="YouTube, Spotify, or other link to the sample"
          />
          
          <Input
            label="Your Project Name"
            name="projectName"
            value={requestForm.projectName}
            onChange={handleInputChange}
            placeholder="e.g., Summer Beats Album"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Additional Information (optional)
            </label>
            <textarea
              name="additionalInfo"
              value={requestForm.additionalInfo}
              onChange={handleInputChange}
              placeholder="Provide any additional details that might help with the clearance process..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              rows={4}
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={() => setIsRequestModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={submitRequest}
            loading={isSubmitting}
          >
            Submit Request
          </Button>
        </div>
      </Modal>
      
      {/* Request details modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Request Details"
        size="lg"
      >
        {selectedRequest && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-text-primary text-lg">{selectedRequest.sampleTitle}</h3>
                <p className="text-text-secondary">By {selectedRequest.sampleArtist}</p>
              </div>
              {getStatusBadge(selectedRequest.status)}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-gray-200 py-4">
              <div>
                <p className="text-text-secondary text-sm">Project</p>
                <p className="font-medium text-text-primary">{selectedRequest.projectName}</p>
              </div>
              <div>
                <p className="text-text-secondary text-sm">Requested On</p>
                <p className="font-medium text-text-primary">{formatDate(selectedRequest.createdAt)}</p>
              </div>
              {selectedRequest.sampleLink && (
                <div className="col-span-1 md:col-span-2">
                  <p className="text-text-secondary text-sm">Sample Link</p>
                  <a
                    href={selectedRequest.sampleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {selectedRequest.sampleLink}
                  </a>
                </div>
              )}
            </div>
            
            {/* Conversation */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Conversation</h4>
              
              <div className="space-y-4 max-h-80 overflow-y-auto p-1">
                {selectedRequest.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-md rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-text-primary'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-white text-opacity-75' : 'text-text-secondary'
                      }`}>
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedRequest.status !== 'completed' && (
                <div className="mt-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                    <Button>Send</Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Result (for completed requests) */}
            {selectedRequest.status === 'completed' && selectedRequest.result && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">License Obtained</h3>
                    <div className="mt-2 text-sm text-green-700 space-y-1">
                      <p>
                        <span className="font-medium">License Fee:</span> ${selectedRequest.result.fee}
                      </p>
                      <p>
                        <span className="font-medium">Royalty Rate:</span> {selectedRequest.result.royaltyRate}%
                      </p>
                      <p>
                        <span className="font-medium">Terms:</span> {selectedRequest.result.terms}
                      </p>
                    </div>
                    <div className="mt-3">
                      <Button
                        variant="secondary"
                        size="sm"
                      >
                        View License
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ConciergeService;

