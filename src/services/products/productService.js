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
      ...(data.orderBy && { OrderBy: data.orderBy }),
      ...(data.OnlyPrice && { OnlyPrice: data.OnlyPrice }),
      ...(data.OnlyDiscount && { OnlyDiscount: data.OnlyDiscount }),
      ...(data.StatusId && { StatusId: data.StatusId }),
      ...(data.OnlyFest && { OnlyFest: data.OnlyFest }),
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




// export const getProductId = async (id) => {
//   try {
//     // اگر id یک URL است، شناسه را از آن استخراج می‌کنیم
//     const productId = typeof id === 'string' && id.includes('/product/') ? extractProductId(id) : id;
    
//     if (!productId) {
//       throw new Error('شناسه محصول نامعتبر است');
//     }

//     const response = await axios.get(`${mainDomain}/api/Product/${productId}`);

//     if (response.data && typeof response.data === "object") {
//       const item = response.data;

//       // اگر محصول bundle داشته باشه، اون رو پارس می‌کنیم
//       if (item.product.bundle) {
//         try {
//           item.bundle = JSON.parse(item.bundle);
//         } catch (error) {
//           console.error('خطا در پارس کردن bundle:', error);
//           item.bundle = null;
//         }
//       }

//       // دریافت محصولات bundle اگر وجود داشته باشند
//       let bundleProducts = [];
//       if (item.bundle && item.bundle.products) {
//         const bundleProductIds = item.bundle.products.map(product => product.productId);
//         if (bundleProductIds.length > 0) {
//           const bundleResponse = await axios.post(
//             `${mainDomain}/api/Product/GetListByIds`,
//             {
//               ids: bundleProductIds,
//             }
//           );
//           if (bundleResponse.data && Array.isArray(bundleResponse.data)) {
//             bundleProducts = bundleResponse.data;
//           }
//         }
//       }
      
//       // Collect all related product IDs and split them into individual numbers
//       const relatedProductIds = [
//         item.product.optionalId,
//         item.product.relatedId,
//         item.product.requireId,
//         item.product.similarId,
//       ]
//         .filter((id) => id && id !== 0) // Filter out null/undefined and 0 values
//         .flatMap((id) => id.split(",").map((num) => parseInt(num.trim()))) // Split by comma and convert to numbers
//         .filter((id) => !isNaN(id)); // Remove any NaN values

//       let relatedProducts = [];

//       // If there are any related product IDs, fetch them
//       if (relatedProductIds.length > 0) {
//         const relatedResponse = await axios.post(
//           `${mainDomain}/api/Product/GetListByIds`,
//           {
//             ids: relatedProductIds,
//           }
//         );

//         if (relatedResponse.data && Array.isArray(relatedResponse.data)) {
//           relatedProducts = relatedResponse.data;
//         }
//       }

//       // Split the IDs into their respective categories
//       const optionalIds = item.product.optionalId
//         ? item.product.optionalId.split(",").map((id) => parseInt(id.trim()))
//         : [];
//       const relatedIds = item.product.relatedId
//         ? item.product.relatedId.split(",").map((id) => parseInt(id.trim()))
//         : [];
//       const requireIds = item.product.requireId
//         ? item.product.requireId.split(",").map((id) => parseInt(id.trim()))
//         : [];
//       const similarIds = item.product.similarId
//         ? item.product.similarId.split(",").map((id) => parseInt(id.trim()))
//         : [];

//       // Filter relatedProducts based on each category
//       const optionalProducts = relatedProducts.filter((product) =>
//         optionalIds.includes(parseInt(product.productId))
//       );
//       const relatedProductsList = relatedProducts.filter((product) =>
//         relatedIds.includes(parseInt(product.productId))
//       );
//       const requireProducts = relatedProducts.filter((product) =>
//         requireIds.includes(parseInt(product.productId))
//       );
//       const similarProducts = relatedProducts.filter((product) =>
//         similarIds.includes(parseInt(product.productId))
//       );

//       return {
//         items: [
//           {
//             id: item.product.id,
//             title: item.product.title,
//             price: item.product.price1,
//             discount: item.product.discount || 0,
//             finalPrice: item.product.finalPrice,
//             img: mainDomainImg + item.product.imageSrc,
//             url: item.product.url,
//             statusId: item.product.statusId,
//             attachments: item.attachments || [],
//             properties: item.properties || [],
//             warranties: item.warranties || {},
//             summary: item.product.summary,
//             optionalProducts,
//             relatedProducts: relatedProductsList,
//             requireProducts,
//             similarProducts,
//             inventory: item.inventory,
//             bundle: item.bundle,
//             bundleProducts,
//             typeId: item.product.typeId,
//             canAddCart: item.canAddCart,
//             callPriceButton: item.product.callPriceButton,
//           },
//         ],
//       };
//     }
//     return {
//       items: [],
//     };
//   } catch (error) {
//     console.error("خطا در دریافت محصول:", error);
//     return {
//       items: [],
//       error: error.message,
//     };
//   }
// };
