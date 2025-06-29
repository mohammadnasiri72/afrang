"use client";

import { getUserCookie } from "@/utils/cookieUtils";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import {
  postLike,
  postLiked,
} from "@/services/UserActivity/UserActivityService";
import { Spin, message } from "antd";
import { useRouter } from "next/navigation";

const LikeComponent = ({ blog }) => {
  const [token, setToken] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const userData = getUserCookie();
    setToken(userData?.token || null);
  }, []);

  useEffect(() => {
    if (token) {
      checkLikeStatus();
    }
  }, [token]);

  const checkLikeStatus = async () => {
    try {
      const response = await postLiked(blog.id, token);
      setIsLiked(response);
      setLikeCount(blog.likeCount || 0);
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  const handleLike = async () => {
    if (!token) {
      // ذخیره مسیر فعلی در localStorage
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const response = await postLike(blog.id, token);
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

      message.success({
        content: isLiked
          ? "خبر از علاقه‌مندی‌ها حذف شد"
          : "خبر به علاقه‌مندی‌ها اضافه شد",
        duration: 3,
        className: "custom-success-message",
      });
    } catch (error) {
      message.error({
        content: error.response?.data || "خطای شبکه",
        duration: 3,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <button
          onClick={handleLike}
          disabled={isLoading}
          className="flex items-center cursor-pointer"
        >
          {isLoading ? (
            <Spin size="small" />
          ) : (
            <FaHeart
              className={`text-xl ${
                isLiked ? "text-[#d1182b]" : "text-[#40768c88]"
              }`}
            />
          )}
          <span className="px-2 text-[#18304a]">پسندیدم</span>
        </button>
        <span className="text-[#18304a]">|</span>
        <span className="px-2 text-[#18304a]">
          تعداد پسندیده شده ها:{" "}
          {Number(blog.score) < 0
            ? 0
            : isLiked
            ? Number(blog.score) + 1
            : blog.score}
        </span>
      </div>
    </>
  );
};

export default LikeComponent;
