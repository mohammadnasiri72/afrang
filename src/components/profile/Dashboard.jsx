"use client";
import { getdataDashboard, getRecentViews as getRecentViewsAPI } from "@/services/dashboard/dashboardService";
import { getItemByIds } from "@/services/Item/item";
import { getLikes } from "@/services/UserActivity/UserActivityService";
import { getImageUrl, getImageUrl2 } from "@/utils/mainDomain";
import { getRecentViews } from "@/utils/recentViews";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import {
    FaArrowDown,
    FaArrowUp,
    FaBox,
    FaClipboardList,
    FaClock,
    FaShoppingBag,
    FaTimesCircle,
    FaUser
} from "react-icons/fa";

export default function Dashboard() {
    const router = useRouter();
    const [dashboardData, setDashboardData] = useState({
        Record: 0,
        Pending: 0,
        Process: 0,
        Done: 0,
        Cancel: 0
    });
    const [listLiked, setListLiked] = useState([]);
    const [likedItems, setLikedItems] = useState([]);
    const [recentViews, setRecentViews] = useState([]);

    useEffect(() => {
        const user = Cookies.get("user");
        const token = JSON.parse(user).token;
        const fetchListLiked = async () => {
            const response = await getLikes(5, token);
            setListLiked(response);

            // Transform listLiked into required format and fetch items
            if (response && response.length > 0) {
                const formattedData = {
                    ids: response
                };

                const itemsData = await getItemByIds(formattedData, token);
                setLikedItems(itemsData);
            }
        }
        fetchListLiked();
    }, [])





    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const user = Cookies.get("user");
                if (!user) {
                    console.log('No user found in cookies');
                    return;
                }

                const token = JSON.parse(user).token;
                console.log('Fetching dashboard data...');

                // دریافت داده‌های داشبورد
                const data = await getdataDashboard(token);
                console.log('API Response:', data);

                if (isMounted) {
                    setDashboardData(data);
                }

                // دریافت لیست IDهای بازدید شده از localStorage
                const viewedIds = getRecentViews();

                if (viewedIds && viewedIds.length > 0) {
                    // دریافت اطلاعات محصولات از API
                    const recentViewsData = await getRecentViewsAPI({ ids: viewedIds }, token);

                    if (isMounted && Array.isArray(recentViewsData)) {
                        setRecentViews(recentViewsData);
                    }
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    const stats = [
        {
            title: "ثبت شده",
            value: dashboardData?.Record?.toString() || "0",
            icon: FaClipboardList,
            color: "purple",
            change: "+12%",
            trend: "up",
            statusId: 1
        },
        {
            title: "منتظر پردازش",
            value: dashboardData?.Pending?.toString() || "0",
            icon: FaClock,
            color: "yellow",
            change: "-3%",
            trend: "down",
            statusId: 2
        },
        {
            title: "درحال انجام",
            value: dashboardData?.Process?.toString() || "0",
            icon: FaBox,
            color: "blue",
            change: "+8%",
            trend: "up",
            statusId: 3
        },
        {
            title: "انجام شده",
            value: dashboardData?.Done?.toString() || "0",
            icon: FaShoppingBag,
            color: "green",
            change: "+5%",
            trend: "up",
            statusId: 4
        },
        {
            title: "لغو شده",
            value: dashboardData?.Cancel?.toString() || "0",
            icon: FaTimesCircle,
            color: "red",
            change: "-2%",
            trend: "down",
            statusId: 5
        },
    ];

    const handleStatClick = (statusId) => {
        router.push(`/profile/orders?statusId=${statusId}&page=1`);
    };

    const recentFavorites = [
        {
            id: 1,
            name: "لپ تاپ لنوو",
            price: "۲۵,۵۰۰,۰۰۰",
            image: "/placeholder.jpg",
        },
        {
            id: 2,
            name: "هدفون سامسونگ",
            price: "۲,۵۰۰,۰۰۰",
            image: "/placeholder.jpg",
        },
        {
            id: 3,
            name: "شارژر سریع",
            price: "۸۵۰,۰۰۰",
            image: "/placeholder.jpg",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">داشبورد</h1>
                {/* <div className="flex items-center gap-2">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "overview"
                            ? "bg-[#d1182b] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        نمای کلی
                    </button>
                    <button
                        onClick={() => setActiveTab("analytics")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "analytics"
                            ? "bg-[#d1182b] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        تحلیل و آمار
                    </button>
                </div> */}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    const TrendIcon = stat.trend === "up" ? FaArrowUp : FaArrowDown;

                    return (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
                            onClick={() => handleStatClick(stat.statusId)}
                        >
                            <div className="flex items-center justify-center mb-4">
                                <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                                    <Icon className={`text-${stat.color}-500 text-5xl`} />
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mb-1 text-center">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-800 text-center">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Views */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">
                                آخرین بازدیدها
                            </h3>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.isArray(recentViews) && recentViews.length > 0 ? (
                                recentViews.map((item) => (
                                    <Link
                                        href={item.url}
                                        key={item.productId}
                                        className="group bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="aspect-square w-full bg-white relative overflow-hidden">
                                            {item.image && (
                                                <img
                                                    src={getImageUrl2(item.image)}
                                                    alt={item.title}
                                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                />
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">
                                                {item.title}
                                            </h4>
                                            <div className="flex flex-col items-start justify-between gap-2">
                                                <div className="text-xs text-gray-400">
                                                    {item.categoryTitle}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {item.finalPrice > 0 ? (
                                                        <span className="text-[#d1182b] font-bold">
                                                            {item.finalPrice.toLocaleString()} تومان
                                                        </span>
                                                    ) : (
                                                        'تماس بگیرید'
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 col-span-full">
                                    هنوز محصولی بازدید نشده است
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Favorites & Quick Actions */}
                <div className="space-y-6">
                    {/* Favorites */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-6 border-b">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    آخرین علاقه‌مندی‌ها
                                </h3>
                                <Link 
                                    href="/profile/favorites" 
                                    className="text-sm text-[#d1182b] hover:text-[#d1182b]/80 transition-colors"
                                >
                                    مشاهده همه
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {likedItems && likedItems.length > 0 ? (
                                    likedItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                                        >
                                            <Link href={item.url} target="_blank">
                                                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                                                    {item.image && (
                                                        <img
                                                            src={item.url.includes('product') ? getImageUrl2(item.image) : getImageUrl(item.image)}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                            </Link>
                                            <div className="flex-1">
                                                <Link href={item.url} target="_blank">
                                                    <p className="font-medium text-gray-800 mb-1 hover:text-[#d1182b] transition-colors duration-300 line-clamp-2">
                                                        {item.title}
                                                    </p>
                                                </Link>

                                                <div className="flex flex-col items-start justify-between gap-2">
                                                    <div className="text-xs text-gray-400">
                                                        {item.categoryTitle}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">
                                        هنوز محصولی به علاقه‌مندی‌ها اضافه نشده است
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            دسترسی سریع
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                href="/profile/orders"
                                className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <FaShoppingBag />
                                <span>سفارشات من</span>
                            </Link>
                            <Link
                                href="/profile/edit-profile"
                                className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <FaUser />
                                <span>ویرایش پروفایل</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
