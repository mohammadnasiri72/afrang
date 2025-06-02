import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";
import Swal from "sweetalert2";

// import sweet alert 2
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});




export const getItem = async (params) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item`, {
      params
    });
    return response.data;
  } catch (err) {
    Toast.fire({
      icon: "error",
      text: err.response?.data ? err.response?.data : "خطای شبکه",
      customClass: {
        container: "toast-modal",
      },
    });
  }
};


export const getItemById = async (id) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item/${id}`);
    return response.data;
  } catch (err) {
    Toast.fire({
      icon: "error",
      text: err.response?.data ? err.response?.data : "خطای شبکه",
      customClass: {
        container: "toast-modal",
      },
    });
  }
};


export const getItemByUrl = async (url) => {  
  try {
    const response = await axios.get(`${mainDomain}/api/Item/findByUrl`, {
      params: {
        url,
        langCode: 'fa'
      }
    });
    return response.data;
  } catch (err) {
    Toast.fire({
      icon: "error",
      text: err.response?.data ? err.response?.data : "خطای شبکه",
      customClass: {
        container: "toast-modal",
      },
    });
  }
};


export const getItemByIds = async (data, token) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Item/GetListByIds`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};




export const itemVisit = async (id, url, ip, userAgent) => {
  const data = {
    langCode: 'fa',
    id,
    url,
    ip,
    userAgent
  }

  try {
    const response = await axios.post(`${mainDomain}/api/Item/visit`, data);
    return response.data;
  } catch (error) {
    console.error('Error in itemVisit:', error);
    throw error;
  }
};











