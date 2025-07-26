import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";


export const getUserAdFilter = async () => {
    try {
        const response = await axios.get(`${mainDomain}/api/UserAd/Sell/Filter`, {
            params:{
                langCode:'fa'
            }
        });
        return response.data;
    } catch (error) {
        return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
    }
};