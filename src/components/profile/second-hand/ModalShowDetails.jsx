"use client";

import { selectUser } from "@/redux/slices/userSlice";
import { getUserSellAdId } from "@/services/UserSellAd/UserSellAdServices";
import { getImageUrl } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import { Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function ModalShowDetails({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const user = useSelector(selectUser);

  const htmlToText = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  // افزایش z-index fancybox
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `.fancybox__container { z-index: 999999 !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // تابع باز کردن Fancybox برای کروسل عکس‌ها
  const openGallery = (idx) => {
    const images = productDetails.imageList
      .map((image) => getImageUrl(image))
      .filter(Boolean);
    Fancybox.show(
      images.map((src, i) => ({
        src,
        thumb: src,
        type: "image",
        alt: `${productDetails.title} - تصویر ${i + 1}`,
      })),
      { startIndex: idx }
    );
  };

  useEffect(() => {
    const fetchProductsSec = async () => {
      setIsLoading(true);
      try {
        const productsData = await getUserSellAdId(id, user?.token);
        if (productsData.type === "error") {
          Toast.fire({
            icon: "error",
            title: productsData.message,
          });
          return;
        }
        setProductDetails(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isModalOpen) {
      fetchProductsSec();
    }
  }, [isModalOpen]);

  return (
    <>
      <Tooltip placement="top" title={"نمایش جزئیات"} arrow={true}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="p-1.5 !text-gray-400 hover:!text-teal-500 transition-colors cursor-pointer"
        >
          <FaEye className="text-lg" />
        </button>
      </Tooltip>
      <Modal
        title={<p className="text-xl font-semibold">جزئیات آگهی</p>}
        footer={<></>}
        loading={isLoading}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        {isLoading ? (
          <div className="text-center py-8">در حال بارگذاری...</div>
        ) : (
          <div className="space-y-4">
            {/* تصویر محصول */}
            {productDetails?.imageList?.length > 0 && (
              <div className="flex">
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className="w-[150px] h-auto"
                >
                  {productDetails.imageList.map((image, index) => (
                    <SwiperSlide
                      key={index}
                      style={{ width: "150px", height: "auto" }}
                      onClick={() => openGallery(index)}
                      className="cursor-pointer"
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`${productDetails.title} - تصویر ${index + 1}`}
                        className="rounded-lg object-cover w-full h-full bg-white"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {/* عنوان و قیمت */}
            <div className="flex flex-col items-center space-y-1">
              <h2 className="text-lg font-bold">{productDetails.title}</h2>
              {productDetails.price > 0 && (
                <span className="text-teal-600 font-semibold text-base">
                  {productDetails.price?.toLocaleString()} تومان
                </span>
              )}
              {productDetails.price === 0 && (
                <span className="text-[#d1182b] font-bold text-sm">
                  توافقی (تماس بگیرید)
                </span>
              )}
              <span className="text-gray-500 text-sm">
                {productDetails.categoryTitle}
              </span>
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between bg-slate-200 px-4 py-1">
                <span className="font-medium py-1 pr-2">سریال محصول :</span>
                <span className="font-medium py-1 pr-2">
                  {productDetails.serialNumber || "–"}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-100 px-4 py-1">
                <span className="font-medium py-1 pr-2">نوع محصول :</span>
                <span className="font-medium py-1 pr-2">
                  {productDetails.type || "–"}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-200 px-4 py-1">
                <span className="font-medium py-1 pr-2">
                  تاریخ خرید محصول :
                </span>
                <span className="font-medium py-1 pr-2">
                  {productDetails.purchaseDate || "–"}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-100 px-4 py-1">
                <span className="font-medium py-1 pr-2">
                  کارکرد شاتر(فقط دوربین SLR) :
                </span>
                <span className="font-medium py-1 pr-2">
                  {productDetails.usageCount || "–"}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-200 px-4 py-1">
                <span className="font-medium py-1 pr-2">
                  مدت زمان استفاده :
                </span>
                <span className="font-medium py-1 pr-2">
                  {productDetails.usageTime || "–"}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-100 px-4 py-1">
                <span className="font-medium py-1 pr-2">وضعیت بیمه :</span>
                <span className="font-medium py-1 pr-2">
                  {productDetails.insurance
                    ? productDetails.insurance + " ماه"
                    : "–"}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-200 px-4 py-1">
                <span className="font-medium py-1 pr-2">وضعیت گارانتی :</span>
                <span className="font-medium py-1 pr-2">
                  {productDetails.warranty
                    ? productDetails.warranty + " ماه"
                    : "–"}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-100 px-4 py-1">
                <span className="font-medium py-1 pr-2">اطلاعات تماس :</span>
                <span className="font-medium py-1 pr-2">
                  {productDetails.contactInfo === 0
                    ? "نمایش ایمیل و موبایل"
                    : productDetails.contactInfo === 1
                    ? "فقط نمایش موبایل"
                    : productDetails.contactInfo === 2
                    ? "فقط نمایش ایمیل"
                    : "–"}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-200 px-4 py-1">
                <span className="font-medium py-1 pr-2">تاریخ درج آگهی :</span>
                {/* <span className="font-medium py-1 pr-2">
                  {productDetails.createdFa || "–"}
                </span> */}
                <div>
                  <span className="font-medium py-1 pr-2">
                    {productDetails?.createdFa?.split(" ").length > 0
                      ? productDetails?.createdFa?.split(" ")[0]
                      : "-"}
                  </span>
                  -
                  <span className="font-medium py-1 px-2">
                    {productDetails?.createdFa?.split(" ").length > 1
                      ? productDetails?.createdFa?.split(" ")[1]
                      : "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* وضعیت ظاهری */}
            {productDetails.appearance && (
              <div>
                <div className="font-medium mb-1">وضعیت ظاهری :</div>
                <div className="bg-gray-50 rounded p-2 text-justify text-gray-700 leading-relaxed">
                  {productDetails.appearance}
                </div>
              </div>
            )}
            {/* توضیحات بدنه */}
            {productDetails.body && (
              <div>
                <div className="font-medium mb-1">شرح کامل :</div>
                <div className="bg-gray-50 rounded p-2 text-justify text-gray-700 leading-relaxed">
                  {htmlToText(productDetails.body)}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}

export default ModalShowDetails;
