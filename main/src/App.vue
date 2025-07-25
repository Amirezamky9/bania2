<template>
  <div class="antialiased">
    <!-- Header Component -->
    <AppHeader @request-login="() => openLoginModal()" />

    <!-- Main Content (rendered by Vue Router) -->
    <main>
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component 
            :is="Component" 
            :key="route.path" 
            @request-login="handleLoginRequest"
            @show-toast="triggerToast"
          />
        </transition>
      </router-view>
    </main>

    <!-- Footer Component -->
    <AppFooter />

    <!-- Login/Signup Modal -->
    <AppModal v-model="showLoginModal">
      <template #title>{{ isLoginView ? 'ورود به حساب کاربری' : 'ایجاد حساب کاربری' }}</template>

      <!-- Login Form -->
      <form v-if="isLoginView" @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="login-email" class="block mb-2 text-sm font-medium text-gray-600">ایمیل یا شماره موبایل</label>
          <input v-model="loginForm.email" type="text" id="login-email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="example@mail.com" required>
        </div>
        <div class="mb-6">
          <label for="login-password" class="block mb-2 text-sm font-medium text-gray-600">رمز عبور</label>
          <input v-model="loginForm.password" type="password" id="login-password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="••••••••" required>
        </div>
        <button type="submit" class="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors">ورود</button>
        <p class="text-center mt-4 text-sm">
          حساب کاربری ندارید؟ <button type="button" @click="isLoginView = false" class="text-pink-600 font-semibold hover:underline">ثبت‌نام کنید</button>
        </p>
      </form>

      <!-- Signup Form -->
      <form v-else @submit.prevent="() => { console.log('Form submission event fired!'); handleSignup(); }">
        <div class="mb-4">
          <label for="signup-name" class="block mb-2 text-sm font-medium text-gray-600">نام و نام خانوادگی</label>
          <input v-model="signupForm.name" type="text" id="signup-name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="نام شما" required>
        </div>
        <div class="mb-4">
          <label for="signup-email" class="block mb-2 text-sm font-medium text-gray-600">ایمیل</label>
          <input v-model="signupForm.email" type="email" id="signup-email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="example@mail.com" required>
        </div>
        <div class="mb-6">
          <label for="signup-password" class="block mb-2 text-sm font-medium text-gray-600">رمز عبور</label>
          <input v-model="signupForm.password" type="password" id="signup-password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="••••••••" required>
        </div>
        <button type="submit" class="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors">ثبت‌نام</button>
        <p class="text-center mt-4 text-sm">
          قبلا ثبت‌نام کرده‌اید؟ <button type="button" @click="isLoginView = true" class="text-pink-600 font-semibold hover:underline">وارد شوید</button>
        </p>
      </form>
    </AppModal>

    <!-- Toast Notification -->
    <AppToast :message="toast.message" :type="toast.type" :show="toast.show" />
  </div>
</template>

<script setup>
import { ref, reactive, provide } from 'vue';
import { useUserStore } from '@/store/user';
import AppHeader from '@/components/common/AppHeader.vue';
import AppFooter from '@/components/common/AppFooter.vue';
import AppModal from '@/components/ui/AppModal.vue';
import AppToast from '@/components/ui/AppToast.vue';

const userStore = useUserStore();

// --- Login/Signup Modal State ---
const showLoginModal = ref(false);
const isLoginView = ref(true);
const postLoginAction = ref(null); // To store callback functions after login

const loginForm = reactive({ email: '', password: '' });
const signupForm = reactive({ name: '', email: '', password: '' });

// --- Toast Notification State ---
const toast = reactive({ show: false, message: '', type: 'success' });
let toastTrigger = ref(0);

function triggerToast(message, type = 'success') {
  toast.message = message;
  toast.type = type;
  toast.show = false; // Reset to trigger watcher in AppToast
  setTimeout(() => {
      toast.show = true;
  }, 50);
}

// Provide the toast function to all child components
provide('showToast', triggerToast);


// --- Modal & Auth Logic ---
function openLoginModal(onSuccessCallback = null) {
  postLoginAction.value = onSuccessCallback;
  showLoginModal.value = true;
}

function handleLoginRequest(onSuccessCallback) {
    openLoginModal(onSuccessCallback); 
}

async function handleLogin() {
  try {
    await userStore.handleLogin(loginForm.email, loginForm.password);
    triggerToast('با موفقیت وارد شدید!', 'success');
    showLoginModal.value = false;
    // If there was a pending action (like proceeding to checkout), execute it now
    if (postLoginAction.value && typeof postLoginAction.value === 'function') {
      postLoginAction.value();
    }
  } catch (error) {
    triggerToast(error.message || 'خطا در ورود', 'error');
  } finally {
    postLoginAction.value = null; // Clear the action
  }
}

async function handleSignup() {
  // --- DIAGNOSTIC TEST ---
  console.log('1. Signup button clicked!'); // <-- پیام تستی ۱
  console.log('2. Signup data:', { name: signupForm.name, email: signupForm.email, password: signupForm.password }); // <-- پیام تستی ۲

  try {
    console.log('3. Calling userStore.handleSignup...'); // <-- پیام تستی ۳
    await userStore.handleSignup(signupForm.name, signupForm.email, signupForm.password);

    console.log('4. Signup successful in App.vue!'); // <-- پیام تستی ۴
    triggerToast('ثبت نام با موفقیت انجام شد! اکنون می‌توانید وارد شوید.', 'success');
    isLoginView.value = true; // Switch to login view after successful signup
  } catch (error) {
    console.error('5. Signup failed in App.vue with error:', error); // <-- پیام تستی ۵
    triggerToast(error.message || 'خطا در ثبت نام', 'error');
  }
}
</script>
