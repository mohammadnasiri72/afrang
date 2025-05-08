import React from "react";

function PriceProduct({ product }) {

  return (
    <>
      {
        product.callPriceButton &&
        <div className="text-lg text-blue-500 py-5 mt-5 font-semibold select-none">تماس بگیرید</div>
      }
      {
       !product.callPriceButton && product.price === 0 &&
        <div className="text-lg text-blue-500 py-5 mt-5">بدون قیمت</div>
      }
      {
        !product.callPriceButton && product.price !== 0 &&
        <div>
          {product.discount > 0 && (
            <div className="flex flex-col py-5">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-2xl">
                  {product.finalPrice.toLocaleString()}
                </span>
                <span className="text-[#555]"> تومان</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-lg line-through text-[#888]">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-white bg-[#d1182b] px-3 py-0.5 rounded-sm">
                  {product.discount}%
                </span>
              </div>
            </div>
          )}
          {product.discount === 0 && (
            <div className="flex flex-col py-5">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-2xl">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-[#555]"> تومان</span>
              </div>
            </div>
          )}
        </div>
      }
      {/* {product.statusId === 2 && (
        <span className="text-lg text-[#666] py-5 mt-5">موجود نیست</span>
      )}
      {product.statusId === 3 && (
        <span className="text-lg text-red-500 py-5 mt-5">توقف تولید</span>
      )}
      {product.statusId === 4 && (
        <span className="text-lg text-blue-500 py-5 mt-5">بزودی</span>
      )} */}

    </>
  );
}

export default PriceProduct;
