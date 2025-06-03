"use client";

import { Pagination, Rate, message, Spin } from "antd";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaEye, FaRegUser, FaTelegram } from "react-icons/fa6";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { LuCalendarRange } from "react-icons/lu";
import Container from "../container";
import BoxImageGallery from "./BoxImageGallery";
import { getImageUrl } from "@/utils/mainDomain";
import Image from "next/image";
import moment from "moment-jalaali";
import { getItem, itemVisit } from '@/services/Item/item';
import { getUserCookie } from "@/utils/cookieUtils";
import { postLike, postLiked } from "@/services/UserActivity/UserActivityService";
import { useRouter } from "next/navigation";

// import required modules
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

Fancybox.defaults.Keyboard = {
  Escape: "close", // کلید ESC گالری را ببندد
  ArrowRight: "next", // کلید پیکان راست به تصویر بعدی برود
  ArrowLeft: "prev", // کلید پیکان چپ به تصویر قبلی برود
};

Fancybox.bind("[data-fancybox='gallery']", {
  Animation: {
    duration: 500, // مدت زمان انیمیشن
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1)", // انیمیشن نرم
  },

  Toolbar: true,
  Buttons: true,
  Thumbs: {
    autoStart: true, // شروع خودکار نمایش تصاویر کوچک
  },
  dragToClose: true, // امکان کشیدن تصویر برای بستن
});

