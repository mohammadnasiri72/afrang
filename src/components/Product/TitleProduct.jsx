
import BasketBox from "./BasketBox";
import DescProductDetails from "./DescProductDetails";
import SliderProductDetails from "./SliderProductDetails";

function TitleProduct({ product, similarProducts }) {
  // ساخت آبجکت جدید برای تصویر اصلی با همان ساختار attachments
  const mainImageAttachment = product?.product?.image
    ? {
        id: "main-image",
        itemId: product?.product?.productId,
        itemKey: "Image",
        fileUrl: product?.product?.image,
        priority: 0, // اولویت صفر برای نمایش در اول اسلایدر
        title: "",
      }
    : null;

  // ترکیب تصویر اصلی با سایر تصاویر
  const allAttachments = mainImageAttachment
    ? [mainImageAttachment, ...(product.attachments || [])]
    : product.attachments;

  return (
    <>
      <div className="flex flex-wrap bg-white rounded-lg p-2 z-50 relative">
        {allAttachments && allAttachments.length > 0 && (
          <div className="lg:w-[40%] w-full p-2 h-[30rem] overflow-hidden">
            <SliderProductDetails
              attachments={allAttachments}
              product={product?.product}
            />
          </div>
        )}
        {(!allAttachments || allAttachments.length === 0) && (
          <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg p-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center !mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 !mb-2">
              تصویری موجود نیست
            </h3>
            <p className="text-gray-500 text-center text-sm">
              در حال حاضر تصویری برای این محصول ثبت نشده است.
            </p>
            <div className="mt-4 p-3 bg-gray-100 rounded-md text-sm text-gray-600">
              <span className="font-semibold ml-1">کد محصول:</span>
              {product?.product?.productId || "نامشخص"}
            </div>
          </div>
        )}

        <div className="lg:w-[60%] w-full p-2">
          <DescProductDetails
            product={product}
            similarProducts={similarProducts}
          />
        </div>
        <div className="lg:hidden w-full p-2 ">
          <BasketBox product={product} />
        </div>
      </div>
    </>
  );
}

export default TitleProduct;
