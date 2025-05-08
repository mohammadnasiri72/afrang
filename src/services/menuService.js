import axios from "axios";
import { mainDomain } from "@/utils/mainDomain";

export const fetchMenuItems = async () => {
  try {
    const response = await axios.get(`${mainDomain}/api/Menu`, {
      params: {
        langCode: "fa",
        menuKey: "primary",
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

      return rootItems;
    }
    return [];
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
}; 