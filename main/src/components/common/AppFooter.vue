<template>
  <footer class="bg-gray-800 text-white mt-16">
    <div class="container mx-auto px-6 py-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- About Section -->
        <div>
          <h3 class="text-lg font-semibold mb-4">فروشگاه بنیا</h3>
          <p class="text-gray-400 text-sm">
            مرجع تخصصی محصولات آرایشی، بهداشتی و عطر و ادکلن اورجینال. بهترین‌ها را برای شما گردآوری کرده‌ایم.
          </p>
        </div>
        <!-- Useful Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">لینک‌های مفید</h3>
          <ul class="space-y-2">
            <li><router-link :to="{ name: 'Faq' }" class="text-gray-400 hover:text-white text-sm">سوالات متداول</router-link></li>
            <li><router-link :to="{ name: 'Terms' }" class="text-gray-400 hover:text-white text-sm">قوانین و مقررات</router-link></li>
            <li><router-link :to="{ name: 'Contact' }" class="text-gray-400 hover:text-white text-sm">پیگیری سفارش</router-link></li>
          </ul>
        </div>
        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">با ما در ارتباط باشید</h3>
          <p class="text-gray-400 text-sm">تهران، خیابان ولیعصر، بالاتر از پارک ساعی</p>
          <p class="text-gray-400 text-sm mt-2">info@bania.com</p>
          <div class="flex space-x-reverse space-x-4 mt-4">
            <a href="#" class="text-gray-400 hover:text-white"><Instagram :size="20"/></a>
            <a href="#" class="text-gray-400 hover:text-white"><Send :size="20"/></a>
            <a href="#" class="text-gray-400 hover:text-white"><Twitter :size="20"/></a>
          </div>
        </div>
        <!-- Newsletter -->
        <div>
          <h3 class="text-lg font-semibold mb-4">عضویت در خبرنامه</h3>
          <p class="text-gray-400 text-sm mb-3">از آخرین تخفیف‌ها و محصولات جدید باخبر شوید.</p>
          <form @submit.prevent class="flex">
            <input type="email" placeholder="ایمیل شما" class="w-full bg-gray-700 text-white rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500">
            <button class="bg-pink-600 text-white px-4 py-2 rounded-l-lg hover:bg-pink-700">ثبت</button>
          </form>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} تمامی حقوق برای فروشگاه بنیا محفوظ است.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Instagram, Send, Twitter } from 'lucide-vue-next';
</script>
