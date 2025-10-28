"use client";

import { getLegal } from "@/services/order/orderService";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import AddLegal from "./AddLegal";
import DeleteLegal from "./DeleteLegal";

const LegalListSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-40" />
        <div className="h-10 bg-gray-200 animate-pulse rounded w-48" />
      </div>

      {/* Legal List Skeleton */}
      <div className="grid grid-cols-1 gap-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative flex items-center justify-between"
          >
            {/* Legal Info Skeleton */}
            <div className="flex items-center gap-4 flex-1">
              <div className="flex flex-col w-full">
                {/* Organization Name Skeleton */}
                <div className="h-5 bg-gray-200 animate-pulse rounded w-48" />

                {/* Grid Info Skeleton */}
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {/* Economic Code */}
                  <div className="flex items-center gap-2">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-32" />
                  </div>
                  {/* National ID */}
                  <div className="flex items-center gap-2">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-32" />
                  </div>
                  {/* Registration ID */}
                  <div className="flex items-center gap-2">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-32" />
                  </div>
                  {/* Landline Number */}
                  <div className="flex items-center gap-2">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-32" />
                  </div>
                </div>

                {/* Address Skeleton */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-16" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-48" />
                </div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex items-center gap-1">
              <div className="w-7 h-7 bg-gray-200 animate-pulse rounded" />
              <div className="w-7 h-7 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function LegalList() {
  const [legalList, setLegalList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLegalId, setActiveLegalId] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'add', 'edit', 'delete', null

  // تنظیمات نوتیفیکیشن
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const handleModalOpen = (type, legalId = null) => {
    setActiveModal(type);
    setActiveLegalId(legalId);
  };

  const handleModalClose = () => {
    setActiveModal(null);
    setActiveLegalId(null);
  };

  const fetchLegalList = async () => {
    try {
      const userCookie = Cookies.get("user");
      if (!userCookie) {
        throw new Error("کاربر یافت نشد");
      }
      const { token } = JSON.parse(userCookie);
      const response = await getLegal(token);
      if (response) {
        // فیلتر کردن اطلاعات حقوقی آرشیو نشده
        const activeLegals = response.filter(legal => !legal.isArchive);
        setLegalList(activeLegals);
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: "خطا در دریافت لیست اطلاعات حقوقی",
        customClass: {
          container: "toast-modal",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLegalList();
  }, []);

  if (isLoading) {
    return <LegalListSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">اطلاعات حقوقی</h1>
        <button
          onClick={() => handleModalOpen('add')}
          className="flex items-center gap-2 px-4 py-2 bg-[#d1182b] !text-white rounded-lg hover:bg-[#b91626] transition-colors cursor-pointer"
        >
          <FaPlus className="text-sm" />
          <span>افزودن</span>
        </button>
      </div>

      {/* لیست اطلاعات حقوقی */}
      <div className="grid grid-cols-1 gap-4">
        {legalList.map((legal) => (
          <div
            key={legal.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative flex items-center justify-between z-50 relative"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm">{legal.organizationName}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">کد اقتصادی:</span> {legal.economicCode}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">شناسه ملی:</span> {legal.nationalId}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">شماره ثبت:</span> {legal.registrationId}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">شماره تماس:</span> {legal.landlineNumber}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">آدرس:</span> {legal.provinceTitle} - {legal.cityTitle}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Tooltip title="ویرایش اطلاعات حقوقی" placement="bottom">
                <button
                  onClick={() => handleModalOpen('edit', legal.id)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                >
                  <EditOutlined className="text-lg !text-teal-500 hover:!text-t" />
                </button>
              </Tooltip>
              <Tooltip title="حذف اطلاعات حقوقی" placement="bottom">
                <button
                  onClick={() => handleModalOpen('delete', legal.id)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                >
                  <DeleteOutlined className="text-lg !text-[#d1182b] hover:!text-[#b91626]" />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      {!isLoading && legalList.length === 0 && (
        // <div className="text-center py-12 bg-white rounded-lg z-50 relative">
        //   <p className="text-gray-500">هنوز اطلاعات حقوقی ثبت نشده است</p>
        //   <button
        //     onClick={() => handleModalOpen('add')}
        //     className="flex items-center gap-2 px-4 py-2 bg-[#d1182b] !text-white rounded-lg hover:bg-[#b91626] transition-colors cursor-pointer mx-auto mt-4"
        //   >
        //     <FaPlus className="text-sm" />
        //     <span>افزودن اطلاعات حقsadوقی جدید</span>
        //   </button>
        // </div>
        <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg z-50 relative">
  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center !mb-4">
    <FaPlus className="text-3xl text-gray-400" />
  </div>
  <h3 className="text-lg font-semibold text-gray-700 !mb-2">
    هنوز اطلاعات حقوقی ثبت نشده است
  </h3>
  <p className="text-gray-500 !mb-4">
    در حال حاضر هیچ اطلاعات حقوقی برای نمایش وجود ندارد
  </p>
  <button
    onClick={() => handleModalOpen('add')}
    className="flex items-center gap-2 px-6 py-3 bg-[#d1182b] !text-white rounded-lg hover:bg-[#b91626] transition-colors cursor-pointer font-semibold"
  >
    <FaPlus className="text-sm" />
    <span>افزودن اطلاعات حقوقی جدید</span>
  </button>
</div>
      )}

      {/* مودال‌ها */}
      {(activeModal === 'add' || activeModal === 'edit') && (
        <AddLegal
          id={activeLegalId}
          getLegalFu={fetchLegalList}
          isOpen={true}
          onClose={handleModalClose}
        />
      )}

      {activeModal === 'delete' && (
        <DeleteLegal
          id={activeLegalId}
          getLegalFu={fetchLegalList}
          isOpen={true}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
} 