import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

export const newsletter = async (email, csrf) => {
  const data = new FormData();
  data.append("email", email);
  data.append("__RequestVerificationToken", csrf.csrfToken);

  try {
    const cleanToken = csrf.csrfToken.trim();
    const response = await axios.post(`${mainDomain}/api/Newsletter`, data, {
      headers: {
        "X-CSRF-Token": cleanToken,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};
