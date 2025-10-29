"use client";

import AddLegal from "@/components/profile/legal/AddLegal";
import { setLegalEnabled, setSelectedLegal } from "@/redux/slices/legalIdSlice";
import { getLegal, getLegalId } from "@/services/User/UserServices";
import { Switch } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaBuilding, FaCheck, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import DeleteLegal from "./DeleteLegal";
import EmptyLegalIcon from "./EmptyLegalIcon";

// import sweet alert 2
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

// کامپوننت اسکلتون برای نمایش در زمان لودینگ
const BoxLegalSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="w-full flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 animate-pulse"
        >
          <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0" />
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((field) => (
                <div key={field} className="flex items-center gap-2">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-4 bg-gray-200 rounded w-32" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded" />
            <div className="w-5 h-5 bg-gray-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

function BoxLegal() {
  const dispatch = useDispatch();
  const isLegalEnabled = useSelector((state) => state.legalId.isLegalEnabled);
  const selectedLegal = useSelector((state) => state.legalId.selectedLegal);
  const [showAddModal, setShowAddModal] = useState(false);
  const [legalList, setLegalList] = useState([]);
  const [selectedLegalForEdit, setSelectedLegalForEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = Cookies.get("user");
  const token = JSON.parse(user).token;

  // در هنگام لود کامپوننت، سوئیچ اطلاعات حقوقی را خاموش کن
  useEffect(() => {
    dispatch(setLegalEnabled(false));
    dispatch(setSelectedLegal(null));
  }, []);

  useEffect(() => {
    if (isLegalEnabled) {
      fetchLegalList();
    } else {
      dispatch(setSelectedLegal(null));
    }
  }, [isLegalEnabled]);

  const fetchLegalList = async () => {
    setLoading(true);
    try {
      const data = await getLegal(token);
      if (data.type === "error") {
        Toast.fire({
          icon: "error",
          text: data.message,
        });
        return;
      } else {
        setLegalList(data);
        // اگر فقط یک اطلاعات حقوقی وجود دارد، آن را انتخاب کن
        if (data.length === 1) {
          dispatch(setSelectedLegal(data[0]));
        } else {
          // اگر چند اطلاعات حقوقی وجود دارد، هیچ کدام را انتخاب نکن
          dispatch(setSelectedLegal(null));
        }
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: error.response?.data ? error.response?.data : "خطای شبکه",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLegalSelect = (legal) => {
    dispatch(setSelectedLegal(legal));
  };

  const handleSwitchChange = (checked) => {
    dispatch(setLegalEnabled(checked));
    if (!checked) {
      dispatch(setSelectedLegal(null));
    }
  };

  const handleEditClick = async (legalId) => {
    try {
      const response = await getLegalId(legalId, token);
      if (response.type === "error") {
        Toast.fire({
          icon: "error",
          text: response.message,
        });
        return;
      } else {
        setSelectedLegalForEdit(response);
        setShowAddModal(true);
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: error.response?.data ? error.response?.data : "خطای شبکه",
      });
    }
  };

  const handleAddLegal = async (newLegal) => {
    await fetchLegalList();
    setShowAddModal(false);
    setSelectedLegalForEdit(null);
  };

  const handleEditLegal = async (editedLegal) => {
    await fetchLegalList();
    setShowAddModal(false);
    setSelectedLegalForEdit(null);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setSelectedLegalForEdit(null);
  };

  const handleDeleteLegal = async (id) => {
    try {
      await fetchLegalList();
      if (selectedLegal?.id === id) {
        const remainingLegals = legalList.filter((item) => item.id !== id);
        if (remainingLegals.length > 0) {
          dispatch(setSelectedLegal(remainingLegals[0]));
        } else {
          dispatch(setSelectedLegal(null));
        }
      }
    } catch (error) {
      console.error("Error in handleDeleteLegal:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Switch
            checked={isLegalEnabled}
            onChange={handleSwitchChange}
            className="custom-switch"
          />
          <span className="text-gray-700 font-bold text-lg">
            خرید حقوقی می‌باشد
          </span>
        </div>
        {isLegalEnabled && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 text-center !text-[#fff] rounded-[5px] bg-[#d1182b] font-[600] px-3 py-1.5 text-sm cursor-pointer hover:bg-[#b91626] transition-colors"
          >
            <FaPlus className="text-xs" />
            <span>افزودن</span>
          </button>
        )}
      </div>
      {isLegalEnabled && (
        <div className="bg-white rounded-xl p-6 shadow-lg z-50 relative">
          {loading ? (
            <BoxLegalSkeleton />
          ) : legalList.length > 0 ? (
            <div className="flex flex-col gap-2">
              {legalList.map((legal) => (
                <div
                  key={legal.id}
                  onClick={() => handleLegalSelect(legal)}
                  className={`w-full flex flex-wrap items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200
                                        ${
                                          selectedLegal?.id === legal.id
                                            ? "border-[#d1182b] bg-red-50"
                                            : "border-gray-200 hover:border-[#d1182b] hover:bg-red-50/50 cursor-pointer"
                                        }`}
                >
                  <div className="sm:hidden flex justify-between items-center w-full">
                    <div className="w-10 h-10 bg-white rounded-lg flex-shrink-0 flex items-center justify-center shadow-sm">
                      <FaBuilding className="text-xl text-[#d1182b]" />
                    </div>
                    <div className="flex items-center gap-2 sm:w-auto w-full justify-end">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(legal.id);
                          }}
                          className="p-1.5 !text-gray-400 hover:!text-[#d1182b] transition-colors cursor-pointer"
                          title="ویرایش"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <span onClick={(e) => e.stopPropagation()}>
                          <DeleteLegal
                            id={legal.id}
                            onDelete={handleDeleteLegal}
                            getLegalFu={fetchLegalList}
                          />
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                                            ${
                                              selectedLegal?.id === legal.id
                                                ? "border-[#d1182b] bg-[#d1182b]"
                                                : "border-gray-300"
                                            }`}
                      >
                        {selectedLegal?.id === legal.id && (
                          <FaCheck className="text-white text-[10px]" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white rounded-lg flex-shrink-0 sm:flex hidden items-center justify-center shadow-sm">
                    <FaBuilding className="text-xl text-[#d1182b]" />
                  </div>
                  <div className="flex-grow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="text-sm">
                        <span className="font-medium text-gray-800">
                          نام سازمان:
                        </span>
                        <span className="text-gray-600 mr-2">
                          {legal.organizationName}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-800">
                          کد اقتصادی:
                        </span>
                        <span className="text-gray-600 mr-2">
                          {legal.economicCode}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-800">
                          شناسه ملی:
                        </span>
                        <span className="text-gray-600 mr-2">
                          {legal.nationalId}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-800">
                          شماره ثبت:
                        </span>
                        <span className="text-gray-600 mr-2">
                          {legal.registrationId}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-800">
                          شماره تماس:
                        </span>
                        <span className="text-gray-600 mr-2">
                          {legal.landlineNumber}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-800">آدرس:</span>
                        <span className="text-gray-600 mr-2">
                          {legal.provinceTitle} - {legal.cityTitle}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="sm:flex hidden items-center gap-2 sm:w-auto w-full sm:justify-start justify-center">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(legal.id);
                        }}
                        className="p-1.5 !text-gray-400 hover:!text-[#d1182b] transition-colors cursor-pointer"
                        title="ویرایش"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <span onClick={(e) => e.stopPropagation()}>
                        <DeleteLegal
                          id={legal.id}
                          onDelete={handleDeleteLegal}
                          getLegalFu={fetchLegalList}
                        />
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                                            ${
                                              selectedLegal?.id === legal.id
                                                ? "border-[#d1182b] bg-[#d1182b]"
                                                : "border-gray-300"
                                            }`}
                    >
                      {selectedLegal?.id === legal.id && (
                        <FaCheck className="text-white text-[10px]" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <EmptyLegalIcon />
              <p className="text-gray-500 mt-4">اطلاعات حقوقی ثبت نشده است</p>
            </div>
          )}
        </div>
      )}

      {showAddModal && (
        <AddLegal
          editData={selectedLegalForEdit}
          onClose={handleCloseModal}
          onAdd={selectedLegalForEdit ? handleEditLegal : handleAddLegal}
        />
      )}

      <style jsx global>{`
        .ant-switch-checked {
          background-color: #d1182b !important;
        }
        .ant-switch:hover:not(.ant-switch-disabled).ant-switch-checked {
          background-color: #b91626 !important;
        }
      `}</style>
    </div>
  );
}

export default BoxLegal;
