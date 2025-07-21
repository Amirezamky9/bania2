<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="toast.show"
      class="fixed top-5 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-lg shadow-lg text-white"
      :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
    >
      <div class="flex items-center">
        <CheckCircleIcon v-if="toast.type === 'success'" class="h-6 w-6 ml-2" />
        <XCircleIcon v-else class="h-6 w-6 ml-2" />
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useToastStore } from '@/store/toast'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid'

const { toast } = useToastStore()
</script>