function BodyGallery({ ImagesData }) {
  const [liked, setLiked] = useState(false);
  const [imgSelected, setImgSelected] = useState(ImagesData?.[0] || null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageImages, setNextPageImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImageVisit = async (id) => {
    const url = window.location.href;
    const userAgent = navigator.userAgent;
    
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      const ip = data.ip;
      itemVisit(id, url, ip, userAgent);
    } catch (error) {
      console.error('Error fetching IP:', error);
    }
  };

  useEffect(() => {
    const userData = getUserCookie();
    setToken(userData?.token || null);
  }, []);

  useEffect(() => {
    if (token && imgSelected) {
      checkLikeStatus();
      handleImageVisit(imgSelected.id);
    }
  }, [token, imgSelected]);

  const checkLikeStatus = async () => {
    try {
      const response = await postLiked(imgSelected.id, token);
      setLiked(response);
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  const handleLike = async () => {
    if (!token) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      const response = await postLike(imgSelected.id, token);
      setLiked(!liked);
      
      message.success({
        content: liked ? "تصویر از علاقه‌مندی‌ها حذف شد" : "تصویر به علاقه‌مندی‌ها اضافه شد",
        duration: 3,
        className: 'custom-success-message'
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

  const fetchNextPage = async (page) => {
    try {
      setLoading(true);
      const nextPageData = await getItem({
        TypeId: 9,
        LangCode: 'fa',
        OrderBy: 9,
        PageSize: 16,
        PageIndex: page + 1 // صفحه اول: 2 (آیتم‌های 17-32)، صفحه دوم: 3 (آیتم 33)
      });
      
      if (nextPageData && nextPageData.length > 0) {
        setNextPageImages(nextPageData);
        
        // استفاده از total از خود آبجکت دیتا
        if (nextPageData[0]?.total) {
          const totalItems = nextPageData[0].total - 16; // کم کردن 16 آیتم اول
          setTotalItems(totalItems);
        }
      }
    } catch (error) {
      console.error('Error fetching next page:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNextPage(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatPersianDate = (dateString) => {
    try {
      const persianMonths = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
      ];
      
      const date = moment(dateString);
      const day = date.jDate();
      const month = persianMonths[date.jMonth()];
      const year = date.jYear();
      
      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'نامشخص';
    }
  };

  const handleNext = () => {
    const currentIndex = ImagesData.findIndex(
      (obj) => obj.id === imgSelected.id
    );
    const nextIndex = (currentIndex + 1) % ImagesData.length;
    setImgSelected(ImagesData[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = ImagesData.findIndex(
      (obj) => obj.id === imgSelected.id
    );
    const prevIndex = (currentIndex - 1 + ImagesData.length) % ImagesData.length;
    setImgSelected(ImagesData[prevIndex]);
  };

  console.log(ImagesData);
  

  return (
    <>
      <Container>
        <div className="flex lg:flex-nowrap flex-wrap gap-3">
          <div className="rounded-sm bg-white p-4 flex items-center lg:w-5/12 w-full">
            {ImagesData?.map((item) => (
              <a
                key={item.id}
                className={item.id === imgSelected?.id ? 'w-full' : 'hidden'}
                href={getImageUrl(item.image)}
                data-fancybox="gallery"
                data-caption={item.title}
              >
                <div className="relative w-full h-[400px]">
                  <Image
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </a>
            ))}
          </div>
          <div className="rounded-sm bg-white p-4  lg:w-7/12 w-full relative">
            <div className="flex flex-wrap sm:flex-nowrap justify-between px-2 items-center sm:mt-3 mt-0 sm:flex-row flex-col-reverse">
              <h3 className="flex font-semibold text-[20px] sm:w-auto w-full sm:justify-start justify-center text-center sm:mt-0 mt-3">
                عکس های برتر بر اساس لایک کاربران
              </h3>
              <div
                onClick={handleLike}
                className="bg-[#d1182b] rounded-sm px-3 py-1 flex items-center text-white cursor-pointer mr-auto sm:mr-0"
              >
                {isLoading ? (
                  <Spin size="small" />
                ) : (
                  <>
                    {liked ? (
                      <IoMdHeart className="text-lg" />
                    ) : (
                      <IoMdHeartEmpty className="text-lg" />
                    )}
                    <span className="text-xl font-semibold pr-1">{imgSelected?.score || 0}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex sm:flex-row flex-col justify-center sm:justify-start sm:gap-3 gap-0 items-center sm:flex-nowrap flex-wrap mt-5">
              <img className="w-10" src="/images/logo.png" alt="" />
              <span className="font-semibold text-lg sm:py-0 py-4">
                امتیاز تیم افرنگ به این عکس :
              </span>
              <Rate
                style={{ direction: "ltr", color: "#18d1be" }}
                defaultValue={2}
              />
            </div>
            <div className="flex flex-wrap sm:flex-nowrap items-center mt-5 gap-7">
              <div className="flex items-center gap-2 sm:w-auto w-full">
                <FaEye className="text-[#444]" />
                <span className="text-[#444]">بازدیدکنندگان :</span>
                <span className="font-semibold text-[16px]"> {imgSelected?.visit || 0} نفر </span>
              </div>
              <div className="flex items-center gap-2 sm:w-auto w-full">
                <FaRegUser className="text-[#444]" />
                <span className="text-[#444]">فرستنده :</span>
                <span className="font-semibold text-[16px]"> {imgSelected?.title || 'نامشخص'}</span>
              </div>
              <div className="flex items-center gap-2 sm:w-auto w-full">
                <LuCalendarRange className="text-[#444]" />
                <span className="text-[#444]">زمان عکاسی :</span>
                <span className="font-semibold text-[16px]">{imgSelected?.created ? formatPersianDate(imgSelected.created) : 'نامشخص'}</span>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <span className="text-[#312e42] text-[14px]">دسته‌بندی :</span>
              <span className="font-bold">{imgSelected?.categoryTitle || 'نامشخص'}</span>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap justify-between px-2 items-center mt-10">
              <div className="flex items-center gap-3 sm:w-auto w-full sm:justify-start justify-between">
                <div
                  onClick={handleLike}
                  className="flex items-center rounded-sm bg-[#f9e3e5] text-[#d1182b] px-3 py-3 cursor-pointer duration-300 hover:bg-[#d1182b] hover:text-[#fff]"
                >
                  {isLoading ? (
                    <Spin size="small" />
                  ) : (
                    <>
                      {liked ? (
                        <IoMdHeart className="text-lg" />
                      ) : (
                        <IoMdHeartEmpty className="text-lg" />
                      )}
                      <span className="whitespace-nowrap pr-1 font-bold text-sm">
                        لایک
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center rounded-sm bg-[#18d1be] text-white px-3 py-3 cursor-pointer duration-300 hover:bg-[#40768c]">
                  <FaTelegram className="text-lg" />
                  <span className="whitespace-nowrap pr-2 font-semibold text-sm">
                    ارسال تصویر
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center sm:w-auto w-full sm:mt-0 mt-5 sm:justify-start justify-between">
                <div
                  onClick={handlePrev}
                  className="bg-[#f9e3e5] p-3 rounded-sm cursor-pointer -rotate-90 hover:bg-[#b6ede8] duration-300"
                >
                  <img src="/images/icons/Arrow-Down.png" alt="" />
                </div>
                <div
                  onClick={handleNext}
                  className="bg-[#f9e3e5] p-3 rounded-sm cursor-pointer rotate-90 hover:bg-[#b6ede8] duration-300"
                >
                  <img src="/images/icons/Arrow-Down.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          {ImagesData?.map((item) => (
            <div
              key={item.id}
              className="lg:w-[12.5%] md:w-1/6 sm:w-1/3 w-1/2 p-2"
            >
              <div
                onClick={() => {
                  setImgSelected(item);
                }}
                className={`bg-white rounded-sm border-4 shadow-lg cursor-pointer ${
                  imgSelected?.id === item.id
                    ? "border-[#d1182b]"
                    : "border-white"
                }`}
              >
                <div className="relative w-full h-[150px]">
                  <Image
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sm:px-4 mt-20">
          <div className="sm:hidden flex justify-center items-center pb-10">
            <div className="sm:hidden flex items-center title-newProduct relative">
              <h2 className="font-semibold text-xl">
                تصاویری که بیشترین لایک را داشته اند
              </h2>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="sm:flex hidden items-center title-newProduct relative">
              <h2 className="font-semibold text-xl">
                تصاویری که بیشترین لایک را داشته اند
              </h2>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mt-10">
          {nextPageImages.map((item) => (
            <BoxImageGallery key={item.id} imageData={item} />
          ))}
        </div>
        <div className="my-10 z-50 relative">
          <Pagination
            style={{ direction: "ltr" }}
            align="center"
            current={currentPage}
            onChange={handlePageChange}
            total={totalItems}
            pageSize={16}
            showSizeChanger={false}
            loading={loading}
          />
        </div>
      </Container>
    </>
  );
}

export default BodyGallery;
