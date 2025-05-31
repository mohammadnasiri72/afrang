"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import OrderDetails from './OrderDetails';
import { Box, Pagination } from '@mui/material';
import { useState, useEffect } from 'react';
import { getOrder } from "@/services/order/orderService";
import { getdataDashboard } from "@/services/dashboard/dashboardService";
import Cookies from 'js-cookie';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '@/components/Loading';
import { FaClipboardList, FaHourglassHalf, FaTruck, FaCheckCircle, FaTimesCircle, FaEye, FaCreditCard, FaCalendarAlt, FaMoneyBillWave, FaShoppingBag, FaInfoCircle } from 'react-icons/fa';
import { Segmented } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const ORDER_STATUS = {
    REGISTERED: 1,     // ثبت شده
    PENDING: 2,        // منتظر پردازش
    PROCESSING: 3,     // درحال انجام
    COMPLETED: 4,      // انجام شده
    CANCELLED: 5       // لغو شده
};

// تعریف ترتیب دلخواه آیتم‌ها
const ORDER_STATUS_ORDER = [
    ORDER_STATUS.REGISTERED,
    ORDER_STATUS.PENDING,
    ORDER_STATUS.PROCESSING,
    ORDER_STATUS.COMPLETED,
    ORDER_STATUS.CANCELLED,
];

const ORDER_STATUS_TITLES = {
    [ORDER_STATUS.REGISTERED]: 'ثبت شده',
    [ORDER_STATUS.PENDING]: 'منتظر پردازش',
    [ORDER_STATUS.PROCESSING]: 'درحال انجام',
    [ORDER_STATUS.COMPLETED]: 'انجام شده',
    [ORDER_STATUS.CANCELLED]: 'لغو شده',
};

const ORDER_STATUS_ICONS = {
    [ORDER_STATUS.REGISTERED]: FaClipboardList,
    [ORDER_STATUS.PENDING]: FaHourglassHalf,
    [ORDER_STATUS.PROCESSING]: FaTruck,
    [ORDER_STATUS.COMPLETED]: FaCheckCircle,
    [ORDER_STATUS.CANCELLED]: FaTimesCircle
};

