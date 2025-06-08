import { mainDomain, mainDomainImg } from "@/utils/mainDomain";
import axios from "axios";

export const getComment = async (id, pageComment = 1 , type = 0) => {
  try {
    const params = {
      id,
      LangCode: "fa",
      type,
      PageSize: 20,
      PageIndex: pageComment,
    };

    const response = await axios.get(`${mainDomain}/api/Comment`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('خطا در دریافت بلاگ‌ها:', error);
    throw error;
  }
};


export const getUserComments = async (params , token) => {
  try {
   

    const response = await axios.get(`${mainDomain}/api/Comment/User` , {
      params,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
  }
};

export const sendComment = async (data , token) => {
  try {
    const commentData = {
      userName: "",
      itemId: data.itemId,
      parentId: data.parentId || -1, // اگر parentId نباشد، -1 ارسال می‌شود
      name: token ? data.name : "",
      type: data.type,
      body: data.body,
      langCode: "fa",
      email: token ? data.email : "",
      score: 0,
      userIP: data.userIP|| ""
    };

    
if(token){
  const response = await axios.post(`${mainDomain}/api/Comment`, commentData , {
    headers: {
      'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
}else{
  const response = await axios.post(`${mainDomain}/api/Comment`, commentData);
  return response.data;
}
  } catch (error) {
    return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
  }
};

export const deleteComment = async (id , token) => {
  try {
  const response = await axios.delete(`${mainDomain}/api/Comment/${id}` , {
    headers: {
      'Authorization': `Bearer ${token}`
      }
    });
    return response.data;

  } catch (error) {
    return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
  }
};


export const editComment = async (data , token) => {
  try {
  const response = await axios.put(`${mainDomain}/api/Comment/Edit` , data , {
    headers: {
      'Authorization': `Bearer ${token}`
      }
    });
    return response.data;

  } catch (error) {
    return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
  }
};
