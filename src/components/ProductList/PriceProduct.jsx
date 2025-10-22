import { useSelector } from "react-redux";

function PriceProduct({ product }) {
  const selectedColor = useSelector(
    (state) => state.productColor.selectedColorMode
  );
  // اگر رنگ انتخاب شده وجود داشت، مقادیر را از آن بگیر، وگرنه از product
  const price = selectedColor ? selectedColor.price : product.finalPrice;
  const priceOriginal = selectedColor
    ? selectedColor.priceOriginal
    : product?.price1;
  const discount = selectedColor ? selectedColor.discount : product.discount;

  return (
    <>
      {product.callPriceButton && (
        <div className="text-lg text-blue-800 mt-5 font-semibold select-none">
          تماس بگیرید
        </div>
      )}
      {!product.callPriceButton && price === 0 && (
        <div className="text-lg text-blue-800 mt-5">بدون قیمت</div>
      )}
      {!product.callPriceButton && price !== 0 && (
        <div className="bg-white p-2 rounded-lg shadow my-2 flex flex-col items-center justify-center">
          {discount > 0 ? (
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold sm:text-3xl text-xl text-[#d1182b]">
                  {price.toLocaleString()}
                </span>
                <span className="text-[#555] text-lg">تومان</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg line-through text-[#222]">
                  {priceOriginal?.toLocaleString()}
                </span>
                {product.showOffPercent && (
                  <span className="text-white bg-[#d1182b] px-3 py-0.5 rounded-sm text-sm">
                    {discount}%
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              {priceOriginal !== 0 ? (
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold sm:text-3xl text-xl text-[#d1182b]">
                    {priceOriginal?.toLocaleString()}
                  </span>
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
