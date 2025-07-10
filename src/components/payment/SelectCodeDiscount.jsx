"use client";

import { clearDiscount, setDiscountCode, setEstimateData as setDiscountEstimateData, setError, setLoading } from "@/redux/slices/discountSlice";
import { setEstimateData as setPaymentEstimateData } from "@/redux/slices/paymentSlice";
import { estimateOrder } from "@/services/order/orderService";
import { IconButton, Tooltip } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaTicketAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function SelectCodeDiscount() {
    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const [inputError, setInputError] = useState(false);
    const { discountCode, estimateData, isLoading, error } = useSelector((state) => state.discount);

    const selectedAddress = useSelector((state) => state.address.selectedAddress);
    const selectedShipping = useSelector((state) => state.shipping.selectedShipping);
    const selectedLegal = useSelector((state) => state.legalId.selectedLegal);

    const user = Cookies.get("user");
    const token = JSON.parse(user).token;

    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: "toast-modal",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInputError(false);

        if (!code.trim()) {
            Toast.fire({
                icon: "error",
                text: "لطفا کد تخفیف را وارد کنید",
                customClass: "toast-modal",
            });
            return;
        }

        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = {
                langCode: "fa",
                addressId: selectedAddress?.id,
                legalInfoId: selectedLegal?.id || 0,
                shipmentId: selectedShipping?.id,
                discountCode: code,
                paymentId: 0
            };

            const response = await estimateOrder(data, token);
            if (response.type === 'error') {
                Toast.fire({
                    icon: "error",
                    text: response.message,
                });
            }

            // بررسی مقدار تخفیف
            if (response.discountCodeAmount === 0) {
                setInputError(true);
                Toast.fire({
                    icon: "error",
                    text: "کد تخفیف نامعتبر است",
                });
                dispatch(setError("کد تخفیف نامعتبر است"));
                dispatch(clearDiscount());
                return;
            }

            // نمایش پیام موفقیت
            Toast.fire({
                icon: "success",
                text: `کد تخفیف با موفقیت اعمال شد (${response.discountCodeAmount.toLocaleString()} تومان)`,
            });

            dispatch(setDiscountCode(code));
            dispatch(setDiscountEstimateData(response));
            dispatch(setPaymentEstimateData(response));
            setCode('');
            setInputError(false);
        } catch (error) {
            setInputError(true);
            const errorMessage = error.response?.data || "کد تخفیف نامعتبر است";
            Toast.fire({
                icon: "error",
                text: errorMessage,
                customClass: "toast-modal",
            });
            dispatch(setError(errorMessage));
            dispatch(clearDiscount());
            dispatch(setPaymentEstimateData(null));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleRemoveCode = async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = {
                langCode: "fa",
                addressId: selectedAddress?.id,
                legalInfoId: selectedLegal?.id || 0,
                shipmentId: selectedShipping?.id,
                discountCode: "", // ارسال رشته خالی برای حذف کد تخفیف
                paymentId: 0
            };

            const response = await estimateOrder(data, token);

            // نمایش پیام موفقیت
            Toast.fire({
                icon: "success",
                text: "کد تخفیف با موفقیت حذف شد",
                customClass: "toast-modal",
            });

            dispatch(clearDiscount());
            dispatch(setPaymentEstimateData(response));
            setCode('');
            setInputError(false);
        } catch (error) {
            const errorMessage = error.response?.data || "خطا در حذف کد تخفیف";
            Toast.fire({
                icon: "error",
                text: errorMessage,
                customClass: "toast-modal",
            });
            dispatch(setError(errorMessage));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleInputChange = (e) => {
        setCode(e.target.value);
        setInputError(false);
    };

    return (
        <div className="container mx-auto px-4 mt-5">
            <div className="bg-white rounded-xl p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-4 px-3">
                    <FaTicketAlt className="text-xl text-[#d1182b]" />
                    <h2 className="text-xl font-bold text-gray-800">کد تخفیف</h2>
                </div>
                {!discountCode ? (
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={code}
                                onChange={handleInputChange}
                                placeholder="کد تخفیف خود را وارد کنید"
                                className={`w-full p-2 border rounded-lg focus:outline-none transition-colors duration-200 ${inputError
                                    ? 'border-red-500 focus:border-red-500 bg-red-50'
                                    : 'border-gray-200 focus:border-[#d1182b] hover:border-[#d1182b]'
                                }`}
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !code.trim()}
                                className={`px-4 py-2 rounded-lg text-white transition-colors duration-200 ${isLoading || !code.trim()
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[#d1182b] hover:bg-[#40768c] cursor-pointer'
                                }`}
                            >
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    'اعمال'
                                )}
                            </button>
                        </div>
                        {inputError && (
                            <p className="text-red-500 text-sm mr-2">کد تخفیف نامعتبر است</p>
                        )}
                    </form>
                ) : (
                    <div className="flex items-center justify-between bg-[#fff5f5] p-4 rounded-lg border border-[#d1182b]">
                        <div>
                            <p className="text-gray-800 font-medium">کد تخفیف اعمال شده:</p>
                            <p className="text-[#d1182b]">{discountCode}</p>
                            {estimateData?.discountCodeAmount > 0 && (
                                <p className="text-gray-500 text-sm mt-1">
                                    مبلغ تخفیف: {estimateData.discountCodeAmount.toLocaleString()} تومان
                                </p>
                            )}
                        </div>
                        <Tooltip
                            title="حذف کد تخفیف"
                            arrow
                        >
                            <IconButton
                                onClick={handleRemoveCode}
                                disabled={isLoading}
                                size="small"
                                sx={{
                                    color: '#d1182b',
                                    '&:hover': {
                                        color: '#40768c',
                                        backgroundColor: 'rgba(255, 245, 245, 0.8)',
                                    },
                                    transition: 'all 0.2s',
                                }}
                            >
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#d1182b]"></div>
                                ) : (
                                    <FaRegTrashCan className="text-xl" />
                                )}
                            </IconButton>
                        </Tooltip>
                    </div>
                )}
            </div>
        </div>
    );
}
