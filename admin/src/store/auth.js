import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'
import { useToastStore } from '@/store/toast'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('bania-admin-user')) || null)
  const token = ref(localStorage.getItem('bania-admin-token') || null)
  const router = useRouter()

  const isLoggedIn = computed(() => !!token.value && !!user.value)

  /**
   * Handles the user login process.
   * @param {object} credentials - The user's email and password.
   */
  async function login(credentials) {
    const toastStore = useToastStore()
    try {
      const data = await authService.login(credentials.email, credentials.password)
      user.value = data.user
      token.value = data.token

      // Store user data and token in localStorage for persistence
      localStorage.setItem('bania-admin-user', JSON.stringify(data.user))
      localStorage.setItem('bania-admin-token', data.token)
      
      toastStore.showToast('با موفقیت وارد شدید.', 'success')
      router.push({ name: 'dashboard' })
    } catch (error) {
      toastStore.showToast(error, 'error')
      console.error('Login failed:', error)
    }
  }

  /**
   * Handles the user logout process.
   */
  function logout() {
    const toastStore = useToastStore()
    user.value = null
    token.value = null
    localStorage.removeItem('bania-admin-user')
    localStorage.removeItem('bania-admin-token')
    
    // Redirect to login page after logout
    router.push({ name: 'login' })
    toastStore.showToast('با موفقیت خارج شدید.', 'success')
  }

  return { user, token, isLoggedIn, login, logout }
})
