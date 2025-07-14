import React from "react";

function PriceProduct({ product }) {
  return (
    <>
      {product.callPriceButton && (
        <div className="text-lg text-blue-500 mt-5 font-semibold select-none">تماس بگیرید</div>
      )}
      {!product.callPriceButton && product.price === 0 && (
        <div className="text-lg text-blue-500 mt-5">بدون قیمت</div>
      )}
      {!product.callPriceButton && product.price !== 0 && (
        <div className="bg-white p-2 rounded-lg shadow my-2 flex flex-col items-center justify-center">
          {product.discount > 0 ? (
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-3xl text-[#d1182b]">{product.finalPrice.toLocaleString()}</span>
                <span className="text-[#555] text-lg">تومان</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg line-through text-[#888]">{product?.price1?.toLocaleString()}</span>
                <span className="text-white bg-[#d1182b] px-3 py-0.5 rounded-sm text-sm">{product.discount}%</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              {product?.price1 !== 0 ? (
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-3xl text-[#d1182b]">{product?.price1?.toLocaleString()}</span>
                  <span className="text-[#555] text-lg">تومان</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-[#555]">بدون قیمت</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default PriceProduct;
