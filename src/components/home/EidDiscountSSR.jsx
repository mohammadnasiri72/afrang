import EidDiscount from "@/components/home/EidDiscount";
import {
  getProductAction,
  getProductListId,
} from "@/services/products/productService";

async function EidDiscountSSR() {
  let actionProducts = [];
  let productList = [];

  actionProducts = await getProductAction();
  if (actionProducts && actionProducts.length > 0) {
    productList = await getProductListId({
      ids: actionProducts[0]?.productIds || [],
    });
  }
 
  
  return <EidDiscount actionProducts={actionProducts[0]} products={productList} />;
}

export default EidDiscountSSR;
