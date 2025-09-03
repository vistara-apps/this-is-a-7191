/**
 * Project model
 * Represents a music project in the application
 */

/**
 * Project class
 */
class Project {
  /**
   * Create a new Project instance
   * @param {Object} data - Project data
   */
  constructor(data = {}) {
    this.projectId = data.projectId || '';
    this.userId = data.userId || '';
    this.projectName = data.projectName || '';
    this.trackTitle = data.trackTitle || '';
    this.artist = data.artist || '';
    this.description = data.description || '';
    this.status = data.status || 'draft'; // draft, active, completed, archived
    this.releaseDate = data.releaseDate || null;
    this.genre = data.genre || '';
    this.bpm = data.bpm || 0;
    this.key = data.key || '';
    this.duration = data.duration || 0; // in seconds
    this.coverArt = data.coverArt || '';
    this.audioUrl = data.audioUrl || '';
    this.previewUrl = data.previewUrl || '';
    this.isPublic = data.isPublic !== undefined ? data.isPublic : false;
    this.samples = data.samples || []; // Array of sample IDs or sample objects
    this.collaborators = data.collaborators || []; // Array of collaborator objects
    this.distributionPlatforms = data.distributionPlatforms || []; // Array of platform names
    this.totalEarnings = data.totalEarnings || 0;
    this.monthlyEarnings = data.monthlyEarnings || 0;
    this.streamCount = data.streamCount || 0;
    this.uploadedTimestamp = data.uploadedTimestamp || new Date().toISOString();
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.metadata = data.metadata || {};
  }

  /**
   * Get formatted duration (MM:SS)
   * @returns {string} - Formatted duration
   */
  get formattedDuration() {
    const minutes = Math.floor(this.duration / 60);
    const seconds = this.duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Get total royalty split percentage
   * @returns {number} - Total royalty split percentage
   */
  getTotalRoyaltySplit() {
    if (!this.collaborators || this.collaborators.length === 0) {
      return 0;
    }
    
    return this.collaborators.reduce((total, collaborator) => {
      return total + (collaborator.split || 0);
    }, 0);
  }

  /**
   * Check if royalty splits are valid (sum to 100%)
   * @returns {boolean} - Whether royalty splits are valid
   */
  hasValidRoyaltySplits() {
    return this.getTotalRoyaltySplit() === 100;
  }

  /**
   * Get user's royalty split percentage
   * @param {string} userId - User ID
   * @returns {number} - User's royalty split percentage
   */
  getUserRoyaltySplit(userId) {
    if (!this.collaborators || this.collaborators.length === 0) {
      return 0;
    }
    
    const userCollaborator = this.collaborators.find(c => c.userId === userId);
    return userCollaborator ? userCollaborator.split : 0;
  }

  /**
   * Check if all samples are cleared
   * @returns {boolean} - Whether all samples are cleared
   */
  allSamplesCleared() {
    if (!this.samples || this.samples.length === 0) {
      return true;
    }
    
    return this.samples.every(sample => {
      if (typeof sample === 'object') {
        return sample.clearedStatus === 'cleared';
      }
      return false; // If sample is just an ID, we can't determine its status
    });
  }

  /**
   * Get uncleared samples
   * @returns {Array} - Array of uncleared samples
   */
  getUnclearedSamples() {
    if (!this.samples || this.samples.length === 0) {
      return [];
    }
    
    return this.samples.filter(sample => {
      if (typeof sample === 'object') {
        return sample.clearedStatus !== 'cleared';
      }
      return false; // If sample is just an ID, we can't determine its status
    });
  }

  /**
   * Calculate earnings for a specific user
   * @param {string} userId - User ID
   * @returns {number} - User's earnings
   */
  calculateUserEarnings(userId) {
    const userSplit = this.getUserRoyaltySplit(userId);
    if (userSplit === 0) {
      return 0;
    }
    
    return (this.totalEarnings * userSplit) / 100;
  }

  /**
   * Convert Project instance to plain object
   * @returns {Object} - Plain object representation
   */
  toObject() {
    return {
      projectId: this.projectId,
      userId: this.userId,
      projectName: this.projectName,
      trackTitle: this.trackTitle,
      artist: this.artist,
      description: this.description,
      status: this.status,
      releaseDate: this.releaseDate,
      genre: this.genre,
      bpm: this.bpm,
      key: this.key,
      duration: this.duration,
      coverArt: this.coverArt,
      audioUrl: this.audioUrl,
      previewUrl: this.previewUrl,
      isPublic: this.isPublic,
      samples: this.samples,
      collaborators: this.collaborators,
      distributionPlatforms: this.distributionPlatforms,
      totalEarnings: this.totalEarnings,
      monthlyEarnings: this.monthlyEarnings,
      streamCount: this.streamCount,
      uploadedTimestamp: this.uploadedTimestamp,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      metadata: this.metadata,
    };
  }

  /**
   * Create a Project instance from a plain object
   * @param {Object} data - Project data
   * @returns {Project} - Project instance
   */
  static fromObject(data) {
    return new Project(data);
  }
}

export default Project;

