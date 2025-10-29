import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

export const getItem = async (params) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item`, {
      params,
    });
    return response.data;
  } catch (err) {
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};

export const getItemById = async (id) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item/${id}`);

    return response.data;
  } catch (err) {
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};

export const getItemByUrl = async (url) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item/findByUrl`, {
      params: {
        url,
        langCode: "fa",
      },
      headers: { "Cache-Control": "no-cache" },
    });

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

export const getItemByIds = async (data, token) => {
  try {
    const response = await axios.post(
      `${mainDomain}/api/Item/GetListByIds`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export const getListItemByIds = async (ids) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item/ByIds/${ids}`);
    return response.data;
  } catch (err) {
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};

export const itemVisit = async (id, url, ip, userAgent) => {
  const data = {
    langCode: "fa",
    id,
    url,
    ip,
    userAgent,
  };

  try {
    const response = await axios.post(`${mainDomain}/api/Item/visit`, data);
    return response.data;
  } catch (error) {
    return {
      type: "error",
      message: error.response?.data ? error.response?.data : "خطای شبکه",
    };
  }
};

export const getListItemBanner = async () => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item/Banner`, {
      params: {
        langCode: "fa",
        categoryId: -1,
      },
    });
    return response.data;
  } catch (err) {
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};
