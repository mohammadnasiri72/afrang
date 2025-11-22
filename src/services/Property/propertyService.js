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
      `${mainDomain}/api/Property/value/item/${ids}`
    );
    return response.data;
  } catch (error) {
    return {
      type: "error",
      message: error.response?.data ? error.response?.data : "خطای شبکه",
    };
  }
};

export const getCategoryChild = async (categoryId) => {
  try {
    const response = await axios.get(
      `${mainDomain}/api/Property/value/productfilter/${categoryId}`
    );
    return response.data;
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: error.response?.data ? error.response?.data : "خطای شبکه",
    });
  }
};
