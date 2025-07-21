import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import * as authService from '@/services/authService'; // Assuming @ is configured to point to src/

export const useUserStore = defineStore('user', () => {
    // --- State ---
    // Load user from localStorage to keep the user logged in
    const user = ref(JSON.parse(localStorage.getItem('bania_user') || 'null'));

    // --- Getters ---
    const isLoggedIn = computed(() => !!user.value);
    const userName = computed(() => user.value?.name || 'کاربر مهمان');
    const userEmail = computed(() => user.value?.email || '');

    // --- Actions ---
    async function handleLogin(email, password) {
        try {
            const userData = await authService.login(email, password);
            user.value = userData;
            localStorage.setItem('bania_user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            // Let the component handle the error message
            throw new Error(error);
        }
    }

    function handleLogout() {
        user.value = null;
        localStorage.removeItem('bania_user');
        // In a real app, you might also want to call a backend endpoint to invalidate the token
    }
    
    async function handleSignup(name, email, password) {
        try {
            const response = await authService.signup(name, email, password);
            // You might want to automatically log the user in after signup
            // For now, we just return the success message
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    // --- Expose state, getters, and actions ---
    return {
        user,
        isLoggedIn,
        userName,
        userEmail,
        handleLogin,
        handleLogout,
        handleSignup,
    };
});
