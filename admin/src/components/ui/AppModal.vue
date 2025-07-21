<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/60" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 text-right shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="flex justify-between items-center text-lg font-bold leading-6 text-gray-900 dark:text-gray-100 p-4 border-b dark:border-gray-700"
              >
                <span>{{ title }}</span>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 p-1 rounded-full">
                  <X :size="24" />
                </button>
              </DialogTitle>
              <div class="p-6">
                <slot></slot>
              </div>

              <div v-if="$slots.footer" class="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                <slot name="footer"></slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { X } from 'lucide-vue-next'

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}
</script>
