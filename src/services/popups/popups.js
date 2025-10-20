import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

export const getPopUpsData = async () => {
  try {    
    const response = await axios.get(`${mainDomain}/api/Item/Popup`, {
      params:{
        langCode:'fa'
      }
    });
    return response.data;
  } catch (err) {
    return {type:'error',message:err.response?.data ? err.response?.data : "خطای شبکه"}
  }
};