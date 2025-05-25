import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";



export const getMenuFooter = async () => {
  try {
    const response = await axios.get(`${mainDomain}/api/Menu`, {
      params: {
        langCode: "fa",
        menuKey : 'menufooter'
      },
    });
    return response.data;
  } catch (err) {
    console.error('API Error:', err.response?.data || err.message);
    throw err;
  }
};


