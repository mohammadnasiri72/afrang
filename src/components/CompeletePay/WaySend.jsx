"use client";

import { getImageUrl } from "@/utils/mainDomain";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";

function WaySend({ waySendList, selectedShipping, setSelectedShipping }) {
  const defaultImage = "/images/shipping-default.png";
  const [imageErrors, setImageErrors] = useState({});
  const selectedAddress = useSelector((state) => state.address.selectedAddress);

  console.log(waySendList);
  

  useEffect(() => {
    if (!selectedAddress) {
      // اگر آدرسی انتخاب نشده، روش‌های ارسال را پاک کن
      setSelectedShipping(null);
    } else if (waySendList.shippingWays && waySendList.shippingWays.length === 1) {
      setSelectedShipping(waySendList.shippingWays[0]);
    } else if (!waySendList.shippingWays || waySendList.shippingWays.length === 0) {
      setSelectedShipping(null);
    }
  }, [waySendList.shippingWays, selectedAddress]);

  const handleSelectWay = (item) => {
    setSelectedShipping(item);
  };

  const handleImageError = (itemId) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  if (!selectedAddress || !waySendList.shippingWays || waySendList.shippingWays.length === 0) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">روش ارسال</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="relative w-32 h-32 mb-6">
            <img
              src="/images/empty-shipping.svg"
              alt="روش ارسال"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = defaultImage;
              }}
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">ابتدا آدرس خود را ثبت کنید</h3>
          <p className="text-gray-500 text-center mb-6">
            برای مشاهده روش‌های ارسال، لطفاً ابتدا یک آدرس ثبت کنید.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-xl p-6 shadow-lg z-50 relative">
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-gray-700 font-bold text-lg">روش ارسال</h2>
      </div>
        <div className="w-full space-y-3">
          {waySendList.shippingWays.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectWay(item)}
              className={`
                w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200
                ${item.id === selectedShipping?.id 
                  ? 'border-[#d1182b] bg-red-50'
                  : 'border-gray-200 hover:border-[#d1182b] hover:bg-red-50/50 cursor-pointer'
                }
              `}
            >
              <div className="w-10 h-10 bg-white rounded-lg flex-shrink-0 flex items-center justify-center shadow-sm">
                <img
                  src={imageErrors[item.id] ? defaultImage : (item.image ? getImageUrl(item.image) : defaultImage)}
                  alt={item.id}
                  className="w-full h-full object-contain rounded-md"
                  onError={() => handleImageError(item.id)}
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-col gap-1">
                  <div className="text-base font-medium text-gray-800">
                    {item.title}
                  </div>
                  {item.desc && (
                    <div 
                      className="text-sm text-gray-500"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                  )}
                  <div className="text-sm font-medium text-[#d1182b]">
                    <span className="text-gray-600">هزینه ارسال: </span>
                    {item.price && item.price !== "0" ? `${item.price} تومان` : "رایگان"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                  ${item.id === selectedShipping?.id
                    ? 'border-[#d1182b] bg-[#d1182b]'
                    : 'border-gray-300'
                  }`}
                >
                  {item.id === selectedShipping?.id && (
                    <FaCheck className="text-white text-[10px]" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WaySend;

