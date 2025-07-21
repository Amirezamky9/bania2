<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="text-center p-16">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">در حال بارگذاری اطلاعات محصول...</p>
    </div>

    <!-- Product Not Found State -->
    <div v-else-if="!product" class="text-center p-16 bg-white rounded-lg shadow">
        <h1 class="text-2xl font-bold text-red-600">محصول یافت نشد</h1>
        <p class="text-gray-500 mt-2">متاسفانه محصولی با این مشخصات پیدا نکردیم.</p>
        <router-link :to="{name: 'Home'}" class="mt-6 inline-block bg-pink-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-700">
            بازگشت به صفحه اصلی
        </router-link>
    </div>

    <!-- Product Details -->
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- Image Gallery -->
        <div>
          <div class="bg-white p-4 rounded-lg shadow-md mb-4">
            <img :src="mainImage" :alt="product.name" class="w-full h-auto max-h-[500px] object-contain rounded-lg">
          </div>
          <div class="grid grid-cols-4 gap-2">
            <img 
              v-for="img in product.gallery" 
              :key="img" 
              :src="img" 
              @click="mainImage = img" 
              class="w-full h-24 object-cover rounded-md cursor-pointer border-2 transition"
              :class="mainImage === img ? 'border-pink-500' : 'border-transparent hover:border-pink-300'"
            >
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
          <p class="text-lg text-gray-500 mb-4">{{ product.brand }}</p>
          <div class="flex items-center mb-4">
            <div class="flex items-center text-yellow-500">
              <Star 
                v-for="i in 5" 
                :key="i" 
                :size="20" 
                class="fill-current" 
                :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-300'"
              />
            </div>
            <span class="mr-2 text-gray-600">({{ product.rating }})</span>
          </div>
          <p class="text-3xl font-bold text-pink-700 mb-6">{{ formattedPrice }} تومان</p>
          <p class="text-gray-600 leading-relaxed mb-6">{{ product.description }}</p>
          
          <!-- Add to Cart Controls -->
          <div class="flex items-center space-x-reverse space-x-4 mb-6">
            <div class="flex items-center border border-gray-300 rounded-lg">
              <button @click="quantity > 1 && quantity--" class="px-3 py-2 text-lg font-bold">-</button>
              <span class="px-4 py-2 font-semibold w-12 text-center">{{ quantity }}</span>
              <button @click="quantity++" class="px-3 py-2 text-lg font-bold">+</button>
            </div>
            <button @click="handleAddToCart" class="flex-grow bg-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors">
              افزودن به سبد خرید
            </button>
          </div>
          <div class="text-sm" :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
            {{ product.stock > 0 ? `${product.stock} عدد در انبار موجود است` : 'ناموجود' }}
          </div>
        </div>
      </div>

      <!-- Specs and Reviews Tabs -->
      <div class="mt-12">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-reverse space-x-8">
            <button @click="activeTab = 'specs'" :class="['py-4 px-1 border-b-2 font-medium text-lg', activeTab === 'specs' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
              مشخصات
            </button>
            <button @click="activeTab = 'reviews'" :class="['py-4 px-1 border-b-2 font-medium text-lg', activeTab === 'reviews' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
              نظرات کاربران
            </button>
          </nav>
        </div>
        <div class="mt-6 bg-white p-6 rounded-lg shadow">
          <div v-if="activeTab === 'specs'">
            <ul class="space-y-3">
              <li v-for="(value, key) in product.specs" :key="key" class="flex">
                <span class="font-semibold w-32 text-gray-600">{{ key }}:</span>
                <span class="text-gray-800">{{ value }}</span>
              </li>
            </ul>
          </div>
          <div v-if="activeTab === 'reviews'">
            <div v-for="review in product.reviews" :key="review.user" class="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0">
              <p class="font-semibold">{{ review.user }}</p>
              <div class="flex items-center my-1">
                <Star v-for="i in 5" :key="i" :size="16" class="fill-current" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"/>
              </div>
              <p class="text-gray-600">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue';
import { getProductDetails } from '@/services/productService';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/utils/formatters';
import { Star } from 'lucide-vue-next';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

const showToast = inject('showToast');
const cartStore = useCartStore();

const product = ref(null);
const loading = ref(true);
const quantity = ref(1);
const activeTab = ref('specs');
const mainImage = ref('');

const formattedPrice = computed(() => {
    return product.value ? formatPrice(product.value.price) : '';
});

function handleAddToCart() {
  if (product.value) {
    cartStore.addItem(product.value, quantity.value);
    showToast(`${quantity.value} عدد از "${product.value.name}" به سبد خرید اضافه شد.`);
  }
}

onMounted(async () => {
  loading.value = true;
  try {
    const productId = parseInt(props.id, 10);
    product.value = await getProductDetails(productId);
    if (product.value && product.value.gallery) {
      mainImage.value = product.value.gallery[0];
    }
  } catch (error) {
    console.error("Failed to load product details:", error);
    showToast('خطا در بارگذاری اطلاعات محصول', 'error');
  } finally {
    loading.value = false;
  }
});
</script>
