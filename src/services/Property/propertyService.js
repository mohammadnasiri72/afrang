import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";
import Swal from "sweetalert2";

// ساده‌ترین کش درون‌حافظه‌ای برای درخواست‌های تکراری
const cache = new Map();
const CACHE_TTL = 60_000; // 60 ثانیه

function getFromCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.time > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache.set(key, { data, time: Date.now() });
}

// import sweet alert 2
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

export const getPropertyItem = async (ids) => {

  try {
    const response = await axios.get(
      `${mainDomain}/api/Property/value/item/${ids}`
    );
    return response.data;
  } catch (error) {
    return {
      type: "error",
      message: error.response?.data ? error.response?.data : "خطای شبکه",
    };
  }
};

export const getCategoryChild = async (categoryId) => {
  const cacheKey = `categoryChild:${categoryId}`;
  const cached = getFromCache(cacheKey);
  if (cached) {
    console.log("📦 فیلتر دسته از کش");
    return cached;
  }

  try {
    const response = await axios.get(
      `${mainDomain}/api/Property/value/productfilter/${categoryId}`
    );
    setCache(cacheKey, response.data);
    return response.data;
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: error.response?.data ? error.response?.data : "خطای شبکه",
    });
  }
};
