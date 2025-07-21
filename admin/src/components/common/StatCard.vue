<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center justify-between transition-colors duration-300">
    <!-- Skeleton loader state -->
    <div v-if="loading" class="w-full space-y-2 animate-pulse">
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div class="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
    </div>

    <!-- Content state -->
    <template v-else>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ title }}</p>
        <p class="text-2xl font-bold text-gray-800 dark:text-gray-200">{{ value }}</p>
      </div>
      <div class="p-3 rounded-full" :class="colorClass">
        <component :is="icon" :size="24" class="text-white" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: Object, // Lucide Vue icon component
    required: true,
  },
  color: {
    type: String,
    default: 'gray', // e.g., 'green', 'blue', 'yellow', 'pink'
  },
  loading: {
    type: Boolean,
    default: false,
  }
});

// Maps the color prop to a Tailwind CSS background color class
const colorClass = computed(() => {
  const colorMap = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    pink: 'bg-pink-500',
    gray: 'bg-gray-500',
  };
  return colorMap[props.color] || colorMap.gray;
});
</script>
