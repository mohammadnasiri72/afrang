import { getImageUrl } from "@/utils/mainDomain";
import { Modal, Radio, Tooltip } from "antd";
import Link from "next/link";
import { FaCheck, FaInfoCircle } from "react-icons/fa";
import SelectedInsurance from "./Product/SelectedInsurance";

function ModalAddtoBasket({
  isModalOpen,
  setIsModalOpen,
  product,
  selectedWarranty,
  setSelectedWarranty,
  isLoading,
  selectedColorId,
  setSelectedColorId,
  handleConfirm,
}) {
  const handleWarrantyChange = (e) => {
    setSelectedWarranty(e.target.value);
  };

  return (
    <>
      <Modal
        title=""
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        {product && (
          <div className="flex flex-col gap-4">
            {/* اطلاعات محصول */}
            <div className="flex gap-4">
              <div className="sm:w-32 w-24 sm:h-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={getImageUrl(product.product.image)}
                  alt={product.product.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-800 mb-1 line-clamp-2 pl-2">
                  {product.product.title}
                </h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                  {product.product.description}
                </p>
                {/* قیمت */}
                <div>
                  {product.product.discount > 0 ? (
                    <div className="flex flex-col">
                      <span className="text-gray-400 line-through text-xs">
                        {product.product.price1?.toLocaleString()} تومان
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[#d1182b] text-lg font-bold">
                          {product.product.finalPrice?.toLocaleString()} تومان
                        </span>
                        <span className="text-xs bg-red-100 text-[#d1182b] px-1.5 py-0.5 rounded">
                          {product.product.discount}% تخفیف
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[#d1182b] text-lg font-bold">
                      {product.product.finalPrice?.toLocaleString()} تومان
                    </span>
                  )}
                </div>
              </div>
            </div>
            {product?.insurance?.insuranceWays?.length > 0 && (
              <SelectedInsurance product={product} />
            )}
            {/* گارانتی‌ها */}
            {product?.warranty?.warrantyWays.length > 0 && (
              <div className="mt-3">
                <h4 className="font-semibold text-gray-800 text-sm mb-2">
                  انتخاب گارانتی
                </h4>

                <Radio.Group
                  onChange={handleWarrantyChange}
                  value={selectedWarranty}
                >
                  {product?.warranty?.warrantyWays.map((warranty) => (
                    <Radio
                      className={`border border-[#0003] !p-2 rounded-2xl !mt-1 w-full relative ${
                        warranty.id === selectedWarranty?.id
                          ? "!bg-[#4A90E255]"
                          : ""
                      }`}
                      key={warranty.id}
                      value={warranty}
                    >
                      <div className="!w-full">
                        <div className="flex justify-between items-center w-full">
                          <span className={`text-xs `}>{warranty.title}</span>
                        </div>
                        {warranty.finalPrice > 0 && (
                          <div className="flex items-center gap-1">
                            <span>{warranty.finalPrice.toLocaleString()}</span>
                            <span>تومان</span>
                          </div>
                        )}
                        {warranty.desc && (
                          <div className="absolute left-2 top-2">
                            <Tooltip
                              title={warranty.desc}
                              classNames={{ root: "custom-tooltip" }}
                            >
                              <FaInfoCircle className="text-[#4A90E2]" />
                            </Tooltip>
                          </div>
                        )}
                      </div>
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            )}
            {/* رنگ‌ها */}
            {product?.productModes && product.productModes.length > 0 && (
              <div className="mt-3">
                <h4 className="font-semibold text-gray-800 text-sm mb-2">
                  انتخاب رنگ
                </h4>
                <div className="flex gap-4 flex-wrap">
                  {product.productModes.map((mode) => {
                    let color = "#eee";
                    try {
                      const filesObj = JSON.parse(mode.files || "{}");
                      if (filesObj.Color) color = filesObj.Color;
                    } catch {}
                    const isSelected = selectedColorId === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setSelectedColorId(mode.id)}
                        className={`flex flex-col items-center group focus:outline-none cursor-pointer`}
                      >
                        <span
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-200 mb-1 relative flex items-center justify-center ${
                            isSelected
                              ? "border-blue-600 shadow-lg scale-110"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                        >
                          {isSelected && (
                            <FaCheck className="absolute !text-white text-base bg-blue-500 rounded-full p-0.5 w-3 h-3 -bottom-1 -left-1 shadow" />
                          )}
                        </span>
                        <span
                          className={`text-xs text-gray-600 group-hover:text-blue-700 ${
                            isSelected ? "font-bold text-blue-700" : ""
                          }`}
                        >
                          {mode.propertyValue}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* دکمه تایید و مشاهده جزئیات */}
            <div className="mt-2 flex sm:flex-nowrap flex-wrap justify-end gap-2">
              {product && product.product && product.product.url && (
                <Link
                  className="sm:w-auto w-full"
                  href={product.product.url}
                  target="_blank"
                >
                  <button
                    type="button"
                    className="bg-[#40768c] sm:w-auto w-full !text-white px-4 py-1.5 rounded-lg hover:bg-[#28506a] transition-colors duration-300 text-sm cursor-pointer"
                  >
                    مشاهده جزئیات محصول
                  </button>
                </Link>
              )}
              <button
                onClick={handleConfirm}
                disabled={isLoading || !product.canAddCart}
                className="bg-[#d1182b] sm:w-auto w-full !text-white px-5 py-1.5 rounded-lg hover:bg-[#b31525] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
              >
                {isLoading ? "در حال پردازش..." : "تایید و افزودن به سبد خرید"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default ModalAddtoBasket;
