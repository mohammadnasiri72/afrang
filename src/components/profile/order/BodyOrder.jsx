"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import OrderDetails from './OrderDetails';
import { Box, Pagination } from '@mui/material';
import { useState, useEffect } from 'react';
import { getOrder } from "@/services/order/orderService";
import { getdataDashboard } from "@/services/dashboard/dashboardService";
import Cookies from 'js-cookie';
import { motion, AnimatePresence } from 'framer-motion';
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
    ORDER_STATUS.CANCELLED,
    ORDER_STATUS.COMPLETED,
    ORDER_STATUS.PROCESSING,
    ORDER_STATUS.PENDING,
    ORDER_STATUS.REGISTERED,
];

const ORDER_STATUS_TITLES = {
    [ORDER_STATUS.CANCELLED]: 'لغو شده',
    [ORDER_STATUS.COMPLETED]: 'انجام شده',
    [ORDER_STATUS.PROCESSING]: 'درحال انجام',
    [ORDER_STATUS.PENDING]: 'منتظر پردازش',
    [ORDER_STATUS.REGISTERED]: 'ثبت شده',
};

const ORDER_STATUS_ICONS = {
    [ORDER_STATUS.REGISTERED]: FaClipboardList,
    [ORDER_STATUS.PENDING]: FaHourglassHalf,
    [ORDER_STATUS.PROCESSING]: FaTruck,
    [ORDER_STATUS.COMPLETED]: FaCheckCircle,
    [ORDER_STATUS.CANCELLED]: FaTimesCircle
};

