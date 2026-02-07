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
export const getItem = async (params = {}, opts = {}) => {
  try {
    const { force = false } = opts;
    const queryString = createQueryString(params);
    const url = `${mainDomain}/api/Item${queryString ? `?${queryString}` : ""}`;

    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 900, tags: ["items", "global-cache"] },
    };

    if (force) {
      fetchOptions.cache = "no-store";
      fetchOptions.next = { revalidate: 0, tags: ["items", "global-cache"] };
    }

    const response = await fetchWithTimeout(url, fetchOptions);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("❌ [Item] Error fetching items:", err.message);
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};

// دریافت آیتم بر اساس ID
export const getItemById = async (id, opts = {}) => {
  try {
    const url = `${mainDomain}/api/Item/${id}`;
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 900, tags: ["items", "global-cache"] },
    };
    if (opts.force) {
      fetchOptions.cache = "no-store";
      fetchOptions.next = { revalidate: 0, tags: ["items", "global-cache"] };
    }
    const response = await fetchWithTimeout(url, fetchOptions);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("❌ [Item] Error fetching item by ID:", err.message);
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};

// دریافت آیتم بر اساس URL
export const getItemByUrl = async (urlParam, opts = {}) => {
  try {
    const params = new URLSearchParams({ url: urlParam, langCode: "fa" });
    const url = `${mainDomain}/api/Item/findByUrl?${params}`;

    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 900, tags: ["items-by-url", "global-cache"] },
    };
    if (opts.force) {
      fetchOptions.cache = "no-store";
      fetchOptions.next = {
        revalidate: 0,
        tags: ["items-by-url", "global-cache"],
      };
    }

    const response = await fetchWithTimeout(url, fetchOptions);
    if (!response.ok) {
      if (response.status === 404)
        return { type: "error", message: "یافت نشد", isHard404: true , status: response.status,};
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("❌ [Item] Error fetching item by URL:", err.message);
    const isHard404 =
      err.message?.includes("Not Found") || err.message?.includes("404");
    return {
      type: "error",
      message: err.message || "خطای شبکه",
      isHard404,
      status: response.status,
    };
  }
};

// دریافت آیتم‌ها بر اساس IDها (POST)
export const getItemByIds = async (data, token, opts = {}) => {
  try {
    const url = `${mainDomain}/api/Item/GetListByIds`;
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
      next: { revalidate: 900, tags: ["items", "global-cache"] },
    };
    if (opts.force) {
      fetchOptions.cache = "no-store";
      fetchOptions.next = { revalidate: 0, tags: ["items", "global-cache"] };
    }
    const response = await fetchWithTimeout(url, fetchOptions);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("❌ [Item] Error fetching items by IDs:", err.message);
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};

// دریافت لیست آیتم‌ها بر اساس IDها (GET)
export const getListItemByIds = async (ids, opts = {}) => {
  try {
    const url = `${mainDomain}/api/Item/ByIds/${ids}`;
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 900, tags: ["items", "global-cache"] },
    };
    if (opts.force) {
      fetchOptions.cache = "no-store";
      fetchOptions.next = { revalidate: 0, tags: ["items", "global-cache"] };
    }
    const response = await fetchWithTimeout(url, fetchOptions);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("❌ [Item] Error fetching list items by IDs:", err.message);
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};

// ثبت بازدید آیتم
export const itemVisit = async (id, url, Referer, userAgent, ip) => {
  const data = {
    langCode: "fa",
    id,
    url,
    Referer,
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
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // return await response.json();
  } catch (error) {
    console.error("❌ [Item] Error posting visit:", error.message);
    return {
      type: "error",
      message: error.response?.data ? error.response?.data : "خطای شبکه",
    };
  }
};

// دریافت بنرها
export const getListItemBanner = async (opts = {}) => {
  try {
    const params = { langCode: "fa", categoryId: -1 };
    const queryString = createQueryString(params);
    const url = `${mainDomain}/api/Item/Banner${queryString ? `?${queryString}` : ""}`;

    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 900, tags: ["banners", "global-cache"] },
    };
    if (opts.force) {
      fetchOptions.cache = "no-store";
      fetchOptions.next = { revalidate: 0, tags: ["banners", "global-cache"] };
    }

    const response = await fetchWithTimeout(url, fetchOptions);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("❌ [Item] Error fetching banners:", err.message);
    return { type: "error", message: "خطای شبکه" };
  }
};

// توابع کمکی برای مدیریت کش

// پاک کردن کش آیتم‌ها
export const clearItemCache = (params = null) => {
  // no-op: Next.js tag-based cache is the source of truth
};

// پاک کردن کش آیتم بر اساس ID
export const clearItemByIdCache = (id) => {
  // no-op
};

// پاک کردن کش آیتم بر اساس URL
export const clearItemByUrlCache = (url) => {
  // no-op
};

// پاک کردن کش بنرها
export const clearBannerCache = () => {
  // no-op
};

// دریافت اجباری آیتم‌ها (نادیده گرفتن کش)
export const getItemForce = async (params) => {
  return await getItem(params, { force: true });
};

// دریافت اجباری بنرها
export const getListItemBannerForce = async () => {
  return await getListItemBanner({ force: true });
};
