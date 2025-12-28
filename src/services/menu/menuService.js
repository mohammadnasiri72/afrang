// import { mainDomain } from "@/utils/mainDomain";
// import axios from "axios";

// export const getMenuFooter = async () => {
//   try {
//     const response = await axios.get(`${mainDomain}/api/Menu`, {
//       params: {
//         langCode: "fa",
//         menuKey: "menufooter",
//       },
//     });
//     return response.data;
//   } catch (err) {
//     return [];
//   }
// };



import { mainDomain } from "@/utils/mainDomain";

// کش برای منوی فوتر
const menuFooterCache = {
  data: null,
  timestamp: null,
  isLoading: false
};

// تابع برای بررسی اعتبار کش
const isCacheValid = (timestamp) => {
  if (!timestamp) return false;
  const ONE_HOUR_IN_MS = 60 * 60 * 1000;
  return Date.now() - timestamp < ONE_HOUR_IN_MS;
};

// تابع کمکی برای درخواست fetch با تایم‌اوت
const fetchWithTimeout = async (url, options = {}, timeout = 15000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// تابع اصلی دریافت منوی فوتر
export const getMenuFooter = async () => {
  // بررسی کش
  if (menuFooterCache.data && isCacheValid(menuFooterCache.timestamp)) {
    return menuFooterCache.data;
  }

  // اگر در حال دریافت هستیم، منتظر بمان
  if (menuFooterCache.isLoading) {
    
    // منتظر بمان تا دریافت کامل شود
    while (menuFooterCache.isLoading) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // اگر بعد از اتمام دریافت، کش معتبر بود برگردان
    if (menuFooterCache.data && isCacheValid(menuFooterCache.timestamp)) {
      return menuFooterCache.data;
    }
  }

  // شروع دریافت جدید
  menuFooterCache.isLoading = true;
  
  try {
    const params = {
      langCode: "fa",
      menuKey: "menufooter",
    };
    
    const url = new URL(`${mainDomain}/api/Menu`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    
    const response = await fetchWithTimeout(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { 
        revalidate: 900, // کش 1 ساعته
        tags: ['menu-footer'] // برای revalidateTag
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // ذخیره در کش
    menuFooterCache.data = data;
    menuFooterCache.timestamp = Date.now();
    
    return data;
  } catch (err) {
    console.error("❌ [MenuFooter] Error fetching footer menu:", err.message);
    
    // اگر خطا رخ داد ولی داده کش شده داریم، آن را برگردان (stale-while-revalidate)
    if (menuFooterCache.data) {
      console.warn("⚠️ [MenuFooter] Using stale cache due to fetch error");
      return menuFooterCache.data;
    }
    
    return [];
  } finally {
    menuFooterCache.isLoading = false;
  }
};

// توابع کمکی برای مدیریت کش

// پاک کردن کش منوی فوتر
export const clearMenuFooterCache = () => {
  menuFooterCache.data = null;
  menuFooterCache.timestamp = null;
  menuFooterCache.isLoading = false;
};

// دریافت اجباری منوی فوتر (نادیده گرفتن کش)
export const getMenuFooterForce = async () => {
  clearMenuFooterCache();
  return await getMenuFooter();
};

// تابع برای revalidate کردن کش منوی فوتر
export const revalidateMenuFooter = async () => {
  try {
    const freshData = await getMenuFooterForce();
    return freshData;
  } catch (error) {
    console.error("❌ [MenuFooter] Revalidation failed:", error.message);
    return menuFooterCache.data || [];
  }
};

// تابع برای بررسی وضعیت کش
export const getMenuFooterCacheStatus = () => {
  const now = Date.now();
  const cacheAge = menuFooterCache.timestamp ? now - menuFooterCache.timestamp : null;
  const isValid = menuFooterCache.timestamp ? isCacheValid(menuFooterCache.timestamp) : false;
  
  return {
    hasCache: !!menuFooterCache.data,
    cacheAge: cacheAge ? `${Math.round(cacheAge / 1000)} seconds` : 'N/A',
    isValid,
    isLoading: menuFooterCache.isLoading,
    timestamp: menuFooterCache.timestamp
  };
};