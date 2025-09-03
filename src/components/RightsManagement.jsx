import React, { useState } from 'react';
import { DollarSign, BarChart2, Users, Plus, ChevronRight, Edit, Trash, Music } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import Button from './Button';
import Modal from './Modal';
import Input from './Input';

/**
 * RightsManagement component
 * @returns {JSX.Element} - RightsManagement component
 */
const RightsManagement = () => {
  const { projects, isLoading, addCollaborator, updateCollaboratorSplit } = useProjects();
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isCollaboratorModalOpen, setIsCollaboratorModalOpen] = useState(false);
  const [collaboratorForm, setCollaboratorForm] = useState({
    name: '',
    email: '',
    split: 0,
  });
  const [isEditingSplits, setIsEditingSplits] = useState(false);
  const [editedSplits, setEditedSplits] = useState({});

  /**
   * View project details
   * @param {Object} project - Project to view
   */
  const viewProjectDetails = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
    
    // Initialize edited splits with current values
    const splits = {};
    project.collaborators.forEach(collaborator => {
      splits[collaborator.userId] = collaborator.split;
    });
    setEditedSplits(splits);
  };

  /**
   * Handle collaborator form input change
   * @param {Object} e - Event object
   */
  const handleCollaboratorInputChange = (e) => {
    const { name, value } = e.target;
    setCollaboratorForm(prev => ({
      ...prev,
      [name]: name === 'split' ? parseInt(value) || 0 : value,
    }));
  };

  /**
   * Add new collaborator
   */
  const handleAddCollaborator = async () => {
    if (!selectedProject) return;
    
    try {
      // Validate form
      if (!collaboratorForm.name || !collaboratorForm.email || collaboratorForm.split <= 0) {
        alert('Please fill in all fields with valid values.');
        return;
      }

      // Check if total split exceeds 100%
      const currentTotal = selectedProject.collaborators.reduce((sum, c) => sum + c.split, 0);
      if (currentTotal + collaboratorForm.split > 100) {
        alert('Total royalty split cannot exceed 100%.');
        return;
      }

      // Create new collaborator
      const newCollaborator = {
        userId: `user${Date.now()}`, // Generate temporary ID
        name: collaboratorForm.name,
        email: collaboratorForm.email,
        split: collaboratorForm.split,
      };

      // Add collaborator to project
      await addCollaborator(selectedProject.projectId, newCollaborator);

      // Update selected project
      setSelectedProject(prev => ({
        ...prev,
        collaborators: [...prev.collaborators, newCollaborator],
      }));

      // Reset form and close modal
      setCollaboratorForm({
        name: '',
        email: '',
        split: 0,
      });
      setIsCollaboratorModalOpen(false);
    } catch (error) {
      console.error('Add collaborator error:', error);
      alert('Failed to add collaborator. Please try again.');
    }
  };

  /**
   * Handle split change
   * @param {string} userId - User ID
   * @param {number} value - New split value
   */
  const handleSplitChange = (userId, value) => {
    setEditedSplits(prev => ({
      ...prev,
      [userId]: parseInt(value) || 0,
    }));
  };

  /**
   * Save edited splits
   */
  const saveEditedSplits = async () => {
    try {
      // Check if total is 100%
      const total = Object.values(editedSplits).reduce((sum, split) => sum + split, 0);
      if (total !== 100) {
        alert('Total royalty split must equal 100%.');
        return;
      }

      // Update collaborator splits
      for (const userId in editedSplits) {
        await updateCollaboratorSplit(selectedProject.projectId, userId, editedSplits[userId]);
      }

      // Update selected project
      setSelectedProject(prev => ({
        ...prev,
        collaborators: prev.collaborators.map(collaborator => ({
          ...collaborator,
          split: editedSplits[collaborator.userId] || collaborator.split,
        })),
      }));

      // Exit edit mode
      setIsEditingSplits(false);
    } catch (error) {
      console.error('Save splits error:', error);
      alert('Failed to save splits. Please try again.');
    }
  };

  /**
   * Format currency
   * @param {number} amount - Amount to format
   * @returns {string} - Formatted amount
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Rights Management</h1>
          <p className="text-text-secondary">Manage your project rights and royalty splits.</p>
        </div>
        
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Rights Management</h1>
        <p className="text-text-secondary">Manage your project rights and royalty splits.</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <h3 className="ml-3 font-medium text-text-primary">Total Earnings</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {formatCurrency(projects.reduce((sum, project) => sum + project.totalEarnings, 0))}
          </p>
          <p className="text-text-secondary text-sm mt-1">Across all projects</p>
        </div>
        
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart2 size={20} className="text-blue-600" />
            </div>
            <h3 className="ml-3 font-medium text-text-primary">Monthly Revenue</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {formatCurrency(projects.reduce((sum, project) => sum + project.monthlyEarnings, 0))}
          </p>
          <p className="text-text-secondary text-sm mt-1">Last 30 days</p>
        </div>
        
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Users size={20} className="text-purple-600" />
            </div>
            <h3 className="ml-3 font-medium text-text-primary">Collaborators</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {new Set(projects.flatMap(project => project.collaborators.map(c => c.userId))).size}
          </p>
          <p className="text-text-secondary text-sm mt-1">Across all projects</p>
        </div>
      </div>
      
      {/* Projects list */}
      <div className="bg-surface rounded-lg shadow-card overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-text-primary">Your Projects</h2>
        </div>
        
        {projects.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {projects.map((project) => (
              <div
                key={project.projectId}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-text-primary">{project.projectName}</h3>
                    <p className="text-text-secondary text-sm">{project.trackTitle}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'active' ? 'bg-green-100 text-green-800' :
                    project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-text-secondary text-sm">
                    <Users size={14} className="mr-1" />
                    <span>{project.collaborators.length} collaborators</span>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => viewProjectDetails(project)}
                    className="flex items-center"
                  >
                    Manage Rights
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-text-secondary mb-4">You don't have any projects yet.</p>
            <Button>Create Your First Project</Button>
          </div>
        )}
      </div>
      
      {/* Project details modal */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setIsEditingSplits(false);
        }}
        title={selectedProject?.projectName || 'Project Details'}
        size="lg"
      >
        {selectedProject && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-text-primary text-lg">{selectedProject.trackTitle}</h3>
                <p className="text-text-secondary">By {selectedProject.artist}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                selectedProject.status === 'active' ? 'bg-green-100 text-green-800' :
                selectedProject.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                selectedProject.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
              </span>
            </div>
            
            {/* Project stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-b border-gray-200 py-4">
              <div>
                <p className="text-text-secondary text-sm">Total Earnings</p>
                <p className="font-medium text-text-primary">{formatCurrency(selectedProject.totalEarnings)}</p>
              </div>
              <div>
                <p className="text-text-secondary text-sm">Monthly Earnings</p>
                <p className="font-medium text-text-primary">{formatCurrency(selectedProject.monthlyEarnings)}</p>
              </div>
              <div>
                <p className="text-text-secondary text-sm">Stream Count</p>
                <p className="font-medium text-text-primary">{selectedProject.streamCount.toLocaleString()}</p>
              </div>
            </div>
            
            {/* Collaborators */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-text-primary">Collaborators & Royalty Splits</h4>
                {isEditingSplits ? (
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsEditingSplits(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={saveEditedSplits}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsEditingSplits(true)}
                    >
                      <Edit size={16} className="mr-1" />
                      Edit Splits
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIsCollaboratorModalOpen(true)}
                    >
                      <Plus size={16} className="mr-1" />
                      Add
                    </Button>
                  </div>
                )}
              </div>
              
              {selectedProject.collaborators.length > 0 ? (
                <div className="space-y-3">
                  {selectedProject.collaborators.map((collaborator) => (
                    <div
                      key={collaborator.userId}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          {collaborator.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-text-primary">{collaborator.name}</p>
                          {collaborator.email && (
                            <p className="text-text-secondary text-sm">{collaborator.email}</p>
                          )}
                        </div>
                      </div>
                      
                      {isEditingSplits ? (
                        <div className="flex items-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={editedSplits[collaborator.userId] || 0}
                            onChange={(e) => handleSplitChange(collaborator.userId, e.target.value)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-right"
                          />
                          <span className="ml-1">%</span>
                        </div>
                      ) : (
                        <div className="font-medium text-text-primary">
                          {collaborator.split}%
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Total */}
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-text-primary">Total</span>
                    <span className={`font-medium ${
                      isEditingSplits
                        ? Object.values(editedSplits).reduce((sum, split) => sum + split, 0) === 100
                          ? 'text-green-600'
                          : 'text-red-600'
                        : 'text-text-primary'
                    }`}>
                      {isEditingSplits
                        ? Object.values(editedSplits).reduce((sum, split) => sum + split, 0)
                        : selectedProject.collaborators.reduce((sum, c) => sum + c.split, 0)}%
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 border border-gray-200 rounded-lg">
                  <p className="text-text-secondary mb-2">No collaborators added yet.</p>
                  <Button
                    size="sm"
                    onClick={() => setIsCollaboratorModalOpen(true)}
                  >
                    <Plus size={16} className="mr-1" />
                    Add Collaborator
                  </Button>
                </div>
              )}
            </div>
            
            {/* Samples */}
            <div>
              <h4 className="font-medium text-text-primary mb-4">Samples Used</h4>
              
              {selectedProject.samples && selectedProject.samples.length > 0 ? (
                <div className="space-y-3">
                  {selectedProject.samples.map((sample) => (
                    <div
                      key={sample.sampleId}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <Music size={16} className="text-white" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-text-primary">{sample.title}</p>
                          <div className="flex items-center">
                            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                              sample.clearedStatus === 'cleared' ? 'bg-green-500' :
                              sample.clearedStatus === 'pending' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}></span>
                            <span className="text-text-secondary text-xs">
                              {sample.clearedStatus.charAt(0).toUpperCase() + sample.clearedStatus.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="font-medium text-text-primary">
                        {sample.royaltySplit || 0}%
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 border border-gray-200 rounded-lg">
                  <p className="text-text-secondary">No samples used in this project.</p>
                </div>
              )}
            </div>
            
            {/* Distribution platforms */}
            <div>
              <h4 className="font-medium text-text-primary mb-4">Distribution Platforms</h4>
              
              {selectedProject.distributionPlatforms && selectedProject.distributionPlatforms.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedProject.distributionPlatforms.map((platform, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-text-primary rounded-full text-sm"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 border border-gray-200 rounded-lg">
                  <p className="text-text-secondary">No distribution platforms added yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
      
      {/* Add collaborator modal */}
      <Modal
        isOpen={isCollaboratorModalOpen}
        onClose={() => setIsCollaboratorModalOpen(false)}
        title="Add Collaborator"
      >
        <div className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={collaboratorForm.name}
            onChange={handleCollaboratorInputChange}
            placeholder="Collaborator's name"
            required
          />
          
          <Input
            label="Email"
            type="email"
            name="email"
            value={collaboratorForm.email}
            onChange={handleCollaboratorInputChange}
            placeholder="Collaborator's email"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Royalty Split (%)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex items-center">
              <input
                type="number"
                name="split"
                min="1"
                max="100"
                value={collaboratorForm.split}
                onChange={handleCollaboratorInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                required
              />
              <span className="ml-2">%</span>
            </div>
            <p className="mt-1 text-sm text-text-secondary">
              Current total: {selectedProject?.collaborators.reduce((sum, c) => sum + c.split, 0) || 0}%
              {collaboratorForm.split > 0 && (
                <span>
                  {' '}+ {collaboratorForm.split}% = {(selectedProject?.collaborators.reduce((sum, c) => sum + c.split, 0) || 0) + collaboratorForm.split}%
                </span>
              )}
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={() => setIsCollaboratorModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddCollaborator}
          >
            Add Collaborator
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default RightsManagement;

