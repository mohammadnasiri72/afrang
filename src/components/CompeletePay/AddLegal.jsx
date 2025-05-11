"use client";

import { Button, Divider, Modal, Select, Spin } from "antd";
import { useState, useEffect, useRef } from "react";
import { FaUser, FaBuilding, FaCaretDown } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import Swal from "sweetalert2";
import { getProvince, getCity, addLegal } from "@/services/order/orderService";
import Cookies from "js-cookie";

function AddLegal({ editData = null, onClose, onAdd }) {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [provinceList, setProvinceList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const isRequestedProvince = useRef(false);

    const user = Cookies.get("user");
    const userId = JSON.parse(user).userId;
    const token = JSON.parse(user).token;

    const [formData, setFormData] = useState({
        id: editData?.[0]?.id || 0,
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

        if (!formData.organizationName.trim()) {
            newErrors.organizationName = "نام شرکت الزامی است";
        }
        if (!formData.economicCode.trim()) {
            newErrors.economicCode = "کد اقتصادی الزامی است";
        }
        if (!formData.nationalId.trim()) {
            newErrors.nationalId = "شناسه ملی الزامی است";
        }
        if (!formData.registrationId.trim()) {
            newErrors.registrationId = "شماره ثبت الزامی است";
        }
        if (!formData.landlineNumber.trim()) {
            newErrors.landlineNumber = "شماره تماس الزامی است";
        }
        if (!selectedProvince) {
            newErrors.selectedProvince = "استان الزامی است";
        }
        if (!selectedCity) {
            newErrors.selectedCity = "شهر الزامی است";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOk = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const data = {
                ...formData,
                id: editData?.[0]?.id || 0,
                provinceId: selectedProvince,
                provinceTitle: provinceList.find(ev => ev.provinceId === selectedProvince).title,
                cityId: selectedCity,
                cityTitle: cityList.find(ev => ev.id === selectedCity).title,
            };
            const response = await addLegal(data, token);
            if (response) {
                onAdd(response);
            }

            Toast.fire({
                icon: "success",
                text: editData ? "ویرایش اطلاعات حقوقی با موفقیت انجام شد" : "اطلاعات حقوقی جدید اضافه شد",
                customClass: {
                    container: "toast-modal",
                },
            });
            handleCancel();
        } catch (err) {
            Toast.fire({
                icon: "error",
                text: err.response?.data ? err.response?.data : "خطای شبکه",
                customClass: {
                    container: "toast-modal",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        onClose();
    };

    // get province
    useEffect(() => {
        if (isModalOpen) {
            const getProvinceFu = async () => {
                if (isRequestedProvince.current) return;
                isRequestedProvince.current = true;

                try {
                    const items = await getProvince();
                    if (items) {
                        setProvinceList(items);
                    }
                } catch (error) { }
            };
            getProvinceFu();
        }
    }, [isModalOpen]);

    // get city
    useEffect(() => {
        const getCityFu = async () => {
            try {
                const items = await getCity(selectedProvince);
                if (items) {
                    setCityList(items);
                }
            } catch (error) { }
        };

        if (selectedProvince) {
            getCityFu();
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (editData?.[0]) {
            setSelectedProvince(editData[0].provinceId);
            setSelectedCity(editData[0].cityId);
        }
    }, [editData]);

    return (
        <Modal
            title={editData ? "ویرایش اطلاعات حقوقی" : "اطلاعات حقوقی"}
            open={isModalOpen}
            onOk={handleOk}
            width={{
                xs: "100%",
                sm: "90%",
                md: "80%",
                lg: "70%",
                xl: "60%",
                xxl: "50%",
            }}
            onCancel={handleCancel}
            footer={[
                <div key="footer" className="flex items-center gap-3 justify-end">
                    <div className="">
                        <div className="w-full">
                            <button
                                disabled={loading}
                                onClick={handleOk}
                                className={`text-center text-[#fff] w-full rounded-[5px] bg-[#d1182b] block font-[600] px-5 py-[12px] ${loading ? "cursor-not-allowed" : "cursor-pointer"
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2 justify-center">
                                        <span>{editData ? "درحال ویرایش" : "درحال ثبت"}</span>
                                        <Spin className="white-spin" size="small" />
                                    </div>
                                ) : editData ? (
                                    "ویرایش"
                                ) : (
                                    "تایید"
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="w-24">
                        <div
                            onClick={handleCancel}
                            className="text-center text-[#545454] w-full rounded-[5px] bg-[#eceded] block font-[600] px-0 py-[12px] cursor-pointer"
                        >
                            بازگشت
                        </div>
                    </div>
                </div>,
            ]}
        >
            <Divider />
            <div>
                <div className="w-full flex items-start flex-wrap mt-4">
                    <div className="sm:w-1/2 w-full mb-4 sm:pl-2">
                        <label className="text-[#656565] text-[16px] mb-[10px]">
                            نام سازمان*
                        </label>
                        <div
                            className={`bg-[#fff] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 border ${errors.organizationName ? "border-red-500" : "border-[#0005]"
                                }`}
                        >
                            <FaBuilding className="text-[#656565]" />
                            <input
                                onChange={(e) => {
                                    setFormData({ ...formData, organizationName: e.target.value });
                                    setErrors((prev) => ({ ...prev, organizationName: "" }));
                                }}
                                value={formData.organizationName}
                                className="mr-[10px] p-[4px] w-full bg-transparent text-right outline-none"
                                type="text"
                                placeholder="نام سازمان"
                            />
                        </div>
                        {errors.organizationName && (
                            <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>
                        )}
                    </div>

                    <div className="sm:w-1/2 w-full mb-4 sm:pr-2">
                        <label className="text-[#656565] text-[16px] mb-[10px]">
                            کد اقتصادی*
                        </label>
                        <div
                            className={`bg-[#fff] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 border ${errors.economicCode ? "border-red-500" : "border-[#0005]"
                                }`}
                        >
                            <FaUser className="text-[#656565]" />
                            <input
                                onChange={(e) => {
                                    setFormData({ ...formData, economicCode: e.target.value });
                                    setErrors((prev) => ({ ...prev, economicCode: "" }));
                                }}
                                value={formData.economicCode}
                                className="mr-[10px] p-[4px] w-full bg-transparent text-right outline-none"
                                type="text"
                                placeholder="کد اقتصادی"
                            />
                        </div>
                        {errors.economicCode && (
                            <p className="text-red-500 text-sm mt-1">{errors.economicCode}</p>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap">
                    <div
                        className={`sm:w-1/2 w-full sm:pl-2 ${errors.selectedProvince ? "order-select-err" : "order-select"
                            }`}
                    >
                        <label className="text-[#656565] text-[16px] mb-[10px]">
                            استان*
                        </label>
                        <div className="mt-3">
                            <Select
                                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                                className="w-full flex items-center"
                                size="large"
                                value={selectedProvince ? selectedProvince : "انتخاب استان"}
                                onChange={(value) => {
                                    setSelectedProvince(value);
                                    setSelectedCity("");
                                    setErrors((prev) => ({ ...prev, selectedProvince: "" }));
                                }}
                                suffixIcon={
                                    <FaCaretDown className="text-[#d1182b] text-lg" />
                                }
                                options={provinceList.map((province) => ({
                                    value: province.provinceId,
                                    label: <div className="p-3">{province.title}</div>,
                                }))}
                            />
                        </div>
                        {errors.selectedProvince && (
                            <p className="text-red-500 text-sm mt-3">
                                {errors.selectedProvince}
                            </p>
                        )}
                    </div>
                    <div
                        className={`sm:w-1/2 w-full sm:pr-2 ${errors.selectedCity ? "order-select-err" : "order-select"
                            }`}
                    >
                        <label className="text-[#656565] text-[16px] mb-[10px]">
                            شهر*
                        </label>
                        <div className="mt-3">
                            <Select
                                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                                className="w-full flex items-center"
                                size="large"
                                value={selectedCity ? selectedCity : "انتخاب شهر"}
                                onChange={(value) => {
                                    setSelectedCity(value);
                                    setErrors((prev) => ({ ...prev, selectedCity: "" }));
                                }}
                                suffixIcon={
                                    <FaCaretDown className="text-[#d1182b] text-lg" />
                                }
                                options={cityList.map((city) => ({
                                    value: city.id,
                                    label: <div className="p-3">{city.title}</div>,
                                }))}
                            />
                        </div>
                        {errors.selectedCity && (
                            <p className="text-red-500 text-sm mt-3">
                                {errors.selectedCity}
                            </p>
                        )}
                    </div>
                </div>

                <div className="w-full flex items-start flex-wrap mt-4">
                    <div className="sm:w-1/2 w-full mb-4 sm:pl-2">
                        <label className="text-[#656565] text-[16px] mb-[10px]">
                            شناسه ملی*
                        </label>
                        <div
                            className={`bg-[#fff] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 border ${errors.nationalId ? "border-red-500" : "border-[#0005]"
                                }`}
                        >
                            <FaUser className="text-[#656565]" />
                            <input
                                onChange={(e) => {
                                    setFormData({ ...formData, nationalId: e.target.value });
                                    setErrors((prev) => ({ ...prev, nationalId: "" }));
                                }}
                                value={formData.nationalId}
                                className="mr-[10px] p-[4px] w-full bg-transparent text-right outline-none"
                                type="text"
                                placeholder="شناسه ملی"
                            />
                        </div>
                        {errors.nationalId && (
                            <p className="text-red-500 text-sm mt-1">{errors.nationalId}</p>
                        )}
                    </div>

                    <div className="sm:w-1/2 w-full mb-4 sm:pr-2">
                        <label className="text-[#656565] text-[16px] mb-[10px]">
                            شماره ثبت*
                        </label>
                        <div
                            className={`bg-[#fff] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 border ${errors.registrationId ? "border-red-500" : "border-[#0005]"
                                }`}
                        >
                            <FaUser className="text-[#656565]" />
                            <input
                                onChange={(e) => {
                                    setFormData({ ...formData, registrationId: e.target.value });
                                    setErrors((prev) => ({ ...prev, registrationId: "" }));
                                }}
                                value={formData.registrationId}
                                className="mr-[10px] p-[4px] w-full bg-transparent text-right outline-none"
                                type="text"
                                placeholder="شماره ثبت"
                            />
                        </div>
                        {errors.registrationId && (
                            <p className="text-red-500 text-sm mt-1">{errors.registrationId}</p>
                        )}
                    </div>
                </div>

                <div className="w-full flex items-start flex-wrap mt-4">
                    <div className="sm:w-1/2 w-full mb-4 sm:pl-2">
                        <label className="text-[#656565] text-[16px] mb-[10px]">
                            شماره تماس*
                        </label>
                        <div
                            className={`bg-[#fff] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 border ${errors.landlineNumber ? "border-red-500" : "border-[#0005]"
                                }`}
                        >
                            <MdOutlinePhone className="text-[#656565] text-2xl" />
                            <input
                                onChange={(e) => {
                                    setFormData({ ...formData, landlineNumber: e.target.value });
                                    setErrors((prev) => ({ ...prev, landlineNumber: "" }));
                                }}
                                value={formData.landlineNumber}
                                className="mr-[10px] p-[4px] w-full bg-transparent text-right outline-none"
                                type="tel"
                                placeholder="شماره تماس"
                            />
                        </div>
                        {errors.landlineNumber && (
                            <p className="text-red-500 text-sm mt-1">{errors.landlineNumber}</p>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default AddLegal; 