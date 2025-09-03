/**
 * RoyaltyStatement model
 * Represents a royalty statement for a project
 */

/**
 * RoyaltyStatement class
 */
class RoyaltyStatement {
  /**
   * Create a new RoyaltyStatement instance
   * @param {Object} data - Royalty statement data
   */
  constructor(data = {}) {
    this.statementId = data.statementId || '';
    this.userId = data.userId || '';
    this.projectId = data.projectId || '';
    this.period = data.period || ''; // e.g., '2023-01'
    this.startDate = data.startDate || '';
    this.endDate = data.endDate || '';
    this.amount = data.amount || 0;
    this.currency = data.currency || 'USD';
    this.status = data.status || 'pending'; // pending, paid, failed
    this.paymentDate = data.paymentDate || null;
    this.paymentMethod = data.paymentMethod || '';
    this.transactionId = data.transactionId || '';
    this.distributionDetails = data.distributionDetails || [];
    this.platformBreakdown = data.platformBreakdown || [];
    this.streamCount = data.streamCount || 0;
    this.downloadCount = data.downloadCount || 0;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.metadata = data.metadata || {};
  }

  /**
   * Get formatted amount
   * @returns {string} - Formatted amount
   */
  getFormattedAmount() {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency,
    }).format(this.amount);
  }

  /**
   * Get formatted period
   * @returns {string} - Formatted period
   */
  getFormattedPeriod() {
    if (!this.period) {
      return '';
    }
    
    const [year, month] = this.period.split('-');
    
    if (!year || !month) {
      return this.period;
    }
    
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  }

  /**
   * Check if statement is paid
   * @returns {boolean} - Whether statement is paid
   */
  isPaid() {
    return this.status === 'paid';
  }

  /**
   * Check if statement is pending
   * @returns {boolean} - Whether statement is pending
   */
  isPending() {
    return this.status === 'pending';
  }

  /**
   * Get total streams across all platforms
   * @returns {number} - Total streams
   */
  getTotalStreams() {
    if (!this.platformBreakdown || this.platformBreakdown.length === 0) {
      return this.streamCount;
    }
    
    return this.platformBreakdown.reduce((total, platform) => {
      return total + (platform.streams || 0);
    }, 0);
  }

  /**
   * Get platform with highest streams
   * @returns {Object|null} - Platform with highest streams
   */
  getTopPlatform() {
    if (!this.platformBreakdown || this.platformBreakdown.length === 0) {
      return null;
    }
    
    return this.platformBreakdown.reduce((top, platform) => {
      if (!top || (platform.streams || 0) > (top.streams || 0)) {
        return platform;
      }
      return top;
    }, null);
  }

  /**
   * Calculate average earnings per stream
   * @returns {number} - Average earnings per stream
   */
  getAveragePerStream() {
    const totalStreams = this.getTotalStreams();
    
    if (totalStreams === 0) {
      return 0;
    }
    
    return this.amount / totalStreams;
  }

  /**
   * Convert RoyaltyStatement instance to plain object
   * @returns {Object} - Plain object representation
   */
  toObject() {
    return {
      statementId: this.statementId,
      userId: this.userId,
      projectId: this.projectId,
      period: this.period,
      startDate: this.startDate,
      endDate: this.endDate,
      amount: this.amount,
      currency: this.currency,
      status: this.status,
      paymentDate: this.paymentDate,
      paymentMethod: this.paymentMethod,
      transactionId: this.transactionId,
      distributionDetails: this.distributionDetails,
      platformBreakdown: this.platformBreakdown,
      streamCount: this.streamCount,
      downloadCount: this.downloadCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      metadata: this.metadata,
    };
  }

  /**
   * Create a RoyaltyStatement instance from a plain object
   * @param {Object} data - Royalty statement data
   * @returns {RoyaltyStatement} - RoyaltyStatement instance
   */
  static fromObject(data) {
    return new RoyaltyStatement(data);
  }
}

export default RoyaltyStatement;

