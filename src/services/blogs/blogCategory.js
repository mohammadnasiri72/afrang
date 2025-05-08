import { mainDomain, mainDomainImg } from "@/utils/mainDomain";
import axios from "axios";

export const getBlogsCat = async () => {
  try {    
    const response = await axios.get(`${mainDomain}/api/Category`, {
      params: {
        TypeId: 5,
        LangCode: "fa",
      },
    });


    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        const total = response.data[0].total || 0; // دریافت total از اولین آیتم
      
      return {
        items: response.data.map(item => ({
          id: item.id,
          title: item.title,
          url: item.url,
          img: mainDomainImg+ item.image,
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