"use client";

import { Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { deleteLegal } from "@/services/order/orderService";
import Cookies from "js-cookie";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";

function DeleteLegal({ id, onDelete, getLegalFu }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const user = Cookies.get("user");
    const token = JSON.parse(user).token;

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: "toast-modal",
    });

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const response = await deleteLegal(id, token);
            if (response) {
                onDelete(id);
                getLegalFu();
                Toast.fire({
                    icon: "success",
                    text: "اطلاعات حقوقی با موفقیت حذف شد",
                    customClass: {
                        container: "toast-modal",
                    },
                });
            }
        } catch (error) {

            Toast.fire({
                icon: "error",
                text: error.response?.data?.message || "مشکلی در حذف اطلاعات پیش آمده است",
                customClass: {
                    container: "toast-modal",
                },
            });
            console.error("Error deleting legal:", error);
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
        }
    };

    const modalContent = mounted && isModalOpen ? (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center">
            <div 
                className="fixed inset-0 transition-opacity duration-300"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    transform: 'scale(1.1)',
                    WebkitTransform: 'scale(1.1)',
                    transformOrigin: 'center',
                    WebkitTransformOrigin: 'center',
                    filter: 'blur(10px)',
                    WebkitFilter: 'blur(10px)',
                    opacity: 0.8
                }}
                onClick={() => setIsModalOpen(false)}
            />
            <div 
                className="relative bg-white rounded-lg p-6 w-full max-w-sm mx-4 transform transition-all duration-300 scale-100 opacity-100 shadow-xl"
                style={{
                    animation: 'modalFadeIn 0.3s ease-out'
                }}
            >
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#d1182b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <h3 className="text-lg font-bold text-gray-900">حذف اطلاعات حقوقی</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">آیا از حذف این اطلاعات اطمینان دارید؟</p>
                </div>
                <div className="flex justify-center gap-3">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        disabled={isLoading}
                        className={`px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md transition-colors ${isLoading
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-200 cursor-pointer"
                            }`}
                    >
                        انصراف
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className={`px-4 py-2 text-sm bg-[#d1182b] text-white rounded-md transition-colors min-w-[90px] ${isLoading ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#b91626]"
                            }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-1">
                                <FaSpinner className="animate-spin text-xs" />
                                <span>در حال حذف</span>
                            </div>
                        ) : (
                            "تایید"
                        )}
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes modalFadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    ) : null;

    return (
        <>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                }}
                className="p-1.5 text-gray-400 hover:text-[#d1182b] transition-colors cursor-pointer"
                title="حذف"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            {mounted && createPortal(modalContent, document.body)}
        </>
    );
}

export default DeleteLegal; 