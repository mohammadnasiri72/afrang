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

export const getProvince = async () => {
  try {
    const response = await axios.get(`${mainDomain}/api/Shipment/province`, {
      params: {
        langCode: "fa",
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


export const getCity = async (provinceId) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Shipment/city`, {
      params: {
        langCode: "fa",
        provinceId
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

export const addAddress = async (data , token) => {
  try {
    const response = await axios.post(`${mainDomain}/api/User/address`, data , {
      headers: {
        Authorization: `Bearer ${token}`,
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
    Toast.fire({
      icon: "error",
      text: err.response?.data ? err.response?.data : "خطای شبکه",
      customClass: {
        container: "toast-modal",
      },
    });
  }
};


export const getWaySend = async (provinceId , token) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Shipment/way`, {
      params: {
        langCode:'fa',
        provinceId
      },
      headers: {
        Authorization: `Bearer ${token}`,
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

export const getAddressId = async (id , token) => {
  try {
    const response = await axios.get(`${mainDomain}/api/User/address`, {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
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

export const deleteAddress = async (id , token) => {
  try {
    const response = await axios.delete(`${mainDomain}/api/User/Address/${id}` , {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const addLegal = async (data , token) => {
  try {
    const response = await axios.post(`${mainDomain}/api/User/LegalInfo`, data , {
      headers: {
        Authorization: `Bearer ${token}`,
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
    Toast.fire({
      icon: "error",
      text: err.response?.data ? err.response?.data : "خطای شبکه",
      customClass: {
        container: "toast-modal",
      },
    });
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
    Toast.fire({
      icon: "error",
      text: err.response?.data ? err.response?.data : "خطای شبکه",
      customClass: {
        container: "toast-modal",
      },
    });
  }
};

export const deleteLegal = async (id , token) => {
  try {
    const response = await axios.delete(`${mainDomain}/api/User/LegalInfo/${id}` , {
      headers: {
        Authorization: `Bearer ${token}`,
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



export const estimateOrder = async (data, token) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Order/Estimate`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error in estimate order:", err);
    Toast.fire({
      icon: "error",
      text: err.response?.data ? err.response?.data : "خطای شبکه",
      customClass: {
        container: "toast-modal",
      },
    });
    throw err;
  }
};


export const estimateOrderSave = async (data, token) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Order/Save`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error in estimate order:", err);
    Toast.fire({
      icon: "error",
      text: err.response?.data ? err.response?.data : "خطای شبکه",
      customClass: {
        container: "toast-modal",
      },
    });
    throw err;
  }
};


export const getOrder = async (token) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Order`, {
      params: {
        pageSize: 20,
        pageIndex: 1 ,
      },
      headers: {
        Authorization: `Bearer ${token}`,
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

export const getOrderTrackCode = async (trackCode , token) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Order/${trackCode}`, {
     
      headers: {
        Authorization: `Bearer ${token}`,
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


export const getWayPayment = async (paymentId) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item`, {
      params: {
        TypeId : 1022,
        LangCode : 'fa',
        CategoryIdArray: paymentId,
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


export const changePayment = async (data, token) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Payment/Change`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error in estimate order:", err);
    Toast.fire({
      icon: "error",
      text: err.response?.data ? err.response?.data : "خطای شبکه",
      customClass: {
        container: "toast-modal",
      },
    });
    throw err;
  }
};

export const getInfoPayOffline = async (paymentId) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Category/${paymentId}`);
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


export const PaymentOffline = async (data, token) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Payment/Offilne`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error in estimate order:", err);
    Toast.fire({
      icon: "error",
      text: err.response?.data ? err.response?.data : "خطای شبکه",
      customClass: {
        container: "toast-modal",
      },
    });
    throw err;
  }
};