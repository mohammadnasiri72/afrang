"use client";

import { useState, useEffect } from "react";
import { Switch, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLegal, clearSelectedLegal } from "@/redux/slices/legalIdSlice";
import AddLegal from "@/components/profile/legal/AddLegal";
import EmptyLegalIcon from "./EmptyLegalIcon";
import EditLegal from "./EditLegal";
import DeleteLegal from "./DeleteLegal";
import { getLegal, getLegalId } from "@/services/order/orderService";
import Cookies from "js-cookie";

function BoxLegal() {
    const dispatch = useDispatch();
    const selectedLegal = useSelector((state) => state.legalId.selectedLegal);
    const [isLegalEnabled, setIsLegalEnabled] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [legalList, setLegalList] = useState([]);
    const [selectedLegalForEdit, setSelectedLegalForEdit] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);

    const user = Cookies.get("user");
    const token = JSON.parse(user).token;

    useEffect(() => {
        if (isLegalEnabled) {
            fetchLegalList();
        } else {
            dispatch(clearSelectedLegal());
        }
    }, [isLegalEnabled]);

    const fetchLegalList = async () => {
        setLoading(true);
        try {
            const data = await getLegal(token);
            if (data) {
                setLegalList(data);
                if (data.length === 1) {
                    dispatch(setSelectedLegal(data[0]));
                } else {
                    dispatch(clearSelectedLegal());
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
        setIsLegalEnabled(checked);
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
                dispatch(clearSelectedLegal());
            }
        }
    };

    return (
        <div className="bg-white rounded-[12px] p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h3 className="text-[#656565] text-[16px] font-[600]">اطلاعات حقوقی</h3>
                    <Switch
                        checked={isLegalEnabled}
                        onChange={handleSwitchChange}
                    />
                </div>
                {isLegalEnabled && (
                    <Button
                        type="primary"
                        onClick={() => {
                            setSelectedLegalForEdit(null);
                            setShowAddModal(true);
                        }}
                    >
                        افزودن اطلاعات حقوقی
                    </Button>
                )}
            </div>

            {isLegalEnabled && (
                <>
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
                                            <div className="col-span-3">
                                                <div className="font-bold text-base text-gray-800">
                                                    نام سازمان: <span className="font-normal">{legal.organizationName}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="font-bold text-base text-gray-800">
                                                    کد اقتصادی: <span className="font-normal">{legal.economicCode}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="font-bold text-base text-gray-800">
                                                    شناسه ملی: <span className="font-normal">{legal.nationalId}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="font-bold text-base text-gray-800">
                                                    شماره ثبت: <span className="font-normal">{legal.registrationId}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-6">
                                                <div className="font-bold text-base text-gray-800">
                                                    شماره تماس: <span className="font-normal">{legal.landlineNumber}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-6">
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
                                        <div className="w-24">
                                            <EditLegal
                                                showModal={() => handleEditClick(legal.id)}
                                            />
                                        </div>
                                        <div className="w-24">
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
                </>
            )}

            {showAddModal && (
                <AddLegal
                    editData={selectedLegalForEdit}
                    onClose={handleCloseModal}
                    onAdd={selectedLegalForEdit ? handleEditLegal : handleAddLegal}
                />
            )}
        </div>
    );
}

export default BoxLegal;
