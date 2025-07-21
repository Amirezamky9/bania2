<template>
  <div>
    <!-- Hero Slider Section -->
    <section class="relative h-64 md:h-[500px] bg-gray-200 overflow-hidden">
      <transition-group name="fade" tag="div">
        <div 
          v-for="(slide, index) in heroSlider.slides" 
          :key="index" 
          v-show="heroSlider.current === index" 
          class="absolute inset-0"
        >
          <img :src="slide.image" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div class="text-center text-white p-4">
              <h1 class="text-3xl md:text-5xl font-bold drop-shadow-lg">{{ slide.title }}</h1>
              <p class="mt-4 text-lg md:text-xl drop-shadow-md">{{ slide.subtitle }}</p>
              <button @click="goToProducts" class="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full transition-colors">
                مشاهده محصولات
              </button>
            </div>
          </div>
        </div>
      </transition-group>
      <button @click="prevSlide" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white transition-colors">
        <ChevronLeft :size="24" class="text-gray-800" />
      </button>
      <button @click="nextSlide" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white transition-colors">
        <ChevronRight :size="24" class="text-gray-800" />
      </button>
    </section>

    <!-- Popular Categories Section -->
    <section class="container mx-auto px-4 py-12">
      <h2 class="text-2xl font-bold text-center mb-8">دسته‌بندی‌های محبوب</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div 
          v-for="category in categories" 
          :key="category.id" 
          @click="router.push({ name: 'Category', params: { id: category.id } })"
          class="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          <p class="font-semibold">{{ category.name }}</p>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="bg-pink-50 py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-8">محصولات ویژه</h2>
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonLoader v-for="n in 4" :key="n" />
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id" 
            :product="product" 
            @add-to-cart="handleAddToCart" 
          />
        </div>
      </div>
    </section>

    <!-- Promo Banners Section -->
    <section class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-purple-200 rounded-lg p-8 flex items-center justify-between">
          <div>
            <h3 class="text-2xl font-bold text-purple-800">مراقبت از پوست</h3>
            <p class="text-purple-700 mt-2">راز جوانی پوست شما</p>
          </div>
          <img src="https://placehold.co/150x100/d8b4fe/581c87?text=Skin" class="rounded-lg"/>
        </div>
        <div class="bg-rose-200 rounded-lg p-8 flex items-center justify-between">
          <div>
            <h3 class="text-2xl font-bold text-rose-800">عطر و ادکلن</h3>
            <p class="text-rose-700 mt-2">امضای شخصی شما</p>
          </div>
          <img src="https://placehold.co/150x100/fbcfe8/831843?text=Perfume" class="rounded-lg"/>
        </div>
      </div>
    </section>

    <!-- New Arrivals Section -->
    <section class="bg-white py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-8">جدیدترین محصولات</h2>
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonLoader v-for="n in 4" :key="n" />
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in newArrivals" 
            :key="product.id" 
            :product="product" 
            @add-to-cart="handleAddToCart" 
          />
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="bg-pink-700 text-white py-12">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold">به خانواده بنیا بپیوندید</h2>
        <p class="mt-2 mb-6 max-w-xl mx-auto">با عضویت در خبرنامه ما، از جدیدترین تخفیف‌ها، محصولات و مقالات آموزشی مطلع شوید.</p>
        <form @submit.prevent class="max-w-md mx-auto flex">
          <input type="email" placeholder="آدرس ایمیل خود را وارد کنید" class="w-full rounded-r-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400">
          <button class="bg-gray-800 text-white font-semibold px-6 py-3 rounded-l-lg hover:bg-gray-900">عضویت</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import { getProducts, getCategories } from '@/services/productService';
import { useCartStore } from '@/store/cart';
import ProductCard from '@/components/common/ProductCard.vue';
import SkeletonLoader from '@/components/common/SkeletonLoader.vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

// Injected from App.vue
const showToast = inject('showToast');

const router = useRouter();
const cartStore = useCartStore();

const featuredProducts = ref([]);
const newArrivals = ref([]);
const categories = ref([]);
const loading = ref(true);

const heroSlider = reactive({
  slides: [
    { title: 'تخفیف ویژه تابستان', subtitle: 'تا 40% تخفیف برای محصولات منتخب پوستی', image: 'https://placehold.co/1200x500/fecdd3/881337?text=Summer+Sale' },
    { title: 'جدیدترین عطرهای زنانه', subtitle: 'رایحه‌ای که شما را متمایز می‌کند', image: 'https://placehold.co/1200x500/f5d0fe/701a75?text=New+Perfumes' },
    { title: 'آرایشی بی‌نقص با ما', subtitle: 'بهترین برندهای آرایشی در بنیا', image: 'https://placehold.co/1200x500/d8b4fe/581c87?text=Perfect+Makeup' },
  ],
  current: 0,
});

let slideInterval = null;

const nextSlide = () => {
  heroSlider.current = (heroSlider.current + 1) % heroSlider.slides.length;
};

const prevSlide = () => {
  heroSlider.current = (heroSlider.current - 1 + heroSlider.slides.length) % heroSlider.slides.length;
};

const goToProducts = () => {
    router.push({ name: 'Category', params: { id: 1 } });
};

function handleAddToCart(product) {
  cartStore.addItem(product);
  showToast(`"${product.name}" به سبد خرید اضافه شد.`);
}

onMounted(async () => {
  loading.value = true;
  try {
    const [productsData, categoriesData] = await Promise.all([
      getProducts(null, 1, 8),
      getCategories()
    ]);
    featuredProducts.value = productsData.products.slice(0, 4);
    newArrivals.value = productsData.products.slice(4, 8);
    categories.value = categoriesData;
  } catch (error) {
    console.error("Failed to load home page data:", error);
    showToast('خطا در بارگذاری اطلاعات', 'error');
  } finally {
    loading.value = false;
  }

  // Start the slider interval
  slideInterval = setInterval(nextSlide, 5000);
});

// Clear interval when component is unmounted
import { onUnmounted } from 'vue';
onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
});
</script>
