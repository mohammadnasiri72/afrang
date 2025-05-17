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

export const addToCart = async (productId, warrantyId = -1, userId) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Cart`, {
      langCode: "fa",
      userId,
      productId: productId,
      colorId: -1,
      warrantyId: warrantyId,
      parentId: -1,
      quantity: 1,
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

export const addToCartNext = async (id) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Cart/next/add?id=${id}`, {});
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

export const moveToCurrentCart = async (id) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Cart/next/back?id=${id}`, {});
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

export const updateCart = async (cartId, updateType, userId) => {
  try {
    const response = await axios.put(`${mainDomain}/api/Cart/${cartId}`, {
      langCode: "fa",
      userId: userId,
      updateType: updateType,
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

export const getCart = async (userId, signal) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Cart/${userId}`, { signal });
    return response.data;
  } catch (error) {
    if (error.name === 'AbortError') {
      // Request was aborted, handle silently
      return;
    }
    console.error("Error getting cart:", error);
    throw error;
  }
};

export const getNextCart = async (userId, signal) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Cart/${userId}/next`, { signal });
    return response.data;
  } catch (error) {
    if (error.name === 'AbortError') {
      // Request was aborted, handle silently
      return;
    }
    console.error("Error getting next cart:", error);
    throw error;
  }
};

export const deleteCartItem = async (cartItemId, userId) => {
  try {
    const response = await axios.delete(
      `${mainDomain}/api/Cart/${userId}/${cartItemId}`
    );
    Toast.fire({
      icon: "success",
      text: "محصول از سبد خرید حذف شد",
      customClass: {
        container: "toast-modal",
      },
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
