"use client";

import { Divider, Modal, Select, Spin } from "antd";
import { useState, useEffect, useRef } from "react";
import { FaBuilding, FaCaretDown, FaTimes } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import Swal from "sweetalert2";
import { getProvince, getCity, addLegal, getLegalId } from "@/services/order/orderService";
import Cookies from "js-cookie";

function AddLegal({ id = null, editData = null, getLegalFu = null, onAdd = null, isOpen = true, onClose }) {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [provinceList, setProvinceList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const isRequestedProvince = useRef(false);

    const token = JSON.parse(Cookies.get("user")).token;
    const userId = JSON.parse(Cookies.get("user")).userId;

    const [formData, setFormData] = useState({
        id: id || editData?.[0]?.id || 0,
        userId,
        organizationName: editData?.[0]?.organizationName || "",
        economicCode: editData?.[0]?.economicCode || "",
        nationalId: editData?.[0]?.nationalId || "",
        registrationId: editData?.[0]?.registrationId || "",
        landlineNumber: editData?.[0]?.landlineNumber || "",
        isArchive: false,
        provinceId: editData?.[0]?.provinceId || "",
        provinceTitle: editData?.[0]?.provinceTitle || "",
        cityId: editData?.[0]?.cityId || "",
        cityTitle: editData?.[0]?.cityTitle || "",
    });

    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: "toast-modal",
    });

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = {
            organizationName: "نام شرکت",
            economicCode: "کد اقتصادی",
            nationalId: "شناسه ملی",
            registrationId: "شماره ثبت",
            landlineNumber: "شماره تماس",
        };

        Object.entries(requiredFields).forEach(([field, label]) => {
            if (!formData[field].trim()) {
                newErrors[field] = `${label} الزامی است`;
            }
        });

        if (!selectedProvince) newErrors.selectedProvince = "استان الزامی است";
        if (!selectedCity) newErrors.selectedCity = "شهر الزامی است";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOk = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const data = {
                ...formData,
                provinceId: selectedProvince,
                provinceTitle: provinceList.find(ev => ev.provinceId === selectedProvince).title,
                cityId: selectedCity,
                cityTitle: cityList.find(ev => ev.id === selectedCity).title,
            };
            const response = await addLegal(data, token);
            if (response) {
                if (getLegalFu) getLegalFu();
                if (onAdd) onAdd(response);
                Toast.fire({
                    icon: "success",
                    text: (id || editData) ? "ویرایش اطلاعات حقوقی با موفقیت انجام شد" : "اطلاعات حقوقی جدید اضافه شد",
                    customClass: { container: "toast-modal" },
                });
                handleCancel();
            }
        } catch (err) {
            Toast.fire({
                icon: "error",
                text: err.response?.data || "خطای شبکه",
                customClass: { container: "toast-modal" },
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        onClose();
    };

    // دریافت اطلاعات برای ویرایش
    useEffect(() => {
        const fetchLegalData = async () => {
            if (id) {
                try {
                    const response = await getLegalId(id, token);
                    if (response) {
                        setFormData(response[0]);
                        setSelectedProvince(response[0].provinceId);
                        setSelectedCity(response[0].cityId);
                    }
                } catch (error) {
                    console.error("Error fetching legal data:", error);
                }
            }
        };
        fetchLegalData();
    }, [id]);

    // دریافت لیست استان‌ها
    useEffect(() => {
        const getProvinceFu = async () => {
            if (isRequestedProvince.current) return;
            isRequestedProvince.current = true;
            try {
                const items = await getProvince();
                if (items) setProvinceList(items);
            } catch (error) { }
        };
        getProvinceFu();
    }, []);

    // دریافت لیست شهرها
    useEffect(() => {
        const getCityFu = async () => {
            if (!selectedProvince) return;
            try {
                const items = await getCity(selectedProvince);
                if (items) setCityList(items);
            } catch (error) { }
        };
        getCityFu();
    }, [selectedProvince]);

    // تنظیم مقادیر اولیه برای ویرایش
    useEffect(() => {
        if (editData?.[0]) {
            setSelectedProvince(editData[0].provinceId);
            setSelectedCity(editData[0].cityId);
        }
    }, [editData]);

    return (
        <Modal
            title={
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                        {(id || editData) ? "ویرایش اطلاعات حقوقی" : "اطلاعات حقوقی"}
                    </span>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FaTimes className="text-gray-400 hover:text-gray-600" />
                    </button>
                </div>
            }
            open={isModalOpen}
            onCancel={onClose}
            footer={null}
            width={800}
            centered
            className="custom-modal"
            style={{ zIndex: 9999 }}
        >
            <div className="mt-6 space-y-4">
                {/* Row 1: نام سازمان، کد اقتصادی، استان */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2">نام سازمان*</label>
                        <div className={`bg-[#fff] rounded-lg px-4 py-2 flex items-center border ${errors.organizationName ? "border-red-500" : "border-gray-300"} focus-within:ring-2 focus-within:ring-[#d1182b] focus-within:border-transparent`}>
                            <FaBuilding className="text-[#656565] ml-2" />
                            <input
                                value={formData.organizationName}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, organizationName: e.target.value }));
                                    setErrors(prev => ({ ...prev, organizationName: "" }));
                                }}
                                className="w-full bg-transparent text-right outline-none text-sm"
                                placeholder="نام سازمان"
                            />
                        </div>
                        {errors.organizationName && <p className="text-red-500 text-xs mt-1">{errors.organizationName}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">کد اقتصادی*</label>
                        <div className={`bg-[#fff] rounded-lg px-4 py-2 flex items-center border ${errors.economicCode ? "border-red-500" : "border-gray-300"} focus-within:ring-2 focus-within:ring-[#d1182b] focus-within:border-transparent`}>
                            <FaBuilding className="text-[#656565] ml-2" />
                            <input
                                value={formData.economicCode}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, economicCode: e.target.value }));
                                    setErrors(prev => ({ ...prev, economicCode: "" }));
                                }}
                                className="w-full bg-transparent text-right outline-none text-sm"
                                placeholder="کد اقتصادی"
                            />
                        </div>
                        {errors.economicCode && <p className="text-red-500 text-xs mt-1">{errors.economicCode}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">شناسه ملی*</label>
                        <div className={`bg-[#fff] rounded-lg px-4 py-2 flex items-center border ${errors.nationalId ? "border-red-500" : "border-gray-300"} focus-within:ring-2 focus-within:ring-[#d1182b] focus-within:border-transparent`}>
                            <FaBuilding className="text-[#656565] ml-2" />
                            <input
                                value={formData.nationalId}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, nationalId: e.target.value }));
                                    setErrors(prev => ({ ...prev, nationalId: "" }));
                                }}
                                className="w-full bg-transparent text-right outline-none text-sm"
                                placeholder="شناسه ملی"
                            />
                        </div>
                        {errors.nationalId && <p className="text-red-500 text-xs mt-1">{errors.nationalId}</p>}
                    </div>

                </div>

                {/* Row 2: شهر، شناسه ملی، شماره ثبت */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div>
                        <label className="block text-gray-700 mb-2">استان*</label>
                        <Select
                            placeholder="انتخاب استان"
                            className={`w-full ${errors.selectedProvince ? "select-error" : ""}`}
                            onChange={(value) => {
                                setSelectedProvince(value);
                                setSelectedCity("");
                                setErrors(prev => ({ ...prev, selectedProvince: "" }));
                            }}
                            value={selectedProvince}
                            size="large"
                            suffixIcon={<FaCaretDown className="text-[#d1182b]" />}
                            popupClassName="custom-select-dropdown"
                        >
                            {provinceList.map((province) => (
                                <Select.Option key={province.provinceId} value={province.provinceId}>
                                    {province.title}
                                </Select.Option>
                            ))}
                        </Select>
                        {errors.selectedProvince && <p className="text-red-500 text-xs mt-1">{errors.selectedProvince}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">شهر*</label>
                        <Select
                            placeholder="انتخاب شهر"
                            className={`w-full ${errors.selectedCity ? "select-error" : ""}`}
                            onChange={(value) => {
                                setSelectedCity(value);
                                setErrors(prev => ({ ...prev, selectedCity: "" }));
                            }}
                            value={selectedCity}
                            disabled={!selectedProvince}
                            size="large"
                            suffixIcon={<FaCaretDown className="text-[#d1182b]" />}
                            popupClassName="custom-select-dropdown"
                        >
                            {cityList.map((city) => (
                                <Select.Option key={city.id} value={city.id}>
                                    {city.title}
                                </Select.Option>
                            ))}
                        </Select>
                        {errors.selectedCity && <p className="text-red-500 text-xs mt-1">{errors.selectedCity}</p>}
                    </div>

                   

                    <div>
                        <label className="block text-gray-700 mb-2">شماره ثبت*</label>
                        <div className={`bg-[#fff] rounded-lg px-4 py-2 flex items-center border ${errors.registrationId ? "border-red-500" : "border-gray-300"} focus-within:ring-2 focus-within:ring-[#d1182b] focus-within:border-transparent`}>
                            <FaBuilding className="text-[#656565] ml-2" />
                            <input
                                value={formData.registrationId}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, registrationId: e.target.value }));
                                    setErrors(prev => ({ ...prev, registrationId: "" }));
                                }}
                                className="w-full bg-transparent text-right outline-none text-sm"
                                placeholder="شماره ثبت"
                            />
                        </div>
                        {errors.registrationId && <p className="text-red-500 text-xs mt-1">{errors.registrationId}</p>}
                    </div>
                </div>

                {/* Row 3: شماره تماس */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2">شماره تماس*</label>
                        <div className={`bg-[#fff] rounded-lg px-4 py-2 flex items-center border ${errors.landlineNumber ? "border-red-500" : "border-gray-300"} focus-within:ring-2 focus-within:ring-[#d1182b] focus-within:border-transparent`}>
                            <MdOutlinePhone className="text-[#656565] text-xl ml-2" />
                            <input
                                value={formData.landlineNumber}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, landlineNumber: e.target.value }));
                                    setErrors(prev => ({ ...prev, landlineNumber: "" }));
                                }}
                                className="w-full bg-transparent text-right outline-none text-sm"
                                type="tel"
                                placeholder="شماره تماس"
                            />
                        </div>
                        {errors.landlineNumber && <p className="text-red-500 text-xs mt-1">{errors.landlineNumber}</p>}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className={`px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md transition-colors ${loading
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-200 cursor-pointer"
                            }`}
                    >
                        انصراف
                    </button>
                    <button
                        onClick={handleOk}
                        disabled={loading}
                        className={`px-4 py-2 text-sm bg-[#d1182b] text-white rounded-md transition-colors min-w-[90px] ${loading ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#b91626]"
                            }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-1">
                                <Spin className="white-spin" size="small" />
                                <span>{(id || editData) ? "در حال ویرایش" : "در حال ثبت"}</span>
                            </div>
                        ) : (
                            (id || editData) ? "ویرایش" : "ثبت"
                        )}
                    </button>
                </div>
            </div>

            <style jsx global>{`
                .custom-modal .ant-modal-content {
                    border-radius: 1rem;
                    padding: 1.5rem;
                }

                .custom-modal .ant-modal-close {
                    display: none;
                }

                .custom-select-dropdown {
                    z-index: 99999 !important;
                }

                .select-error .ant-select-selector {
                    border-color: #ef4444 !important;
                }

                .ant-select-selection-placeholder {
                    color: #9ca3af !important;
                }

                .ant-select-selector {
                    height: 42px !important;
                    padding: 5px 11px !important;
                    border-radius: 0.5rem !important;
                }

                .ant-select-selection-item {
                    line-height: 30px !important;
                }

                /* Override antd modal z-index */
                .ant-modal-wrap {
                    z-index: 9999 !important;
                }
                .ant-modal-mask {
                    z-index: 9998 !important;
                }
                .ant-select-dropdown {
                    z-index: 99999 !important;
                }
            `}</style>
        </Modal>
    );
}

export default AddLegal; 