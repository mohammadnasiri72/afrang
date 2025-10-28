
import { FaFileAlt } from "react-icons/fa";

function DetailsProduct({ product }) {
  if (!product?.product?.body) {
    return (
      <div className="py-5 px-7">
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-8">
          <div className="flex justify-center !mb-6">
            <FaFileAlt className="text-6xl text-[#d1182b] opacity-80" />
          </div>
          <span className="text-xl font-bold !mb-3 text-gray-800">
            توضیحاتی ثبت نشده!
          </span>
          <p className="text-gray-600 text-center">
            در حال حاضر توضیحات تکمیلی برای این محصول ثبت نشده است.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-5 px-7">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: product.product.body }}
        />
      </div>
    </>
  );
}

export default DetailsProduct;
