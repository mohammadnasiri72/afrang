// services/menuService.js
import { mainDomain } from "@/utils/mainDomain";

export const fetchMenuItems = async (opts = {}) => {
  const { force = false } = opts;
  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 900, tags: ["main-menu", "global-cache"] },
    };

    if (force) {
      // when prewarming we want a fresh fetch and to bypass any cached data
      fetchOptions.cache = "no-store";
      fetchOptions.next = { revalidate: 0, tags: ["main-menu", "global-cache"] };
    }

    const response = await fetch(
      `${mainDomain}/api/Menu?langCode=fa&menuKey=primary`,
      fetchOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.length > 0 && data[0].menuItems) {
      const menuData = data[0].menuItems;
      const menuMap = new Map();
      const rootItems = [];

      menuData.forEach((item) => {
        menuMap.set(item.id, { ...item, Children: [] });
      });

      menuData.forEach((item) => {
        if (!item.parentId) {
          rootItems.push(menuMap.get(item.id));
        } else {
          const parent = menuMap.get(item.parentId);
          if (parent) parent.Children.push(menuMap.get(item.id));
        }
      });

      const sortByPriority = (items) =>
        items.sort((a, b) => b.priority - a.priority);
      sortByPriority(rootItems);
      rootItems.forEach((item) => {
        if (item.Children.length > 0) sortByPriority(item.Children);
      });

      return rootItems;
    }

    return [];
  } catch (err) {
    console.error("Error fetching menu:", err);
    return [];
  }
};
