"use client";

import { useSelector } from "react-redux";
import { FaUser, FaTruck, FaShoppingCart, FaBuilding } from "react-icons/fa";
import { getImageUrl } from "@/utils/mainDomain";
import { useEffect, useState } from "react";

export default function SummaryPayment({ estimateData }) {
    const { items } = useSelector((state) => state.cart);
    const selectedAddress = useSelector((state) => state.address.selectedAddress);
    const selectedShipping = useSelector((state) => state.shipping.selectedShipping);
    const selectedLegal = useSelector((state) => state.legalId.selectedLegal);
    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        // Force re-render when component mounts or route changes
        setForceUpdate(prev => prev + 1);
    }, [items, selectedAddress, selectedShipping, selectedLegal]);

    const totalPrice = items?.reduce((sum, item) => {
        const price = item.price1 || 0;
        const quantity = item.quantity || 0;
        return sum + price * quantity;
    }, 0) || 0;

    const totalDiscount = items?.reduce((sum, item) => {
        const oldPrice = item.price1 || 0;
        const price = item.finalPrice || 0;
        const quantity = item.quantity || 0;
        return sum + (oldPrice - price) * quantity;
    }, 0) || 0;

    // فقط زمانی loading نمایش داده شود که هیچ داده‌ای در دسترس نباشد
    if (!items?.length && !selectedAddress && !selectedShipping) {
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
                <div className="flex items-center gap-2 mb-3">
                    <FaShoppingCart className="text-lg text-[#d1182b]" />
                    <h2 className="text-lg font-medium text-gray-800">خلاصه سفارش</h2>
                </div>

                {/* اطلاعات تحویل گیرنده */}
                <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                        <FaUser className="text-[#d1182b] text-base" />
                        <h3 className="text-base font-medium text-gray-800">تحویل گیرنده</h3>
                    </div>
                    {selectedAddress && (
                        <div className="bg-white p-3 rounded-lg border border-gray-200 hover:bg-[#fff5f5] hover:border-[#d1182b] transition-all duration-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">نام و نام خانوادگی</span>
                                    <span className="text-gray-800">{selectedAddress.fullName}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">شماره موبایل</span>
                                    <span className="text-gray-800">{selectedAddress.mobile}</span>
                                </div>
                                <div className="flex flex-col col-span-1 sm:col-span-2">
                                    <span className="text-sm text-gray-500">آدرس کامل</span>
                                    <span className="text-gray-800">
                                        {selectedAddress.provinceTitle}، {selectedAddress.cityTitle}، {selectedAddress.address}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* اطلاعات نحوه ارسال */}
                <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                        <FaTruck className="text-[#d1182b] text-base" />
                        <h3 className="text-base font-medium text-gray-800">نحوه ارسال</h3>
                    </div>
                    {selectedShipping && (
                        <div className="bg-white p-3 rounded-lg border border-gray-200 hover:bg-[#fff5f5] hover:border-[#d1182b] transition-all duration-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-800">{selectedShipping.title}</p>
                                    {selectedShipping.description && (
                                        <p className="text-gray-500 text-sm mt-1">{selectedShipping.description}</p>
                                    )}
                                </div>
                                <div>
                                    {selectedShipping.price > 0 ? (
                                        <p className="text-[#d1182b]">{selectedShipping.price.toLocaleString()} تومان</p>
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
                    <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                            <FaBuilding className="text-[#d1182b] text-base" />
                            <h3 className="text-base font-medium text-gray-800">اطلاعات حقوقی</h3>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200 hover:bg-[#fff5f5] hover:border-[#d1182b] transition-all duration-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">نام سازمان</span>
                                    <span className="text-gray-800">{selectedLegal.organizationName}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">کد اقتصادی</span>
                                    <span className="text-gray-800">{selectedLegal.economicCode}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">شناسه ملی</span>
                                    <span className="text-gray-800">{selectedLegal.nationalId}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">شماره ثبت</span>
                                    <span className="text-gray-800">{selectedLegal.registrationId}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* اقلام سفارش */}
                <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                        <FaShoppingCart className="text-[#d1182b] text-base" />
                        <h3 className="text-base font-medium text-gray-800">اقلام سفارش</h3>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 hover:bg-[#fff5f5] hover:border-[#d1182b] transition-all duration-200">
                        {items?.map((item, index) => (
                            <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={getImageUrl(item.image)}
                                        alt={item.id}
                                        className="w-12 h-12 object-cover rounded-lg"
                                    />
                                    <div>
                                        <p className="text-gray-800">{item.title}</p>
                                        <p className="text-gray-500 text-sm">تعداد: {item.quantity}</p>
                                    </div>
                                </div>
                                <div>
                                    {item.finalPrice ? (
                                        <>
                                            <p className="text-[#d1182b]">{item.finalPrice.toLocaleString()} تومان</p>
                                            {item.price1 > item.finalPrice && (
                                                <p className="text-gray-500 text-sm line-through">{item.price1.toLocaleString()} تومان</p>
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-[#d1182b]">{item.price1.toLocaleString()} تومان</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* خلاصه قیمت */}
                <div className="bg-white p-3 rounded-lg border border-gray-200 hover:bg-[#fff5f5] hover:border-[#d1182b] transition-all duration-200">
                    <div className="space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>قیمت کالاها ({items?.length || 0})</span>
                            <span>{totalPrice.toLocaleString()} تومان</span>
                        </div>
                        {totalDiscount > 0 && (
                            <div className="flex justify-between text-[#d1182b]">
                                <span>سود شما از این خرید</span>
                                <span>{totalDiscount.toLocaleString()} تومان</span>
                            </div>
                        )}
                        {selectedShipping?.price > 0 && (
                            <div className="flex justify-between text-gray-600">
                                <span>هزینه ارسال</span>
                                <span>{selectedShipping.price.toLocaleString()} تومان</span>
                            </div>
                        )}
                        {estimateData?.taxAmount > 0 && (
                            <div className="flex justify-between text-gray-600">
                                <span>مالیات ({estimateData?.taxPercent}%)</span>
                                <span>{estimateData.taxAmount.toLocaleString()} تومان</span>
                            </div>
                        )}
                        <div className="border-t border-gray-200 pt-2 mt-2">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">مبلغ قابل پرداخت</span>
                                <span className="text-[#d1182b] font-bold">
                                    {estimateData?.finalAmount ?
                                        estimateData.finalAmount.toLocaleString() :
                                        (totalPrice - totalDiscount + (selectedShipping?.price || 0)).toLocaleString()
                                    } تومان
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
