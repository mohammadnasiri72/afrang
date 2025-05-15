"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authServiceSignOut } from "@/services/Auth/authService";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';
import {
    FaHome,
    FaShoppingBag,
    FaUser,
    FaHeart,
    FaAddressBook,
    FaSignOutAlt,
    FaChevronLeft,
    FaChevronRight,
    FaSpinner,
    FaBuilding
} from 'react-icons/fa';

const menuItems = [
    { id: 'dashboard', title: 'داشبورد', icon: FaHome, path: '/profile/dashboard' },
    { id: 'orders', title: 'سفارشات من', icon: FaShoppingBag, path: '/profile/orders' },
    { id: 'addresses', title: 'آدرس‌های من', icon: FaAddressBook, path: '/profile/addresses' },
    { id: 'legal', title: 'اطلاعات حقوقی', icon: FaBuilding, path: '/profile/legal' },
];

const generateRandomUserId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export default function ProfileLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [user, setUser] = useState(null);
    const pathname = usePathname();
    const router = useRouter();

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
    };

    useEffect(() => {
        const userCookie = Cookies.get("user");

        if (!userCookie) {
            resetUserCookie();
            router.push("/");
            return;
        }

        try {
            const cleanCookie = userCookie.trim();

            if (!cleanCookie) {
                throw new Error("Empty cookie value");
            }

            const parsedUser = JSON.parse(cleanCookie);
            
            // اگر توکن خالی بود، کوکی رو ریست کن
            if (!parsedUser.token) {
                resetUserCookie();
                router.push("/");
                return;
            }
            
            setUser(parsedUser);
        } catch (error) {
            console.error("Error details:", {
                error: error.message,
                cookieValue: userCookie,
                cookieType: typeof userCookie
            });
            resetUserCookie();
            router.push("/");
        }
    }, []);

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

    // اگر کاربر وجود نداشت، چیزی رندر نکن
    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#f6f6f6] flex">
            {/* Sidebar */}
            <aside className={`
                sticky top-10 h-screen w-64 bg-white shadow-lg z-40 flex-shrink-0
                transform transition-transform duration-300 ease-in-out lg:block hidden
            `}>
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">پنل کاربری</h2>
                            {/* <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden text-gray-600 hover:text-gray-800"
                            >
                                {isSidebarOpen ? <FaChevronRight /> : <FaChevronLeft />}
                            </button> */}
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