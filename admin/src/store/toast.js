import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toast = reactive({
    show: false,
    message: '',
    type: 'success', // 'success' or 'error'
  })

  /**
   * Shows a toast notification.
   * @param {string} message - The message to display.
   * @param {string} [type='success'] - The type of the toast ('success' or 'error').
   * @param {number} [duration=3000] - The duration in milliseconds to show the toast.
   */
  function showToast(message, type = 'success', duration = 3000) {
    toast.message = message
    toast.type = type
    toast.show = true

    setTimeout(() => {
      toast.show = false
    }, duration)
  }

  return { toast, showToast }
})
