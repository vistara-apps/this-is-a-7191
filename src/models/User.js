/**
 * User model
 * Represents a user in the application
 */

/**
 * User class
 */
class User {
  /**
   * Create a new User instance
   * @param {Object} data - User data
   */
  constructor(data = {}) {
    this.userId = data.userId || '';
    this.email = data.email || '';
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.displayName = data.displayName || '';
    this.profileImage = data.profileImage || '';
    this.subscriptionTier = data.subscriptionTier || 'free';
    this.subscriptionStatus = data.subscriptionStatus || 'inactive';
    this.subscriptionExpiry = data.subscriptionExpiry || null;
    this.paymentInfo = data.paymentInfo || null;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.lastLoginAt = data.lastLoginAt || null;
    this.preferences = data.preferences || {};
    this.isEmailVerified = data.isEmailVerified || false;
    this.isActive = data.isActive !== undefined ? data.isActive : true;
  }

  /**
   * Get user's full name
   * @returns {string} - Full name
   */
  get fullName() {
    if (this.firstName && this.lastName) {
      return `${this.firstName} ${this.lastName}`;
    }
    return this.displayName || this.email.split('@')[0];
  }

  /**
   * Check if user has an active subscription
   * @returns {boolean} - Whether user has an active subscription
   */
  hasActiveSubscription() {
    return this.subscriptionStatus === 'active';
  }

  /**
   * Check if user has a specific subscription tier
   * @param {string} tier - Subscription tier to check
   * @returns {boolean} - Whether user has the specified tier
   */
  hasSubscriptionTier(tier) {
    if (!this.hasActiveSubscription()) {
      return false;
    }

    // Tier hierarchy: free < basic < pro < enterprise
    const tierHierarchy = {
      free: 0,
      basic: 1,
      pro: 2,
      enterprise: 3,
    };

    const userTierLevel = tierHierarchy[this.subscriptionTier] || 0;
    const requiredTierLevel = tierHierarchy[tier] || 0;

    return userTierLevel >= requiredTierLevel;
  }

  /**
   * Check if user's subscription is expiring soon (within 7 days)
   * @returns {boolean} - Whether subscription is expiring soon
   */
  isSubscriptionExpiringSoon() {
    if (!this.subscriptionExpiry) {
      return false;
    }

    const expiryDate = new Date(this.subscriptionExpiry);
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return expiryDate > now && expiryDate <= sevenDaysFromNow;
  }

  /**
   * Get user's initials for avatar
   * @returns {string} - User initials
   */
  get initials() {
    if (this.firstName && this.lastName) {
      return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`.toUpperCase();
    }
    if (this.displayName) {
      const parts = this.displayName.split(' ');
      if (parts.length >= 2) {
        return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
      }
      return this.displayName.charAt(0).toUpperCase();
    }
    return this.email.charAt(0).toUpperCase();
  }

  /**
   * Convert User instance to plain object
   * @returns {Object} - Plain object representation
   */
  toObject() {
    return {
      userId: this.userId,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      displayName: this.displayName,
      profileImage: this.profileImage,
      subscriptionTier: this.subscriptionTier,
      subscriptionStatus: this.subscriptionStatus,
      subscriptionExpiry: this.subscriptionExpiry,
      paymentInfo: this.paymentInfo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastLoginAt: this.lastLoginAt,
      preferences: this.preferences,
      isEmailVerified: this.isEmailVerified,
      isActive: this.isActive,
    };
  }

  /**
   * Create a User instance from a plain object
   * @param {Object} data - User data
   * @returns {User} - User instance
   */
  static fromObject(data) {
    return new User(data);
  }
}

export default User;

