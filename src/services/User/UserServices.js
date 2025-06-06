import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

export const getAddress = async (token) => {
    try {
      const response = await axios.get(`${mainDomain}/api/User/address`, {
        params: {
          id: 0,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
        return {type: 'error', message: err.response?.data ? err.response?.data : "خطای شبکه"}
    }
  };



  export const getLegal = async (token) => {
    try {
      const response = await axios.get(`${mainDomain}/api/User/LegalInfo`, {
        params: {
          id: 0,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return {type: 'error', message: err.response?.data ? err.response?.data : "خطای شبکه"}
    }
  };
  



  
  export const getLegalId = async (id , token) => {
    try {
      const response = await axios.get(`${mainDomain}/api/User/LegalInfo`, {
        params: {
          id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return {type: 'error', message: err.response?.data ? err.response?.data : "خطای شبکه"}
    }
  };


  export const addAddress = async (data , token) => {
    try {
      const response = await axios.post(`${mainDomain}/api/User/address`, data , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return {type: 'error', message: err.response?.data ? err.response?.data : "خطای شبکه"}
    }
  };


  export const addLegal = async (data , token) => {
    try {
      const response = await axios.post(`${mainDomain}/api/User/LegalInfo`, data , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return {type: 'error', message: err.response?.data ? err.response?.data : "خطای شبکه"}
    }
  };