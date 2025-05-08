'use client';

import { Segmented } from "antd";
import { useState } from "react";
import ProductMain from "../home/ProductMain";
import AccessoriesProduct from "./AccessoriesProduct";
import CommentProduct from "./CommentProduct";
import CriticismProduct from "./CriticismProduct";
import DetailsProduct from "./DetailsProduct";
import SpecificationsProduct from "./SpecificationsProduct";
import BundleProducts from "./BundleProducts";

function ProductTabs({ product, comments, totalCount }) {
  const [tabProDetails, setTabProDetails] = useState(product.typeId === 3 ? 1 : 2);

  const options = [
    { label: "پرسش و پاسخ", value: 6 },
    { label: "محصولات مرتبط", value: 5 },
    { label: "نظرات", value: 4 },
    { label: "مشخصات فنی", value: 3 },
    { label: "توضیحات محصول", value: 2 },
    ...(product.typeId === 3 ? [{ label: "محصولات دسته ای", value: 1 }] : []),
  ];

  return (
    <>
      <div className="flex flex-wrap bg-white rounded-lg mt-3">
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
              comments={comments}
              id={product.id}
              totalCount={totalCount}
            />
          )}
          {tabProDetails === 5 && <AccessoriesProduct product={product} />}
          {tabProDetails === 6 && <CriticismProduct product={product} />}
        </div>
      </div>

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
      <div className="mt-5">
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <ProductMain products={product.relatedProducts} />
        )}
      </div>

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
        {product.similarProducts && product.similarProducts.length > 0 && (
          <ProductMain products={product.similarProducts} />
        )}
      </div>
    </>
  );
}

export default ProductTabs; 