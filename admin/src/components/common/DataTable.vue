<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-x-auto">
    <table class="w-full text-sm text-right">
      <thead class="bg-gray-50 dark:bg-gray-700/50">
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            class="p-4 font-semibold text-gray-600 dark:text-gray-300"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Skeleton loader state -->
        <tr v-if="loading" v-for="n in 5" :key="'pulse-' + n" class="animate-pulse">
          <td v-for="h in headers" :key="'pulse-cell-' + h.key" class="p-4">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </td>
        </tr>
        <!-- Empty state -->
        <tr v-else-if="!items || items.length === 0">
          <td :colspan="headers.length" class="p-6 text-center text-gray-500">
            داده‌ای برای نمایش وجود ندارد.
          </td>
        </tr>
        <!-- Content rows -->
        <tr
          v-else
          v-for="item in items"
          :key="item.id"
          class="border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <td
            v-for="header in headers"
            :key="header.key"
            class="p-4 whitespace-nowrap text-gray-700 dark:text-gray-300"
          >
            <slot :name="'cell-' + header.key" :item="item">
              {{ item[header.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
