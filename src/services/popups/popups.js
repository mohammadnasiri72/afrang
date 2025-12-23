

import { mainDomain } from "@/utils/mainDomain";

export const getPopUpsData = async () => {
  try {
    // استفاده از fetch داخلی Next.js با قابلیت کش
    const response = await fetch(
      `${mainDomain}/api/Item/Popup?langCode=fa`,
      {
        next: {
          revalidate: 3600, // کش به مدت 1 ساعت (3600 ثانیه)
        }
      }
    );

    // بررسی وضعیت پاسخ
    if (!response.ok) {
      throw new Error(`خطای سرور: ${response.status}`);
    }

    const data = await response.json();
    return data;
    
  } catch (err) {
    console.error('خطا در دریافت داده‌های پاپ‌آپ:', err.message);
    return {
      type: 'error',
      message: err.message || "خطای شبکه"
    };
  }
};