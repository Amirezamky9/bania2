<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <div class="relative">
      <img 
        :src="product.image" 
        :alt="product.name" 
        class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
        loading="lazy"
        @click="navigateToProduct"
      >
      <div class="absolute top-0 right-0 bg-pink-500 text-white text-xs font-bold px-2 py-1 m-2 rounded-md">جدید</div>
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
        <button @click.stop="onAddToCart" class="bg-white text-pink-600 font-semibold px-4 py-2 rounded-full text-sm hover:bg-pink-100 transition-colors">
          افزودن به سبد
        </button>
      </div>
    </div>
    <div class="p-4 text-center cursor-pointer" @click="navigateToProduct">
      <h3 class="font-semibold text-gray-800 truncate" :title="product.name">{{ product.name }}</h3>
      <p class="text-pink-600 font-bold my-2">{{ formattedPrice }} تومان</p>
      <div class="flex justify-center items-center text-sm text-gray-500">
        <span>{{ product.rating }}</span>
        <Star :size="16" class="text-yellow-400 fill-current mr-1" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Star } from 'lucide-vue-next';
import { formatPrice } from '@/utils/formatters';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['addToCart']);

const router = useRouter();

const formattedPrice = computed(() => formatPrice(props.product.price));

function navigateToProduct() {
  router.push({ name: 'ProductDetail', params: { id: props.product.id } });
}

function onAddToCart() {
  emit('addToCart', props.product);
}
</script>
