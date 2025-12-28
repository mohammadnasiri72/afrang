# ✅ Cache Pattern Guide - تمام Services

تمام services باید از یک **منطق یکسان برای caching** استفاده کنند:

## 1️⃣ Cache Helper استفاده کنید

```javascript
import { cachedGet, cachedPost, trackRequest } from "@/services/cacheHelper";
```

## 2️⃣ Pattern برای GET Requests

```javascript
export const getMyData = async (opts = {}) => {
  const { force = false } = opts;
  try {
    const url = `${mainDomain}/api/endpoint`;
    const cacheKey = "my_data_key";

    // track this request برای prewarming
    trackRequest(cacheKey);

    // استفاده از cachedGet
    const data = await cachedGet(
      url,
      {
        tags: ["my-feature"],  // برای revalidation
        force,  // برای prewarming
      },
      cacheKey,
      900000  // 1 ساعت in milliseconds
    );

    return data;
  } catch (error) {
    console.error("Error:", error);
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};

// Force fetch version
export const getMyDataForce = async () => {
  return await getMyData({ force: true });
};
```

## 3️⃣ Pattern برای POST Requests

```javascript
export const postMyData = async (body, opts = {}) => {
  const { force = false } = opts;
  try {
    const url = `${mainDomain}/api/endpoint`;
    const cacheKey = `my_data_${JSON.stringify(body)}`;

    trackRequest(cacheKey);

    const data = await cachedPost(
      url,
      body,
      {
        tags: ["my-feature"],
        force,
      },
      cacheKey,
      900000
    );

    return data;
  } catch (error) {
    console.error("Error:", error);
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};
```

## 4️⃣ Services که نیاز به اپدیت دارند:

### ✅ Already Updated:
- ✓ `settingsService.js`
- ✓ `sliderService.js`
- ✓ `contactUsService.js`
- ✓ `brandingService.js`
- ✓ `Item/item.js`

### ⏳ Need Update:
- `menuService.js` - partially updated, needs force option
- `blogService.js` - axios, needs conversion
- `blogServiceId.js` - axios, needs conversion
- `productService.js` - fetch already used, needs cache tags
- `categoryService.js` - fetch already used, needs cacheHelper
- `socialNetworksService.js` - check if needed
- `sliderService.js` - ✓ DONE
- All services in subfolders

## 5️⃣ Clear Cache API

Routes API automatically preWarms:
```
GET /api/clear-cache?secret=YOUR_SECRET
GET /api/clear-cache?secret=YOUR_SECRET&slug=my-page
```

This will:
1. Clear all local caches
2. PreWarm: menu, settings, slider, contact, branding, items (recent)
3. Revalidate all tags
4. Revalidate all pages

## 6️⃣ Cache Tags سازمان‌یافته:

| Feature | Tags |
|---------|------|
| Menu | `main-menu`, `global-cache` |
| Settings | `settings`, `global-cache` |
| Items | `items-by-url`, `items`, `global-cache` |
| Slider | `slider`, `items`, `global-cache` |
| Contact | `contact`, `items`, `global-cache` |
| Branding | `branding-home`, `branding-page`, `items`, `global-cache` |
| Products | `products`, `product-detail`, `global-cache` |
| Blogs | `blogs`, `blog-detail`, `global-cache` |
| Categories | `categories`, `global-cache` |

## 7️⃣ نکات مهم:

❌ **AVOID**:
- `cache: "force-cache"` (تضادی با revalidate)
- `axios` (استفاده کنید `fetch`)
- `throw error` (return error object)
- Multiple cache systems

✅ **DO**:
- استفاده کنید `cachedGet/cachedPost`
- اضافه کنید `{ force: true }` option
- استفاده کنید `tags` برای revalidation
- `trackRequest()` call کنید برای prewarming
- 10 دقیقه تا 1 ساعت cache time

## 8️⃣ مثال کامل - blogService.js:

```javascript
import { mainDomain, mainDomainImg } from "@/utils/mainDomain";
import { cachedGet, trackRequest } from "@/services/cacheHelper";

export const getBlogs = async (page = 1, pageSize = 12, category = null, opts = {}) => {
  const { force = false } = opts;
  try {
    const params = new URLSearchParams({
      TypeId: 5,
      LangCode: "fa",
      PageSize: pageSize,
      PageIndex: page,
      ...(category && { CategoryIdArray: category }),
    });
    const url = `${mainDomain}/api/Item?${params}`;
    const cacheKey = `blogs_p${page}_s${pageSize}_c${category || 'all'}`;

    trackRequest(cacheKey);

    const response = await cachedGet(
      url,
      {
        tags: ["blogs", "items"],
        force,
      },
      cacheKey,
      900000
    );

    if (Array.isArray(response) && response.length > 0) {
      const total = response[0].total || 0;
      return {
        items: response.map(item => ({
          id: item.id,
          title: item.title,
          desc: item.summary,
          img: mainDomainImg + item.image,
          producer: item.sourceName || "ناشناس",
          dateProduct: new Date(item.created).toLocaleDateString('fa-IR'),
          url: item.url,
          body: item.body,
        })),
        totalCount: total
      };
    }
    return { items: [], totalCount: 0 };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};

export const getBlogsForce = async (page = 1, pageSize = 12, category = null) => {
  return await getBlogs(page, pageSize, category, { force: true });
};
```

---

## Priority اپدیت‌ها:

1. **High**: `productService.js`, `categoryService.js`, `menuService.js`
2. **Medium**: `blogService.js`, سایر services در پوشه‌های Item, Category, etc.
3. **Low**: Helper services, Auth services
