import { mainDomain, mainDomainImg } from "@/utils/mainDomain";
import axios from "axios";

export const getBlogs = async (page = 1, pageSize = 12, category = null, orderBy = 1) => {
  try {
    const params = {
      TypeId: 5,
      LangCode: "fa",
      PageSize: pageSize,
      PageIndex: page,
      OrderBy: orderBy
    };

    if (category) {
      params.CategoryIdArray = category;
    }

    const response = await axios.get(`${mainDomain}/api/Item`, {
      params
    });

    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      const total = response.data[0].total || 0; // دریافت total از اولین آیتم
      
      return {
        items: response.data.map(item => ({
          id: item.id,
          title: item.title,
          desc: item.summary,
          img: mainDomainImg+ item.image,
          producer: item.sourceName || "ناشناس",
          dateProduct: new Date(item.created).toLocaleDateString('fa-IR'),
          url: item.url,
          body: item.body,
        })),
        totalCount: total // استفاده از total دریافتی
      };
    }
    return {
      items: [],
      totalCount: 0
    };
  } catch (error) {
    // console.error('خطا در دریافت بلاگ‌ها:', error);
    throw error;
  }
}; 

export const getEndBlogs = async () => {
  try {
    
    const params = {
      TypeId: 5,
      LangCode: "fa",
      PageSize: 3,
      PageIndex: 1
    };

   

    const response = await axios.get(`${mainDomain}/api/Item`, {
      params
    });

    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      const total = response.data[0].total || 0; // دریافت total از اولین آیتم
      
      return {
        items: response.data.map(item => ({
          id: item.id,
          title: item.title,
          desc: item.summary,
          img: mainDomainImg+ item.image,
          producer: item.sourceName || "ناشناس",
          dateProduct: new Date(item.created).toLocaleDateString('fa-IR'),
          url: item.url,
          body: item.body,
        })),
        totalCount: total // استفاده از total دریافتی
      };
    }
    return {
      items: [],
      totalCount: 0
    };
  } catch (error) {
    // console.error('خطا در دریافت بلاگ‌ها:', error);
    throw error;
  }
}; 