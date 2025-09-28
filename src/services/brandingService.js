import axios from "axios";
import { mainDomain } from "@/utils/mainDomain";

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
  } catch (error) {
   
  }
}; 