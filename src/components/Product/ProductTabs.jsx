'use client';

import { Segmented } from "antd";
import { useState, useEffect } from "react";
import ProductMain from "../home/ProductMain";
import AccessoriesProduct from "./AccessoriesProduct";
import CommentProduct from "./CommentProduct";
import DetailsProduct from "./DetailsProduct";
import SpecificationsProduct from "./SpecificationsProduct";
import BundleProducts from "./BundleProducts";
import { getRelatedProductsByIdString } from "@/services/products/productService";

function ProductTabs({ product }) {
  const [tabProDetails, setTabProDetails] = useState(product.product.typeId === 3 ? 1 : 2);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  

  useEffect(() => {
    const fetchProducts = async () => {
      // دریافت محصولات مرتبط
      if (product.product?.relatedId) {
        const relatedResult = await getRelatedProductsByIdString(product.product.relatedId);
        setRelatedProducts(relatedResult || []);
      }

      // دریافت محصولات مشابه
      if (product.product?.similarId) {
        const similarResult = await getRelatedProductsByIdString(product.product.similarId);
        setSimilarProducts(similarResult || []);
      }
    };

    fetchProducts();
  }, [product.product?.relatedId, product.product?.similarId]);

  const options = [
    { label: "پرسش و پاسخ", value: 6 },
    { label: "محصولات مرتبط", value: 5 },
    { label: "نظرات", value: 4 },
    { label: "مشخصات فنی", value: 3 },
    { label: "توضیحات محصول", value: 2 },
    ...(product.product.typeId === 3 ? [{ label: "محصولات دسته ای", value: 1 }] : []),
  ];

  return (
    <>
      <div className="flex flex-wrap bg-white rounded-lg mt-3 z-50 relative">
        <div className="w-full SegmentedProduct overflow-hidden mx-auto flex justify-center p-5 ">
          <Segmented
            className="font-semibold text-3xl w-full overflow-auto"
            dir="ltr"
            style={{
              padding: "8px",
              fontFamily: "yekan",
              width: "100%",
            }}
            value={tabProDetails}
            onChange={(e) => {
              setTabProDetails(e);
            }}
            options={options}
          />
        </div>

        <div className="w-full">
          {tabProDetails === 1 && <BundleProducts product={product} />}
          {tabProDetails === 2 && <DetailsProduct product={product} />}
          {tabProDetails === 3 && <SpecificationsProduct product={product} />}
          {tabProDetails === 4 && (
            <CommentProduct
             
              id={product.product.productId}
              type={0}
            />
          )}
          {tabProDetails === 5 && <AccessoriesProduct product={product} />}
          {tabProDetails === 6 && <CommentProduct
           
           id={product.product.productId}
            type={1}
          />}
        </div>
      </div>
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

export default ProductTabs; 