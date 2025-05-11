"use client";

import { useSelector } from "react-redux";
import { FaUser, FaTruck, FaShoppingCart, FaBuilding } from "react-icons/fa";
import { mainDomainImg } from "@/utils/mainDomain";

export default function SummaryPayment({ estimateData }) {
    const { items } = useSelector((state) => state.cart);
    const selectedAddress = useSelector((state) => state.address.selectedAddress);
    const selectedShipping = useSelector((state) => state.shipping.selectedShipping);
    const selectedLegal = useSelector((state) => state.legalId.selectedLegal);



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

    return (
        <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl p-6 shadow-lg mt-5">
                <div className="flex justify-center items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">خلاصه سفارش</h2>
                </div>

                {/* اطلاعات تحویل گیرنده */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <FaUser className="text-[#d1182b] text-xl" />
                        <h3 className="text-lg font-semibold text-gray-800">تحویل گیرنده</h3>
                    </div>
                    {selectedAddress && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 mb-1">نام و نام خانوادگی</span>
                                    <span className="font-medium text-gray-800">{selectedAddress.fullName}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 mb-1">شماره موبایل</span>
                                    <span className="font-medium text-gray-800">{selectedAddress.mobile}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 mb-1">کد ملی</span>
                                    <span className="font-medium text-gray-800">{selectedAddress.nationalCode || '-'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 mb-1">کد پستی</span>
                                    <span className="font-medium text-gray-800">{selectedAddress.postalCode || '-'}</span>
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <span className="text-sm text-gray-500 mb-1">آدرس کامل</span>
                                    <span className="font-medium text-gray-800">
                                        {selectedAddress.provinceTitle}، {selectedAddress.cityTitle}، {selectedAddress.address}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* اطلاعات نحوه ارسال */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <FaTruck className="text-[#d1182b] text-xl" />
                        <h3 className="text-lg font-semibold text-gray-800">نحوه ارسال</h3>
                    </div>
                    {selectedShipping && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-gray-800">{selectedShipping.title}</p>
                                    {selectedShipping.description && (
                                        <p className="text-gray-600 mt-1">{selectedShipping.description}</p>
                                    )}
                                </div>
                                <div className="text-left">
                                    {selectedShipping.price > 0 ? (
                                        <p className="font-medium text-gray-800">{selectedShipping.price.toLocaleString()} تومان</p>
                                    ) : (
                                        <p className="font-medium text-green-600">رایگان</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* اطلاعات حقوقی */}
                {selectedLegal && (
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <FaBuilding className="text-[#d1182b] text-xl" />
                            <h3 className="text-lg font-semibold text-gray-800">اطلاعات حقوقی</h3>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 mb-1">نام سازمان</span>
                                    <span className="font-medium text-gray-800">{selectedLegal.organizationName}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 mb-1">کد اقتصادی</span>
                                    <span className="font-medium text-gray-800">{selectedLegal.economicCode}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 mb-1">شناسه ملی</span>
                                    <span className="font-medium text-gray-800">{selectedLegal.nationalId}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 mb-1">شماره ثبت</span>
                                    <span className="font-medium text-gray-800">{selectedLegal.registrationId}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 mb-1">شماره تماس</span>
                                    <span className="font-medium text-gray-800">{selectedLegal.landlineNumber}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 mb-1">کد کاربری</span>
                                    <span className="font-medium text-gray-800">{selectedLegal.userId}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 mb-1">استان</span>
                                    <span className="font-medium text-gray-800">{selectedLegal.provinceTitle}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 mb-1">شهر</span>
                                    <span className="font-medium text-gray-800">{selectedLegal.cityTitle}</span>
                                </div>
                                <div className="flex flex-col col-span-4">
                                    <span className="text-sm text-gray-500 mb-1">وضعیت</span>
                                    <span className="font-medium text-gray-800">
                                        {selectedLegal.isArchive ? 'آرشیو شده' : 'فعال'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* اقلام سفارش */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <FaShoppingCart className="text-[#d1182b] text-xl" />
                        <h3 className="text-lg font-semibold text-gray-800">اقلام سفارش</h3>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        {items?.map((item, index) => (
                            <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={mainDomainImg + item.image}
                                        alt={item.id}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800">{item.title}</p>
                                        <p className="text-gray-600 text-sm">تعداد: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className="text-left">
                                    {item.finalPrice ? (
                                        <>
                                            <p className="font-medium text-gray-800">{item.finalPrice.toLocaleString()} تومان</p>
                                            {item.price1 > item.finalPrice && (
                                                <p className="text-gray-500 text-sm line-through">{item.price1.toLocaleString()} تومان</p>
                                            )}
                                        </>
                                    ) : (
                                        <p className="font-medium text-gray-800">{item.price1.toLocaleString()} تومان</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* خلاصه قیمت */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>قیمت کالاها ({items?.length || 0})</span>
                            <span>{totalPrice.toLocaleString()} تومان</span>
                        </div>
                        {totalDiscount > 0 && (
                            <div className="flex justify-between text-green-600">
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
                            <div className="flex justify-between font-bold text-lg">
                                <span>مبلغ قابل پرداخت</span>
                                <span className="text-[#d1182b]">
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
