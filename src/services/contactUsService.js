import axios from "axios";
import { mainDomain } from "@/utils/mainDomain";

export const fetchContactUs = async () => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item`, {
      params: {
        TypeId: 1015,
        LangCode: "fa",
        CategoryIdArray: 3227,
      },
    });

    if (response.data) {
      return response.data.sort((a, b) => b.priority - a.priority)[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching contact us:", error);
    throw error;
  }
}; 