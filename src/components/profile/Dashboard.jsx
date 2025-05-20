"use client";
import { getdataDashboard, getRecentViews as getRecentViewsAPI } from "@/services/dashboard/dashboardService";
import { getImageUrl } from "@/utils/mainDomain";
import { getRecentViews } from "@/utils/recentViews";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    FaAddressBook,
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
    const [activeTab, setActiveTab] = useState("overview");
    const [recentViews, setRecentViews] = useState([]);
    const [dashboardData, setDashboardData] = useState({
        Record: 0,
        Pending: 0,
        Process: 0,
        Done: 0,
        Cancel: 0,
    });


    useEffect(() => {
        let isMounted = true; // برای جلوگیری از memory leak

        const fetchData = async () => {
            try {
                const user = Cookies.get("user");
                if (!user) return;

                const token = JSON.parse(user).token;

                // دریافت داده‌های داشبورد
                const data = await getdataDashboard(token);
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
            isMounted = false; // cleanup function
        };
    }, []); // فقط یکبار اجرا می‌شود

    const stats = [
        {
            title: "در انتظار پرداخت",
            value: dashboardData.Pending.toString(),
            icon: FaClock,
            color: "yellow",
            change: "-3%",
            trend: "down",
        },
        {
            title: "سفارشات ثبت شده",
            value: dashboardData.Record.toString(),
            icon: FaClipboardList,
            color: "purple",
            change: "+12%",
            trend: "up",
        },
        {
            title: "سفارشات درحال پیگیری",
            value: dashboardData.Process.toString(),
            icon: FaShoppingBag,
            color: "green",
            change: "+8%",
            trend: "up",
        },
        {
            title: "سفارشات تحویل شده",
            value: dashboardData.Done.toString(),
            icon: FaBox,
            color: "blue",
            change: "+5%",
            trend: "up",
        },
        {
            title: "سفارشات لغو شده",
            value: dashboardData.Cancel.toString(),
            icon: FaTimesCircle,
            color: "red",
            change: "-2%",
            trend: "down",
        },
    ];



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
                <div className="flex items-center gap-2">
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
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    const TrendIcon = stat.trend === "up" ? FaArrowUp : FaArrowDown;

                    return (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center justify-center mb-4">
                                <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                                    <Icon className={`text-${stat.color}-500 text-5xl`} />
                                </div>
                                {/* <div
                                    className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"
                                        }`}
                                >
                                    <TrendIcon className="text-xs" />
                                    <span>{stat.change}</span>
                                </div> */}
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
                                                    src={getImageUrl(item.image)}
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
                                    className="text-[#d1182b] text-sm hover:underline"
                                >
                                    مشاهده همه
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {recentFavorites.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800 mb-1">
                                                {item.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {item.price} تومان
                                            </p>
                                        </div>
                                    </div>
                                ))}
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
                                href="/profile/addresses/new"
                                className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <FaAddressBook />
                                <span>افزودن آدرس</span>
                            </Link>
                            <Link
                                href="/profile/account"
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
