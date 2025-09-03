/**
 * LicenseAgreement model
 * Represents a license agreement for a sample
 */

/**
 * LicenseAgreement class
 */
class LicenseAgreement {
  /**
   * Create a new LicenseAgreement instance
   * @param {Object} data - License agreement data
   */
  constructor(data = {}) {
    this.agreementId = data.agreementId || '';
    this.projectId = data.projectId || '';
    this.sampleId = data.sampleId || '';
    this.licensee = data.licensee || {}; // User who licensed the sample
    this.licensor = data.licensor || {}; // User who owns the sample
    this.terms = data.terms || {};
    this.licenseType = data.licenseType || 'standard'; // standard, exclusive, custom
    this.usageRights = data.usageRights || [];
    this.restrictions = data.restrictions || [];
    this.fee = data.fee || 0; // One-time fee
    this.royaltyRate = data.royaltyRate || 0; // Percentage
    this.creditRequirement = data.creditRequirement || '';
    this.territory = data.territory || 'worldwide';
    this.startDate = data.startDate || new Date().toISOString();
    this.endDate = data.endDate || null; // null means perpetual
    this.status = data.status || 'pending'; // pending, active, expired, terminated
    this.paymentStatus = data.paymentStatus || 'unpaid'; // unpaid, paid, refunded
    this.paymentDate = data.paymentDate || null;
    this.paymentMethod = data.paymentMethod || '';
    this.transactionId = data.transactionId || '';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.metadata = data.metadata || {};
  }

  /**
   * Check if license is active
   * @returns {boolean} - Whether license is active
   */
  isActive() {
    if (this.status !== 'active') {
      return false;
    }
    
    if (!this.endDate) {
      return true; // Perpetual license
    }
    
    const now = new Date();
    const endDate = new Date(this.endDate);
    
    return now <= endDate;
  }

  /**
   * Check if license is expired
   * @returns {boolean} - Whether license is expired
   */
  isExpired() {
    if (!this.endDate) {
      return false; // Perpetual license never expires
    }
    
    const now = new Date();
    const endDate = new Date(this.endDate);
    
    return now > endDate;
  }

  /**
   * Check if license is pending
   * @returns {boolean} - Whether license is pending
   */
  isPending() {
    return this.status === 'pending';
  }

  /**
   * Get license duration in days
   * @returns {number|string} - Duration in days or 'perpetual'
   */
  getDuration() {
    if (!this.endDate) {
      return 'perpetual';
    }
    
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    
    const durationMs = endDate - startDate;
    const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
    
    return durationDays;
  }

  /**
   * Get formatted fee
   * @returns {string} - Formatted fee
   */
  getFormattedFee() {
    return `$${this.fee.toFixed(2)}`;
  }

  /**
   * Get formatted royalty rate
   * @returns {string} - Formatted royalty rate
   */
  getFormattedRoyaltyRate() {
    return `${this.royaltyRate}%`;
  }

  /**
   * Check if payment is complete
   * @returns {boolean} - Whether payment is complete
   */
  isPaymentComplete() {
    return this.paymentStatus === 'paid';
  }

  /**
   * Convert LicenseAgreement instance to plain object
   * @returns {Object} - Plain object representation
   */
  toObject() {
    return {
      agreementId: this.agreementId,
      projectId: this.projectId,
      sampleId: this.sampleId,
      licensee: this.licensee,
      licensor: this.licensor,
      terms: this.terms,
      licenseType: this.licenseType,
      usageRights: this.usageRights,
      restrictions: this.restrictions,
      fee: this.fee,
      royaltyRate: this.royaltyRate,
      creditRequirement: this.creditRequirement,
      territory: this.territory,
      startDate: this.startDate,
      endDate: this.endDate,
      status: this.status,
      paymentStatus: this.paymentStatus,
      paymentDate: this.paymentDate,
      paymentMethod: this.paymentMethod,
      transactionId: this.transactionId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      metadata: this.metadata,
    };
  }

  /**
   * Create a LicenseAgreement instance from a plain object
   * @param {Object} data - License agreement data
   * @returns {LicenseAgreement} - LicenseAgreement instance
   */
  static fromObject(data) {
    return new LicenseAgreement(data);
  }
}

export default LicenseAgreement;

