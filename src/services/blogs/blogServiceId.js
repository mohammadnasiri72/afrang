import { mainDomain, mainDomainImg } from "@/utils/mainDomain";
import axios from "axios";

export const getBlogsId = async (id) => {
 
    
  try {
    const response = await axios.get(`${mainDomain}/api/Item/${id}`);

    if (response.data && typeof response.data === 'object') {
      const item = response.data;

      
      return {
        items: [{
          id: item.id,
          title: item.title,
          desc: item.summary,
          img: mainDomainImg + item.image,
          producer: item.sourceName || "ناشناس",
          dateProduct: new Date(item.created).toLocaleDateString("fa-IR"),
          url: item.url,
          body: item.body,
          comment: item.comment,
        }],
        totalCount: 1,
      };
    }
    return {
      items: [],
      totalCount: 0,
    };
  } catch (error) {
    console.error('خطای کامل در درخواست:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    throw error;
  }
};
