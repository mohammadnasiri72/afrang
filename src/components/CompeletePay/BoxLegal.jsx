"use client";

import { useState, useEffect } from "react";
import { Switch, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setLegalEnabled, setSelectedLegal } from "@/redux/slices/legalIdSlice";
import AddLegal from "@/components/profile/legal/AddLegal";
import EmptyLegalIcon from "./EmptyLegalIcon";
import EditLegal from "./EditLegal";
import DeleteLegal from "./DeleteLegal";
import { getLegal, getLegalId } from "@/services/order/orderService";
import Cookies from "js-cookie";

function BoxLegal() {
    const dispatch = useDispatch();
    const isLegalEnabled = useSelector((state) => state.legalId.isLegalEnabled);
    const selectedLegal = useSelector((state) => state.legalId.selectedLegal);
    const [showAddModal, setShowAddModal] = useState(false);
    const [legalList, setLegalList] = useState([]);
    const [selectedLegalForEdit, setSelectedLegalForEdit] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);

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
            if (data) {
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
            console.error("Error fetching legal list:", error);
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
        setEditLoading(true);
        try {
            const response = await getLegalId(legalId, token);
            if (response) {
                setSelectedLegalForEdit(response);
                setShowAddModal(true);
            }
        } catch (error) {
            console.error("Error fetching legal details:", error);
        } finally {
            setEditLoading(false);
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
        await fetchLegalList();
        if (selectedLegal?.id === id) {
            const remainingLegals = legalList.filter(item => item.id !== id);
            if (remainingLegals.length > 0) {
                dispatch(setSelectedLegal(remainingLegals[0]));
            } else {
                dispatch(setSelectedLegal(null));
            }
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-gray-700">اطلاعات حقوقی</span>
                </div>
                <Switch
                    checked={isLegalEnabled}
                    onChange={handleSwitchChange}
                    className="custom-switch"
                />
            </div>
            {isLegalEnabled && (
                <div className="bg-gray-50 p-4 rounded-lg">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d1182b]"></div>
                        </div>
                    ) : legalList.length > 0 ? (
                        <div className="space-y-4">
                            {legalList.map((legal) => (
                                <div
                                    key={legal.id}
                                    onClick={() => handleLegalSelect(legal)}
                                    className={`
                                        w-full p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
                                        ${selectedLegal?.id === legal.id
                                            ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-white shadow-md'
                                            : 'border-gray-100 hover:border-blue-300 hover:shadow-sm'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="flex-1 grid grid-cols-12 gap-3 items-center w-full">
                                            <div className="col-span-12 sm:col-span-3">
                                                <div className="font-bold text-base text-gray-800">
                                                    نام سازمان: <span className="font-normal">{legal.organizationName}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-3">
                                                <div className="font-bold text-base text-gray-800">
                                                    کد اقتصادی: <span className="font-normal">{legal.economicCode}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-3">
                                                <div className="font-bold text-base text-gray-800">
                                                    شناسه ملی: <span className="font-normal">{legal.nationalId}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-3">
                                                <div className="font-bold text-base text-gray-800">
                                                    شماره ثبت: <span className="font-normal">{legal.registrationId}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="font-bold text-base text-gray-800">
                                                    شماره تماس: <span className="font-normal">{legal.landlineNumber}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="font-bold text-base text-gray-800">
                                                    استان و شهر: <span className="font-normal">{legal.provinceTitle} - {legal.cityTitle}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`
                                            w-5 h-5 rounded-full border-2 flex items-center justify-center
                                            ${selectedLegal?.id === legal.id ? 'border-blue-500' : 'border-gray-300'}
                                        `}>
                                            {selectedLegal?.id === legal.id && (
                                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-end items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                                        <div className="w-full sm:w-24">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(legal.id);
                                                }}
                                                className="w-full flex items-center justify-center gap-2 text-center text-[#fff] rounded-[5px] bg-[#1e88e5] font-[600] px-4 py-2 cursor-pointer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                ویرایش
                                            </button>
                                        </div>
                                        <div className="w-full sm:w-24">
                                            <DeleteLegal
                                                id={legal.id}
                                                onDelete={handleDeleteLegal}
                                                getLegalFu={fetchLegalList}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40">
                            <EmptyLegalIcon />
                            <p className="text-[#656565] mt-4">اطلاعات حقوقی ثبت نشده است</p>
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
