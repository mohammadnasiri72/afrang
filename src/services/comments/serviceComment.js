import { mainDomain, mainDomainImg } from "@/utils/mainDomain";
import axios from "axios";

export const getComment = async (id, pageComment = 1) => {
  try {
    const params = {
      id,
      LangCode: "fa",
      PageSize: 5,
      PageIndex: pageComment,
    };

    const response = await axios.get(`${mainDomain}/api/Comment`, {
      params,
    });

    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      const total = response.data[0].total || 0; // دریافت total از اولین آیتم

      return {
        items: response.data.map((item) => ({
          id: item.id,
          parentId: item.parentId,
          title: item.title,
          name: item.name,
          userName: item.userName,
          userPhoto: mainDomainImg + item.userPhoto,
          score: item.score,
          seen: item.seen,
          dateProduct: new Date(item.created).toLocaleDateString("fa-IR"),
          url: item.url,
          body: item.body,
        })),
        totalCount: total, // استفاده از total دریافتی
      };
    }
    return {
      items: [],
      totalCount: 0,
    };
  } catch (error) {
    // console.error('خطا در دریافت بلاگ‌ها:', error);
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
