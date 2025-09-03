/**
 * Sample model
 * Represents a music sample in the application
 */

/**
 * Sample class
 */
class Sample {
  /**
   * Create a new Sample instance
   * @param {Object} data - Sample data
   */
  constructor(data = {}) {
    this.sampleId = data.sampleId || '';
    this.title = data.title || '';
    this.artist = data.artist || '';
    this.description = data.description || '';
    this.duration = data.duration || 0; // in seconds
    this.bpm = data.bpm || 0;
    this.key = data.key || '';
    this.genre = data.genre || '';
    this.tags = data.tags || [];
    this.waveform = data.waveform || null;
    this.audioUrl = data.audioUrl || '';
    this.previewUrl = data.previewUrl || '';
    this.coverArt = data.coverArt || '';
    this.licenseType = data.licenseType || 'standard';
    this.clearedStatus = data.clearedStatus || 'unknown'; // unknown, cleared, uncleared, pending
    this.marketplacePrice = data.marketplacePrice || 0;
    this.royaltyRate = data.royaltyRate || 0; // percentage
    this.uploadedBy = data.uploadedBy || '';
    this.ownerId = data.ownerId || '';
    this.isPublic = data.isPublic !== undefined ? data.isPublic : true;
    this.isVerified = data.isVerified !== undefined ? data.isVerified : false;
    this.releaseDate = data.releaseDate || null;
    this.sourceAlbum = data.sourceAlbum || '';
    this.sourceLabel = data.sourceLabel || '';
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
   * Check if sample is cleared for use
   * @returns {boolean} - Whether sample is cleared
   */
  isCleared() {
    return this.clearedStatus === 'cleared';
  }

  /**
   * Check if sample is pending clearance
   * @returns {boolean} - Whether sample is pending clearance
   */
  isPendingClearance() {
    return this.clearedStatus === 'pending';
  }

  /**
   * Get license price with optional formatting
   * @param {boolean} formatted - Whether to format the price
   * @returns {string|number} - Formatted price or raw price
   */
  getLicensePrice(formatted = false) {
    if (formatted) {
      return `$${this.marketplacePrice.toFixed(2)}`;
    }
    return this.marketplacePrice;
  }

  /**
   * Get sample risk level based on cleared status
   * @returns {string} - Risk level (low, medium, high)
   */
  getRiskLevel() {
    switch (this.clearedStatus) {
      case 'cleared':
        return 'low';
      case 'pending':
        return 'medium';
      case 'uncleared':
        return 'high';
      default:
        return 'unknown';
    }
  }

  /**
   * Convert Sample instance to plain object
   * @returns {Object} - Plain object representation
   */
  toObject() {
    return {
      sampleId: this.sampleId,
      title: this.title,
      artist: this.artist,
      description: this.description,
      duration: this.duration,
      bpm: this.bpm,
      key: this.key,
      genre: this.genre,
      tags: this.tags,
      waveform: this.waveform,
      audioUrl: this.audioUrl,
      previewUrl: this.previewUrl,
      coverArt: this.coverArt,
      licenseType: this.licenseType,
      clearedStatus: this.clearedStatus,
      marketplacePrice: this.marketplacePrice,
      royaltyRate: this.royaltyRate,
      uploadedBy: this.uploadedBy,
      ownerId: this.ownerId,
      isPublic: this.isPublic,
      isVerified: this.isVerified,
      releaseDate: this.releaseDate,
      sourceAlbum: this.sourceAlbum,
      sourceLabel: this.sourceLabel,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      metadata: this.metadata,
    };
  }

  /**
   * Create a Sample instance from a plain object
   * @param {Object} data - Sample data
   * @returns {Sample} - Sample instance
   */
  static fromObject(data) {
    return new Sample(data);
  }
}

export default Sample;

