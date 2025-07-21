import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Import global styles
import './assets/styles/main.css';

// Import all Lucide icons for global use
// In a larger app, you might want to import them individually
import * as icons from 'lucide-vue-next';

// Create the Vue application instance
const app = createApp(App);

// Register all Lucide icons as global components
// e.g., you can use <icon-home /> or <Home /> in any component
for (const [key, component] of Object.entries(icons)) {
    app.component(key, component);
}

// Use Pinia for state management
app.use(createPinia());

// Use Vue Router for navigation
app.use(router);

// Mount the application to the DOM
app.mount('#app');
