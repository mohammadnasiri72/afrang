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

// export const getCategory = async (params) => {
//   try {
//     const response = await axios.get(`${mainDomain}/api/Category`, {
//       params,
//       timeout: 15000, // جلوگیری از معطل شدن طولانی
//     });
//     return response.data;
//   } catch (error) {
//     return {
//       type: "error",
//       message: error.response?.data ? error.response?.data : "خطای شبکه",
//     };
//   }
// };
export const getCategory = async (params = {}) => {
  try {
    // ایجاد URL با پارامترهای جستجو
    const url = new URL(`${mainDomain}/api/Category`);
    
    // اضافه کردن پارامترها به URL
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value);
      }
    });
    
    // درخواست fetch با cache و revalidate
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache', // استفاده از cache
      next: { revalidate: 60 }, // revalidate هر 60 ثانیه
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching category:', error);
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Category/${id}`);

    return response.data;
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: error.response?.data ? error.response?.data : "خطای شبکه",
    });
  }
};

export const getBreadcrumb = async (id) => {
  try {
    const params = {
      id,
      LangCode: "fa",
    };

    const response = await axios.get(`${mainDomain}/api/Category/Breadcrumb`, {
      params,
    });

    return response.data;
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: error.response?.data ? error.response?.data : "خطای شبکه",
    });
    return [];
  }
};

export const getBreadcrumbProduct = async (id) => {
  try {
    const params = {
      id,
      LangCode: "fa",
    };

    const response = await axios.get(`${mainDomain}/api/Item/Breadcrumb`, {
      params,
    });

    return response.data;
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: error.response?.data ? error.response?.data : "خطای شبکه",
    });
    return [];
  }
};
