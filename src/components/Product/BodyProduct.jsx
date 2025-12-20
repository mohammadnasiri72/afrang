import { getComment } from "@/services/comments/serviceComment";
import { getListItemByIds } from "@/services/Item/item";
import {
  getProductId,
  getRelatedProductsByIdString,
} from "@/services/products/productService";
import ProductTabs from "./ProductTabs";

async function BodyProduct({ id, product: productProp }) {
  const product = productProp || (await getProductId(id));

  let relatedProducts = [];
  if (product?.product?.relatedId) {
    relatedProducts = await getRelatedProductsByIdString(
      product?.product?.relatedId
    );
  }

  let listVideo = [];
  if (product?.product?.relatedId) {
    listVideo = await getListItemByIds(
      product.properties?.find((e) => e.propertyKey === "related_videos")?.value
    );
  }

  let comments = [];
  if (product?.product?.productId) {
    comments = await getComment(product.product.productId, 1, 0);
  }

  let commentsQuestion = [];
  if (product?.product?.productId) {
    commentsQuestion = await getComment(product.product.productId, 1, 1);
  }

  return (
    <>
      <ProductTabs
        product={product}
        relatedProducts={relatedProducts}
        listVideo={listVideo}
        comments={comments}
        commentsQuestion={commentsQuestion}
      />
    </>
  );
}

export default BodyProduct;
