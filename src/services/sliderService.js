import axios from "axios";
import { mainDomain } from "@/utils/mainDomain";

export const fetchSliderItems = async () => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item`, {
      params: {
        TypeId: 6,
        LangCode: "fa",
      },
    });

    if (response.data) {
      return response.data.sort((a, b) => b.priority - a.priority);
    }
    return [];
  } catch (error) {
    console.error("Error fetching slider items:", error);
    throw error;
  }
};
