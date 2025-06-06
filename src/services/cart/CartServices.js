import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";


export const getCart = async (userId) => {
  try {
      const response = await axios.get(`${mainDomain}/api/Cart/${userId}`);
      return response.data;
  } catch (err) {
      return { type: 'error', message: err.response.data };
  }
};


export const getNextCart = async (userId) => {
  try {
      const response = await axios.get(`${mainDomain}/api/Cart/${userId}/next`);
      return response.data;
  } catch (err) {
      return { type: 'error', message: err.response.data };
  }
};

export const addToCartNext = async (id) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Cart/next/add?id=${id}`, {});
    return response.data;
  } catch (err) {
    return { type: 'error', message: err.response.data? err.response.data : "خطای شبکه" };
  }
};


export const moveToCurrentCart = async (id) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Cart/next/back?id=${id}`, {});
    return response.data;
  } catch (err) {
    return { type: 'error', message: err.response.data? err.response.data : "خطای شبکه" };
  }
};

