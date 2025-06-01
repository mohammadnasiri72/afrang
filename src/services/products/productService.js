import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";
import Swal from "sweetalert2";

// import sweet alert 2
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

export const getProducts = async (data) => {
  try {
    const params = {     
      LangCode: "fa",  
      PageSize: data.pageSize,  
      PageIndex: data.page,    
      ...(data.BrandId && { BrandId: data.BrandId }),   
      ...(data.CategoryId && { CategoryId: data.CategoryId }), 
      ...(data.price1 && data.price1 !== 0 && { Price1: data.price1 }), 
      ...(data.price2 && data.price2 !== 100000 && { Price2: data.price2 }), 
      OrderBy: data.orderBy || "2",
      ...(data.OnlyPrice && { OnlyPrice: data.OnlyPrice }),
      ...(data.OnlyDiscount && { OnlyDiscount: data.OnlyDiscount }),
      ...(data.StatusId && { StatusId: data.StatusId }),
      ...(data.OnlyFest && { OnlyFest: data.OnlyFest }),
      ...(data.ConditionId && { ConditionId: data.ConditionId }),
    };


    const response = await axios.get(`${mainDomain}/api/Product`, {
      params,
    });    
    
   
    
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }

    return response.data;
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: error.response?.data ? error.response?.data : "خطای شبکه",
    });
    return []
  }
};


export const getProductId = async (id) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Product/${id}`);
    return response.data
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: error.response?.data ? error.response?.data : "خطای شبکه",
    });
    return {}
  }
};

export const getProductListId = async (data) => {
  try {
    const response = await axios.post(`${mainDomain}/api/Product/GetListByIds` , data);
    return response.data
  } catch (error) {
    Toast.fire({
      icon: "error",
      text: error.response?.data ? error.response?.data : "خطای شبکه",
    });
    return {}
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
    Toast.fire({
      icon: "error",
      text: error.response?.data ? error.response?.data : "خطای شبکه",
    });
    return {}
  }
};



export const getProductTerm = async (term) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Product/FindByTerm` , {
      params:{
        langCode:'fa',
        term,
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
  } catch (error) {
   console.log(error);
    return []
  }
};