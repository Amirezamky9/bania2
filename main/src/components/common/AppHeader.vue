<template>
  <header class="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-40">
    <nav class="container mx-auto px-4 py-3 flex justify-between items-center">
      <!-- Logo -->
      <router-link :to="{ name: 'Home' }" class="text-3xl font-bold text-pink-700">Bania</router-link>

      <!-- Navigation Links (Desktop) -->
      <div class="hidden lg:flex items-center space-x-reverse space-x-6">
        <router-link :to="{ name: 'Home' }" class="text-gray-600 hover:text-pink-600 transition-colors">خانه</router-link>
        <router-link :to="{ name: 'Category', params: { id: 1 } }" class="text-gray-600 hover:text-pink-600 transition-colors">محصولات</router-link>
        <router-link :to="{ name: 'About' }" class="text-gray-600 hover:text-pink-600 transition-colors">درباره ما</router-link>
        <router-link :to="{ name: 'Contact' }" class="text-gray-600 hover:text-pink-600 transition-colors">تماس با ما</router-link>
      </div>

      <!-- Search & Icons -->
      <div class="flex items-center space-x-reverse space-x-4">
        <div class="relative hidden md:block">
          <input type="text" placeholder="جستجو در بنیا..." class="bg-gray-100 rounded-full py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-pink-400 w-48 lg:w-64 transition-all">
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search :size="20" />
          </span>
        </div>
        <router-link :to="{ name: 'Cart' }" class="relative text-gray-600 hover:text-pink-600">
          <ShoppingCart :size="24" />
          <span v-if="cartStore.totalItems > 0" class="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {{ cartStore.totalItems }}
          </span>
        </router-link>
        <button @click="handleUserIconClick" class="text-gray-600 hover:text-pink-600">
          <User :size="24" />
        </button>
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden text-gray-600 hover:text-pink-600">
          <Menu :size="24" />
        </button>
      </div>
    </nav>
    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="lg:hidden bg-white border-t border-gray-200">
      <router-link :to="{ name: 'Home' }" @click="mobileMenuOpen = false" class="block py-2 px-4 text-sm text-gray-700 hover:bg-pink-50">خانه</router-link>
      <router-link :to="{ name: 'Category', params: { id: 1 } }" @click="mobileMenuOpen = false" class="block py-2 px-4 text-sm text-gray-700 hover:bg-pink-50">محصولات</router-link>
      <router-link :to="{ name: 'About' }" @click="mobileMenuOpen = false" class="block py-2 px-4 text-sm text-gray-700 hover:bg-pink-50">درباره ما</router-link>
      <router-link :to="{ name: 'Contact' }" @click="mobileMenuOpen = false" class="block py-2 px-4 text-sm text-gray-700 hover:bg-pink-50">تماس با ما</router-link>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Search, ShoppingCart, User, Menu } from 'lucide-vue-next';
import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';

// This emit will be used to open the login modal in the parent component (App.vue)
const emit = defineEmits(['requestLogin']);

const cartStore = useCartStore();
const userStore = useUserStore();
const router = useRouter();

const mobileMenuOpen = ref(false);

function handleUserIconClick() {
  if (userStore.isLoggedIn) {
    router.push({ name: 'Account' });
  } else {
    emit('requestLogin');
  }
}
</script>
