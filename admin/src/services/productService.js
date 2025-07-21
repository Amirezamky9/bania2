/**
 * @file src/services/productService.js
 * @description Service layer for product, category, user, and order data.
 */

import { mockApi } from './api';
// import apiClient from './api'; // Uncomment this for real API calls

export const productService = {
  getDashboardStats() {
    // For now, we use the mock API.
    return mockApi.getDashboardStats();
    // In a real app: return apiClient.get('/dashboard/stats');
  },

  getProducts() {
    return mockApi.getProducts();
    // In a real app: return apiClient.get('/products');
  },

  getOrders() {
    return mockApi.getOrders();
    // In a real app: return apiClient.get('/orders');
  },

  getUsers() {
    return mockApi.getUsers();
    // In a real app: return apiClient.get('/users');
  },

  getCategories() {
    return mockApi.getCategories();
    // In a real app: return apiClient.get('/categories');
  },

  // In a real application, you would add functions for creating, updating,
  // and deleting items, for example:
  //
  // createProduct(productData) {
  //   return apiClient.post('/products', productData);
  // },
  //
  // updateProduct(productId, productData) {
  //   return apiClient.put(`/products/${productId}`, productData);
  // },
  //
  // deleteProduct(productId) {
  //   return apiClient.delete(`/products/${productId}`);
  // },
};
