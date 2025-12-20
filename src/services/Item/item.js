import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";


const createQueryString = (params = {}) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value);
    }
  });
  return searchParams.toString();
};

export const getItem = async (params) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item`, {
      params,
      timeout: 15000,
    });
    return response.data;
  } catch (err) {
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};

export const getItemById = async (id) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item/${id}`, {
      timeout: 15000,
    });

    return response.data;
  } catch (err) {
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};


export const getItemByUrl = async (url) => {
  try {
    // ساخت URL با پارامترها
    const params = new URLSearchParams({
      url,
      langCode: "fa",
    });
    const apiUrl = `${mainDomain}/api/Item/findByUrl?${params}`;
    
    // استفاده از fetch با کش (مثلاً 60 ثانیه)
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // کش برای 60 ثانیه
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    const isHard404 = err.message.includes("Not Found") || 
                     err.message.includes("404");
    return {
      type: "error",
      message: err.message || "خطای شبکه",
      isHard404,
    };
  }
};

export const getItemByIds = async (data, token) => {
  try {
    const response = await axios.post(
      `${mainDomain}/api/Item/GetListByIds`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 15000,
      }
    );
    return response.data;
  } catch (err) {
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};

export const getListItemByIds = async (ids) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Item/ByIds/${ids}`, {
      timeout: 15000,
    });
    return response.data;
  } catch (err) {
    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
    };
  }
};

export const itemVisit = async (id, url, userAgent) => {
  const data = {
    langCode: "fa",
    id,
    url,
    ip:'',
    userAgent,
  };

  try {
    const response = await axios.post(`${mainDomain}/api/Item/visit`, data, {
      timeout: 15000,
    });
    return response.data;
  } catch (error) {
    return {
      type: "error",
      message: error.response?.data ? error.response?.data : "خطای شبکه",
    };
  }
};

// export const getListItemBanner = async () => {
//   try {
//     const response = await axios.get(`${mainDomain}/api/Item/Banner`, {
//       params: {
//         langCode: "fa",
//         categoryId: -1,
//       },
//       timeout: 15000,
//     });
//     return response.data;
//   } catch (err) {
//     return {
//       type: "error",
//       message: err.response?.data ? err.response?.data : "خطای شبکه",
//     };
//   }
// };


export const getListItemBanner = async () => {
  try {
    const params = {
      langCode: "fa",
      categoryId: -1,
    };
    
    const queryString = createQueryString(params);
    const url = `${mainDomain}/api/Item/Banner${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};