import { useState } from "react";
import AddAddress from "@/components/profile/address/AddAddress";
import DeleteAddress from "./DeleteAddress";
import Image from "next/image";

function BoxAddress({
  addressList,
  getAddressFu,
  selectedAddress,
  setSelectedAddress,
  onAddressDelete
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);

  const handleAddClick = () => {
    setEditAddressId(null);
    setIsAddModalOpen(true);
  };

  const handleEditClick = (id) => {
    setEditAddressId(id);
    setIsAddModalOpen(true);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4 border-b pb-3">
        <h2 className="text-2xl font-bold text-gray-800">آدرس‌های ثبت شده</h2>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-[#d1182b] text-white rounded-lg hover:bg-[#b91626] transition-colors cursor-pointer"
        >
          افزودن آدرس تحویل
        </button>
      </div>
      <div className="w-full space-y-3">
        {addressList && addressList.length > 0 ? (
          addressList.map((address) => (
            <div
              key={address.id}
              onClick={() => setSelectedAddress(address)}
              className={`
                w-full p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
                ${address.id === selectedAddress?.id 
                  ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-white shadow-md' 
                  : 'border-gray-100 hover:border-blue-300 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-center gap-4 w-full">
                <div className="flex-1 grid grid-cols-12 gap-3 items-center w-full">
                  <div className="col-span-3">
                    <div className="font-bold text-base text-gray-800">
                      گیرنده: <span className="font-normal">{address.fullName}</span>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="font-bold text-base text-gray-800">
                      کد ملی: <span className="font-normal">{address.nationalCode}</span>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="font-bold text-base text-gray-800">
                      شماره تماس: <span className="font-normal">{address.mobile}</span>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="font-bold text-base text-gray-800">
                      کد پستی: <span className="font-normal">{address.postalCode}</span>
                    </div>
                  </div>
                  <div className="col-span-12 mt-2">
                    <div className="font-bold text-base text-gray-800">
                      آدرس: <span className="font-normal">{address.provinceTitle} - {address.cityTitle} - {address.address}</span>
                    </div>
                  </div>
                </div>
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${address.id === selectedAddress?.id ? 'border-blue-500' : 'border-gray-300'}
                `}>
                  {address.id === selectedAddress?.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  )}
                </div>
              </div>
              <div className="flex justify-end items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(address.id);
                  }}
                  className="text-center text-[#fff] rounded-[5px] bg-[#1e88e5] font-[600] px-4 py-2 cursor-pointer"
                >
                  ویرایش
                </button>
                <DeleteAddress 
                  id={address.id} 
                  getAddressFu={getAddressFu} 
                  onAddressDelete={onAddressDelete}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="relative w-32 h-32 mb-6">
              <Image
                src="/images/gallery/empty-address.svg"
                alt="آدرس ثبت نشده"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">آدرس ثبت نشده</h3>
            <p className="text-gray-500 text-center mb-6">
              برای ثبت سفارش نیاز به ثبت آدرس دارید. لطفاً با کلیک روی دکمه افزودن آدرس، آدرس خود را ثبت کنید.
            </p>
          </div>
        )}
      </div>

      <AddAddress
        id={editAddressId}
        getAddressFu={getAddressFu}
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditAddressId(null);
        }}
      />
    </div>
  );
}

export default BoxAddress;
