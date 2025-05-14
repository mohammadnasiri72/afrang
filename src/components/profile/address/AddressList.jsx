"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import { getAddress } from "@/services/order/orderService";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import AddAddress from "./AddAddress";
import DeleteAddress from "./DeleteAddress";

export default function AddressList() {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeAddressId, setActiveAddressId] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'add', 'edit', 'delete', null

  // Toast notification setup
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const handleModalOpen = (type, addressId = null) => {
    setActiveModal(type);
    setActiveAddressId(addressId);
  };

  const handleModalClose = () => {
    setActiveModal(null);
    setActiveAddressId(null);
  };

  const fetchAddresses = async () => {
    try {
      const userCookie = Cookies.get("user");
      if (!userCookie) {
        throw new Error("User not found");
      }
      const { token } = JSON.parse(userCookie);
      const response = await getAddress(token);
      if (response) {
        // فیلتر کردن آدرس‌های آرشیو نشده
        const activeAddresses = response.filter(addr => !addr.isArchive);
        setAddresses(activeAddresses);
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: "خطا در دریافت لیست آدرس‌ها",
        customClass: {
          container: "toast-modal",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">آدرس‌های من</h1>
        <button
          onClick={() => handleModalOpen('add')}
          className="flex items-center gap-2 px-4 py-2 bg-[#d1182b] text-white rounded-lg hover:bg-[#b91626] transition-colors cursor-pointer"
        >
          <FaPlus className="text-sm" />
          <span>افزودن آدرس جدید</span>
        </button>
      </div>

      {/* Addresses List */}
      <div className="grid grid-cols-1 gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative flex items-center justify-between"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm">{address.fullName}</h3>
                  <span className="text-sm text-gray-500 ltr">{address.mobile}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {address.provinceTitle} - {address.cityTitle} - {address.address}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                  <span>کد پستی: {address.postalCode}</span>
                  <span>کد ملی: {address.nationalCode}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleModalOpen('edit', address.id)}
                className="p-1.5 text-gray-400 hover:text-[#d1182b] transition-colors cursor-pointer"
                title="ویرایش"
              >
                <FaEdit size={14} />
              </button>
              <button
                onClick={() => handleModalOpen('delete', address.id)}
                className="p-1.5 text-gray-400 hover:text-[#d1182b] transition-colors cursor-pointer"
                title="حذف"
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {!isLoading && addresses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">هنوز آدرسی ثبت نشده است</p>
          <button
            onClick={() => handleModalOpen('add')}
            className="flex items-center gap-2 px-4 py-2 bg-[#d1182b] text-white rounded-lg hover:bg-[#b91626] transition-colors cursor-pointer mx-auto mt-4"
          >
            <FaPlus className="text-sm" />
            <span>افزودن آدرس جدید</span>
          </button>
        </div>
      )}

      {/* Modals */}
      {(activeModal === 'add' || activeModal === 'edit') && (
        <AddAddress
          id={activeAddressId}
          getAddressFu={fetchAddresses}
          isOpen={true}
          onClose={handleModalClose}
        />
      )}
      
      {activeModal === 'delete' && (
        <DeleteAddress
          id={activeAddressId}
          getAddressFu={fetchAddresses}
          isOpen={true}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
} 