// 1. apiClient را از فایل مرکزی وارد می‌کنیم
import apiClient from './api';

export const login = async (email, password) => {
    // // کد زیر را برای اتصال به بک‌اند از حالت کامنت خارج کنید
    // try {
    //     // حالا از apiClient استفاده می‌کنیم
    //     const response = await apiClient.post('/auth/login', { email, password });
    //     return response.data;
    // } catch (error) {
    //     throw new Error(error.response?.data?.message || 'نام کاربری یا رمز عبور اشتباه است.');
    // }

    // کد ساختگی زیر را حذف کنید
    if (email && password) {
        return _fetch({ id: 1, name: 'کاربر تست', email: 'test@bania.com', token: 'fake-jwt-token' });
    }
    return Promise.reject('نام کاربری یا رمز عبور اشتباه است.');
};

export const signup = async (name, email, password) => {
    // // کد زیر را برای اتصال به بک‌اند از حالت کامنت خارج کنید
    // try {
    //     // حالا از apiClient استفاده می‌کنیم
    //     const response = await apiClient.post('/auth/register', { name, email, password });
    //     return response.data;
    // } catch (error) {
    //     throw new Error(error.response?.data?.message || 'خطا در ثبت نام.');
    // }

    // کد ساختگی زیر را حذف کنید
    if (name && email && password) {
        return _fetch({ message: 'ثبت نام با موفقیت انجام شد.' });
    }
    return Promise.reject('لطفاً تمام فیلدها را پر کنید.');
};

// ===================================================================
// بخش داده‌های ساختگی (Mock Data) - این بخش در آینده حذف خواهد شد
// ===================================================================
const _fetch = (data, delay = 300) => new Promise(resolve => setTimeout(() => resolve(data), delay));
