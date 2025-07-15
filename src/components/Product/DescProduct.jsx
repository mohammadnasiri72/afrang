'use client';

import { useState, useEffect } from "react";
import ProductMain from "../home/ProductMain";
import { getRelatedProductsByIdString } from "@/services/products/productService";

function DescProduct({ product }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (product.product?.optionalId) {
        const relatedResult = await getRelatedProductsByIdString(product.product.optionalId);
        setRelatedProducts(relatedResult || []);
      }
      if (product.product?.similarId) {
        const similarResult = await getRelatedProductsByIdString(product.product.similarId);
        setSimilarProducts(similarResult || []);
      }
    };
    fetchProducts();
  }, [product.product?.relatedId, product.product?.similarId]);

  return (
    <>
      {
        relatedProducts.length > 0 &&
        <div className="sm:px-4 mt-20">
          <div className="sm:hidden flex justify-center items-center pb-10">
            <div className="sm:hidden flex items-center title-newProduct relative">
              <h2 className="font-semibold text-xl">محصولات مکمل</h2>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="sm:flex hidden items-center title-newProduct relative">
              <h2 className="font-semibold text-xl">محصولات مکمل</h2>
            </div>
          </div>
        </div>
      }
      {
        relatedProducts.length > 0 &&
        <div className="mt-5">
          <ProductMain products={relatedProducts} />
        </div>
      }
      {
        similarProducts.length > 0 &&
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
      }
      {
        similarProducts.length > 0 &&
        <div className="mt-5">
          <ProductMain products={similarProducts} />
        </div>
      }
    </>
  );
}

export default DescProduct; 