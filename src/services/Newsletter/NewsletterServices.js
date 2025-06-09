import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";




export const newsletter = async (email) => {
   const data = new FormData();
   data.append("email", email);
  try {
    
    const response = await axios.post(`${mainDomain}/api/Newsletter`, data);
    return response.data;
  } catch (err) {
    return {type:'error',message:err.response?.data ? err.response?.data : "خطای شبکه"}
  }
};
