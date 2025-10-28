import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

export const fetchBrandingItems = async () => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item`, {
      params: {
        TypeId: 1023,
        LangCode: "fa",
        IsHome: 1,
      },
    });

    if (response.data) {
      return response.data.sort((a, b) => b.priority - a.priority);
    }
    return [];
  } catch (error) {}
};

export const fetchBrandingItemsPage = async (data) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item`, {
      params: data,
    });

    if (response.data) {
      return response.data;
    }
    return [];
  } catch (error) {}
};
