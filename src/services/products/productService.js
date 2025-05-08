import { mainDomain, mainDomainImg } from "@/utils/mainDomain";
import axios from "axios";

export const getProducts = async (
  page = 1,
  pageSize = 20,
  orderBy,
  price1,
  price2
) => {
  try {
    const params = {
      LangCode: "fa",
      PageSize: pageSize,
      PageIndex: page,
      ...(orderBy && { OrderBy: orderBy }),
      ...(price1 && price1 !== 0 && { Price1: price1 }),
      ...(price2 && price2 !== 100000 && { Price2: price2 }),
    };

    const response = await axios.get(`${mainDomain}/api/Product`, {
      params,
    });
    
    
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      const total = response.data[0].total || 0;

      return {
        items: response.data.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price1,
          discount: item.discount || 0,
          finalPrice: item.finalPrice,
          img: mainDomainImg + item.image,
          url: item.url,
          canAddCart: item.canAddCart,
          statusId: item.statusId,
          callPriceButton: item.callPriceButton,
          // summary: item.summary,
          //   producer: item.sourceName || "ناشناس",
          //   dateProduct: new Date(item.created).toLocaleDateString('fa-IR'),
          //   body: item.body,
        })),
        totalCount: total,
      };
    }
    return {
      items: [],
      totalCount: 0,
    };
  } catch (error) {
    console.error("خطا در دریافت بلاگ‌ها:", error);
    return {
      items: [],
      totalCount: 0,
      error: error.message,
    };
  }
};
export const getProductId = async (id) => {
  try {
    const response = await axios.get(`${mainDomain}/api/Product/${id}`);

    if (response.data && typeof response.data === "object") {
      const item = response.data;

      // اگر محصول bundle داشته باشه، اون رو پارس می‌کنیم
      if (item.product.bundle) {
        try {
          item.bundle = JSON.parse(item.bundle);
        } catch (error) {
          console.error('خطا در پارس کردن bundle:', error);
          item.bundle = null;
        }
      }

      // دریافت محصولات bundle اگر وجود داشته باشند
      let bundleProducts = [];
      if (item.bundle && item.bundle.products) {
        const bundleProductIds = item.bundle.products.map(product => product.productId);
        if (bundleProductIds.length > 0) {
          const bundleResponse = await axios.post(
            `${mainDomain}/api/Product/GetListByIds`,
            {
              ids: bundleProductIds,
            }
          );
          if (bundleResponse.data && Array.isArray(bundleResponse.data)) {
            bundleProducts = bundleResponse.data;
          }
        }
      }
      
      // Collect all related product IDs and split them into individual numbers
      const relatedProductIds = [
        item.product.optionalId,
        item.product.relatedId,
        item.product.requireId,
        item.product.similarId,
      ]
        .filter((id) => id && id !== 0) // Filter out null/undefined and 0 values
        .flatMap((id) => id.split(",").map((num) => parseInt(num.trim()))) // Split by comma and convert to numbers
        .filter((id) => !isNaN(id)); // Remove any NaN values

      let relatedProducts = [];

      // If there are any related product IDs, fetch them
      if (relatedProductIds.length > 0) {
        const relatedResponse = await axios.post(
          `${mainDomain}/api/Product/GetListByIds`,
          {
            ids: relatedProductIds,
          }
        );

        if (relatedResponse.data && Array.isArray(relatedResponse.data)) {
          relatedProducts = relatedResponse.data;
        }
      }

      // Split the IDs into their respective categories
      const optionalIds = item.product.optionalId
        ? item.product.optionalId.split(",").map((id) => parseInt(id.trim()))
        : [];
      const relatedIds = item.product.relatedId
        ? item.product.relatedId.split(",").map((id) => parseInt(id.trim()))
        : [];
      const requireIds = item.product.requireId
        ? item.product.requireId.split(",").map((id) => parseInt(id.trim()))
        : [];
      const similarIds = item.product.similarId
        ? item.product.similarId.split(",").map((id) => parseInt(id.trim()))
        : [];

      // Filter relatedProducts based on each category
      const optionalProducts = relatedProducts.filter((product) =>
        optionalIds.includes(parseInt(product.productId))
      );
      const relatedProductsList = relatedProducts.filter((product) =>
        relatedIds.includes(parseInt(product.productId))
      );
      const requireProducts = relatedProducts.filter((product) =>
        requireIds.includes(parseInt(product.productId))
      );
      const similarProducts = relatedProducts.filter((product) =>
        similarIds.includes(parseInt(product.productId))
      );

      return {
        items: [
          {
            id: item.product.id,
            title: item.product.title,
            price: item.product.price1,
            discount: item.product.discount || 0,
            finalPrice: item.product.finalPrice,
            img: mainDomainImg + item.product.image,
            url: item.product.url,
            statusId: item.product.statusId,
            attachments: item.attachments || [],
            properties: item.properties || [],
            warranties: item.warranties || {},
            summary: item.product.summary,
            optionalProducts,
            relatedProducts: relatedProductsList,
            requireProducts,
            similarProducts,
            inventory: item.inventory,
            bundle: item.bundle,
            bundleProducts,
            typeId: item.product.typeId,
            canAddCart: item.canAddCart,
            callPriceButton: item.product.callPriceButton,
          },
        ],
      };
    }
    return {
      items: [],
    };
  } catch (error) {
    console.error("خطا در دریافت محصول:", error);
    return {
      items: [],
      error: error.message,
    };
  }
};
