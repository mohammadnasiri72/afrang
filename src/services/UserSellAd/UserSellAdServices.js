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
export const getUserSellAd = async (token) => {
  try {
    const response = await axios.get(`${mainDomain}/api/UserSellAd`, {
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


export const deleteUserSellAd = async (id , token) => {
  try {
    const response = await axios.delete(`${mainDomain}/api/UserSellAd/${id}` , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });    
    return response;
  } catch (err) {
   console.error(err)
  }
};


export const getUserSellAdId = async (id , token) => {

  try {
    const response = await axios.get(`${mainDomain}/api/UserSellAd/${id}`, {
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

export const PostUserBuyAd = async (data, token) => {
  try {
    const response = await axios.post(`${mainDomain}/api/UserBuyAd`, data, {
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


export const getUserBuyAd = async (token) => {
  try {
    const response = await axios.get(`${mainDomain}/api/UserBuyAd`, {
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

export const deleteUserBuyAd = async (id , token) => {
  try {
    const response = await axios.delete(`${mainDomain}/api/UserSellAd/${id}` , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });    
    return response;
  } catch (err) {
   console.error(err)
  }
};


export const getUserBuyAdId = async (id , token) => {

  try {
    const response = await axios.get(`${mainDomain}/api/UserBuyAd/${id}`, {
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