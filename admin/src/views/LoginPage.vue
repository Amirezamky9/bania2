<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
    <div class="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h1 class="text-3xl font-bold text-center text-pink-600">ورود به پنل مدیریت</h1>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="text-sm font-bold text-gray-600 dark:text-gray-300 block mb-2">ایمیل</label>
          <div class="relative">
            <input
              v-model="email"
              id="email"
              type="email"
              class="w-full p-3 pr-10 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-pink-500 focus:border-pink-500 transition"
              required
              placeholder="admin@bania.com"
            />
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail class="h-5 w-5 text-gray-400" />
            </span>
          </div>
        </div>
        <div>
          <label for="password" class="text-sm font-bold text-gray-600 dark:text-gray-300 block mb-2">رمز عبور</label>
           <div class="relative">
            <input
              v-model="password"
              id="password"
              type="password"
              class="w-full p-3 pr-10 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-pink-500 focus:border-pink-500 transition"
              required
              placeholder="••••••••"
            />
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock class="h-5 w-5 text-gray-400" />
            </span>
          </div>
        </div>
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span v-if="loading" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            <span v-else>ورود</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { Mail, Lock } from 'lucide-vue-next';

const authStore = useAuthStore();

const email = ref('admin@bania.com');
const password = ref('admin123');
const loading = ref(false);

const handleLogin = async () => {
  if (loading.value) return;
  loading.value = true;
  await authStore.login({ email: email.value, password: password.value });
  loading.value = false;
};
</script>
