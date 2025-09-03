/**
 * Stripe service for payment processing and subscription management
 * This service integrates with the Stripe API for handling payments and subscriptions
 */

import api from './api';

// Stripe API endpoints
const ENDPOINTS = {
  SUBSCRIPTIONS: '/subscriptions',
  PAYMENT_METHODS: '/payment-methods',
  CHECKOUT: '/checkout',
  INVOICES: '/invoices',
  PRODUCTS: '/products',
  PRICES: '/prices',
  CUSTOMERS: '/customers',
};

/**
 * Stripe service for payment processing and subscription management
 */
const stripeService = {
  /**
   * Get available subscription plans
   * @returns {Promise<Array>} - List of subscription plans
   */
  getSubscriptionPlans: async () => {
    return api.get(ENDPOINTS.PRODUCTS, { type: 'subscription', active: true });
  },
  
  /**
   * Get prices for a specific product
   * @param {string} productId - Product ID
   * @returns {Promise<Array>} - List of prices for the product
   */
  getProductPrices: async (productId) => {
    return api.get(ENDPOINTS.PRICES, { product: productId, active: true });
  },
  
  /**
   * Create a checkout session for subscription
   * @param {string} priceId - Price ID
   * @param {string} customerId - Customer ID
   * @param {string} successUrl - URL to redirect on success
   * @param {string} cancelUrl - URL to redirect on cancel
   * @returns {Promise<Object>} - Checkout session
   */
  createCheckoutSession: async (priceId, customerId, successUrl, cancelUrl) => {
    return api.post(ENDPOINTS.CHECKOUT, {
      priceId,
      customerId,
      successUrl,
      cancelUrl,
      mode: 'subscription',
    });
  },
  
  /**
   * Create a checkout session for a one-time payment
   * @param {string} priceId - Price ID
   * @param {string} customerId - Customer ID
   * @param {string} successUrl - URL to redirect on success
   * @param {string} cancelUrl - URL to redirect on cancel
   * @returns {Promise<Object>} - Checkout session
   */
  createOneTimeCheckout: async (priceId, customerId, successUrl, cancelUrl) => {
    return api.post(ENDPOINTS.CHECKOUT, {
      priceId,
      customerId,
      successUrl,
      cancelUrl,
      mode: 'payment',
    });
  },
  
  /**
   * Get customer subscriptions
   * @param {string} customerId - Customer ID
   * @returns {Promise<Array>} - List of subscriptions
   */
  getCustomerSubscriptions: async (customerId) => {
    return api.get(`${ENDPOINTS.CUSTOMERS}/${customerId}/subscriptions`);
  },
  
  /**
   * Get customer payment methods
   * @param {string} customerId - Customer ID
   * @returns {Promise<Array>} - List of payment methods
   */
  getCustomerPaymentMethods: async (customerId) => {
    return api.get(`${ENDPOINTS.CUSTOMERS}/${customerId}/payment-methods`);
  },
  
  /**
   * Update subscription
   * @param {string} subscriptionId - Subscription ID
   * @param {Object} data - Subscription update data
   * @returns {Promise<Object>} - Updated subscription
   */
  updateSubscription: async (subscriptionId, data) => {
    return api.patch(`${ENDPOINTS.SUBSCRIPTIONS}/${subscriptionId}`, data);
  },
  
  /**
   * Cancel subscription
   * @param {string} subscriptionId - Subscription ID
   * @returns {Promise<Object>} - Canceled subscription
   */
  cancelSubscription: async (subscriptionId) => {
    return api.delete(`${ENDPOINTS.SUBSCRIPTIONS}/${subscriptionId}`);
  },
  
  /**
   * Get customer invoices
   * @param {string} customerId - Customer ID
   * @returns {Promise<Array>} - List of invoices
   */
  getCustomerInvoices: async (customerId) => {
    return api.get(ENDPOINTS.INVOICES, { customer: customerId });
  },
  
  /**
   * Get invoice details
   * @param {string} invoiceId - Invoice ID
   * @returns {Promise<Object>} - Invoice details
   */
  getInvoice: async (invoiceId) => {
    return api.get(`${ENDPOINTS.INVOICES}/${invoiceId}`);
  },
  
  /**
   * Create a payment intent for a sample license
   * @param {string} sampleId - Sample ID
   * @param {string} customerId - Customer ID
   * @param {Object} licenseOptions - License options
   * @returns {Promise<Object>} - Payment intent
   */
  createSampleLicensePayment: async (sampleId, customerId, licenseOptions) => {
    return api.post('/sample-licenses', {
      sampleId,
      customerId,
      licenseOptions,
    });
  },
  
  /**
   * Get license purchase history
   * @param {string} customerId - Customer ID
   * @returns {Promise<Array>} - List of license purchases
   */
  getLicensePurchaseHistory: async (customerId) => {
    return api.get('/sample-licenses', { customerId });
  },
};

export default stripeService;

