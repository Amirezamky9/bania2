<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">سبد خرید شما</h1>

    <!-- Empty Cart View -->
    <div v-if="cartStore.items.length === 0" class="text-center bg-white p-12 rounded-lg shadow">
      <ShoppingCart :size="64" class="mx-auto text-gray-300" />
      <p class="mt-4 text-xl text-gray-500">سبد خرید شما خالی است.</p>
      <router-link 
        :to="{ name: 'Category', params: { id: 1 } }" 
        class="mt-6 inline-block bg-pink-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-700"
      >
        شروع خرید
      </router-link>
    </div>

    <!-- Cart with Items View -->
    <div v-else class="flex flex-col lg:flex-row gap-8">
      <!-- Cart Items List -->
      <div class="w-full lg:w-2/3 space-y-4">
        <div 
          v-for="item in cartStore.items" 
          :key="item.id" 
          class="bg-white p-4 rounded-lg shadow flex items-center"
        >
          <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded-md">
          <div class="mr-4 flex-grow">
            <h3 class="font-semibold">{{ item.name }}</h3>
            <p class="text-sm text-gray-500">{{ item.brand }}</p>
            <p class="text-pink-600 font-semibold mt-1">{{ formatPrice(item.price) }} تومان</p>
          </div>
          <div class="flex items-center">
            <input 
              type="number" 
              :value="item.quantity" 
              @input="cartStore.updateQuantity(item.id, parseInt($event.target.value, 10))" 
              min="1" 
              class="w-16 text-center border rounded-md mx-4 py-1"
            >
            <p class="w-32 text-left font-bold">{{ formatPrice(item.price * item.quantity) }} تومان</p>
            <button @click="cartStore.removeItem(item.id)" class="text-gray-400 hover:text-red-500 mr-4">
              <Trash2 :size="20" />
            </button>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="w-full lg:w-1/3">
        <div class="bg-white p-6 rounded-lg shadow sticky top-24">
          <h2 class="text-xl font-bold border-b pb-4 mb-4">خلاصه سفارش</h2>
          <div class="flex justify-between mb-2">
            <span>مجموع کالاها</span>
            <span>{{ formatPrice(cartStore.totalPrice) }} تومان</span>
          </div>
          <div class="flex justify-between mb-4">
            <span>هزینه ارسال</span>
            <span class="text-green-600">رایگان</span>
          </div>
          <div class="flex justify-between font-bold text-lg border-t pt-4">
            <span>مبلغ قابل پرداخت</span>
            <span>{{ formatPrice(cartStore.totalPrice) }} تومان</span>
          </div>
          <button @click="handleCheckout" class="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors">
            ادامه و ثبت سفارش
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';
import { formatPrice } from '@/utils/formatters';
import { ShoppingCart, Trash2 } from 'lucide-vue-next';

// This emit will be used to open the login modal in App.vue if the user is not logged in
const emit = defineEmits(['requestLogin']);

const cartStore = useCartStore();
const userStore = useUserStore();
const router = useRouter();

function handleCheckout() {
  if (userStore.isLoggedIn) {
    router.push({ name: 'Checkout' });
  } else {
    // Ask the parent component (App.vue) to show the login modal
    emit('requestLogin', () => {
      // This callback will be executed after a successful login
      router.push({ name: 'Checkout' });
    });
  }
}
</script>
