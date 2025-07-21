/**
 * @file src/utils/formatters.js
 * @description توابع کمکی برای فرمت‌دهی داده‌ها
 */

/**
 * یک عدد را به فرمت قیمت فارسی (با جداکننده هزارگان) تبدیل می‌کند.
 * @param {number} price - عددی که باید فرمت‌دهی شود.
 * @returns {string} - رشته فرمت‌دهی شده.
 */
export function formatPrice(price) {
  if (typeof price !== 'number') {
    return String(price);
  }
  return new Intl.NumberFormat('fa-IR').format(price);
}

// در آینده می‌توانید توابع فرمت‌دهی دیگری مانند فرمت تاریخ را به این فایل اضافه کنید.
