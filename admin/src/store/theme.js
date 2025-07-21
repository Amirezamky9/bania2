import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  /**
   * Toggles the dark mode on and off.
   * It updates the state and the class on the <html> element.
   * It also saves the preference to localStorage.
   */
  function toggleDarkMode() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('bania-admin-theme', isDark.value ? 'dark' : 'light')
  }

  /**
   * Loads the saved theme from localStorage when the app starts.
   */
  function loadTheme() {
    const savedTheme = localStorage.getItem('bania-admin-theme')
    if (savedTheme === 'dark') {
      isDark.value = true
      document.documentElement.classList.add('dark')
    } else {
      isDark.value = false
      document.documentElement.classList.remove('dark')
    }
  }

  return { isDark, toggleDarkMode, loadTheme }
})
