import React, { useState, useEffect } from "react";
import Image from "next/image";
import { mainDomainImg } from "@/utils/mainDomain";

function WaySend({ waySendList }) {
  const [selectedWay, setSelectedWay] = useState(null);
  const defaultImage = "/images/shipping-default.png";

  useEffect(() => {
    if (waySendList.shippingWays && waySendList.shippingWays.length > 0) {
      setSelectedWay(waySendList.shippingWays[0]);
    }
  }, [waySendList.shippingWays]);

  if (!waySendList.shippingWays || waySendList.shippingWays.length === 0) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">روش ارسال</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="relative w-32 h-32 mb-6">
            <Image
              src="/images/empty-shipping.svg"
              alt="روش ارسال"
              fill
              className="object-contain"
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
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4 border-b pb-3">
        <h2 className="text-2xl font-bold text-gray-800">روش ارسال</h2>
      </div>
      <div className="w-full space-y-3">
        {waySendList.shippingWays.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedWay(item)}
            className={`
              w-full p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
              ${item.id === selectedWay?.id 
                ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-white shadow-md' 
                : 'border-gray-100 hover:border-blue-300 hover:shadow-sm'
              }
            `}
          >
            <div className="flex items-center gap-4 w-full">
              <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-lg p-1.5 shadow-sm">
                <Image
                  src={item.image ? mainDomainImg + item.image : defaultImage}
                  alt={item.title?.length > 20 ? item.title.substring(0, 20) + '...' : item.title}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <div className="flex-1 grid grid-cols-12 gap-3 items-center w-full">
                <div className="col-span-5">
                  <div className="font-bold text-base text-gray-800 whitespace-nowrap truncate">
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="text-sm text-gray-400 mt-0.5 leading-relaxed line-clamp-1">
                      {item.description}
                    </div>
                  )}
                </div>
                <div className="col-span-4">
                  <div className="font-bold text-base text-gray-800">
                    {item.price && item.price !== "0" ? `${item.price} تومان` : "رایگان"}
                  </div>
                </div>
              </div>
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${item.id === selectedWay?.id ? 'border-blue-500' : 'border-gray-300'}
              `}>
                {item.id === selectedWay?.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WaySend;
