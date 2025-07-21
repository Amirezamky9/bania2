<template>
  <div class="flex flex-col items-center justify-center h-full text-center p-4">
    <div class="text-pink-500">
      <Unplug class="h-24 w-24" />
    </div>
    <h1 class="text-6xl font-bold text-gray-800 dark:text-gray-200 mt-4">404</h1>
    <h2 class="text-2xl font-semibold mt-4 text-gray-700 dark:text-gray-300">صفحه مورد نظر یافت نشد</h2>
    <p class="text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
      متاسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد یا آدرس آن تغییر کرده است.
    </p>
    <router-link
      :to="{ name: 'dashboard' }"
      class="mt-8 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center"
    >
      <Home class="ml-2" :size="20" />
      <span>بازگشت به داشبورد</span>
    </router-link>
  </div>
</template>

<script setup>
import { Unplug, Home } from 'lucide-vue-next';
</script>
