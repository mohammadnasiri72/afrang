// import { mainDomain } from "@/utils/mainDomain";
// import axios from "axios";

// const createQueryString = (params = {}) => {
//   const searchParams = new URLSearchParams();
//   Object.entries(params).forEach(([key, value]) => {
//     if (value !== undefined && value !== null && value !== '') {
//       searchParams.append(key, value);
//     }
//   });
//   return searchParams.toString();
// };

// export const getItem = async (params) => {
//   try {
//     const response = await axios.get(`${mainDomain}/api/Item`, {
//       params,
//       timeout: 15000,
//     });
//     return response.data;
//   } catch (err) {
//     return {
//       type: "error",
//       message: err.response?.data ? err.response?.data : "خطای شبکه",
//     };
//   }
// };

// export const getItemById = async (id) => {
//   try {
//     const response = await axios.get(`${mainDomain}/api/Item/${id}`, {
//       timeout: 15000,
//     });

//     return response.data;
//   } catch (err) {
//     return {
//       type: "error",
//       message: err.response?.data ? err.response?.data : "خطای شبکه",
//     };
//   }
// };

// export const getItemByUrl = async (url) => {
//   try {
//     // ساخت URL با پارامترها
//     const params = new URLSearchParams({
//       url,
//       langCode: "fa",
//     });
//     const apiUrl = `${mainDomain}/api/Item/findByUrl?${params}`;

//     // استفاده از fetch با کش (مثلاً 60 ثانیه)
//     const response = await fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       next: { revalidate: 60 }, // کش برای 60 ثانیه
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (err) {
//     const isHard404 = err.message.includes("Not Found") ||
//                      err.message.includes("404");
//     return {
//       type: "error",
//       message: err.message || "خطای شبکه",
//       isHard404,
//     };
//   }
// };

// export const getItemByIds = async (data, token) => {
//   try {
//     const response = await axios.post(
//       `${mainDomain}/api/Item/GetListByIds`,
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         timeout: 15000,
//       }
//     );
//     return response.data;
//   } catch (err) {
//     return {
//       type: "error",
//       message: err.response?.data ? err.response?.data : "خطای شبکه",
//     };
//   }
// };

// export const getListItemByIds = async (ids) => {
//   try {
//     const response = await axios.get(`${mainDomain}/api/Item/ByIds/${ids}`, {
//       timeout: 15000,
//     });
//     return response.data;
//   } catch (err) {
//     return {
//       type: "error",
//       message: err.response?.data ? err.response?.data : "خطای شبکه",
//     };
//   }
// };

// export const itemVisit = async (id, url, userAgent) => {
//   const data = {
//     langCode: "fa",
//     id,
//     url,
//     ip:'',
//     userAgent,
//   };

//   try {
//     const response = await axios.post(`${mainDomain}/api/Item/visit`, data, {
//       timeout: 15000,
//     });
//     return response.data;
//   } catch (error) {
//     return {
//       type: "error",
//       message: error.response?.data ? error.response?.data : "خطای شبکه",
//     };
//   }
// };

// export const getListItemBanner = async () => {
//   try {
//     const params = {
//       langCode: "fa",
//       categoryId: -1,
//     };

//     const queryString = createQueryString(params);
//     const url = `${mainDomain}/api/Item/Banner${queryString ? `?${queryString}` : ''}`;

//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       cache: 'force-cache',
//       next: { revalidate: 60 },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (err) {
//     return {
//       type: "error",
//       message: "خطای شبکه",
//     };
//   }
// };

import { mainDomain } from "@/utils/mainDomain";

// کش داخلی برای آیتم‌ها
const itemCache = {
  items: new Map(),
  banners: null,
  bannerTimestamp: null,
  byUrl: new Map(),
  byIds: new Map(),
};

// تابع کمکی برای بررسی اعتبار کش
const isCacheValid = (timestamp) => {
  if (!timestamp) return false;
  const ONE_HOUR_IN_MS = 60 * 60 * 1000;
  return Date.now() - timestamp < ONE_HOUR_IN_MS;
};

// تابع کمکی برای ساخت URL با پارامترها
const createQueryString = (params = {}) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, v));
      } else {
        searchParams.append(key, value);
      }
    }
  });
  return searchParams.toString();
};

