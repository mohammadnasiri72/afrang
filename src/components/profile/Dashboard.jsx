"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaShoppingBag, FaHeart, FaBox, FaClock, FaChartLine, FaArrowUp, FaArrowDown, FaAddressBook, FaUser } from 'react-icons/fa';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        { 
            title: 'سفارشات فعال', 
            value: '2', 
            icon: FaShoppingBag, 
            color: 'red',
            change: '+12%',
            trend: 'up'
        },
        { 
            title: 'سفارشات تحویل شده', 
            value: '5', 
            icon: FaBox, 
            color: 'blue',
            change: '+8%',
            trend: 'up'
        },
        { 
            title: 'در انتظار پرداخت', 
            value: '1', 
            icon: FaClock, 
            color: 'yellow',
            change: '-3%',
            trend: 'down'
        },
        { 
            title: 'علاقه‌مندی‌ها', 
            value: '8', 
            icon: FaHeart, 
            color: 'green',
            change: '+5%',
            trend: 'up'
        },
    ];

    const recentOrders = [
        {
            id: '12345',
            status: 'در حال پردازش',
            amount: '۲,۵۰۰,۰۰۰',
            date: '۱۴۰۲/۱۲/۱۵',
            items: 3
        },
        {
            id: '12344',
            status: 'تحویل داده شده',
            amount: '۱,۸۰۰,۰۰۰',
            date: '۱۴۰۲/۱۲/۱۰',
            items: 2
        },
        {
            id: '12343',
            status: 'در انتظار پرداخت',
            amount: '۳,۲۰۰,۰۰۰',
            date: '۱۴۰۲/۱۲/۰۸',
            items: 4
        }
    ];

    const recentFavorites = [
        {
            id: 1,
            name: 'لپ تاپ لنوو',
            price: '۲۵,۵۰۰,۰۰۰',
            image: '/placeholder.jpg'
        },
        {
            id: 2,
            name: 'هدفون سامسونگ',
            price: '۲,۵۰۰,۰۰۰',
            image: '/placeholder.jpg'
        },
        {
            id: 3,
            name: 'شارژر سریع',
            price: '۸۵۰,۰۰۰',
            image: '/placeholder.jpg'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">داشبورد</h1>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === 'overview'
                                ? 'bg-[#d1182b] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        نمای کلی
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === 'analytics'
                                ? 'bg-[#d1182b] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        تحلیل و آمار
                    </button>
                </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    const TrendIcon = stat.trend === 'up' ? FaArrowUp : FaArrowDown;
                    
                    return (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                                    <Icon className={`text-${stat.color}-500 text-xl`} />
                                </div>
                                <div className={`flex items-center gap-1 text-sm ${
                                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                }`}>
                                    <TrendIcon className="text-xs" />
                                    <span>{stat.change}</span>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">سفارشات اخیر</h3>
                            <Link 
                                href="/profile/orders"
                                className="text-[#d1182b] text-sm hover:underline"
                            >
                                مشاهده همه
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-gray-800">سفارش #{order.id}</p>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                order.status === 'در حال پردازش' 
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : order.status === 'تحویل داده شده'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-yellow-100 text-yellow-600'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>{order.date}</span>
                                            <span>{order.items} کالا</span>
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[#d1182b] font-medium">{order.amount} تومان</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Favorites & Quick Actions */}
                <div className="space-y-6">
                    {/* Favorites */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-6 border-b">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">آخرین علاقه‌مندی‌ها</h3>
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
                                    <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800 mb-1">{item.name}</p>
                                            <p className="text-sm text-gray-500">{item.price} تومان</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">دسترسی سریع</h3>
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