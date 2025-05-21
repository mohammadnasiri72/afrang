"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import OrderDetails from './OrderDetails';
import { Tabs, Tab, Box, Pagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { getOrder } from "@/services/order/orderService";
import Cookies from 'js-cookie';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '@/components/Loading';
import { FaClipboardList, FaHourglassHalf, FaTruck, FaCheckCircle, FaTimesCircle, FaEye, FaCreditCard, FaCalendarAlt, FaMoneyBillWave, FaShoppingBag, FaInfoCircle } from 'react-icons/fa';

const ORDER_STATUS = {
  REGISTERED: 1,     // ثبت شده
  PENDING: 2,        // منتظر پردازش
  PROCESSING: 3,     // درحال انجام
  COMPLETED: 4,      // انجام شده
  CANCELLED: 5       // لغو شده
};

const ORDER_STATUS_TITLES = {
  [ORDER_STATUS.REGISTERED]: 'ثبت شده',
  [ORDER_STATUS.PENDING]: 'منتظر پردازش',
  [ORDER_STATUS.PROCESSING]: 'درحال انجام',
  [ORDER_STATUS.COMPLETED]: 'انجام شده',
  [ORDER_STATUS.CANCELLED]: 'لغو شده'
};

const ORDER_STATUS_ICONS = {
  [ORDER_STATUS.REGISTERED]: FaClipboardList,
  [ORDER_STATUS.PENDING]: FaHourglassHalf,
  [ORDER_STATUS.PROCESSING]: FaTruck,
  [ORDER_STATUS.COMPLETED]: FaCheckCircle,
  [ORDER_STATUS.CANCELLED]: FaTimesCircle
};

// استایل سفارشی برای تب‌ها
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  minHeight: '40px',
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '4px',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '80%',
    backgroundColor: '#d1182b',
    borderRadius: '4px',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '0 16px',
    minHeight: '40px',
    color: '#666',
    fontFamily: 'var(--font-vazirmatn)',
    '&.Mui-selected': {
      color: '#d1182b',
    },
    '&:hover': {
      color: '#d1182b',
    },
    '& .MuiTab-iconWrapper': {
      marginLeft: '8px',
      marginRight: '0',
    }
  }),
);

export default function BodyOrder({ orderData: initialOrderData, currentStatus, currentPage }) {
    const [orderData, setOrderData] = useState(initialOrderData);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [lastStatus, setLastStatus] = useState(currentStatus);
    const [lastPage, setLastPage] = useState(currentPage);
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedTrackCode = searchParams.get('id');
    console.log(orderData);
    

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }, [currentPage]);

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

    const fetchOrders = async (statusId, page = 1) => {
        const token = getToken();
        if (!token) return;

        setLoading(true);
        try {
            const response = await getOrder(token, {
                pageSize: 10,
                pageIndex: page,
                statusId: statusId
            });
            if (response && response.length > 0) {
                setOrderData(response);
                setTotalPages(Math.ceil(response[0].total / 10));
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

    useEffect(() => {
        if (!selectedTrackCode) {
            fetchOrders(currentStatus, currentPage);
        }
    }, [currentStatus, currentPage]);

    const handlePayment = (trackCode) => {
        router.push(`/profile/orders?trackCode=${trackCode}`);
    };

    const handleTabChange = (event, newValue) => {
        setLastStatus(newValue);
        setLastPage(1);
        setLoading(true);
        router.push(`/profile/orders?statusId=${newValue}&page=1`);
    };

    const handlePageChange = (event, page) => {
        setLastPage(page);
        setLoading(true);
        router.push(`/profile/orders?statusId=${currentStatus}&page=${page}`);
    };

    const handleViewDetails = (trackCode) => {
        setLastStatus(currentStatus);
        setLastPage(currentPage);
        setLoading(true);
        router.push(`/profile/orders?id=${trackCode}`);
    };

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
            <div id="orders-top" className="bg-white rounded-xl p-6 shadow-lg z-50 relative">
                <h2 className="text-xl font-bold text-gray-800 mb-6">تاریخچه سفارشات من</h2>
                
                <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '4px' }}>
                    <StyledTabs
                        value={currentStatus}
                        onChange={handleTabChange}
                        aria-label="order status tabs"
                    >
                        {Object.entries(ORDER_STATUS_TITLES).map(([statusId, title]) => {
                            const Icon = ORDER_STATUS_ICONS[parseInt(statusId)];
                            return (
                                <StyledTab
                                    key={statusId}
                                    value={parseInt(statusId)}
                                    label={title}
                                    icon={<Icon className="text-lg" />}
                                    iconPosition="start"
                                />
                            );
                        })}
                    </StyledTabs>
                </Box>

                <div className="space-y-6 mt-6">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
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
                                    <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-bold text-gray-800">سفارش {order.trackCode}</h3>
                                            {order.payable && (
                                                <button
                                                    className="flex items-center gap-2 bg-[#d1182b] text-white px-6 py-2.5 rounded-lg hover:bg-[#40768c] transition-colors cursor-pointer shadow-sm hover:shadow-md"
                                                    onClick={() => handlePayment(order.trackCode)}
                                                >
                                                    <FaCreditCard className="text-lg" />
                                                    <span>پرداخت سفارش</span>
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <div className="space-y-3">
                                                <div className="flex justify-start items-center">
                                                    <FaShoppingBag className="text-[#d1182b] ml-2" />
                                                    <span className="text-gray-600">شماره سفارش:</span>
                                                    <span className="font-medium text-[#d1182b] mr-2">{order.trackCode}</span>
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
                                                    <span className={`font-medium mr-2 ${order.paymentStatus === 1 ? 'text-green-600' : 'text-red-600'}`}>
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
                                                    <span className="text-gray-600">وضعیت سفارش:</span>
                                                    <span className={`font-medium mr-2 ${order.status === 1 ? 'text-yellow-600' :
                                                            order.status === 2 ? 'text-blue-600' :
                                                                order.status === 3 ? 'text-green-600' :
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

                                        <div className="mt-6 pt-4 border-t border-gray-200">
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => handleViewDetails(order.trackCode)}
                                                    className="flex items-center gap-2 bg-[#40768c] text-white px-6 py-2.5 rounded-lg hover:bg-[#2c5266] transition-all cursor-pointer shadow-sm hover:shadow-md"
                                                >
                                                    <FaEye className="text-lg" />
                                                    <span>مشاهده جزئیات سفارش</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                            <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-lg">سفارشی در این دسته‌بندی یافت نشد</p>
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6">
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
