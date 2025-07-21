import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import AdminLayout from '@/layouts/AdminLayout.vue'
import LoginPage from '@/views/LoginPage.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import ProductsPage from '@/views/ProductsPage.vue'
import CategoriesPage from '@/views/CategoriesPage.vue'
import OrdersPage from '@/views/OrdersPage.vue'
import UsersPage from '@/views/UsersPage.vue'
import SettingsPage from '@/views/SettingsPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      title: 'ورود',
      requiresAuth: false
    }
  },
  {
    path: '/',
    component: AdminLayout,
    redirect: '/dashboard',
    meta: {
      requiresAuth: true
    },
    children: [
      { path: 'dashboard', name: 'dashboard', component: DashboardPage, meta: { title: 'داشبورد' } },
      { path: 'products', name: 'products', component: ProductsPage, meta: { title: 'مدیریت محصولات' } },
      { path: 'categories', name: 'categories', component: CategoriesPage, meta: { title: 'مدیریت دسته‌بندی‌ها' } },
      { path: 'orders', name: 'orders', component: OrdersPage, meta: { title: 'مدیریت سفارشات' } },
      { path: 'users', name: 'users', component: UsersPage, meta: { title: 'مدیریت کاربران' } },
      { path: 'settings', name: 'settings', component: SettingsPage, meta: { title: 'تنظیمات' } },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
    meta: {
      title: 'صفحه یافت نشد'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  // We need to initialize the store here because the router is set up before the app
  const authStore = useAuthStore();

  document.title = `${to.meta.title} | پنل مدیریت بنیا`;

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // If the route requires auth and the user is not logged in, redirect to the login page.
    next({ name: 'login' });
  } else if (to.name === 'login' && authStore.isLoggedIn) {
    // If the user is already logged in and tries to access the login page, redirect to the dashboard.
    next({ name: 'dashboard' });
  } else {
    // Otherwise, allow navigation.
    next();
  }
});

export default router;
