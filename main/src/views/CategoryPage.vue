<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Filters Sidebar -->
      <aside class="w-full md:w-1/4 lg:w-1/5">
        <div class="bg-white p-5 rounded-lg shadow sticky top-24">
          <h3 class="font-bold text-lg mb-4">فیلترها</h3>
          <!-- Categories Filter -->
          <div class="mb-6">
            <h4 class="font-semibold mb-2">دسته‌بندی</h4>
            <ul>
              <li v-for="cat in allCategories" :key="cat.id">
                <a 
                  href="#" 
                  @click.prevent="selectCategory(cat.id)"
                  class="py-1 block"
                  :class="selectedCategoryId === cat.id ? 'text-pink-600 font-bold' : 'text-gray-600 hover:text-pink-600'"
                >
                  {{ cat.name }}
                </a>
              </li>
            </ul>
          </div>
          <!-- Price Range Filter -->
          <div class="mb-6">
            <h4 class="font-semibold mb-2">محدوده قیمت</h4>
            <input type="range" class="w-full" min="0" max="5000000" step="100000">
            <div class="flex justify-between text-sm text-gray-500 mt-1">
              <span>۰</span>
              <span>۵,۰۰۰,۰۰۰</span>
            </div>
          </div>
          <!-- Brand Filter -->
          <div>
            <h4 class="font-semibold mb-2">برند</h4>
            <div class="space-y-2">
              <label class="flex items-center"><input type="checkbox" class="ml-2 rounded text-pink-500 focus:ring-pink-500"> نوتروژینا</label>
              <label class="flex items-center"><input type="checkbox" class="ml-2 rounded text-pink-500 focus:ring-pink-500"> اسنس</label>
              <label class="flex items-center"><input type="checkbox" class="ml-2 rounded text-pink-500 focus:ring-pink-500"> مک</label>
            </div>
          </div>
        </div>
      </aside>

      <!-- Products Grid -->
      <main class="w-full md:w-3/4 lg:w-4/5">
        <h1 class="text-3xl font-bold mb-6">
          {{ categoryName }}
        </h1>
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <SkeletonLoader v-for="n in 8" :key="n" />
        </div>
        <div v-else-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product" 
            @add-to-cart="handleAddToCart"
          />
        </div>
        <div v-else class="text-center py-16 bg-white rounded-lg shadow">
          <p class="text-xl text-gray-500">محصولی در این دسته یافت نشد.</p>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-10 flex justify-center items-center space-x-reverse space-x-2">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-4 py-2 bg-white rounded-md shadow disabled:opacity-50 disabled:cursor-not-allowed">
            قبلی
          </button>
          <button 
            v-for="page in totalPages" 
            :key="page" 
            @click="changePage(page)"
            :class="['px-4 py-2 rounded-md shadow', currentPage === page ? 'bg-pink-600 text-white' : 'bg-white']"
          >
            {{ page }}
          </button>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-4 py-2 bg-white rounded-md shadow disabled:opacity-50 disabled:cursor-not-allowed">
            بعدی
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getProducts, getCategories } from '@/services/productService';
import { useCartStore } from '@/store/cart';
import ProductCard from '@/components/common/ProductCard.vue';
import SkeletonLoader from '@/components/common/SkeletonLoader.vue';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

const showToast = inject('showToast');
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const products = ref([]);
const allCategories = ref([]);
const loading = ref(true);
const selectedCategoryId = ref(null);

const currentPage = ref(1);
const totalProducts = ref(0);
const productsPerPage = 8;

const totalPages = computed(() => Math.ceil(totalProducts.value / productsPerPage));
const categoryName = computed(() => {
  const found = allCategories.value.find(c => c.id === selectedCategoryId.value);
  return found ? found.name : 'همه محصولات';
});

async function fetchProducts(categoryId, page = 1) {
  loading.value = true;
  try {
    const data = await getProducts(categoryId, page, productsPerPage);
    products.value = data.products;
    totalProducts.value = data.total;
    currentPage.value = data.page;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    showToast('خطا در دریافت محصولات', 'error');
  } finally {
    loading.value = false;
  }
}

function handleAddToCart(product) {
  cartStore.addItem(product);
  showToast(`"${product.name}" به سبد خرید اضافه شد.`);
}

function selectCategory(categoryId) {
    router.push({ name: 'Category', params: { id: categoryId } });
}

function changePage(page) {
    if (page > 0 && page <= totalPages.value) {
        fetchProducts(selectedCategoryId.value, page);
    }
}

onMounted(async () => {
  selectedCategoryId.value = parseInt(props.id, 10);
  fetchProducts(selectedCategoryId.value, 1);
  
  try {
    allCategories.value = await getCategories();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
});

// Watch for changes in the route parameter (e.g., when clicking a new category)
watch(() => props.id, (newId) => {
  const newCategoryId = parseInt(newId, 10);
  selectedCategoryId.value = newCategoryId;
  fetchProducts(newCategoryId, 1);
});
</script>
