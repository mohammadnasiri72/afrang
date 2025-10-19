import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

export const getUserAdFilter = async () => {
  try {
    const response = await axios.get(`${mainDomain}/api/UserAd/Sell/Filter`, {
      params: {
        langCode: "fa",
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

export const getUserAdFilter2 = async () => {
  try {
    const response = await axios.get(`${mainDomain}/api/UserAd/Buy/Filter`, {
      params: {
        langCode: "fa",
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

export const getUserAdSell = async (data) => {
  try {
    const response = await axios.get(`${mainDomain}/api/UserAd/Sell`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    return {
      type: "error",
      message: error.response?.data ? error.response?.data : "خطای شبکه",
    };
  }
};

export const getProductSecId = async (id) => {
  try {
    const response = await axios.get(`${mainDomain}/api/UserAd/Sell/${id}`);
    return response.data;
  } catch (err) {
    const responseData = err.response?.data;
    const isHard404 =
      typeof responseData === "string" &&
      (responseData.includes("<!DOCTYPE") ||
        responseData.includes("<html") ||
        responseData.includes("Not Found") ||
        responseData.includes("HTTP Error") ||
        responseData.includes("<!DOCTYPE HTML PUBLIC"));

    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
      status: err.response?.status,
      isHard404,
    };
  }
};

export const getUserAdBuy = async (data) => {
  try {
    const response = await axios.get(`${mainDomain}/api/UserAd/Buy`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    return {
      type: "error",
      message: error.response?.data ? error.response?.data : "خطای شبکه",
    };
  }
};

export const getUserAdContact = async (id) => {
  try {
    const response = await axios.get(`${mainDomain}/api/UserAd/Contact/${id}`);
    return response.data;
  } catch (error) {
    return {
      type: "error",
      message: error.response?.data ? error.response?.data : "خطای شبکه",
    };
  }
};
