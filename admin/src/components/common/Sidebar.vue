<template>
  <!-- Main sidebar for desktop -->
  <aside class="bg-white dark:bg-gray-800 w-64 h-full shadow-lg flex-col hidden lg:flex transition-colors duration-300">
    <div class="p-6 text-center border-b dark:border-gray-700">
      <h1 class="text-2xl font-bold text-pink-600">پنل ادمین بنیا</h1>
    </div>
    <nav class="flex-grow p-4 space-y-2">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="{ name: item.name }"
        class="flex items-center px-4 py-2.5 rounded-lg transition-colors"
        active-class="bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 font-semibold"
        :class="'hover:bg-gray-100 dark:hover:bg-gray-700'"
      >
        <component :is="item.icon" :size="20" class="ml-3" />
        <span>{{ item.label }}</span>
      </router-link>
    </nav>
    <div class="p-4 border-t dark:border-gray-700 text-center">
        <p class="text-xs text-gray-500">نسخه 1.0.0</p>
    </div>
  </aside>

  <!-- TODO: Add mobile sidebar with off-canvas behavior -->
</template>

<script setup>
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Settings,
} from 'lucide-vue-next';

const menuItems = [
  { name: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
  { name: 'products', label: 'محصولات', icon: Package },
  { name: 'categories', label: 'دسته‌بندی‌ها', icon: FolderTree },
  { name: 'orders', label: 'سفارشات', icon: ShoppingCart },
  { name: 'users', label: 'کاربران', icon: Users },
  { name: 'settings', label: 'تنظیمات', icon: Settings },
];
</script>
