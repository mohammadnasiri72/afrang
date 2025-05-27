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



export const itemVisit = async (id, url, ip, userAgent) => {
  const data = {
    langCode: 'fa',
    id,
    url,
    ip,
    userAgent
  }
  console.log(data);
  
  try {
    const response = await axios.post(`${mainDomain}/api/Item/visit`, data);
    return response.data;
  } catch (error) {
    console.error('Error in itemVisit:', error);
    throw error;
  }
};











