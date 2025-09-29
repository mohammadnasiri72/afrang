import EidDiscount from "@/components/home/EidDiscount";
import {
  getProductAction,
  getProductListId,
} from "@/services/products/productService";

async function EidDiscountProduct() {
  let actionProducts = [];
  let productList = [];

  try {
    actionProducts = await getProductAction();
    if (actionProducts && actionProducts.length > 0 && !actionProducts.type) {
      productList = await getProductListId({
        ids: actionProducts[0]?.productIds || [],
      });
    }
  } catch (error) {
    console.error("Error fetching action products:", error);
  }

  return (
    <>
      {productList.length > 0 && (
        <EidDiscount actionProducts={actionProducts} products={productList} />
      )}
    </>
  );
}

export default EidDiscountProduct;
