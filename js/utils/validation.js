/**
 * VALIDATION UTILITIES
 * Validation functions for forms and inputs
 */

const Validation = {
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean}
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number (Russian format)
   * @param {string} phone - Phone number to validate
   * @returns {boolean}
   */
  isValidPhone(phone) {
    const phoneRegex = /^\+?[78][-\(]?(\d{3})\)?-?(\d{3})-?(\d{2})-?(\d{2})$/;
    return phoneRegex.test(phone);
  },

  /**
   * Validate required field
   * @param {string} value - Value to validate
   * @returns {boolean}
   */
  isRequired(value) {
    return value !== null && value !== undefined && value.trim() !== '';
  },

  /**
   * Validate min length
   * @param {string} value - Value to validate
   * @param {number} minLength - Minimum length
   * @returns {boolean}
   */
  hasMinLength(value, minLength) {
    return value.length >= minLength;
  },

  /**
   * Validate max length
   * @param {string} value - Value to validate
   * @param {number} maxLength - Maximum length
   * @returns {boolean}
   */
  hasMaxLength(value, maxLength) {
    return value.length <= maxLength;
  },

  /**
   * Validate number range
   * @param {number} value - Value to validate
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {boolean}
   */
  isInRange(value, min, max) {
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
  },

  /**
   * Validate promo code format
   * @param {string} code - Promo code to validate
   * @returns {boolean}
   */
  isValidPromoCode(code) {
    const promoRegex = /^[A-Z0-9]{4,20}$/;
    return promoRegex.test(code);
  }
};

export default Validation;
