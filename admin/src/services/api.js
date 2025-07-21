/**
 * @file src/services/api.js
 * @description This file simulates a backend API.
 * In a real-world application, this would be replaced with actual API calls
 * using a library like Axios.
 */

// A simple function to simulate network delay
const _fetch = (data, delay = 500) => 
  new Promise(resolve => setTimeout(() => resolve(data), delay));

// --- MOCK DATABASE ---
// This data simulates what would be stored in a real database.
const MOCK_DB = {
  products: Array.from({ length: 15 }, (_, i) => ({
    id: 101 + i,
    title: `محصول شماره ${i + 1}`,
    description: 'توضیحات کامل برای محصول شماره ' + (i + 1),
    price: (20 + i) * 10000,
    stock: 10 + (i * 2),
    category: i % 2 === 0 ? 'مراقبت پوست' : 'آرایش صورت',
    status: i % 3 === 0 ? 'پیش‌نویس' : 'منتشر شده'
  })),
  orders: Array.from({ length: 10 }, (_, i) => ({
    id: 501 + i,
    customer: `کاربر ${i+1}`,
    date: `1403/04/${20-i}`,
    total: (150 + i * 10) * 1000,
    status: ['در حال پردازش', 'ارسال شده', 'تحویل داده شده', 'لغو شده'][i % 4]
  })),
  users: Array.from({ length: 8 }, (_, i) => ({
    id: 801 + i,
    name: `کاربر شماره ${i+1}`,
    email: `user${i+1}@example.com`,
    role: i === 0 ? 'ADMIN' : 'USER',
    status: i % 4 === 0 ? 'مسدود' : 'فعال'
  })),
  categories: [
    { id: 1, name: 'مراقبت پوست', parent: null, productCount: 15 },
    { id: 2, name: 'آرایش صورت', parent: null, productCount: 25 },
    { id: 3, name: 'کرم پودر', parent: 'آرایش صورت', productCount: 10 },
    { id: 4, name: 'عطر و ادکلن', parent: null, productCount: 8 },
  ],
  dashboardStats: {
    totalProducts: 125,
    totalOrders: 340,
    totalUsers: 89,
    totalRevenue: 45000000
  }
};

// --- MOCK API ENDPOINTS ---

export const mockApi = {
  login: (email, password) => {
    if (email === 'admin@bania.com' && password === 'admin123') {
      return _fetch({
        user: { id: 1, name: 'ادمین کل', email: 'admin@bania.com', role: 'ADMIN' },
        token: 'fake-jwt-admin-token-for-bania-store'
      });
    }
    return Promise.reject('ایمیل یا رمز عبور اشتباه است.');
  },

  getDashboardStats: () => _fetch(MOCK_DB.dashboardStats),
  getProducts: () => _fetch(MOCK_DB.products),
  getOrders: () => _fetch(MOCK_DB.orders),
  getUsers: () => _fetch(MOCK_DB.users),
  getCategories: () => _fetch(MOCK_DB.categories),
};

/*
// --- EXAMPLE OF REAL AXIOS IMPLEMENTATION ---
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.yourstore.com/v1',
  headers: {
    'Content-Type': 'application/json',
  }
});

// You can add an interceptor to automatically add the auth token
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('bania-admin-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
*/
