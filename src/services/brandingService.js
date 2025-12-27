// import { mainDomain } from "@/utils/mainDomain";
// import axios from "axios";

// export const fetchBrandingItems = async () => {
//   try {
//     const response = await axios.get(`${mainDomain}/api/Item`, {
//       params: {
//         TypeId: 1023,
//         LangCode: "fa",
//         IsHome: 1,
//       },
//     });

//     if (response.data) {
//       return response.data.sort((a, b) => b.priority - a.priority);
//     }
//     return [];
//   } catch (error) {}
// };

// export const fetchBrandingItemsPage = async (data) => {
//   try {
//     const response = await axios.get(`${mainDomain}/api/Item`, {
//       params: data,
//     });

//     if (response.data) {
//       return response.data;
//     }
//     return [];
//   } catch (error) {}
// };


import { mainDomain } from "@/utils/mainDomain";

// کش برای آیتم‌های برندینگ
const brandingCache = {
  home: {
    data: null,
    timestamp: null,
  },
  page: new Map() // کش داینامیک برای صفحات مختلف
};

// تابع کمکی برای بررسی اعتبار کش
const isCacheValid = (timestamp) => {
  if (!timestamp) return false;
  const now = Date.now();
  const cacheAge = now - timestamp;
  const ONE_HOUR_IN_MS = 60 * 60 * 1000; // 1 ساعت
  return cacheAge < ONE_HOUR_IN_MS;
};

// تابع کمکی برای ساخت URL با پارامترها
const buildUrlWithParams = (baseUrl, params) => {
  const url = new URL(baseUrl);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
};

// تابع اصلی برای دریافت آیتم‌های برندینگ (صفحه اصلی)
export const fetchBrandingItems = async () => {
  // بررسی کش
  if (brandingCache.home.data && isCacheValid(brandingCache.home.timestamp)) {
    return brandingCache.home.data;
  }

  try {
    const params = {
      TypeId: 1023,
      LangCode: "fa",
      IsHome: 1,
    };

    const url = buildUrlWithParams(`${mainDomain}/api/Item`, params);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'max-age=3600', // کش مرورگر 1 ساعت
        'Pragma': 'cache',
      },
      // استفاده از کش Next.js برای SSG/SSR
      next: { 
        revalidate: 3600,
        tags: ['branding-home']
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data) {
      // مرتب‌سازی بر اساس priority
      const sortedData = data.sort((a, b) => b.priority - a.priority);
      
      // ذخیره در کش
      brandingCache.home.data = sortedData;
      brandingCache.home.timestamp = Date.now();
      
      return sortedData;
    }
    
    return [];
  } catch (error) {
    console.error("❌ [Branding] Error fetching home items:", error?.message);
    
    // اگر خطا رخ داد ولی داده کش شده داریم، آن را برگردان
    if (brandingCache.home.data) {
      console.warn("⚠️ [Branding] Using stale cache for home items");
      return brandingCache.home.data;
    }
    
    return [];
  }
};

// تابع برای دریافت آیتم‌های برندینگ صفحه‌ای (با پارامترهای داینامیک)
export const fetchBrandingItemsPage = async (params) => {
  // ایجاد کلید یکتا برای کش بر اساس پارامترها
  const cacheKey = JSON.stringify(params);
  
  // بررسی کش
  const cachedPage = brandingCache.page.get(cacheKey);
  if (cachedPage && isCacheValid(cachedPage.timestamp)) {
    return cachedPage.data;
  }

  try {
    // پارامترهای پیش‌فرض
    const defaultParams = {
      TypeId: 1023,
      LangCode: "fa",
      ...params // پارامترهای ورودی اولویت دارند
    };

    const url = buildUrlWithParams(`${mainDomain}/api/Item`, defaultParams);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'max-age=3600',
        'Pragma': 'cache',
      },
      // کش با توجه به پارامترهای داینامیک
      next: { 
        revalidate: 3600,
        tags: ['branding-page']
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data) {
      // ذخیره در کش با کلید یکتا
      brandingCache.page.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      // محدود کردن حجم کش (اختیاری)
      if (brandingCache.page.size > 50) {
        const firstKey = brandingCache.page.keys().next().value;
        brandingCache.page.delete(firstKey);
      }
      
      return data;
    }
    
    return [];
  } catch (error) {
    console.error("❌ [Branding] Error fetching page items:", error?.message);
    
    // اگر خطا رخ داد ولی داده کش شده داریم، آن را برگردان
    if (cachedPage?.data) {
      console.warn("⚠️ [Branding] Using stale cache for page items");
      return cachedPage.data;
    }
    
    return [];
  }
};

// توابع کمکی برای مدیریت کش

// پاک کردن کش صفحه اصلی
export const clearBrandingHomeCache = () => {
  brandingCache.home.data = null;
  brandingCache.home.timestamp = null;
};

// پاک کردن کش یک صفحه خاص
export const clearBrandingPageCache = (params) => {
  const cacheKey = JSON.stringify(params);
  brandingCache.page.delete(cacheKey);
};

// پاک کردن همه کش‌های صفحه‌ای
export const clearAllBrandingPageCache = () => {
  brandingCache.page.clear();
};

// دریافت اجباری (نادیده گرفتن کش) برای صفحه اصلی
export const fetchBrandingItemsForce = async () => {
  clearBrandingHomeCache();
  return await fetchBrandingItems();
};

// دریافت اجباری برای صفحه
export const fetchBrandingItemsPageForce = async (params) => {
  clearBrandingPageCache(params);
  return await fetchBrandingItemsPage(params);
};