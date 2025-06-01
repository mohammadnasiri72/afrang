import axios from "axios";
import { mainDomain } from "@/utils/mainDomain";

export const getSettings = async () => {
    try {
       
        const response = await axios.get(`${mainDomain}/api/Property/value/setting`);
       
        return response.data;
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
        throw error;
    }
}; 