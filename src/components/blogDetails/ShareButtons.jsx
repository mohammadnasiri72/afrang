"use client";

import { message } from "antd";
import {
  FaTelegram,
  FaWhatsapp,
  FaTwitter,
  FaLinkedin,
  FaLink,
  FaShare,
} from "react-icons/fa6";

const ShareButtons = ({ blog }) => {

  const shareOnTelegram = () => {
    const url = blog?.url;
    const text = encodeURIComponent(blog?.title);
    const telegramUrl = `https://t.me/share/url?url=${url}&text=${text}`;
    window.open(telegramUrl, "_blank");
  };

  const shareOnWhatsApp = () => {
    const url = blog?.url;
    const text = encodeURIComponent(blog?.title);
    const whatsappUrl = `https://wa.me/?text=${text}%20${url}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareOnTwitter = () => {
    const url = blog?.url;
    const text = encodeURIComponent(blog?.title);
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = blog?.url;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(linkedinUrl, "_blank");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        decodeURIComponent(window.location.href)
      );
      message.success("لینک با موفقیت کپی شد!");
    } catch (err) {
      message.error("خطا در کپی کردن لینک");
    }
  };

  return (
    <div className="flex items-center sm:mt-0 mt-3 sm:mr-0 mr-5">
      <span className="whitespace-nowrap"> اشتراک گذاری : </span>
      <div className="px-2 flex items-center gap-2">
        <button
          onClick={shareOnTelegram}
          className="hover:scale-110 transition-transform duration-300 cursor-pointer"
          title="اشتراک در تلگرام"
        >
          <FaTelegram className="text-xl !text-[#40768c88] hover:!ext-blue-500 duration-300" />
        </button>
        <button
          onClick={shareOnWhatsApp}
          className="hover:scale-110 transition-transform duration-300 cursor-pointer"
          title="اشتراک در واتساپ"
        >
          <FaWhatsapp className="text-xl !text-[#40768c88] hover:!text-green-500 duration-300" />
        </button>
        <button
          onClick={shareOnTwitter}
          className="hover:scale-110 transition-transform duration-300 cursor-pointer"
          title="اشتراک در توییتر"
        >
          <FaTwitter className="text-xl !text-[#40768c88] hover:!text-blue-400 duration-300" />
        </button>
        <button
          onClick={shareOnLinkedIn}
          className="hover:scale-110 transition-transform duration-300 cursor-pointer"
          title="اشتراک در لینکدین"
        >
          <FaLinkedin className="text-xl !text-[#40768c88] hover:!text-blue-600 duration-300" />
        </button>
        <button
          onClick={copyLink}
          className="hover:scale-110 transition-transform duration-300 cursor-pointer"
          title="کپی لینک"
        >
          <FaLink className="text-xl !text-[#40768c88] hover:!text-gray-600 duration-300" />
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
