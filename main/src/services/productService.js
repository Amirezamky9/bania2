// 1. apiClient را از فایل مرکزی وارد می‌کنیم
import apiClient from './api';

// ===================================================================
// بخش اتصال به بک‌اند
// ===================================================================

export const getCategories = async () => {
    // // کد زیر را برای اتصال به بک‌اند از حالت کامنت خارج کنید
    // try {
    //     // حالا از apiClient استفاده می‌کنیم
    //     const response = await apiClient.get('/categories');
    //     return response.data;
    // } catch (error) {
    //     console.error("Error fetching categories:", error);
    //     return [];
    // }

    // کد ساختگی زیر را حذف کنید
    return _fetch([
        { id: 1, name: 'مراقبت پوست' }, { id: 2, name: 'آرایش صورت' }, { id: 3, name: 'عطر و ادکلن' }, { id: 4, name: 'مراقبت مو' }, { id: 5, name: 'بهداشت بدن' },
    ]);
};


export const getProducts = async (categoryId = null, page = 1, limit = 8) => {
    // // کد زیر را برای اتصال به بک‌اند از حالت کامنت خارج کنید
    // try {
    //     const params = { page, limit };
    //     if (categoryId) {
    //         params.categoryId = categoryId;
    //     }
    //     // حالا از apiClient با پارامترها استفاده می‌کنیم
    //     const response = await apiClient.get('/products', { params });
    //     return response.data;
    // } catch (error) {
    //     console.error("Error fetching products:", error);
    //     return { products: [], total: 0, page: 1, limit: 8 };
    // }

    // کد ساختگی زیر را حذف کنید
    const filtered = categoryId ? allProducts.filter(p => p.categoryId === categoryId) : allProducts;
    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);
    return _fetch({ products: paginated, total, page, limit });
};


export const getProductDetails = async (productId) => {
    // // کد زیر را برای اتصال به بک‌اند از حالت کامنت خارج کنید
    // try {
    //     // حالا از apiClient استفاده می‌کنیم
    //     const response = await apiClient.get(`/products/${productId}`);
    //     return response.data;
    // } catch (error) {
    //     console.error(`Error fetching product details for id ${productId}:`, error);
    //     return null;
    // }
    
    // کد ساختگی زیر را حذف کنید
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        const detailedProduct = {
            ...product,
            description: 'این یک توضیح کامل و جامع برای محصول است.',
            specs: { 'حجم': '50 میلی لیتر', 'کشور سازنده': 'فرانسه' },
            reviews: [ { user: 'سارا', rating: 5, comment: 'عالی بود!' } ],
            gallery: [product.image, `https://placehold.co/600x600/${product.image.split('/')[4]}/4a148c?text=Gallery1`]
        };
        return _fetch(detailedProduct);
    }
    return _fetch(null);
};


// ===================================================================
// بخش داده‌های ساختگی (Mock Data) - این بخش در آینده حذف خواهد شد
// ===================================================================
const _fetch = (data, delay = 300) => new Promise(resolve => setTimeout(() => resolve(data), delay));

const allProducts = [
    { id: 101, categoryId: 1, name: 'کرم آبرسان نوتروژینا', price: 350000, brand: 'نوتروژینا', image: 'https://res.cloudinary.com/your-cloud-name/image/upload/w_400,q_auto,f_auto/v1678886400/skincare1.jpg', rating: 4.5, stock: 15 },
    // ... سایر محصولات
];
