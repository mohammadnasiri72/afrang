import React from "react";
import SliderProductDetails from "./SliderProductDetails";
import DescProductDetails from "./DescProductDetails";
import BasketBox from "./BasketBox";

function TitleProduct({ product }) {



  return (
    <>
      <div className="flex flex-wrap bg-white rounded-lg p-2 z-50 relative">

        {
          product.attachments && product.attachments.length > 0 &&
          <div className="lg:w-1/3 w-full p-2">
            <SliderProductDetails attachments={product.attachments} />
          </div>

        }
        {
          (!product.attachments || product.attachments.length === 0) &&
          <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg p-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">تصویری موجود نیست</h3>
            <p className="text-gray-500 text-center text-sm">در حال حاضر تصویری برای این محصول ثبت نشده است.</p>
            <div className="mt-4 p-3 bg-gray-100 rounded-md text-sm text-gray-600">
              <span className="font-semibold ml-1">کد محصول:</span>
              {product.id || "نامشخص"}
            </div>
          </div>
        }


        <div className="lg:w-5/12 w-full p-2">
          <DescProductDetails product={product} />
        </div>
        <div className="lg:w-1/4 w-full p-2">
          <BasketBox product={product} />
        </div>
      </div>
    </>
  );
}

export default TitleProduct;
