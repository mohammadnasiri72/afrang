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




export const getdataDashboard = async (token) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Order/Statistic`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
   return {type:'error',message:err.response?.data ? err.response?.data : "خطای شبکه"}
  }
};


export const getRecentViews = async (data, token) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Product/GetListByIds`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (err) {
    Toast.fire({
      icon: "error",
      text: err.response?.data ? err.response?.data : "خطای شبکه",
      
    });
    return []; // برگرداندن آرایه خالی در صورت خطا
  }
};


export const getWalletUser = async (token) => {
  try {
    const response = await axios.get(`${mainDomain}/api/User/WalletBalance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    Toast.fire({
      icon: "error",
      text: err.response?.data ? err.response?.data : "خطای شبکه",
     
    });
  }
};

export const updateUserProfile = async (data, token) => {
  try {
    const response = await axios.put(
      `${mainDomain}/api/User/profile`,
      {
        langCode: "fa", // یا می‌توانید از پارامتر ورودی استفاده کنید
        name: data.get('FirstName'),
        family: data.get('LastName'),
        email: data.get('Email') || "",
        brithDate: data.get('BirthDate') || ""
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || 'خطا در بروزرسانی پروفایل';
  }
};

export const getUserProfile = async (token) => {
    try {
        const response = await axios.get(
            `${mainDomain}/api/User/profile`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || 'خطا در دریافت اطلاعات کاربر';
    }
};