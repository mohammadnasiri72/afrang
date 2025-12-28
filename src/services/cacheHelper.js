/**
 * Cache Helper - استفاده شده توسط تمام services
 * مدیریت یکپارچه کش محلی (in-memory) و Next.js cache tags
 */

const globalCaches = new Map();

/**
 * بررسی اعتبار کش بر اساس تایم‌استمپ
 */
export const isCacheValid = (timestamp, maxAgeMs = 3600000) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < maxAgeMs;
};

/**
 * دریافت کش محلی
 */
export const getLocalCache = (cacheKey) => {
  const cached = globalCaches.get(cacheKey);
  if (cached && isCacheValid(cached.timestamp, cached.maxAge)) {
    console.log(`[Cache HIT] ${cacheKey}`);
    return cached.data;
  }
  return null;
};

/**
 * ذخیره در کش محلی
 */
export const setLocalCache = (cacheKey, data, maxAgeMs = 3600000) => {
  globalCaches.set(cacheKey, {
    data,
    timestamp: Date.now(),
    maxAge: maxAgeMs,
  });

  // محدود کردن حجم کش
  if (globalCaches.size > 200) {
    const firstKey = globalCaches.keys().next().value;
    globalCaches.delete(firstKey);
  }
};

/**
 * پاک کردن کش محلی
 */
export const clearLocalCache = (pattern = null) => {
  if (!pattern) {
    globalCaches.clear();
    console.log('>>> All local caches cleared');
    return;
  }

  // پاک کردن بر اساس pattern
  for (const [key] of globalCaches) {
    if (key.includes(pattern)) {
      globalCaches.delete(key);
    }
  }
  console.log(`>>> Local caches cleared for pattern: ${pattern}`);
};

/**
 * تابع اصلی برای درخواست fetch با کش
 */
export const cachedFetch = async (
  url,
  options = {},
  cacheKey = null,
  maxAgeMs = 3600000
) => {
  const {
    method = 'GET',
    headers = { 'Content-Type': 'application/json' },
    body = null,
    tags = [],
    force = false,
    timeout = 15000,
  } = options;

  // اگر cacheKey نداشتیم، از URL استفاده میکنیم
  const finalCacheKey = cacheKey || `fetch_${method}_${url}`;

  // بررسی کش محلی (اگر force نباشه)
  if (!force) {
    const cached = getLocalCache(finalCacheKey);
    if (cached) {
      return cached;
    }
  } else {
    console.log(`[Force Fetch] ${finalCacheKey}`);
    clearLocalCache(finalCacheKey);
  }

  // اضافه کردن cache-buster برای force requests
  let finalUrl = url;
  if (force) {
    const separator = url.includes('?') ? '&' : '?';
    finalUrl += `${separator}_prewarm=${Date.now()}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const fetchOptions = {
      method,
      headers,
      signal: controller.signal,
      next: {
        revalidate: Math.floor(maxAgeMs / 1000),
        tags: [...tags, 'global-cache'],
      },
    };

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    if (force) {
      fetchOptions.cache = 'no-store';
    }

    const response = await fetch(finalUrl, fetchOptions);
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // ذخیره در کش محلی
    setLocalCache(finalCacheKey, data, maxAgeMs);

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`[Fetch Error] ${finalUrl}:`, error.message);
    throw error;
  }
};

/**
 * تابع ساده‌شده برای GET درخواست‌ها
 */
export const cachedGet = async (
  url,
  options = {},
  cacheKey = null,
  maxAgeMs = 3600000
) => {
  return cachedFetch(url, { ...options, method: 'GET' }, cacheKey, maxAgeMs);
};

/**
 * تابع ساده‌شده برای POST درخواست‌ها
 */
export const cachedPost = async (
  url,
  body,
  options = {},
  cacheKey = null,
  maxAgeMs = 3600000
) => {
  return cachedFetch(
    url,
    { ...options, method: 'POST', body },
    cacheKey,
    maxAgeMs
  );
};

/**
 * Track recent URLs برای preWarming
 */
const recentRequests = new Set();

export const trackRequest = (identifier) => {
  recentRequests.add(identifier);
  if (recentRequests.size > 100) {
    const firstId = recentRequests.values().next().value;
    recentRequests.delete(firstId);
  }
};

export const getRecentRequests = () => {
  return Array.from(recentRequests);
};

export const clearRecentRequests = () => {
  recentRequests.clear();
};
