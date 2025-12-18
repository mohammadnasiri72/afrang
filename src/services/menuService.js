import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

// کش ساده درون‌حافظه‌ای برای منوها تا در همه صفحات و prefetchها
// فقط هر ۶۰ ثانیه یک بار از API منو خوانده شود
const menuCache = {
  data: null,
  time: 0,
  ttl: 60_000, // 60 ثانیه
};

export const fetchMenuItems = async () => {
  const now = Date.now();

  if (menuCache.data && now - menuCache.time < menuCache.ttl) {
    return menuCache.data;
  }

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

      menuCache.data = rootItems;
      menuCache.time = now;

      return rootItems;
    }
    return [];
  } catch (error) {
    // console.error("Error fetching menu items:", error);
    return [];
  }
};
