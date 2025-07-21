<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">پنل کاربری</h1>
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Sidebar Navigation -->
      <aside class="w-full md:w-1/4">
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="text-center mb-4">
              <img src="https://placehold.co/100x100/f8bbd0/4a148c?text=User" alt="User Avatar" class="w-24 h-24 rounded-full mx-auto mb-2 border-4 border-pink-200">
              <p class="font-bold text-lg">{{ userStore.userName }}</p>
              <p class="text-sm text-gray-500">{{ userStore.userEmail }}</p>
          </div>
          <nav class="mt-6 space-y-1">
            <button 
              @click="activeTab = 'orders'" 
              :class="['w-full text-right p-3 rounded-lg flex items-center', activeTab === 'orders' ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100']"
            >
              <Package :size="20" class="ml-2"/> سفارش‌های من
            </button>
            <button 
              @click="activeTab = 'profile'" 
              :class="['w-full text-right p-3 rounded-lg flex items-center', activeTab === 'profile' ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100']"
            >
              <User :size="20" class="ml-2"/> ویرایش پروفایل
            </button>
            <button 
              @click="activeTab = 'addresses'" 
              :class="['w-full text-right p-3 rounded-lg flex items-center', activeTab === 'addresses' ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100']"
            >
              <MapPin :size="20" class="ml-2"/> آدرس‌ها
            </button>
            <button 
              @click="activeTab = 'favorites'" 
              :class="['w-full text-right p-3 rounded-lg flex items-center', activeTab === 'favorites' ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100']"
            >
              <Heart :size="20" class="ml-2"/> لیست علاقه‌مندی‌ها
            </button>
             <button 
              @click="handleLogout" 
              class="w-full text-right p-3 rounded-lg flex items-center text-red-600 hover:bg-red-50"
            >
              <LogOut :size="20" class="ml-2"/> خروج از حساب
            </button>
          </nav>
        </div>
      </aside>
      <!-- Main Content -->
      <main class="w-full md:w-3/4 bg-white p-6 rounded-lg shadow">
        <div v-if="activeTab === 'orders'">
          <h2 class="text-xl font-bold mb-4">سفارش‌های من</h2>
          <p class="text-gray-500">شما هنوز سفارشی ثبت نکرده‌اید.</p>
        </div>
        <div v-if="activeTab === 'profile'">
          <h2 class="text-xl font-bold mb-4">ویرایش پروفایل</h2>
          <p class="text-gray-500">این بخش در حال ساخت است.</p>
        </div>
        <div v-if="activeTab === 'addresses'">
          <h2 class="text-xl font-bold mb-4">آدرس‌ها</h2>
          <p class="text-gray-500">شما هنوز آدرسی ثبت نکرده‌اید.</p>
        </div>
        <div v-if="activeTab === 'favorites'">
          <h2 class="text-xl font-bold mb-4">لیست علاقه‌مندی‌ها</h2>
          <p class="text-gray-500">شما هنوز محصولی را به علاقه‌مندی‌ها اضافه نکرده‌اید.</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { Package, User, MapPin, Heart, LogOut } from 'lucide-vue-next';

const userStore = useUserStore();
const router = useRouter();
const activeTab = ref('orders');

function handleLogout() {
    userStore.handleLogout();
    router.push({ name: 'Home' });
}
</script>
