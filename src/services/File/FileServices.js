import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";


export const UploadFile = async (file) => {
  try {
    const formData = new FormData();        
    formData.append('file', file);
    const response = await axios.post(`${mainDomain}/api/File/Upload`, formData);
    return response.data;
  } catch (err) {
    return { type: 'error', message: err.response?.data ? err.response?.data : "خطای شبکه" }
  }
};