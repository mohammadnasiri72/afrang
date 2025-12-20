import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

// ایجاد instance اختصاصی axios
const apiClient = axios.create({
  baseURL: `${mainDomain}/api`,
  timeout: 15000,
});

// Interceptor برای لاگ کردن
apiClient.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: performance.now() };
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    const endTime = performance.now();
    const duration = endTime - response.config.metadata.startTime;
    
   
    
    return response;
  },
  (error) => {
    if (error.config?.metadata?.startTime) {
      const endTime = performance.now();
      const duration = endTime - error.config.metadata.startTime;
     
    }
    return Promise.reject(error);
  }
);

export default apiClient;