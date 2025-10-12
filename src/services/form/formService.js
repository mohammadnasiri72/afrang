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





export const PostContactForm = async (data) => {
    try {
      await axios.post(`${mainDomain}/api/Form/Contact`, data , {
        headers: {
          "X-CSRF-Token": data.csrf,
        },
         withCredentials: true,
      } );
      return true;
    } catch (err) {
      Toast.fire({
        icon: "error",
        text: err.response?.data ? err.response?.data : "خطای شبکه",
        customClass: {
          container: "toast-modal",
        },
      });
      return false; // برگرداندن آرایه خالی در صورت خطا
    }
  };