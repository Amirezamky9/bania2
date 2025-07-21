<template>
  <app-toast />
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/store/theme'
import AppToast from '@/components/ui/AppToast.vue'

const themeStore = useThemeStore()

// با شروع برنامه، تم ذخیره شده از localStorage بارگذاری می‌شود
onMounted(() => {
  themeStore.loadTheme()
})
</script>
