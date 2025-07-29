import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

export const PostUserSellAd = async (data, token) => {
    
  try {
    const response = await axios.post(`${mainDomain}/api/UserSellAd`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return {
      type: "error",
      message: error.response?.data ? error.response?.data : "خطای شبکه",
    };
  }
};
