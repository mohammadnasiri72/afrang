"use client";
import ConfirmModal from "@/components/CompeletePay/ConfirmModal";
import { getItemByIds } from "@/services/Item/item";
import {
  getLikes,
  postLike,
} from "@/services/UserActivity/UserActivityService";
import { getImageUrl } from "@/utils/mainDomain";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const FavoritesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
        >
          <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-lg" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 !mb-2" />
            <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2" />
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
          ids: response,
        };
        const itemsData = await getItemByIds(formattedData, token);
        setLikedItems(itemsData);
      } else {
        setLikedItems([]);
      }
    } catch (error) {
      console.error("Error fetching liked items:", error);
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
        text: "آیتم با موفقیت از علاقه‌مندی‌ها حذف شد",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: error.response?.data || "مشکلی در حذف آیتم پیش آمده است",
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
    <>
      <div className="space-y-6">
        {likedItems && likedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {likedItems
              .filter((item) => item.url !== null)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg z-50 relative"
                >
                  <Link href={item.url}>
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={
                          item.url.includes("product")
                            ? getImageUrl(item.image)
                            : getImageUrl(item.image) || "/images/blog-img1.jpg"
                        }
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex-1">
                    <Link href={item.url}>
                      <p className="font-medium text-gray-800 !mb-1 hover:text-[#d1182b] transition-colors duration-300 line-clamp-3">
                        {item.title}
                      </p>
                    </Link>
                    <div className="flex flex-col items-start justify-between gap-2">
                      <div className="text-xs text-gray-400">
                        {item.categoryTitle}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleRemoveClick(e, item)}
                    className="flex items-center justify-center gap-1 !text-red-500 hover:!text-red-600 transition-colors text-xs border border-red-200 hover:border-red-300 rounded px-2 py-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <FaTrash className="text-xs" />
                    <span>حذف</span>
                  </button>
                </div>
              ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <FaHeart className="text-4xl text-gray-300" />
              <h3 className="text-lg font-medium text-gray-800">
                هنوز محصولی به علاقه‌مندی‌ها اضافه نشده است
              </h3>
              <p className="text-gray-500">
                محصولات مورد علاقه خود را اینجا ذخیره کنید
              </p>
              <Link
                href="/"
                className="mt-4 px-6 py-2 bg-[#d1182b] !text-white rounded-lg hover:bg-[#d1182b]/90 transition-colors"
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
          message="آیا از حذف این آیتم از لیست علاقه‌مندی‌ها اطمینان دارید؟"
          isLoading={isRemoving}
        />
      </div>
    </>
  );
}
