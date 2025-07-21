import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // This sets up the '@' alias to point to the 'src' directory.
      // It's a common convention and was assumed in the router/store imports.
      '@': path.resolve(__dirname, './src'),
    },
  },
});