export default function BodyOrder({ orderData: initialOrderData, currentStatus, currentPage }) {
    const [orderData, setOrderData] = useState(initialOrderData || []);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [lastStatus, setLastStatus] = useState(currentStatus);
    const [lastPage, setLastPage] = useState(currentPage);
    const [dashboardData, setDashboardData] = useState({
        Record: 0,
        Pending: 0,
        Process: 0,
        Done: 0,
        Cancel: 0
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedTrackCode = searchParams.get('id');
    const statusId = searchParams.get('statusId');
    const page = searchParams.get('page');

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }, [page]);

    const getToken = () => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            try {
                const userData = JSON.parse(userCookie);
                return userData.token;
            } catch (error) {
                console.error('Error parsing user cookie:', error);
                return null;
            }
        }
        return null;
    };

    const fetchDashboardData = async () => {
        const token = getToken();
        if (!token) return;

        try {
            const data = await getdataDashboard(token);
            setDashboardData(data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const fetchOrders = async (statusId, page = 1) => {
        const token = getToken();
        if (!token) return;

        setLoading(true);
        try {
            const response = await getOrder(token, {
                pageSize: 20,
                pageIndex: page,
                statusId: statusId
            });

            if (response && response.length > 0) {
                setOrderData(response);
                setTotalPages(Math.ceil(response[0].total / 20));
            } else {
                setOrderData([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrderData([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    // حذف useEffect های قبلی و اضافه کردن یک useEffect جدید برای تغییرات URL
    useEffect(() => {
        if (!selectedTrackCode && statusId && page) {
            fetchOrders(parseInt(statusId), parseInt(page));
            fetchDashboardData();
        }
    }, [statusId, page, selectedTrackCode]);

    // مقداردهی اولیه
    useEffect(() => {
        if (initialOrderData && initialOrderData.length > 0) {
            setOrderData(initialOrderData);
            setTotalPages(Math.ceil(initialOrderData[0].total / 20));
            setLoading(false);
        }
        fetchDashboardData();
    }, [initialOrderData]);

    const handlePayment = (trackCode) => {
        router.push(`/profile/orders?trackCode=${trackCode}`);
    };

    const handleTabChange = (event, newValue) => {
        router.push(`/profile/orders?statusId=${newValue}&page=1`);
    };

    const handlePageChange = (event, page) => {
        router.push(`/profile/orders?statusId=${statusId}&page=${page}`);
    };

    const handleViewDetails = (trackCode) => {
        router.push(`/profile/orders?id=${trackCode}`);
    };

    const options = [...ORDER_STATUS_ORDER].reverse().map(statusId => {
        const Icon = ORDER_STATUS_ICONS[statusId];
        let count = 0;

        switch (statusId) {
            case ORDER_STATUS.REGISTERED:
                count = dashboardData?.Record || 0;
                break;
            case ORDER_STATUS.PENDING:
                count = dashboardData?.Pending || 0;
                break;
            case ORDER_STATUS.PROCESSING:
                count = dashboardData?.Process || 0;
                break;
            case ORDER_STATUS.COMPLETED:
                count = dashboardData?.Done || 0;
                break;
            case ORDER_STATUS.CANCELLED:
                count = dashboardData?.Cancel || 0;
                break;
        }

        return {
            label: (
                <div className="flex items-center justify-center gap-2 text-right">
                    <span>{ORDER_STATUS_TITLES[statusId]} ({count})</span>
                    <Icon className="text-lg" />
                </div>
            ),
            value: statusId
        };
    });

    // اگر trackCode در URL وجود داشت، جزئیات سفارش رو نشون بده
    if (selectedTrackCode) {
        return (
            <div className="mt-4">
                <div className="bg-white rounded-xl p-6 shadow-lg z-50 relative">
                    <OrderDetails trackCode={selectedTrackCode} />
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <div id="orders-top" className="bg-white rounded-xl p-4 sm:p-6 shadow-lg z-50 relative max-w-full">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">تاریخچه سفارشات من</h2>

                <div className="flex flex-wrap bg-white rounded-lg mt-3 z-50 absolute w-full left-0 right-0 top-10">
                    <div className="w-full SegmentedProduct overflow-hidden mx-auto flex justify-center p-5">
                        <Segmented
                            className="font-semibold text-3xl w-full overflow-auto"
                            dir="ltr"
                            style={{
                                padding: "8px",
                                fontFamily: "yekan",
                                width: "100%"
                            }}
                            value={currentStatus}
                            onChange={(value) => {
                                handleTabChange(null, value);
                            }}
                            options={options}
                        />
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6 mt-4 mt-36 w-full">
                    {loading ? (
                        <div className="flex justify-center items-center py-8 sm:py-12">
                            <Loading />
                        </div>
                    ) : orderData?.length > 0 ? (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {orderData.map((order) => (
                                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
                                            <h3 className="text-base sm:text-lg font-bold text-gray-800">سفارش {order.trackCode}</h3>
                                            {order.paymentStatus >= 1 && order.paymentStatus <= 5 && order.status < 4 && (
                                                <button
                                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#d1182b] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-[#40768c] transition-colors cursor-pointer shadow-sm hover:shadow-md"
                                                    onClick={() => handlePayment(order.trackCode)}
                                                >
                                                    <FaCreditCard className="text-base sm:text-lg" />
                                                    <span>پرداخت سفارش</span>
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                            <div className="space-y-3">
                                                <div className="flex justify-start items-center">
                                                    <FaShoppingBag className="text-[#d1182b] ml-2" />
                                                    <span className="text-gray-600">شماره سفارش:</span>
                                                    <span className="font-medium mr-2">{order.trackCode}</span>
                                                </div>
                                                <div className="flex justify-start items-center">
                                                    <FaCalendarAlt className="text-[#d1182b] ml-2" />
                                                    <span className="text-gray-600">تاریخ سفارش:</span>
                                                    <span className="font-medium mr-2">{new Date(order.createDate).toLocaleDateString('fa-IR')}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-start items-center">
                                                    <FaMoneyBillWave className="text-[#d1182b] ml-2" />
                                                    <span className="text-gray-600">وضعیت پرداخت:</span>
                                                    <span className={`font-medium mr-2 `}>
                                                        {order.paymentStatusTitle}
                                                    </span>
                                                </div>
                                                <div className="flex justify-start items-center">
                                                    <FaInfoCircle className="text-[#d1182b] ml-2" />
                                                    <span className="text-gray-600">مبلغ کل:</span>
                                                    <span className="font-semibold mr-2">{order.orderTotal?.toLocaleString()} تومان</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-start items-center">
                                                    <FaTruck className="text-[#d1182b] ml-2" />
                                                    <span className="text-gray-600">وضعیت سفارش :</span>
                                                    <span className={`font-medium mr-2 ${order.status === 1 ? 'text-gray-600' :
                                                        order.status === 2 ? 'text-yellow-600' :
                                                            order.status === 3 ? 'text-blue-600' :
                                                                order.status === 4 ? 'text-green-600' :
                                                                    order.status === 5 ? 'text-red-600' :
                                                                        'text-gray-600'
                                                        }`}>
                                                        {order.statusTitle}
                                                    </span>
                                                </div>
                                                <div className="flex justify-start items-center">
                                                    <FaCreditCard className="text-[#d1182b] ml-2" />
                                                    <span className="text-gray-600">روش پرداخت:</span>
                                                    <span className="font-medium mr-2">{order.paymentId === 2143 ? 'پرداخت آفلاین' : order.paymentId === 2142 ? 'پرداخت آنلاین' : 'نامشخص'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => handleViewDetails(order.trackCode)}
                                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#40768c] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-[#2c5266] transition-all cursor-pointer shadow-sm hover:shadow-md"
                                                >
                                                    <FaEye className="text-base sm:text-lg" />
                                                    <span>مشاهده جزئیات سفارش</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-gray-500">
                            <svg className="w-12 sm:w-16 h-12 sm:h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-base sm:text-lg">سفارشی در این دسته‌بندی یافت نشد</p>
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-4 sm:mt-6">
                            <Pagination
                                page={currentPage}
                                count={totalPages}
                                onChange={handlePageChange}
                                color="primary"
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        borderRadius: '8px',
                                    },
                                    '& .Mui-selected': {
                                        backgroundColor: '#d1182b !important',
                                        color: 'white !important',
                                    },
                                    '& .MuiPaginationItem-icon': {
                                        transform: 'rotate(180deg)'
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
