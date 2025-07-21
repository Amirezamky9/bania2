import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/user'; // Assuming @ is configured for src/

// Import page components (views)
import HomePage from '@/views/HomePage.vue';
import CategoryPage from '@/views/CategoryPage.vue';
import ProductDetailPage from '@/views/ProductDetailPage.vue';
import CartPage from '@/views/CartPage.vue';
import CheckoutPage from '@/views/CheckoutPage.vue';
import AccountPage from '@/views/AccountPage.vue';
import AboutUsPage from '@/views/AboutUsPage.vue';
import ContactPage from '@/views/ContactPage.vue';
import TermsPage from '@/views/TermsPage.vue';
import FaqPage from '@/views/FaqPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/category/:id',
        name: 'Category',
        component: CategoryPage,
        props: true, // Pass route params as component props
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: ProductDetailPage,
        props: true,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: CartPage,
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: CheckoutPage,
        meta: { requiresAuth: true }, // This route requires login
    },
    {
        path: '/account',
        name: 'Account',
        component: AccountPage,
        meta: { requiresAuth: true }, // This route requires login
    },
    {
        path: '/about',
        name: 'About',
        component: AboutUsPage,
    },
    {
        path: '/contact',
        name: 'Contact',
        component: ContactPage,
    },
    {
        path: '/terms',
        name: 'Terms',
        component: TermsPage,
    },
    {
        path: '/faq',
        name: 'Faq',
        component: FaqPage,
    },
    {
        path: '/:pathMatch(.*)*', // Catch-all route for 404 Not Found
        name: 'NotFound',
        component: NotFoundPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    // Scroll to top on page change
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

// Navigation Guard
// This function runs before each navigation
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    
    // Check if the route requires authentication and the user is not logged in
    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
        // Redirect them to the home page.
        // In a real app, you might want to redirect to a login page
        // or show a login modal.
        console.warn(`Authentication required for ${to.fullPath}. Redirecting to home.`);
        next({ name: 'Home' });
    } else {
        // Otherwise, allow navigation
        next();
    }
});

export default router;
