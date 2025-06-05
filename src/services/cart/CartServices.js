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



