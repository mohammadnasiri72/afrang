"use client";

import {
  postLike,
  postLiked,
} from "@/services/UserActivity/UserActivityService";
import { Button, message } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeProduct = ({ productId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const user = Cookies.get("user");
        const token = JSON.parse(user).token;
        if (!token) {
          setIsInitialLoading(false);
          return;
        }

        const response = await postLiked(productId, token);
        setLiked(response);
      } catch (error) {
        console.error("Error checking like status:", error);
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
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
        router.push("/login");
        return;
      }

      setIsLoading(true);
      await postLike(productId, token);

      setLiked(!liked);

      message.success({
        content: (
          <div className="flex items-center gap-2">
            <span>
              {liked
                ? "محصول از علاقه‌مندی‌ها حذف شد"
                : "محصول به علاقه‌مندی‌ها اضافه شد"}
            </span>
            {!liked && (
              <Link
                href="/profile/favorites"
                style={{ color: "#d1182b" }}
                className="hover:text-red-700"
              >
                مشاهده همه
              </Link>
            )}
          </div>
        ),
        duration: 5,
        className: "custom-success-message",
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
    <>
      <div className="w-full">
        <Button
          onClick={handleLike}
          className={`
               flex w-full items-center cursor-pointer py-1 px-1 rounded-lg transition-all duration-300
               ${
                 liked
                   ? "bg-red-200 text-gray-700 hover:bg-red-300"
                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
               }
             `}
          title={!liked ? "افزودن به علاقه‌مندی‌ها" : "حذف از علاقه‌مندی‌ها"}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-[#d1182b]"></div>
          ) : liked ? (
            <FaHeart className=" text-[#d1182b]" />
          ) : (
            <FaRegHeart className="" />
          )}
          <span className="whitespace-nowrap px-2 text-xs font-medium">
            {liked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          </span>
        </Button>
      </div>
    </>
  );
};

export default LikeProduct;
