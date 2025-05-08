import axios from "axios";
import { mainDomain } from "@/utils/mainDomain";

export const fetchSettings = async () => {
  try {
    const response = await axios.get(`${mainDomain}/api/Property/value/setting`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
}; 