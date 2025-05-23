"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import { getLegal } from "@/services/order/orderService";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import AddLegal from "./AddLegal";
import DeleteLegal from "./DeleteLegal";

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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <FaSpinner className="text-3xl text-[#d1182b] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">اطلاعات حقوقی</h1>
        <button
          onClick={() => handleModalOpen('add')}
          className="flex items-center gap-2 px-4 py-2 bg-[#d1182b] text-white rounded-lg hover:bg-[#b91626] transition-colors cursor-pointer"
        >
          <FaPlus className="text-sm" />
          <span>افزودن اطلاعات حقوقی جدید</span>
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
              <button
                onClick={() => handleModalOpen('edit', legal.id)}
                className="p-1.5 text-gray-400 hover:text-[#d1182b] transition-colors cursor-pointer"
                title="ویرایش"
              >
                <FaEdit size={14} />
              </button>
              <button
                onClick={() => handleModalOpen('delete', legal.id)}
                className="p-1.5 text-gray-400 hover:text-[#d1182b] transition-colors cursor-pointer"
                title="حذف"
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {!isLoading && legalList.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">هنوز اطلاعات حقوقی ثبت نشده است</p>
          <button
            onClick={() => handleModalOpen('add')}
            className="flex items-center gap-2 px-4 py-2 bg-[#d1182b] text-white rounded-lg hover:bg-[#b91626] transition-colors cursor-pointer mx-auto mt-4"
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