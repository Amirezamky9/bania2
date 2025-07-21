<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/utils/formatters';
// 1. apiClient را از فایل مرکزی وارد می‌کنیم
import apiClient from '@/services/api';

const showToast = inject('showToast');
const cartStore = useCartStore();
const router = useRouter();

async function handlePlaceOrder() {
    // // کد زیر را برای اتصال به بک‌اند از حالت کامنت خارج کنید
    // try {
    //     const orderData = {
    //         items: cartStore.items.map(item => ({ productId: item.id, quantity: item.quantity })),
    //         totalPrice: cartStore.totalPrice,
    //         // ... سایر اطلاعات فرم
    //     };
        
    //     // حالا از apiClient استفاده می‌کنیم.
    //     // نیازی به ارسال دستی توکن نیست، api.js این کار را خودکار انجام می‌دهد.
    //     await apiClient.post('/orders/create', orderData);

    //     showToast('سفارش شما با موفقیت ثبت شد!', 'success');
    //     cartStore.clearCart();
    //     router.push({ name: 'Home' });

    // } catch (error) {
    //     console.error("Error placing order:", error);
    //     showToast(error.response?.data?.message || 'خطا در ثبت سفارش', 'error');
    // }


    // کد ساختگی زیر را حذف کنید
    showToast('سفارش شما با موفقیت ثبت شد!', 'success');
    cartStore.clearCart();
    setTimeout(() => router.push({ name: 'Home' }), 2000);
}
</script>

<template>
  <!-- ... بخش template بدون تغییر باقی می‌ماند ... -->
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-center">تکمیل سفارش</h1>
    <div v-if="cartStore.items.length === 0" class="text-center">
        <p>سبد خرید شما برای تسویه حساب خالی است.</p>
        <router-link :to="{name: 'Home'}" class="text-pink-600">بازگشت به فروشگاه</router-link>
    </div>
    <div v-else class="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
      <!-- Shipping Information -->
      <div class="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-bold mb-4">اطلاعات ارسال</h2>
        <form @submit.prevent="handlePlaceOrder" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="نام" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400">
          <input type="text" placeholder="نام خانوادگی" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400">
          <input type="text" placeholder="شماره موبایل" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 md:col-span-2">
          <input type="text" placeholder="آدرس دقیق" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 md:col-span-2">
          <input type="text" placeholder="کد پستی" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400">
          <input type="text" placeholder="شهر" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400">
        </form>
      </div>

      <!-- Order Summary -->
      <div class="w-full lg:w-1/3">
        <div class="bg-white p-6 rounded-lg shadow sticky top-24">
          <h2 class="text-xl font-bold mb-4">خلاصه سفارش</h2>
          <div 
            v-for="item in cartStore.items" 
            :key="item.id" 
            class="flex justify-between text-sm mb-2"
          >
            <span class="truncate pr-2">{{ item.name }} ({{item.quantity}} عدد)</span>
            <span class="flex-shrink-0">{{ formatPrice(item.price * item.quantity) }}</span>
          </div>
          <div class="border-t mt-4 pt-4">
            <div class="flex justify-between font-bold">
              <span>جمع کل</span>
              <span>{{ formatPrice(cartStore.totalPrice) }} تومان</span>
            </div>
          </div>
          <h3 class="font-bold mt-6 mb-2">روش پرداخت</h3>
          <div class="space-y-2">
            <label class="flex items-center p-3 border rounded-lg cursor-pointer has-[:checked]:bg-pink-50 has-[:checked]:border-pink-400">
              <input type="radio" name="payment" class="ml-2" checked> پرداخت آنلاین
            </label>
            <label class="flex items-center p-3 border rounded-lg cursor-pointer has-[:checked]:bg-pink-50 has-[:checked]:border-pink-400">
              <input type="radio" name="payment" class="ml-2"> پرداخت در محل
            </label>
          </div>
          <button @click="handlePlaceOrder" class="w-full mt-6 bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-700">
            پرداخت و ثبت نهایی
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
