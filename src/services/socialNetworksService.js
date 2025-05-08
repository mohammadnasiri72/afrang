import axios from "axios";
import { mainDomain } from "@/utils/mainDomain";

export const fetchSocialNetworks = async () => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item`, {
      params: {
        TypeId: 8,
        LangCode: "fa",
      },
    });

    if (response.data) {
      
      return response.data.sort((a, b) => b.priority - a.priority);
    }
    return [];
  } catch (error) {
    console.error("Error fetching social networks:", error);
    throw error;
  }
}; 