<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed top-5 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-lg shadow-lg text-white"
      :class="type === 'success' ? 'bg-green-500' : 'bg-red-500'"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'success', // 'success' or 'error'
  },
  duration: {
    type: Number,
    default: 3000,
  },
  // A trigger to show the toast
  show: {
      type: Boolean,
      default: false
  }
});

const visible = ref(false);
let timeoutId = null;

watch(() => props.show, (newValue) => {
    if (newValue) {
        visible.value = true;
        // Clear any existing timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // Set a new timer to hide the toast
        timeoutId = setTimeout(() => {
            visible.value = false;
        }, props.duration);
    }
});
</script>
