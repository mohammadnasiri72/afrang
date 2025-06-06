"use client";
import { getLikes, postLike } from "@/services/UserActivity/UserActivityService";
import { getItemByIds } from "@/services/Item/item";
import { getImageUrl, getImageUrl2 } from "@/utils/mainDomain";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import ConfirmModal from "@/components/CompeletePay/ConfirmModal";
import Swal from "sweetalert2";

const FavoritesSkeleton = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4 z-50 relative">
            {[...Array(12)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                    {/* Image Skeleton */}
                    <div className="aspect-square w-full bg-gray-200 animate-pulse" />
                    
                    {/* Content Skeleton */}
                    <div className="p-3 flex-1 flex flex-col">
                        {/* Title Skeleton */}
                        <div className="space-y-2 flex-1">
                            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                        </div>
                        
                        {/* Category Skeleton */}
                        <div className="h-3 bg-gray-200 animate-pulse rounded w-1/3 mt-2" />
                        
                        {/* Button Skeleton */}
                        <div className="h-7 bg-gray-200 animate-pulse rounded w-full mt-3" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default function FavoritesList() {
    const [likedItems, setLikedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRemoving, setIsRemoving] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);

    console.log(likedItems);

    // Toast notification setup
    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: "toast-modal",
    });

    const fetchLikedItems = async () => {
        try {
            const user = Cookies.get("user");
            if (!user) return;

            const token = JSON.parse(user).token;
            const response = await getLikes(20, token);

            if (response && response.length > 0) {
                const formattedData = {
                    ids: response
                };
                const itemsData = await getItemByIds(formattedData, token);
                setLikedItems(itemsData);
            } else {
                setLikedItems([]);
            }
        } catch (error) {
            console.error('Error fetching liked items:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLikedItems();
    }, []);

    const handleRemoveClick = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        setItemToRemove(item);
    };

    const handleConfirmRemove = async () => {
        if (!itemToRemove) return;

        setIsRemoving(true);
        try {
            const user = Cookies.get("user");
            if (!user) return;

            const token = JSON.parse(user).token;
            await postLike(itemToRemove.id, token);
            await fetchLikedItems();
            
            Toast.fire({
                icon: "success",
                text: "محصول با موفقیت از علاقه‌مندی‌ها حذف شد",
                customClass: {
                    container: "toast-modal",
                },
            });
        } catch (error) {
            Toast.fire({
                icon: "error",
                text: error.response?.data || "مشکلی در حذف محصول پیش آمده است",
                customClass: {
                    container: "toast-modal",
                },
            });
        } finally {
            setIsRemoving(false);
            setItemToRemove(null);
        }
    };

    if (isLoading) {
        return <FavoritesSkeleton />;
    }

    return (
        <div className="space-y-6">
            {likedItems && likedItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4 z-50 relative">
                    {likedItems
                    .filter(item => item.url !== null)
                    .map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
                        >
                            <Link
                                href={item.url}
                                className="flex-1"
                            >
                                <div className="aspect-square w-full bg-gray-100 relative overflow-hidden">
                                    {item.image && (
                                        <img
                                            src={item.url.includes('product') ? getImageUrl2(item.image) : getImageUrl(item.image)}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    )}
                                </div>
                                <div className="p-3 flex-1 flex flex-col">
                                    <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 text-sm hover:text-[#d1182b] transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <div className="text-xs text-gray-400">
                                        {item.categoryTitle}
                                    </div>
                                </div>
                            </Link>
                            <div className="p-3 pt-0 mt-auto">
                                <button
                                    onClick={(e) => handleRemoveClick(e, item)}
                                    className="w-full flex items-center justify-center gap-1 text-red-500 hover:text-red-600 transition-colors text-xs border border-red-200 hover:border-red-300 rounded px-2 py-1.5 cursor-pointer"
                                >
                                    <FaTrash className="text-xs" />
                                    <span>حذف از علاقه‌مندی‌ها</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <FaHeart className="text-4xl text-gray-300" />
                        <h3 className="text-lg font-medium text-gray-800">هنوز محصولی به علاقه‌مندی‌ها اضافه نشده است</h3>
                        <p className="text-gray-500">محصولات مورد علاقه خود را اینجا ذخیره کنید</p>
                        <Link
                            href="/"
                            className="mt-4 px-6 py-2 bg-[#d1182b] text-white rounded-lg hover:bg-[#d1182b]/90 transition-colors"
                        >
                            مشاهده محصولات
                        </Link>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={!!itemToRemove}
                onClose={() => setItemToRemove(null)}
                onConfirm={handleConfirmRemove}
                title="حذف از علاقه‌مندی‌ها"
                message="آیا از حذف این محصول از لیست علاقه‌مندی‌ها اطمینان دارید؟"
                isLoading={isRemoving}
            />
        </div>
    );
} 