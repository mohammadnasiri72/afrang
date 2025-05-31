"use client";
import { authServiceSignOut } from "@/services/Auth/authService";
import { getWalletUser } from '@/services/dashboard/dashboardService';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    FaAddressBook,
    FaBuilding,
    FaHome,
    FaShoppingBag,
    FaSignOutAlt,
    FaSpinner,
    FaKey,
    FaUser,
    FaHeart
} from 'react-icons/fa';
import Swal from "sweetalert2";
import { fetchUserProfile, selectUser, selectUserStatus, setUser } from '@/redux/slices/userSlice';
import Loading from '@/components/Loading';

const menuItems = [
    { id: 'dashboard', title: 'داشبورد', icon: FaHome, path: '/profile/dashboard' },
    { id: 'edit-profile', title: 'ویرایش پروفایل', icon: FaUser, path: '/profile/edit-profile' },
    { id: 'orders', title: 'سفارشات من', icon: FaShoppingBag, path: '/profile/orders' },
    { id: 'favorites', title: 'علاقه‌مندی‌های من', icon: FaHeart, path: '/profile/favorites' },
    { id: 'addresses', title: 'آدرس‌های من', icon: FaAddressBook, path: '/profile/addresses' },
    { id: 'legal', title: 'اطلاعات حقوقی', icon: FaBuilding, path: '/profile/legal' },
    { id: 'change-password', title: 'تغییر رمز عبور', icon: FaKey, path: '/profile/change-password' },
];

const generateRandomUserId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export default function ProfileLayout({ children }) {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [walletBalance, setWalletBalance] = useState(null);
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);    

    // import sweet alert 2
    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: "toast-modal",
    });

    const resetUserCookie = () => {
        const initialData = {
            token: "",
            refreshToken: "",
            expiration: "",
            userId: generateRandomUserId(),
            displayName: "",
            roles: [],
        };
        Cookies.set("user", JSON.stringify(initialData), { expires: 7, path: "/" });
        dispatch(setUser(initialData));
    };

    useEffect(() => {
        if (!user || !user.token) {
            resetUserCookie();
            router.push("/");
            return;
        }

        // Fetch user profile
        dispatch(fetchUserProfile());

        // Fetch wallet balance
        const fetchWalletBalance = async () => {
            try {
                const balance = await getWalletUser(user.token);
                setWalletBalance(balance);
            } catch (error) {
                console.error('خطا در دریافت موجودی کیف پول:', error);
            }
        };

        fetchWalletBalance();
    }, [user?.token, dispatch]);

    const LogoutHandler = async () => {
        if (isLoggingOut || !user) {
            return;
        }

        setIsLoggingOut(true);
        try {
            await authServiceSignOut.signOut(user.token);
            resetUserCookie();
            router.push("/");
        } catch (err) {
            console.error("Logout error details:", {
                error: err,
                response: err.response?.data,
                user: user
            });
            Toast.fire({
                icon: "error",
                text: err.response?.data ? err.response?.data : "خطای شبکه",
                customClass: {
                    container: "toast-modal",
                },
            });
        } finally {
            setIsLoggingOut(false);
        }
    };
    
    if (!user || !user.token || userStatus === 'loading') {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-[#f6f6f6] flex">
            {/* Sidebar */}
            <aside className={`
                sticky top-10 h-screen w-64 bg-white shadow-lg z-40 flex-shrink-0
                transform transition-transform duration-300 ease-in-out lg:block hidden
            `}>
                <div className="h-full flex flex-col">
                    {/* بخش اطلاعات کاربر */}
                    <div className="p-4 border-b">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                {user?.avatar ? (
                                    <img 
                                        src={user.avatar} 
                                        alt={`${user?.displayName.slice(0, 1)}`} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-sm">
                                        {user?.displayName?.charAt(0) || '?'}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h2 className="text-sm font-bold text-gray-800 truncate">{user?.displayName}</h2>
                                <p className="text-xs text-gray-500 truncate">{user?.userId}</p>
                            </div>
                        </div>
                        <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">کیف پول:</span>
                                <span className="font-bold text-[#d1182b]">
                                    {walletBalance !== null ? `${walletBalance.toLocaleString()} تومان` : 'در حال بارگذاری...'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.path;

                            return (
                                <Link
                                    key={item.id}
                                    href={item.path}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                        ${isActive
                                            ? 'bg-[#d1182b] text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    <Icon className="text-lg" />
                                    <span>{item.title}</span>
                                </Link>
                            );
                        })}
                        <div className="">
                            <button
                                onClick={LogoutHandler}
                                disabled={isLoggingOut}
                                className={`
                                    w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg 
                                    transition-colors cursor-pointer
                                    ${isLoggingOut
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'text-red-600 hover:bg-red-50'
                                    }
                                `}
                            >
                                {isLoggingOut ? (
                                    <>
                                        <FaSpinner className="text-lg animate-spin" />
                                        <span>در حال خروج...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaSignOutAlt className="text-lg" />
                                        <span>خروج از حساب</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-h-screen">
                <div className="p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
} 