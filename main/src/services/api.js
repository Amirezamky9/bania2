import axios from 'axios';
import { useUserStore } from '@/store/user';

// 1. یک نمونه (instance) از axios با پیکربندی اولیه ایجاد می‌کنیم.
const apiClient = axios.create({
  // آدرس اصلی بک‌اند شما به صورت داینامیک از متغیرهای محیطی خوانده می‌شود.
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. از Interceptorها برای مدیریت درخواست‌ها استفاده می‌کنیم.
// این کد قبل از ارسال *هر درخواستی* به سرور اجرا می‌شود.
apiClient.interceptors.request.use(
  (config) => {
    // استور کاربر را برای دسترسی به توکن فراخوانی می‌کنیم.
    const userStore = useUserStore();
    const token = userStore.user?.token;

    // اگر کاربر لاگین کرده بود و توکن داشت،
    // توکن به هدر تمام درخواست‌ها اضافه می‌شود.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // در صورت بروز خطا در تنظیم درخواست، آن را برمی‌گردانیم.
    return Promise.reject(error);
  }
);

// 3. نمونه پیکربندی شده را export می‌کنیم تا در سایر فایل‌ها استفاده شود.
export default apiClient;
