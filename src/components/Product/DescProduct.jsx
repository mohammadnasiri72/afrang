import {
  getProductId,
  getRelatedProductsByIdString,
} from "@/services/products/productService";
import ProductMain from "../home/ProductMain";

async function DescProduct({ id }) {
  const product = await getProductId(id);
  let similarProducts = [];
  if (product.product?.similarId) {
    similarProducts = await getRelatedProductsByIdString(
      product.product.similarId
    );
  }

  return (
    <>
      {similarProducts.length > 0 && (
        <div className="sm:h-[35rem] h-[40rem] overflow-hidden">
          <div className="sm:px-4 mt-20">
            <div className="sm:hidden flex justify-center items-center pb-10">
              <div className="sm:hidden flex items-center title-newProduct relative">
                <h2 className="font-semibold text-xl">محصولات مشابه</h2>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="sm:flex hidden items-center title-newProduct relative">
                <h2 className="font-semibold text-xl">محصولات مشابه</h2>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <ProductMain products={similarProducts} />
          </div>
        </div>
      )}
    </>
  );
}

export default DescProduct;
