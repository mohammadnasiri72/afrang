import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";



export const getProducts = async (data) => {
  try {
    const params = {     
      LangCode: "fa",  
      PageSize: data.pageSize,  
      PageIndex: data.page,    
      OrderBy: data.orderBy || "2",
      ...(data.BrandId && { BrandId: data.BrandId }),   
      ...(data.CategoryId && { CategoryId: data.CategoryId }), 
      ...(data.price1 && data.price1 !== 0 && { Price1: data.price1 }), 
      ...(data.price2 && data.price2 !== 100000 && { Price2: data.price2 }), 
      ...(data.OnlyPrice && { OnlyPrice: data.OnlyPrice }),
      ...(data.OnlyDiscount && { OnlyDiscount: data.OnlyDiscount }),
      ...(data.StatusId && { StatusId: data.StatusId }),
      ...(data.OnlyFest && { OnlyFest: data.OnlyFest }),
      ...(data.ConditionId && { ConditionId: data.ConditionId }),
    };


    const response = await axios.get(`${mainDomain}/api/Product`, {
      params,
    });    
    
   
    
    // if (!response.data || !Array.isArray(response.data)) {
    //   return [];
    // }

    return response.data;
  } catch (err) {
    // console.error("Error fetching products:", error);
    // return [];
    return {
  type: "error",
  message: err.response?.data ? err.response?.data : "خطای شبکه",
};
  }
};


export const getProductId = async (id) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Product/${id}`);
    return response.data
  } catch (err) {
     const responseData = err.response?.data;
    const isHard404 =
      typeof responseData === "string" &&
      (responseData.includes("<!DOCTYPE") ||
        responseData.includes("<html") ||
        responseData.includes("Not Found") ||
        responseData.includes("HTTP Error") ||
        responseData.includes("<!DOCTYPE HTML PUBLIC")); 
   

    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
      status: err.response?.status,
      isHard404
    };
  }
};

export const getProductListId = async (data) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Product/GetListByIds` , data );
    return response.data
  } catch (error) {
    return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
  }
};

export const getRelatedProductsByIdString = async (relatedIdsString) => {
  try {
    if (!relatedIdsString) return [];
    
    // Convert comma-separated string to array of numbers
    const ids = relatedIdsString.split(',').map(id => parseInt(id));
    
    const data = {
      ids: ids
    };
    
    return await getProductListId(data);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
};


export const getProductAction = async () => {
  try {
    const response = await axios.get(`${mainDomain}/api/Product/Auction?langCode=fa` );
    return response.data
  } catch (error) {
   return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
  }
};



export const getProductTerm = async (term , catIds) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Product/FindByTerm` , {
      params:{
        langCode:'fa',
        term,
        catIds,
        pageSize:50,
        page:1
      }
    } );
    return response.data
  } catch (error) {
    
  }
};




export const getProductPricing = async (categoryId) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Product/Pricing` , {
      params:{
        categoryId,
      }
    });
    return response.data
  } catch (err) {
     const responseData = err.response?.data;
    const isHard404 =
      typeof responseData === "string" &&
      (responseData.includes("<!DOCTYPE") ||
        responseData.includes("<html") ||
        responseData.includes("Not Found") ||
        responseData.includes("HTTP Error") ||
        responseData.includes("<!DOCTYPE HTML PUBLIC")); 
   

    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
      status: err.response?.status,
      isHard404
    };
  }
};



export const getProductCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Product/Category/${categoryId}`, {
      cache: 'force-cache'
    });
    return response.data
  } catch (err) {    
     const responseData = err.response?.data;
    const isHard404 =
      typeof responseData === "string" &&
      (responseData.includes("<!DOCTYPE") ||
        responseData.includes("<html") ||
        responseData.includes("Not Found") ||
        responseData.includes("HTTP Error") ||
        responseData.includes("<!DOCTYPE HTML PUBLIC")); 
   

    return {
      type: "error",
      message: err.response?.data ? err.response?.data : "خطای شبکه",
      status: err.response?.status,
      isHard404
    };
  }
};


export const fetchNotifyAvailable = async (id , token) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Product/NotifyAvailable/${id}` , {} , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  } catch (error) {
    return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
  }
};