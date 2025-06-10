import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";


export const getGallery = async (params) => {
  
  try {
    const response = await axios.get(`${mainDomain}/api/Gallery`, {
      params
    });
    return response.data;
  } catch (err) {
    return { type: 'error', message: err.response?.data ? err.response?.data : "خطای شبکه" }
  }
};

export const sendGallery = async (imgData, token) => {
  const data = {
    categoryId: imgData.category,
    cameraType: imgData.camera,
    lenzType: imgData.lens,
    photoTime: imgData.photoDate,
    imageSrc: imgData.imageSrc.imageUrl,
  }
  try {
    const response = await axios.post(`${mainDomain}/api/Gallery/Send`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (err) {
    return { type: 'error', message: err.response?.data ? err.response?.data : "خطای شبکه" }
  }
};

export const getGalleryUser = async (token) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Gallery/User` , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return { type: 'error', message: err.response?.data ? err.response?.data : "خطای شبکه" }
  }
};


export const deleteGalleryUser = async (id , token) => {
  try {
    const response = await axios.delete(`${mainDomain}/api/Gallery/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return { type: 'error', message: err.response?.data ? err.response?.data : "خطای شبکه" }
  }
};