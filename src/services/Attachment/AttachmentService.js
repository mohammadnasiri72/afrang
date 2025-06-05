import axios from "axios";
import { mainDomain } from "@/utils/mainDomain";

export const Attachment = async (id) => {
    try {
        const response = await axios.get(`${mainDomain}/api/Attachment/item/${id}`);
        return response.data;
    } catch (err) {
        return { type: 'error', message: err.response.data };
    }
};


export const AttachmentCategory = async (id) => {
    try {
        const response = await axios.get(`${mainDomain}/api/Attachment/category/${id}`);
        return response.data;
    } catch (err) {
        return { type: 'error', message: err.response.data };
    }
};