const OrderSkeleton = () => {
    return (
        <div className="mt-4">
            <div id="orders-top" className="bg-white rounded-xl p-4 sm:p-6 shadow-lg z-50 relative max-w-full">
                {/* Title */}
                <div className="h-7 bg-gray-200 animate-pulse rounded w-48 mb-4 sm:mb-6" />

                {/* Segmented Tabs Skeleton */}
                <div className="flex flex-wrap bg-white rounded-lg mt-3 z-50 absolute w-full left-0 right-0 top-10">
                    <div className="w-full SegmentedProduct overflow-hidden mx-auto flex justify-center p-5">
                        <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg" />
                    </div>
                </div>

                {/* Orders List Skeleton */}
                <div className="space-y-4 sm:space-y-6 w-full mt-0 sm:mt-36">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                            {/* Order Header */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
                                <div className="h-6 bg-gray-200 animate-pulse rounded w-32" />
                                <div className="h-10 bg-gray-200 animate-pulse rounded w-40" />
                            </div>

                            {/* Order Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {/* First Column */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-32" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-32" />
                                    </div>
                                </div>

                                {/* Second Column */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-32" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-32" />
                                    </div>
                                </div>

                                {/* Third Column */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-32" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                                        <div className="h-4 bg-gray-200 animate-pulse rounded w-32" />
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
                                <div className="flex justify-end">
                                    <div className="h-10 bg-gray-200 animate-pulse rounded w-48" />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Pagination Skeleton */}
                    <div className="flex justify-center mt-4 sm:mt-6">
                        <div className="h-10 bg-gray-200 animate-pulse rounded w-64" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function BodyOrder() {
    const [orderData, setOrderData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
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
    const statusId = searchParams.get('statusId') || '1'; // Default to 'ثبت شده'
    const page = searchParams.get('page') || '1';

    // useEffect(() => {
    //     setTimeout(() => {
    //         window.scrollTo(0, 0);
    //     }, 100);
    // }, [page]);

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
            if (data.type === 'error') {
                Toast.fire({
                    icon: "error",
                    text: data.message,
                    
                });
                return;
            }
            setDashboardData(data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const fetchOrders = async () => {
        const token = getToken();
        if (!token) return;

        setLoading(true);
        try {
            const response = await getOrder(token, {
                pageSize: 20,
                pageIndex: parseInt(page),
                statusId: parseInt(statusId)
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

    // Fetch data when component mounts or URL parameters change
    useEffect(() => {
        if (!selectedTrackCode) {
            fetchOrders();
            fetchDashboardData();
        }
    }, [statusId, page, selectedTrackCode]);

    const handlePayment = (trackCode) => {
        router.push(`/profile/orders?trackCode=${trackCode}`);
    };

    const handleTabChange = (value) => {
        router.push(`/profile/orders?statusId=${value}&page=1`);
    };

    const handlePageChange = (event, newPage) => {
        router.push(`/profile/orders?statusId=${statusId}&page=${newPage}`);
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
                <div className="bg-white rounded-xl shadow-lg z-50 relative">
                    <OrderDetails trackCode={selectedTrackCode} />
                </div>
            </div>
        );
    }

    return (
        <>
        <style jsx global>{`
        .SegmentedProduct .ant-segmented {
          background-color: #ebebeb;
        }
        .SegmentedProduct .ant-segmented-item {
          padding-left: 0px;
          padding-right: 0px;
          padding-top: 8px;
          padding-bottom: 8px;
          margin-right: 10px !important;
          margin-left: 10px !important;
          width: 100%;
          font-weight: 600 !important;
          font-size: 14px;
          transition: 0.3s;
        }
        .SegmentedProduct .ant-segmented-item-selected {
          background-color: #fff !important;
          color: #d1182b !important;
          border-radius: 6px;
          font-weight: 900 !important;
          font-size: 16px !important;
          transition: 0.3s;
        }
        .SegmentedProduct .ant-segmented-item-selected:hover {
          color: #d1182b !important;
        }
        .SegmentedProduct .ant-segmented-thumb {
          background-color: #fff !important;
          font-weight: 900 !important;
        }
        /* حالت جمع و جورتر در sticky */
        .SegmentedProduct.sticky .ant-segmented-item {
          padding-top: 4px;
          padding-bottom: 4px;
          font-size: 12px;
          margin-right: 4px !important;
          margin-left: 4px !important;
        }
        .SegmentedProduct.sticky .ant-segmented-item-selected {
          font-size: 13px !important;
          border-radius: 4px;
        }
      `}</style>
        <div className="mt-4">
            <div id="orders-top" className="bg-white rounded-xl p-4 sm:p-6 shadow-lg z-50 relative max-w-full">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">تاریخچه سفارشات من</h2>

                {/* تب‌ها: موبایل و دسکتاپ */}
                {/* دسکتاپ: Segmented */}
                <div className="hidden sm:block flex-wrap bg-white rounded-lg mt-3 z-50 absolute w-full left-0 right-0 top-10">
                  <div className="w-full SegmentedProduct overflow-hidden mx-auto flex justify-center p-5">
                    <Segmented
                      className="font-semibold text-3xl w-full overflow-auto"
                      dir="rtl"
                      style={{
                        padding: "8px",
                        fontFamily: "yekan",
                        width: "100%"
                      }}
                      value={parseInt(statusId)}
                      onChange={handleTabChange}
                      options={options}
                    />
                  </div>
                </div>
                {/* موبایل: گرید دو ستونه تب‌ها */}
                <div className="sm:hidden grid grid-cols-2 gap-2 bg-white rounded-lg mt-3 mb-3 w-full px-2 py-2 shadow">
                  {options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleTabChange(opt.value)}
                      className={`flex flex-col cursor-pointer items-center justify-center px-2 py-2 rounded-lg text-xs font-bold transition-all duration-200
                        ${parseInt(statusId) === opt.value ? 'bg-[#d1182b] !text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-[#f6f6f6]'}
                      `}
                    >
                      {React.createElement(options?.find(o => o.value === opt.value).label.props.children[1].type, { className: 'text-base mb-1' })}
                      <span className="whitespace-nowrap">{ORDER_STATUS_TITLES[opt.value]}</span>
                      <span className="text-[10px] font-normal">({dashboardData[
                        opt.value === 1 ? 'Record' :
                        opt.value === 2 ? 'Pending' :
                        opt.value === 3 ? 'Process' :
                        opt.value === 4 ? 'Done' :
                        opt.value === 5 ? 'Cancel' : ''
                      ] || 0})</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-4 sm:space-y-6 w-full mt-0 sm:mt-36">
                    {loading ? (
                        <OrderSkeleton />
                    ) : orderData?.length > 0 ? (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={page}
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
                                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#d1182b] !text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-[#40768c] transition-colors cursor-pointer shadow-sm hover:shadow-md"
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
                                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#40768c] !text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-[#2c5266] transition-all cursor-pointer shadow-sm hover:shadow-md"
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
                                page={parseInt(page)}
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
        </>
    );
}