// تابع کمکی برای درخواست fetch با تایم‌اوت
const fetchWithTimeout = async (url, options = {}, timeout = 15000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// تابع اصلی دریافت آیتم‌ها
export const getItem = async (params) => {
  try {
    // ایجاد کلید کش بر اساس پارامترها
    const cacheKey = JSON.stringify(params);

    // بررسی کش
    const cached = itemCache.items.get(cacheKey);
    if (cached && isCacheValid(cached.timestamp)) {
      return cached.data;
    }

    const queryString = createQueryString(params);
    const url = `${mainDomain}/api/Item${queryString ? `?${queryString}` : ""}`;

    const response = await fetchWithTimeout(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600, tags: ["items"] }, // کش 1 ساعته
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // ذخیره در کش
    itemCache.items.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    // محدود کردن حجم کش
    if (itemCache.items.size > 100) {
      const firstKey = itemCache.items.keys().next().value;
      itemCache.items.delete(firstKey);
    }

    return data;
  } catch (err) {
    console.error("❌ [Item] Error fetching items:", err.message);
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};

// دریافت آیتم بر اساس ID
export const getItemById = async (id) => {
  try {
    // بررسی کش
    const cacheKey = `id_${id}`;
    const cached = itemCache.items.get(cacheKey);
    if (cached && isCacheValid(cached.timestamp)) {
      return cached.data;
    }

    const url = `${mainDomain}/api/Item/${id}`;

    const response = await fetchWithTimeout(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // ذخیره در کش
    itemCache.items.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (err) {
    console.error("❌ [Item] Error fetching item by ID:", err.message);
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};

// دریافت آیتم بر اساس URL
export const getItemByUrl = async (urlParam) => {
  try {
    // بررسی کش
    const cacheKey = `url_${urlParam}`;
    const cached = itemCache.byUrl.get(cacheKey);
    if (cached && isCacheValid(cached.timestamp)) {
      return cached.data;
    }

    const params = new URLSearchParams({
      url: urlParam,
      langCode: "fa",
    });
    const url = `${mainDomain}/api/Item/findByUrl?${params}`;

    const response = await fetchWithTimeout(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600, tags: ["items-by-url", "global-cache"] },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return {
          type: "error",
          message: "یافت نشد",
          isHard404: true,
        };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // ذخیره در کش
    itemCache.byUrl.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    // محدود کردن حجم کش
    if (itemCache.byUrl.size > 50) {
      const firstKey = itemCache.byUrl.keys().next().value;
      itemCache.byUrl.delete(firstKey);
    }

    return data;
  } catch (err) {
    console.error("❌ [Item] Error fetching item by URL:", err.message);
    const isHard404 =
      err.message.includes("Not Found") || err.message.includes("404");
    return {
      type: "error",
      message: err.message || "خطای شبکه",
      isHard404,
    };
  }
};

// دریافت آیتم‌ها بر اساس IDها (POST)
export const getItemByIds = async (data, token) => {
  try {
    // ایجاد کلید کش بر اساس داده‌ها
    const cacheKey = `ids_${JSON.stringify(data)}_${token || "no-token"}`;
    const cached = itemCache.byIds.get(cacheKey);
    if (cached && isCacheValid(cached.timestamp)) {
      return cached.data;
    }

    const url = `${mainDomain}/api/Item/GetListByIds`;

    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // ذخیره در کش
    itemCache.byIds.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
    });

    return result;
  } catch (err) {
    console.error("❌ [Item] Error fetching items by IDs:", err.message);
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};

// دریافت لیست آیتم‌ها بر اساس IDها (GET)
export const getListItemByIds = async (ids) => {
  try {
    // بررسی کش
    const cacheKey = `listids_${ids}`;
    const cached = itemCache.byIds.get(cacheKey);
    if (cached && isCacheValid(cached.timestamp)) {
      return cached.data;
    }

    const url = `${mainDomain}/api/Item/ByIds/${ids}`;

    const response = await fetchWithTimeout(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // ذخیره در کش
    itemCache.byIds.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (err) {
    console.error("❌ [Item] Error fetching list items by IDs:", err.message);
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};

// ثبت بازدید آیتم
export const itemVisit = async (id, url, userAgent) => {
  const data = {
    langCode: "fa",
    id,
    url,
    ip: "",
    userAgent,
  };

  try {
    const response = await fetchWithTimeout(`${mainDomain}/api/Item/visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // برای POST معمولاً کش نمی‌کنیم
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ [Item] Error posting visit:", error.message);
    return {
      type: "error",
      message: error.response?.data ? error.response?.data : "خطای شبکه",
    };
  }
};

// دریافت بنرها
export const getListItemBanner = async () => {
  try {
    // بررسی کش
    if (itemCache.banners && isCacheValid(itemCache.bannerTimestamp)) {
      return itemCache.banners;
    }

    const params = {
      langCode: "fa",
      categoryId: -1,
    };

    const queryString = createQueryString(params);
    const url = `${mainDomain}/api/Item/Banner${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetchWithTimeout(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600, tags: ["banners"] },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // ذخیره در کش
    itemCache.banners = data;
    itemCache.bannerTimestamp = Date.now();

    return data;
  } catch (err) {
    console.error("❌ [Item] Error fetching banners:", err.message);
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};

// توابع کمکی برای مدیریت کش

// پاک کردن کش آیتم‌ها
export const clearItemCache = (params = null) => {
  if (params) {
    const cacheKey = JSON.stringify(params);
    itemCache.items.delete(cacheKey);
  } else {
    itemCache.items.clear();
  }
};

// پاک کردن کش آیتم بر اساس ID
export const clearItemByIdCache = (id) => {
  const cacheKey = `id_${id}`;
  itemCache.items.delete(cacheKey);
};

// پاک کردن کش آیتم بر اساس URL
export const clearItemByUrlCache = (url) => {
  const cacheKey = `url_${url}`;
  itemCache.byUrl.delete(cacheKey);
};

// پاک کردن کش بنرها
export const clearBannerCache = () => {
  itemCache.banners = null;
  itemCache.bannerTimestamp = null;
};

// دریافت اجباری آیتم‌ها (نادیده گرفتن کش)
export const getItemForce = async (params) => {
  clearItemCache(params);
  return await getItem(params);
};

// دریافت اجباری بنرها
export const getListItemBannerForce = async () => {
  clearBannerCache();
  return await getListItemBanner();
};
