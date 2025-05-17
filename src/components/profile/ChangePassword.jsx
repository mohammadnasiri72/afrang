"use client";
import { useState } from 'react';
import { Spin } from 'antd';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa';
import { changeUserPassword } from '@/services/dashboard/dashboardService';

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // import sweet alert 2
    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            container: "toast-modal",
            popup: "swal2-popup-custom",
        },
    });

    const validateForm = () => {
        const newErrors = {};

        // اعتبارسنجی رمز عبور فعلی
        if (!currentPassword || !currentPassword.trim()) {
            newErrors.currentPassword = 'رمز عبور فعلی الزامی است';
        }

        // اعتبارسنجی رمز عبور جدید
        if (!newPassword || !newPassword.trim()) {
            newErrors.newPassword = 'رمز عبور جدید الزامی است';
        } else if (newPassword.length < 6) {
            newErrors.newPassword = 'رمز عبور باید حداقل 6 کاراکتر باشد';
        }

        // اعتبارسنجی تکرار رمز عبور
        if (!confirmPassword || !confirmPassword.trim()) {
            newErrors.confirmPassword = 'تکرار رمز عبور الزامی است';
        } else if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = 'تکرار رمز عبور با رمز عبور جدید مطابقت ندارد';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const user = JSON.parse(Cookies.get('user'));
            
            // اطمینان از وجود مقادیر
            if (!currentPassword || !newPassword || !confirmPassword) {
                throw new Error('لطفاً تمام فیلدها را پر کنید');
            }

            await changeUserPassword({
                currentPassword: currentPassword.trim(),
                newPassword: newPassword.trim(),
                confirmPassword: confirmPassword.trim()
            }, user.token);

            Toast.fire({
                icon: "success",
                text: "رمز عبور با موفقیت تغییر کرد",
                customClass: {
                    container: "toast-modal",
                },
            });

            // پاک کردن فرم
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setErrors({});
        } catch (error) {
            Toast.fire({
                icon: "error",
                text: error,
                customClass: {
                    container: "toast-modal",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm p-6 z-50 relative">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                        <FaKey className="text-[#d1182b]" />
                    </div>
                    <h1 className="text-xl font-bold">تغییر رمز عبور</h1>
                </div>

                <form onSubmit={handleSubmit} className="max-w-md">
                    {/* رمز عبور فعلی */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            رمز عبور فعلی
                        </label>
                        <div className="relative">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => {
                                    setCurrentPassword(e.target.value);
                                    if (errors.currentPassword) {
                                        setErrors({ ...errors, currentPassword: '' });
                                    }
                                }}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
                                placeholder="رمز عبور فعلی خود را وارد کنید"
                                dir="rtl"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                        )}
                    </div>

                    {/* رمز عبور جدید */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                            رمز عبور جدید
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    if (errors.newPassword) {
                                        setErrors({ ...errors, newPassword: '' });
                                    }
                                }}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.newPassword ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
                                placeholder="رمز عبور جدید را وارد کنید"
                                dir="rtl"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                        )}
                    </div>

                    {/* تکرار رمز عبور جدید */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">
                            تکرار رمز عبور جدید
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    if (errors.confirmPassword) {
                                        setErrors({ ...errors, confirmPassword: '' });
                                    }
                                }}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
                                placeholder="رمز عبور جدید را مجدداً وارد کنید"
                                dir="rtl"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 text-white bg-[#d1182b] rounded-lg transition-colors cursor-pointer ${
                            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#b91626]'
                        }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <Spin className="white-spin" size="small" />
                                <span>در حال ثبت تغییرات...</span>
                            </div>
                        ) : (
                            'تغییر رمز عبور'
                        )}
                    </button>
                </form>
            </div>
            <style jsx global>{`
                .swal2-container {
                    z-index: 99999 !important;
                }
                .swal2-popup-custom {
                    z-index: 99999 !important;
                }
            `}</style>
        </>
    );
} 