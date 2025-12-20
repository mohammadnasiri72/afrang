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

export const getPropertyItem = async (ids) => {

  try {
    const response = await axios.get(
      `${mainDomain}/api/Property/value/item/${ids}`,
      {
        timeout: 15000,
      }
    );
    return response.data;
  } catch (error) {
    return {
      type: "error",
      message: error.response?.data ? error.response?.data : "خطای شبکه",
    };
  }
};

// export const getCategoryChild = async (categoryId) => {
//   try {
//     const response = await axios.get(
//       `${mainDomain}/api/Property/value/productfilter/${categoryId}`,
//       {
//         timeout: 15000,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     Toast.fire({
//       icon: "error",
//       text: error.response?.data ? error.response?.data : "خطای شبکه",
//     });
//   }
// };


export const getCategoryChild = async (categoryId) => {
  try {
    const url = `${mainDomain}/api/Property/value/productfilter/${categoryId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // توجه: SweetAlert2 در Server Components کار نمی‌کند
    // در صورت نیاز به نمایش پیام خطا، باید در Client Component استفاده شود
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};