"use client";

import { postLike, postLiked } from "@/services/UserActivity/UserActivityService";
import { Tooltip, message } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LikeProduct = ({ productId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [liked, setLiked] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const user = Cookies.get("user");
                if (!user) {
                    setIsInitialLoading(false);
                    return;
                }

                const token = JSON.parse(user).token;
                const response = await postLiked(productId, token);
                setLiked(response);
            } catch (error) {
                console.error('Error checking like status:', error);
            } finally {
                setIsInitialLoading(false);
            }
        };

        checkLikeStatus();
    }, [productId]);

    const handleLike = async () => {
        try {
            const user = Cookies.get("user");
            const token = user ? JSON.parse(user).token : null;
            
            if (!token) {
                // ذخیره مسیر فعلی در localStorage
                localStorage.setItem('redirectAfterLogin', window.location.pathname);
                router.push('/login');
                return;
            }

            setIsLoading(true);
            await postLike(productId, token);
            
            setLiked(!liked);

            message.success({
                content: (
                    <div className="flex items-center gap-2">
                        <span>{liked ? "محصول از علاقه‌مندی‌ها حذف شد" : "محصول به علاقه‌مندی‌ها اضافه شد"}</span>
                        {!liked && (
                            <Link href="/profile/favorites" style={{ color: '#d1182b' }} className="hover:text-red-700">
                                مشاهده همه
                            </Link>
                        )}
                    </div>
                ),
                duration: 5,
                className: 'custom-success-message'
            });
        } catch (error) {
            message.error({
                content: error.response?.data || "خطای شبکه",
                duration: 5,
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isInitialLoading) {
        return (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-300"></div>
            </div>
        );
    }

    return (
        <Tooltip 
            title={liked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
            placement="top"
        >
            <button
                onClick={handleLike}
                disabled={isLoading}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 cursor-pointer ${
                    liked 
                        ? "bg-red-50 text-[#d1182b] hover:bg-red-100" 
                        : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#d1182b]"
                }`}
            >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#d1182b]"></div>
                ) : liked ? (
                    <FaHeart className="text-lg" />
                ) : (
                    <FaRegHeart className="text-lg" />
                )}
            </button>
        </Tooltip>
    );
};

export default LikeProduct;