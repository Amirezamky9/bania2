/**
 * @file src/services/authService.js
 * @description Service layer for authentication-related operations.
 * This file acts as an intermediary between the UI components and the API layer.
 */

import { mockApi } from './api';

export const authService = {
  /**
   * Calls the login endpoint from the mock API.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<object>} - A promise that resolves with user and token data.
   */
  login(email, password) {
    // In a real app, this would call the actual API endpoint.
    // e.g., return apiClient.post('/auth/login', { email, password });
    return mockApi.login(email, password);
  },

  // You could add other auth-related functions here in the future,
  // such as register, forgotPassword, etc.
};
