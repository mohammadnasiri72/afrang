import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

export const productService = {
  async getProductId(id) {
    try {
      const response = await axios.get(`${mainDomain}/api/product/${id}`);
      
      // اگر محصول bundle داشته باشه، اون رو پارس می‌کنیم
      if (response.data.bundle) {
        try {
          response.data.bundle = JSON.parse(response.data.bundle);
        } catch (error) {
          console.error('خطا در پارس کردن bundle:', error);
          response.data.bundle = null;
        }
      }
      
      return response.data;
    } catch (error) {
      console.error("خطا در دریافت جزئیات محصول:", error);
      throw error;
    }
  },

  async getProductList() {
    try {
      const response = await axios.get(`${mainDomain}/api/product`);
      return response.data;
    } catch (error) {
      console.error("خطا در دریافت لیست محصولات:", error);
      throw error;
    }
  },

  async getProductListByCategory(categoryId) {
    try {
      const response = await axios.get(
        `${mainDomain}/api/product/category/${categoryId}`
      );
      return response.data;
    } catch (error) {
      console.error("خطا در دریافت محصولات دسته‌بندی:", error);
      throw error;
    }
  },

  async getProductListByBrand(brandId) {
    try {
      const response = await axios.get(
        `${mainDomain}/api/product/brand/${brandId}`
      );
      return response.data;
    } catch (error) {
      console.error("خطا در دریافت محصولات برند:", error);
      throw error;
    }
  },

  async getProductListBySearch(search) {
    try {
      const response = await axios.get(
        `${mainDomain}/api/product/search/${search}`
      );
      return response.data;
    } catch (error) {
      console.error("خطا در جستجوی محصولات:", error);
      throw error;
    }
  },
}; 