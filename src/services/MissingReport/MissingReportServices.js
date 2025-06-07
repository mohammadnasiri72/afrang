import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";




export const reportMissing = async (data , token) => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 20000));
    
    const response = await axios.post(`${mainDomain}/api/MissingReport`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (err) {
    return {type:'error',message:err.response?.data ? err.response?.data : "خطای شبکه"}
  }
};
