import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";
import Swal from "sweetalert2";

// import sweet alert 2
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});


const axiosInstance = axios.create({
  timeout: 3000, // تایم‌اوت ۳ ثانیه
  timeoutErrorMessage: "درخواست به سرور زمان‌بر شد"
});

// کش ساده در حافظه
const categoryCache = new Map();

export const getCategory = async (params) => {
  try {
    // 🔥 ساخت کلید یکتا برای کش
    const cacheKey = JSON.stringify(params);
    
    // 🔥 بررسی کش
    if (categoryCache.has(cacheKey)) {
      const cached = categoryCache.get(cacheKey);
      // اگر کش کمتر از ۵ دقیقه عمر دارد، از آن استفاده کن
      if (Date.now() - cached.timestamp < 5 * 60 * 1000) {
        console.log('✅ استفاده از کش getCategory');
        return cached.data;
      }
    }
    
    console.time('getCategory-API');
    const response = await axiosInstance.get(`${mainDomain}/api/Category`, {
      params,
    });
    console.timeEnd('getCategory-API');
    
    const data = response.data;
    
    // 🔥 ذخیره در کش
    categoryCache.set(cacheKey, {
      timestamp: Date.now(),
      data: data
    });
    
    // پاکسازی کش قدیمی
    if (categoryCache.size > 50) {
      const oldestKey = Array.from(categoryCache.keys())[0];
      categoryCache.delete(oldestKey);
    }
    
    return data;
  } catch (error) {
    console.error('Error in getCategory:', error.message);
    
    // 🔥 اگر خطا بود، از کش قدیمی استفاده کن (اگر وجود دارد)
    const cacheKey = JSON.stringify(params);
    if (categoryCache.has(cacheKey)) {
      console.log('⚠️ استفاده از کش قدیمی به علت خطای API');
      return categoryCache.get(cacheKey).data;
    }
    
    return {
      type: "error",
      message: error.response?.data ? error.response?.data : "خطای شبکه",
    };
  }
};
// export const getCategory = async (params) => {
//   try {
//     const response = await axios.get(`${mainDomain}/api/Category`, {
//       params,
//     });
//     return response.data;
//   } catch (error) {
//     return {
//       type: "error",
//       message: error.response?.data ? error.response?.data : "خطای شبکه",
//     };
//   }
// };

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Category/${id}`);

    return response.data;
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: error.response?.data ? error.response?.data : "خطای شبکه",
    });
  }
};

export const getBreadcrumb = async (id) => {
  try {
    const params = {
      id,
      LangCode: "fa",
    };

    const response = await axios.get(`${mainDomain}/api/Category/Breadcrumb`, {
      params,
    });

    return response.data;
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: error.response?.data ? error.response?.data : "خطای شبکه",
    });
    return [];
  }
};

export const getBreadcrumbProduct = async (id) => {
  try {
    const params = {
      id,
      LangCode: "fa",
    };

    const response = await axios.get(`${mainDomain}/api/Item/Breadcrumb`, {
      params,
    });

    return response.data;
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: error.response?.data ? error.response?.data : "خطای شبکه",
    });
    return [];
  }
};
