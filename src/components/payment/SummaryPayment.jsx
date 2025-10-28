"use client";

import { useEffect, useState } from "react";
import { FaBuilding, FaShoppingCart, FaTruck, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import ShowProductBasket from "../CompeletePay/ShowProductBasket";

export default function SummaryPayment() {
  const { currentItems } = useSelector((state) => state.cart);
  const selectedAddress = useSelector((state) => state.address.selectedAddress);
  const selectedShipping = useSelector(
    (state) => state.shipping.selectedShipping
  );
  const selectedLegal = useSelector((state) => state.legalId.selectedLegal);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    // Force re-render when component mounts or route changes
    setForceUpdate((prev) => prev + 1);
  }, [currentItems, selectedAddress, selectedShipping, selectedLegal]);

  // فقط زمانی loading نمایش داده شود که هیچ داده‌ای در دسترس نباشد
  if (!currentItems?.length && !selectedAddress && !selectedShipping) {
    return (
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d1182b]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4" key={forceUpdate}>
      <div className="bg-white rounded-lg p-4 shadow-sm mt-4 z-50 relative">
        <div className="flex items-center gap-2 !mb-3">
          <FaShoppingCart className="text-lg text-[#d1182b]" />
          <span className="text-lg font-bold text-gray-800">خلاصه سفارش</span>
        </div>

        {/* اطلاعات تحویل گیرنده */}
        <div className="!mb-3">
          <div className="flex items-center gap-2 !mb-2">
            <FaUser className="text-[#d1182b] text-base" />
            <span className="text-base font-semibold text-gray-800">
              تحویل گیرنده
            </span>
          </div>
          {selectedAddress && (
            <div className="bg-white p-3 rounded-lg border border-gray-200 hover:bg-[#fff5f5] hover:border-[#d1182b] transition-all duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">
                    نام و نام خانوادگی
                  </span>
                  <span className="text-gray-800">
                    {selectedAddress.fullName}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">شماره موبایل</span>
                  <span className="text-gray-800">
                    {selectedAddress.mobile}
                  </span>
                </div>
                <div className="flex flex-col col-span-1 sm:col-span-2">
                  <span className="text-sm text-gray-500">آدرس کامل</span>
                  <span className="text-gray-800">
                    {selectedAddress.provinceTitle}، {selectedAddress.cityTitle}
                    ، {selectedAddress.address}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* اطلاعات نحوه ارسال */}
        <div className="!mb-3">
          <div className="flex items-center gap-2 !mb-2">
            <FaTruck className="text-[#d1182b] text-base" />
            <span className="text-base font-semibold text-gray-800">
              نحوه ارسال
            </span>
          </div>
          {selectedShipping && (
            <div className="bg-white p-3 rounded-lg border border-gray-200 hover:bg-[#fff5f5] hover:border-[#d1182b] transition-all duration-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-800">{selectedShipping.title}</p>
                  {selectedShipping.description && (
                    <p className="text-gray-500 text-sm mt-1">
                      {selectedShipping.description}
                    </p>
                  )}
                </div>
                <div>
                  {selectedShipping.price > 0 ? (
                    <p className="text-[#d1182b]">
                      {selectedShipping.price.toLocaleString()} تومان
                    </p>
                  ) : (
                    <p className="text-[#d1182b]">رایگان</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* اطلاعات حقوقی */}
        {selectedLegal && (
          <div className="!mb-3">
            <div className="flex items-center gap-2 !mb-2">
              <FaBuilding className="text-[#d1182b] text-base" />
              <h3 className="text-base font-medium text-gray-800">
                اطلاعات حقوقی
              </h3>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200 hover:bg-[#fff5f5] hover:border-[#d1182b] transition-all duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">نام سازمان</span>
                  <span className="text-gray-800">
                    {selectedLegal.organizationName}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">کد اقتصادی</span>
                  <span className="text-gray-800">
                    {selectedLegal.economicCode}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">شناسه ملی</span>
                  <span className="text-gray-800">
                    {selectedLegal.nationalId}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">شماره ثبت</span>
                  <span className="text-gray-800">
                    {selectedLegal.registrationId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <ShowProductBasket items={currentItems} />
      </div>
    </div>
  );
}
