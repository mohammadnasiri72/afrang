import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

export const getCsrf = async () => {
  try {
    const response = await axios.get(`${mainDomain}/api/Csrf`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت توکن CSRF:", error);
  }
};
