import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

// We use the composition API style for defining stores in Pinia
export const useCartStore = defineStore('cart', () => {
    // --- State ---
    // Load cart from localStorage to persist data across page reloads
    const items = ref(JSON.parse(localStorage.getItem('bania_cart_items') || '[]'));

    // --- Getters ---
    const totalItems = computed(() => {
        return items.value.reduce((sum, item) => sum + item.quantity, 0);
    });

    const totalPrice = computed(() => {
        return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });

    // --- Actions ---
    function addItem(product, quantity = 1) {
        const existingItem = items.value.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            items.value.push({ ...product, quantity });
        }
    }

    function removeItem(productId) {
        items.value = items.value.filter(item => item.id !== productId);
    }

    function updateQuantity(productId, quantity) {
        const item = items.value.find(item => item.id === productId);
        if (item) {
            if (quantity > 0) {
                item.quantity = quantity;
            } else {
                // If quantity is 0 or less, remove the item
                removeItem(productId);
            }
        }
    }

    function clearCart() {
        items.value = [];
    }
    
    // --- Persistence ---
    // Watch for changes in the cart and save to localStorage
    watch(items, (newItems) => {
        localStorage.setItem('bania_cart_items', JSON.stringify(newItems));
    }, { deep: true }); // 'deep' is needed to watch for changes inside objects in the array

    // --- Expose state, getters, and actions ---
    return {
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
    };
});
