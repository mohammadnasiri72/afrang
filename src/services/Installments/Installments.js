import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

export const getInstallments = async (data, csrf) => {
  try {
    const response = await axios.post(
      `${mainDomain}/api/Installments/Calculate`,
      data,
      {
        headers: {
          "X-CSRF-Token": csrf.csrfToken,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};
