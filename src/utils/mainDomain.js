export const mainDomain = "https://api.afrangdigital.com";
export const mainDomainImg = "https://admin.afrangdigital.com";
export const mainUrl = "https://www.afrangdigital.com";

export const getImageUrl = (image) => {
  if (!image) return null;
  try {
    if (image.startsWith("http")) {
      return image;
    }
    return `${mainDomainImg}/${image.replace(/^(~\/|\.\.\/)/g, "")}`;
  } catch (error) {
    console.error("Error processing image URL:", error);
    return null;
  }
};






//  Server   
// Object { message: "Request failed with status code 404", name: "AxiosError", stack: "AxiosError: Request failed with status code 404\n    at AxiosError.from (webpack-internal:///(rsc)/./node_modules/axios/lib/core/AxiosError.js:97:14)\n    at fetch (webpack-internal:///(rsc)/./node_modules/axios/lib/adapters/fetch.js:238:71)\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async Axios.request (webpack-internal:///(rsc)/./node_modules/axios/lib/core/Axios.js:52:14)\n    at async getItemByUrl (webpack-internal:///(rsc)/./src/services/Item/item.js:41:26)\n    at async DynamicPage (webpack-internal:///(rsc)/./src/app/(main)/[slug]/page.js:21:22)", config: {…}, code: "ERR_BAD_REQUEST", status: 404 }
// ​
// code: "ERR_BAD_REQUEST"
// ​
// config: Object { timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", … }
// ​
// message: "Request failed with status code 404"
// ​
// name: "AxiosError"
// ​
// stack: "AxiosError: Request failed with status code 404\n    at AxiosError.from (webpack-internal:///(rsc)/./node_modules/axios/lib/core/AxiosError.js:97:14)\n    at fetch (webpack-internal:///(rsc)/./node_modules/axios/lib/adapters/fetch.js:238:71)\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async Axios.request (webpack-internal:///(rsc)/./node_modules/axios/lib/core/Axios.js:52:14)\n    at async getItemByUrl (webpack-internal:///(rsc)/./src/services/Item/item.js:41:26)\n    at async DynamicPage (webpack-internal:///(rsc)/./src/app/(main)/[slug]/page.js:21:22)"
// ​
// status: 404
// ​
// <prototype>: Object { … }



//  Server   
// Object { message: "Request failed with status code 404", name: "AxiosError", stack: "AxiosError: Request failed with status code 404\n    at AxiosError.from (webpack-internal:///(rsc)/./node_modules/axios/lib/core/AxiosError.js:97:14)\n    at fetch (webpack-internal:///(rsc)/./node_modules/axios/lib/adapters/fetch.js:238:71)\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async Axios.request (webpack-internal:///(rsc)/./node_modules/axios/lib/core/Axios.js:52:14)\n    at async getItemByUrl (webpack-internal:///(rsc)/./src/services/Item/item.js:41:26)\n    at async Module.generateMetadata (webpack-internal:///(rsc)/./src/app/(main)/[slug]/layout.js:16:18)", config: {…}, code: "ERR_BAD_REQUEST", status: 404 }
// ​
// code: "ERR_BAD_REQUEST"
// ​
// config: Object { timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", … }
// ​
// message: "Request failed with status code 404"
// ​
// name: "AxiosError"
// ​
// stack: "AxiosError: Request failed with status code 404\n    at AxiosError.from (webpack-internal:///(rsc)/./node_modules/axios/lib/core/AxiosError.js:97:14)\n    at fetch (webpack-internal:///(rsc)/./node_modules/axios/lib/adapters/fetch.js:238:71)\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async Axios.request (webpack-internal:///(rsc)/./node_modules/axios/lib/core/Axios.js:52:14)\n    at async getItemByUrl (webpack-internal:///(rsc)/./src/services/Item/item.js:41:26)\n    at async Module.generateMetadata (webpack-internal:///(rsc)/./src/app/(main)/[slug]/layout.js:16:18)"
// ​
// status: 404
// ​
// <prototype>: Object { … }




