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

export const sendComment = async (data) => {
  try {
    const commentData = {
      userName: "", // برای زمانی که کاربر لاگین کرده باشد
      itemId: data.itemId,
      parentId: data.parentId || -1, // اگر parentId نباشد، -1 ارسال می‌شود
      name: data.name,
      type: data.type,
      body: data.body,
      langCode: "fa",
      email: data.email,
      score: 0,
      userIP: "", // فعلاً خالی
    };

    

    const response = await axios.post(`${mainDomain}/api/Comment`, commentData);
    return response.data;
  } catch (error) {
    console.error('خطا در ارسال کامنت:', error);
    throw error;
  }
};
