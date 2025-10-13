"use client";

import { Attachment } from "@/services/Attachment/AttachmentService";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import Swal from "sweetalert2";
import { Fancybox } from "@fancyapps/ui";
import { getImageUrl } from "@/utils/mainDomain";

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

// تنظیمات Toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

const ShowImgProduct = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allAttachments, setAllAttachments] = useState([]);

  useEffect(() => {
    import("@fancyapps/ui/dist/fancybox/fancybox.css");
  }, []);

  // افزایش z-index fancybox
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `.fancybox__container { z-index: 999999 !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);


  const handleShowImgs = async () => {
    setIsLoading(true);
    try {
      const response = await Attachment(product?.productId);
      if (response.type === "error") {
        Toast.fire({
          icon: "error",
          title: response.message,
        });
        return;
      }
      setAllAttachments([product.image, ...response.map((obj) => obj.fileUrl)]);
      Fancybox.show(
        [product.image, ...response.map((obj) => obj.fileUrl)].map(
          (src, index) => ({
            src: getImageUrl(src),
            thumb: getImageUrl(src),
          })
        ),
        { startIndex: 0 }
      );
    } catch (error) {
      console.error("Error checking like status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Tooltip placement="left" title="نمایش تصاویر" trigger={["hover"]}>
        <button
        aria-label="نمایش تصاویر"
          onClick={handleShowImgs}
          className="flex w-full justify-center items-center cursor-pointer py-2 px-2 transition-all duration-300 hover:bg-gray-300"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-[#d1182b]"></div>
          ) : (
            <FaCamera className="!text-[#3338]" />
          )}
        </button>
      </Tooltip>
      {/* تصاویر (مخفی) برای Fancybox */}
      <div className="hidden">
        {allAttachments.map((src, index) => (
          <a
            key={index}
            href={getImageUrl(src)}
            data-fancybox="gallery"
            data-thumb={getImageUrl(src)}
          ></a>
        ))}
      </div>
    </div>
  );
};

export default ShowImgProduct;
