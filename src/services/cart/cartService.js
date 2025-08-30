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

export const addToCart = async (
  productId,
  warrantyId = -1,
  userId,
  quantity = 1,
  colorId = -1,
  parentId = -1,
  amount
) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Cart`, {
      langCode: "fa",
      userId,
      productId: productId,
      colorId,
      warrantyId: warrantyId,
      parentId,
      quantity: quantity,
      ...(amount ? { amount: amount } : {}),
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
    const response = await axios.post(
      `${mainDomain}/api/Cart/next/add?id=${id}`,
      {}
    );
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
    const response = await axios.post(
      `${mainDomain}/api/Cart/next/back?id=${id}`,
      {}
    );
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
    const response = await axios.get(`${mainDomain}/api/Cart/${userId}`, {
      signal,
    });
    return response.data;
  } catch (error) {
    if (error.name === "AbortError") {
      // Request was aborted, handle silently
      return;
    }
    console.error("Error getting cart:", error);
    throw error;
  }
};

export const getNextCart = async (userId, signal) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Cart/${userId}/next`, {
      signal,
    });
    return response.data;
  } catch (error) {
    if (error.name === "AbortError") {
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
    // Toast.fire({
    //   icon: "success",
    //   text: "محصول از سبد خرید حذف شد",
    //   customClass: {
    //     container: "toast-modal",
    //   },
    // });
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
export const deleteCartItemAll = async (userId) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Cart/Clear/${userId}`);
   
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

// تابع برای ادغام سبد خرید مهمان با سبد خرید کاربر
export const mergeGuestCart = async (guestUserId, currentUserId) => {
  try {
    console.log('Debug - Starting cart merge for guest:', guestUserId, 'to user:', currentUserId);
    
    // ابتدا cart مهمان را دریافت کن
    const guestCartResponse = await axios.get(`${mainDomain}/api/Cart/${guestUserId}`);
    const guestCart = guestCartResponse.data;
    
    if (!guestCart || !guestCart.length) {
      console.log('Debug - Guest cart is empty, no merge needed');
      return { success: true, message: 'سبد خرید مهمان خالی است' };
    }
    
    console.log('Debug - Found guest cart items:', guestCart.length);
    
    // محصولات مهمان را به cart کاربر اضافه کن - فقط همین!
    for (const item of guestCart) {
      try {
        await addToCart(
          item.productId,
          item.warrantyId || -1,
          currentUserId, // استفاده از userId کاربر لاگین شده
          item.quantity || 1,
          item.colorId || -1,
          item.parentId || -1,
          item.amount
        );
        console.log('Debug - Added item to user cart:', item.productId);
      } catch (error) {
        console.error('Error adding item to user cart:', error);
      }
    }
    
    console.log('Debug - All items added to user cart');
    
    // پاک کردن cart مهمان
    try {
      await deleteCartItemAll(guestUserId);
      console.log('Debug - Guest cart cleared successfully');
    } catch (clearError) {
      console.error('Error clearing guest cart:', clearError);
    }
    
   
    
    return { 
      success: true, 
      mergedItems: guestCart.length,
      message: `${guestCart.length} محصول با موفقیت ادغام شد`
    };
    
  } catch (err) {
    console.error("Error merging cart:", err);
    Toast.fire({
      icon: "error",
      text: "خطا در ادغام سبد خرید",
      customClass: {
        container: "toast-modal",
      },
    });
    return { success: false, error: err.message };
  }
};
