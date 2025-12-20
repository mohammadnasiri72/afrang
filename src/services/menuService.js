import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

// لاگ کم‌هزینه برای مانیتورینگ زمان منو
const logMenuTime = (message, startTime) => {
  try {
    const end =
      typeof performance !== "undefined" && performance.now
        ? performance.now()
        : Date.now();
    const duration = end - startTime;
    // این لاگ روی سرور چاپ می‌شود (نه مرورگر) و به پیدا کردن کندی منو کمک می‌کند
   
  } catch {
    // اگر performance در محیط فعلی نبود، بی‌صدا رد می‌شویم
  }
};

export const fetchMenuItems = async () => {
  const start =
    typeof performance !== "undefined" && performance.now
      ? performance.now()
      : Date.now();

  try {
    const response = await axios.get(`${mainDomain}/api/Menu`, {
      params: {
        langCode: "fa",
        menuKey: "primary",
      },
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      // جلوگیری از آویزان شدن رندر اگر منو کند باشد
      timeout: 15000,
    });

    if (response.data && response.data.length > 0) {
      const menuData = response.data[0].menuItems;
      const menuMap = new Map();
      const rootItems = [];

      // First pass: create all items
      menuData.forEach((item) => {
        menuMap.set(item.id, {
          ...item,
          Children: [],
        });
      });

      // Second pass: build the tree
      menuData.forEach((item) => {
        if (!item.parentId) {
          rootItems.push(menuMap.get(item.id));
        } else {
          const parent = menuMap.get(item.parentId);
          if (parent) {
            parent.Children.push(menuMap.get(item.id));
          }
        }
      });

      // Sort items by priority
      const sortByPriority = (items) => {
        return items.sort((a, b) => b.priority - a.priority);
      };

      // Sort root items
      sortByPriority(rootItems);

      // Sort children of each item
      rootItems.forEach((item) => {
        if (item.Children.length > 0) {
          sortByPriority(item.Children);
          item.Children.forEach((child) => {
            if (child.Children && child.Children.length > 0) {
              sortByPriority(child.Children);
            }
          });
        }
      });

      logMenuTime(
        `دریافت موفق منو (${rootItems.length} ریشه، ${menuData.length} آیتم خام)`,
        start
      );

      return rootItems;
    }

    logMenuTime("منو خالی یا بدون داده معتبر برگشت", start);
    return [];
  } catch (error) {
    logMenuTime("خطا در دریافت منو", start);
    console.error("❌ [Menu] Error fetching menu items:", error?.message);
    return [];
  }
};
