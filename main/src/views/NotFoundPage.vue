<template>
  <div class="container mx-auto px-4 py-16 text-center">
    <h1 class="text-6xl font-bold text-pink-600">404</h1>
    <h2 class="text-3xl font-semibold text-gray-800 mt-4">صفحه مورد نظر یافت نشد</h2>
    <p class="text-gray-500 mt-2">متاسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد.</p>
    <router-link 
      :to="{ name: 'Home' }" 
      class="mt-8 inline-block bg-pink-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-700 transition-colors"
    >
      بازگشت به صفحه اصلی
    </router-link>
  </div>
</template>

<script setup>
// No script needed for this static page
</script>
