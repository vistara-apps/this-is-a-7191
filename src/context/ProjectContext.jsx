import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project } from '../models';
import { useAuth } from './AuthContext';

// Create context
const ProjectContext = createContext();

/**
 * ProjectProvider component for managing projects state
 * @param {Object} props - Component props
 * @returns {JSX.Element} - ProjectProvider component
 */
export const ProjectProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch projects when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchProjects();
    } else {
      setProjects([]);
    }
  }, [isAuthenticated, user]);

  /**
   * Fetch user projects
   * @returns {Promise<void>} - Fetch result
   */
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, we'll use mock data
      const mockProjects = [
        {
          projectId: 'project1',
          userId: 'user123',
          projectName: "Summer Vibes Remix",
          trackTitle: "Summer Vibes (Remix)",
          artist: "Demo User",
          status: "active",
          releaseDate: "2024-01-15",
          genre: "Electronic",
          bpm: 128,
          key: "Am",
          duration: 240,
          totalEarnings: 2450.75,
          monthlyEarnings: 325.50,
          streamCount: 15000,
          distributionPlatforms: ["Spotify", "Apple Music", "YouTube"],
          collaborators: [
            { userId: 'producer123', name: "Producer X", split: 40 },
            { userId: 'artist456', name: "Original Artist", split: 35 },
            { userId: 'user123', name: "You", split: 25 }
          ],
          samples: [
            { sampleId: 'sample2', title: "Jazz Piano Loop", clearedStatus: "cleared", royaltySplit: 15 }
          ],
          uploadedTimestamp: "2024-01-10T12:00:00Z",
        },
        {
          projectId: 'project2',
          userId: 'user123',
          projectName: "Hip Hop Freestyle",
          trackTitle: "Freestyle Session #1",
          artist: "Demo User ft. MC Flow",
          status: "pending",
          releaseDate: "2024-02-01",
          genre: "Hip Hop",
          bpm: 95,
          key: "G",
          duration: 180,
          totalEarnings: 0,
          monthlyEarnings: 0,
          streamCount: 0,
          distributionPlatforms: ["Pending distribution"],
          collaborators: [
            { userId: 'mcflow789', name: "MC Flow", split: 50 },
            { userId: 'user123', name: "You", split: 50 }
          ],
          samples: [
            { sampleId: 'sample1', title: "Funk Break 01", clearedStatus: "pending", royaltySplit: 20 }
          ],
          uploadedTimestamp: "2024-01-20T15:30:00Z",
        },
        {
          projectId: 'project3',
          userId: 'user123',
          projectName: "Electronic Dance Track",
          trackTitle: "Neon Nights",
          artist: "Demo User & DJ Synth",
          status: "active",
          releaseDate: "2023-12-10",
          genre: "Electronic",
          bpm: 130,
          key: "F",
          duration: 320,
          totalEarnings: 5672.25,
          monthlyEarnings: 892.10,
          streamCount: 45000,
          distributionPlatforms: ["Spotify", "Beatport", "SoundCloud"],
          collaborators: [
            { userId: 'djsynth123', name: "DJ Synth", split: 30 },
            { userId: 'vocalist456', name: "Vocalist", split: 20 },
            { userId: 'user123', name: "You", split: 50 }
          ],
          samples: [],
          uploadedTimestamp: "2023-12-05T09:15:00Z",
        }
      ];

      // Convert to Project instances
      const projectInstances = mockProjects.map(project => new Project(project));
      
      setProjects(projectInstances);
    } catch (err) {
      console.error('Fetch projects error:', err);
      setError(err.message || 'Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get a project by ID
   * @param {string} projectId - Project ID
   * @returns {Project|null} - Project instance or null if not found
   */
  const getProjectById = (projectId) => {
    return projects.find(project => project.projectId === projectId) || null;
  };

  /**
   * Create a new project
   * @param {Object} projectData - Project data
   * @returns {Promise<Project>} - Created project
   */
  const createProject = async (projectData) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, we'll create a mock project
      const newProject = new Project({
        projectId: `project${projects.length + 1}`,
        userId: user.userId,
        ...projectData,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        uploadedTimestamp: new Date().toISOString(),
      });

      // Update state
      setProjects(prevProjects => [...prevProjects, newProject]);

      return newProject;
    } catch (err) {
      console.error('Create project error:', err);
      setError(err.message || 'Failed to create project');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update a project
   * @param {string} projectId - Project ID
   * @param {Object} projectData - Updated project data
   * @returns {Promise<Project>} - Updated project
   */
  const updateProject = async (projectId, projectData) => {
    try {
      setIsLoading(true);
      setError(null);

      const existingProject = getProjectById(projectId);
      
      if (!existingProject) {
        throw new Error('Project not found');
      }

      // TODO: Replace with actual API call
      // For now, we'll update the project locally
      const updatedProject = new Project({
        ...existingProject.toObject(),
        ...projectData,
        updatedAt: new Date().toISOString(),
      });

      // Update state
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.projectId === projectId ? updatedProject : project
        )
      );

      return updatedProject;
    } catch (err) {
      console.error('Update project error:', err);
      setError(err.message || 'Failed to update project');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete a project
   * @param {string} projectId - Project ID
   * @returns {Promise<boolean>} - Deletion result
   */
  const deleteProject = async (projectId) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, we'll delete the project locally
      
      // Update state
      setProjects(prevProjects => 
        prevProjects.filter(project => project.projectId !== projectId)
      );

      return true;
    } catch (err) {
      console.error('Delete project error:', err);
      setError(err.message || 'Failed to delete project');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Add a collaborator to a project
   * @param {string} projectId - Project ID
   * @param {Object} collaborator - Collaborator data
   * @returns {Promise<Project>} - Updated project
   */
  const addCollaborator = async (projectId, collaborator) => {
    try {
      setIsLoading(true);
      setError(null);

      const existingProject = getProjectById(projectId);
      
      if (!existingProject) {
        throw new Error('Project not found');
      }

      // Check if collaborator already exists
      const collaboratorExists = existingProject.collaborators.some(
        c => c.userId === collaborator.userId
      );
      
      if (collaboratorExists) {
        throw new Error('Collaborator already exists');
      }

      // TODO: Replace with actual API call
      // For now, we'll update the project locally
      const updatedCollaborators = [...existingProject.collaborators, collaborator];
      
      const updatedProject = await updateProject(projectId, {
        collaborators: updatedCollaborators,
      });

      return updatedProject;
    } catch (err) {
      console.error('Add collaborator error:', err);
      setError(err.message || 'Failed to add collaborator');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update collaborator split
   * @param {string} projectId - Project ID
   * @param {string} collaboratorId - Collaborator user ID
   * @param {number} split - New split percentage
   * @returns {Promise<Project>} - Updated project
   */
  const updateCollaboratorSplit = async (projectId, collaboratorId, split) => {
    try {
      setIsLoading(true);
      setError(null);

      const existingProject = getProjectById(projectId);
      
      if (!existingProject) {
        throw new Error('Project not found');
      }

      // Update collaborator split
      const updatedCollaborators = existingProject.collaborators.map(collaborator => {
        if (collaborator.userId === collaboratorId) {
          return { ...collaborator, split };
        }
        return collaborator;
      });
      
      // TODO: Replace with actual API call
      // For now, we'll update the project locally
      const updatedProject = await updateProject(projectId, {
        collaborators: updatedCollaborators,
      });

      return updatedProject;
    } catch (err) {
      console.error('Update collaborator split error:', err);
      setError(err.message || 'Failed to update collaborator split');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Remove a collaborator from a project
   * @param {string} projectId - Project ID
   * @param {string} collaboratorId - Collaborator user ID
   * @returns {Promise<Project>} - Updated project
   */
  const removeCollaborator = async (projectId, collaboratorId) => {
    try {
      setIsLoading(true);
      setError(null);

      const existingProject = getProjectById(projectId);
      
      if (!existingProject) {
        throw new Error('Project not found');
      }

      // Remove collaborator
      const updatedCollaborators = existingProject.collaborators.filter(
        collaborator => collaborator.userId !== collaboratorId
      );
      
      // TODO: Replace with actual API call
      // For now, we'll update the project locally
      const updatedProject = await updateProject(projectId, {
        collaborators: updatedCollaborators,
      });

      return updatedProject;
    } catch (err) {
      console.error('Remove collaborator error:', err);
      setError(err.message || 'Failed to remove collaborator');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Add a sample to a project
   * @param {string} projectId - Project ID
   * @param {Object} sample - Sample data
   * @returns {Promise<Project>} - Updated project
   */
  const addSample = async (projectId, sample) => {
    try {
      setIsLoading(true);
      setError(null);

      const existingProject = getProjectById(projectId);
      
      if (!existingProject) {
        throw new Error('Project not found');
      }

      // Check if sample already exists
      const sampleExists = existingProject.samples.some(
        s => s.sampleId === sample.sampleId
      );
      
      if (sampleExists) {
        throw new Error('Sample already exists in project');
      }

      // TODO: Replace with actual API call
      // For now, we'll update the project locally
      const updatedSamples = [...existingProject.samples, sample];
      
      const updatedProject = await updateProject(projectId, {
        samples: updatedSamples,
      });

      return updatedProject;
    } catch (err) {
      console.error('Add sample error:', err);
      setError(err.message || 'Failed to add sample');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Remove a sample from a project
   * @param {string} projectId - Project ID
   * @param {string} sampleId - Sample ID
   * @returns {Promise<Project>} - Updated project
   */
  const removeSample = async (projectId, sampleId) => {
    try {
      setIsLoading(true);
      setError(null);

      const existingProject = getProjectById(projectId);
      
      if (!existingProject) {
        throw new Error('Project not found');
      }

      // Remove sample
      const updatedSamples = existingProject.samples.filter(
        sample => sample.sampleId !== sampleId
      );
      
      // TODO: Replace with actual API call
      // For now, we'll update the project locally
      const updatedProject = await updateProject(projectId, {
        samples: updatedSamples,
      });

      return updatedProject;
    } catch (err) {
      console.error('Remove sample error:', err);
      setError(err.message || 'Failed to remove sample');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    projects,
    isLoading,
    error,
    fetchProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addCollaborator,
    updateCollaboratorSplit,
    removeCollaborator,
    addSample,
    removeSample,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

/**
 * Hook for using project context
 * @returns {Object} - Project context
 */
export const useProjects = () => {
  const context = useContext(ProjectContext);
  
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  
  return context;
};

export default ProjectContext;

