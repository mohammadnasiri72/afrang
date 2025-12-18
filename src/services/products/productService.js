
import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

// ==================== سیستم کش سرور ====================
class ServerCache {
  constructor() {
    this.cache = new Map();
    this.TTL = 60000; // 1 دقیقه
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    const now = Date.now();
    if (now - item.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clear() {
    this.cache.clear();
  }
}

const serverCache = new ServerCache();

// ==================== توابع اصلی ====================
export const getProducts = async (data) => {
  const cacheKey = `products:${JSON.stringify(data)}`;
  
  // بررسی کش
  const cached = serverCache.get(cacheKey);
  if (cached) {
    console.log('📦 محصولات از کش استفاده شد');
    return cached;
  }

  try {
    const params = {
      LangCode: "fa",
      PageSize: data.pageSize || 20,
      PageIndex: data.page || 1,
      OrderBy: data.orderBy || "2",
      ...(data.BrandId && { BrandId: data.BrandId }),
      ...(data.CategoryId && { CategoryId: data.CategoryId }),
      ...(data.price1 && data.price1 !== 0 && { Price1: data.price1 }),
      ...(data.price2 && data.price2 !== 100000 && { Price2: data.price2 }),
      ...(data.OnlyPrice && { OnlyPrice: data.OnlyPrice }),
      ...(data.OnlyDiscount && { OnlyDiscount: data.OnlyDiscount }),
      ...(data.StatusId && { StatusId: data.StatusId }),
      ...(data.OnlyFest && { OnlyFest: data.OnlyFest }),
      ...(data.ConditionId && { ConditionId: data.ConditionId }),
      ...(data.Filters && { Filters: data.Filters }),
    };

    console.log('🔄 درخواست محصولات جدید');
    const response = await axios.get(`${mainDomain}/api/Product`, {
      params,
      timeout: 10000, // 10 ثانیه timeout
    });

    serverCache.set(cacheKey, response.data);
    return response.data;
  } catch (err) {
    console.error("خطا در دریافت محصولات:", err.message);
    return {
      type: "error",
      message: err.response?.data || "خطای شبکه",
    };
  }
};

export const getProductCategory = async (categoryId, id2) => {
  const cacheKey = `category:${categoryId}:${id2 || ''}`;
  
  const cached = serverCache.get(cacheKey);
  if (cached) {
    console.log('📦 دسته‌بندی از کش استفاده شد');
    return cached;
  }

  try {
    console.log('🔄 درخواست دسته‌بندی جدید');
    
    let config = {};
    if (id2) {
      config.params = { id2 };
    }
    
    const response = await axios.get(
      `${mainDomain}/api/Product/Category/${categoryId}`,
      config
    );

    serverCache.set(cacheKey, response.data);
    return response.data;
  } catch (err) {
    console.error("خطا در دریافت دسته‌بندی:", err.message);
    return {
      type: "error",
      message: err.response?.data || "خطای شبکه",
      status: err.response?.status,
    };
  }
};

// استفاده از fetch با revalidate برای بهره از dedupe داخلی Next
export const getProductId = async (id) => {
  const url = `${mainDomain}/api/Product/${id}`;

  try {
    const res = await fetch(url, {
      // با revalidate داخلی، درخت رندر (metadata/layout/page) برای همان URL
      // در یک request دوباره به سرور نمی‌زند و از کش Next استفاده می‌کند.
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return {
        type: "error",
        message: await safeText(res),
        status: res.status,
      };
    }

    return res.json();
  } catch (err) {
    return {
      type: "error",
      message: err?.message || "خطای شبکه",
    };
  }
};

// کمکی برای گرفتن متن خطا بدون throw
async function safeText(res) {
  try {
    return await res.text();
  } catch {
    return "خطای شبکه";
  }
}

export const getProductListId = async (data) => {
  try {
    const response = await axios.post(
      `${mainDomain}/api/Product/GetListByIds`,
      data,
      { timeout: 10000 }
    );
    return response.data;
  } catch (error) {
    return {
      type: "error",
      message: error.response?.data || "خطای شبکه",
    };
  }
};

// محصولات مرتبط بر اساس رشته شناسه‌ها (مثلاً "1,2,3")
export const getRelatedProductsByIdString = async (idString) => {
  if (!idString) return [];

  const cacheKey = `product:related:${idString}`;
  const cached = serverCache.get(cacheKey);
  if (cached) {
    console.log("📦 محصولات مرتبط از کش استفاده شد");
    return cached;
  }

  try {
    // الگوی مشابه آیتم‌ها: GET /api/Item/ByIds/{ids}
    const response = await axios.get(
      `${mainDomain}/api/Product/ByIds/${idString}`,
      { timeout: 5000 }
    );

    serverCache.set(cacheKey, response.data);
    return response.data;
  } catch (err) {
    console.error("خطا در دریافت محصولات مرتبط:", err.message);
    return [];
  }
};

export const getProductAction = async () => {
  const cacheKey = 'product:action';
  const cached = serverCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(
      `${mainDomain}/api/Product/Auction?langCode=fa`,
      { timeout: 5000 }
    );
    serverCache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    return {
      type: "error",
      message: error.response?.data || "خطای شبکه",
    };
  }
};

export const getProductTerm = async (term, catIds) => {
  if (!term || term.trim() === '') return [];

  const cacheKey = `search:${term}:${catIds || ''}`;
  const cached = serverCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${mainDomain}/api/Product/FindByTerm`, {
      params: {
        langCode: "fa",
        term: term.trim(),
        catIds,
        pageSize: 50,
        page: 1,
      },
      timeout: 5000,
    });
    
    serverCache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("خطا در جستجو:", error.message);
    return [];
  }
};

export const getProductPricing = async (categoryId) => {
  if (!categoryId) return null;

  const cacheKey = `pricing:${categoryId}`;
  const cached = serverCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${mainDomain}/api/Product/Pricing`, {
      params: { categoryId },
      timeout: 5000,
    });
    
    serverCache.set(cacheKey, response.data);
    return response.data;
  } catch (err) {
    return {
      type: "error",
      message: err.response?.data || "خطای شبکه",
      status: err.response?.status,
    };
  }
};

export const fetchNotifyAvailable = async (id, token) => {
  try {
    const response = await axios.post(
      `${mainDomain}/api/Product/NotifyAvailable/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      }
    );
    return response.data;
  } catch (error) {
    return {
      type: "error",
      message: error.response?.data || "خطای شبکه",
    };
  }
};

// تابع برای پاک کردن کش (اختیاری)
export const clearProductCache = () => {
  serverCache.clear();
  console.log('🧹 کش محصولات پاک شد');
};