import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";


export const getUserNews = async (token) => {
    try {
        const response = await axios.get(`${mainDomain}/api/UserNews`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
    }
};

export const postUserNews = async (data , token) => {
   
    const mainData={
        langCode : 'fa',
        categoryId : data.category,
        imageSrc : data.imageSrc,
        title : data.title,
        summary : data.summary,
        body : data.content,
        sourceLink : data.source,
    }
    
    try {
        const response = await axios.post(`${mainDomain}/api/UserNews`, mainData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
       
        return response.data;
    } catch (error) {
        return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
    }
};

export const putUserNews = async (data , token) => {
    try {
        const response = await axios.put(`${mainDomain}/api/UserNews`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
    }
};

export const deleteUserNews = async (id , token) => {
    try {
        const response = await axios.delete(`${mainDomain}/api/UserNews/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
    }
};