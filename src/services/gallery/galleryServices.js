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
    // imageSrc: imgData.upload[0].thumbUrl,
    imageSrc: 'afrangdigital.com/GalleryImages/11/LargeSize/2013625155414878.jpg',
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