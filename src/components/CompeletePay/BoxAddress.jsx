import { useState } from "react";
import AddAddress from "@/components/profile/address/AddAddress";
import DeleteAddress from "./DeleteAddress";
import { FaPlus, FaHome, FaCheck, FaMapMarkerAlt } from "react-icons/fa";

// کامپوننت آیکون برای نمایش وضعیت خالی بودن آدرس‌ها
const EmptyAddressIcon = () => (
  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
    <FaMapMarkerAlt className="text-3xl text-gray-400" />
  </div>
);

function BoxAddress({
  addressList,
  getAddressFu,
  selectedAddress,
  setSelectedAddress,
  onAddressDelete
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [imgError, setImgError] = useState(false);

  const handleAddClick = () => {
    setEditAddressId(null);
    setIsAddModalOpen(true);
  };

  const handleEditClick = (id) => {
    setEditAddressId(id);
    setIsAddModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-xl p-6 shadow-lg z-50 relative">
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-gray-700 font-bold text-lg">آدرس‌های ثبت شده</h2>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-1 text-center text-[#fff] rounded-[5px] bg-[#d1182b] font-[600] px-3 py-1.5 text-sm cursor-pointer hover:bg-[#b91626] transition-colors"
        >
          <FaPlus className="text-xs" />
          <span>افزودن</span>
        </button>
      </div>
        <div className="w-full space-y-3">
          {addressList && addressList.length > 0 ? (
            addressList.map((address) => (
              <div
                key={address.id}
                onClick={() => setSelectedAddress(address)}
                className={`
                  w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200
                  ${address.id === selectedAddress?.id 
                    ? 'border-[#d1182b] bg-red-50'
                    : 'border-gray-200 hover:border-[#d1182b] hover:bg-red-50/50 cursor-pointer'
                  }
                `}
              >
                <div className="w-10 h-10 bg-white rounded-lg flex-shrink-0 flex items-center justify-center shadow-sm">
                  <FaHome className="text-xl text-[#d1182b]" />
                </div>
                <div className="flex-grow">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="text-sm">
                      <span className="font-medium text-gray-800">گیرنده:</span>
                      <span className="text-gray-600 mr-2">{address.fullName}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-800">کد ملی:</span>
                      <span className="text-gray-600 mr-2">{address.nationalCode}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-800">شماره تماس:</span>
                      <span className="text-gray-600 mr-2">{address.mobile}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-800">کد پستی:</span>
                      <span className="text-gray-600 mr-2">{address.postalCode}</span>
                    </div>
                    <div className="text-sm col-span-2">
                      <span className="font-medium text-gray-800">آدرس:</span>
                      <span className="text-gray-600 mr-2">{address.provinceTitle} - {address.cityTitle} - {address.address}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(address.id);
                      }}
                      className="p-1.5 text-gray-400 hover:text-[#d1182b] transition-colors cursor-pointer"
                      title="ویرایش"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <DeleteAddress
                      id={address.id}
                      onDelete={onAddressDelete}
                    />
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                    ${address.id === selectedAddress?.id
                      ? 'border-[#d1182b] bg-[#d1182b]'
                      : 'border-gray-300'
                    }`}
                  >
                    {address.id === selectedAddress?.id && (
                      <FaCheck className="text-white text-[10px]" />
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <EmptyAddressIcon />
              <p className="text-gray-500 mt-4">آدرس ثبت نشده است</p>
            </div>
          )}
        </div>
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
