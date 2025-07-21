<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-pink-700">
            <slot name="title">عنوان مودال</slot>
          </h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-800">
            <X :size="24" />
          </button>
        </div>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { X } from 'lucide-vue-next';

// This component uses v-model to control its visibility.
// 'modelValue' is the prop, and 'update:modelValue' is the event.
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

function closeModal() {
  emit('update:modelValue', false);
}
</script>

<style scoped>
/* The fade transition is defined globally in main.css, but can be scoped here if needed */
</style>
