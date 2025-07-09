"use client";

import { getAddress } from "@/services/order/orderService";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import AddAddress from "./AddAddress";
import DeleteAddress from "./DeleteAddress";

const AddressListSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-32" />
        <div className="h-10 bg-gray-200 animate-pulse rounded w-40" />
      </div>

      {/* Addresses List Skeleton */}
      <div className="grid grid-cols-1 gap-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative flex items-center justify-between"
          >
            {/* Address Info Skeleton */}
            <div className="flex items-center gap-4 flex-1">
              <div className="flex flex-col space-y-2 w-full">
                {/* Name and Mobile Skeleton */}
                <div className="flex items-center gap-2">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-32" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                </div>

                {/* Address Text Skeleton */}
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                </div>

                {/* Postal Code and National Code Skeleton */}
                <div className="flex items-center gap-4">
                  <div className="h-3 bg-gray-200 animate-pulse rounded w-32" />
                  <div className="h-3 bg-gray-200 animate-pulse rounded w-28" />
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
    return <AddressListSkeleton />;
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
          <span>افزودن</span>
        </button>
      </div>

      {/* Addresses List */}
      <div className="grid grid-cols-1 gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative flex items-center justify-between z-50 relative"
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
              <Tooltip title="ویرایش آدرس" placement="bottom">
                <button
                  onClick={() => handleModalOpen('edit', address.id)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                >
                  <EditOutlined className="text-lg !text-teal-500 hover:!text-t" />
                </button>
              </Tooltip>
              <Tooltip title="حذف آدرس" placement="bottom">
                <button
                  onClick={() => handleModalOpen('delete', address.id)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                >
                  <DeleteOutlined className="text-lg !text-[#d1182b] hover:!text-[#b91626]" />
                </button>
              </Tooltip>
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