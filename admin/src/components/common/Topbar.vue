<template>
  <header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-4 flex justify-between items-center shadow-sm sticky top-0 z-40">
    <!-- Page Title, dynamically updated from router meta -->
    <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">{{ $route.meta.title }}</h2>

    <div class="flex items-center space-x-4 space-x-reverse">
      <!-- Dark Mode Toggle Button -->
      <button @click="themeStore.toggleDarkMode" class="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 p-2 rounded-full transition-colors">
        <Sun v-if="themeStore.isDark" :size="22" />
        <Moon v-else :size="22" />
      </button>

      <!-- Notifications Button -->
      <div class="relative">
        <button class="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 p-2 rounded-full transition-colors">
          <Bell :size="22" />
        </button>
        <!-- Notification badge can be added here -->
      </div>

      <!-- User Profile & Logout -->
      <div class="relative">
        <button @click="authStore.logout" class="flex items-center space-x-2 space-x-reverse text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 p-2 rounded-full transition-colors">
          <LogOut :size="22" />
          <span class="hidden md:inline font-semibold">خروج</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useThemeStore } from '@/store/theme';
import { useAuthStore } from '@/store/auth';
import { Sun, Moon, Bell, LogOut } from 'lucide-vue-next';

const themeStore = useThemeStore();
const authStore = useAuthStore();
</script>
