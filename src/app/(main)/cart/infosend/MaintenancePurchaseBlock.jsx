"use client";

import {
  CustomerServiceOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import { HiRefresh } from "react-icons/hi";
import { MdOutlineTimer } from "react-icons/md";

const MaintenancePurchaseBlock = ({ email, tel }) => {
  const themeColor = "#d1182b";
  const handleContact = () => {
    window.open(`mailto:${email}`, "_blank", "noopener,noreferrer");
  };

  const handleCall = () => {
    window.location.href = `tel:${tel}`;
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  // تبدیل رنگ hex به rgb برای opacity در tailwind
  const themeColorRgb = (opacity = 1) => {
    const hex = themeColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-5 bg-gradient-to-br from-gray-50 to-gray-100">
      <Card
        className="max-w-[600px] w-full rounded-2xl border-none shadow-xl"
        styles={{
          body: {
            padding: "40px 24px",
            textAlign: "center",
          },
        }}
        style={{
          boxShadow: `0 8px 32px ${themeColorRgb(0.12)}`,
          border: `1px solid ${themeColorRgb(0.12)}`,
        }}
      >
        {/* آیکون اصلی */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-dashed"
          style={{
            background: `linear-gradient(135deg, ${themeColorRgb(
              0.1
            )} 0%, ${themeColorRgb(0.2)} 100%)`,
            borderColor: `${themeColorRgb(0.25)}`,
          }}
        >
          <WarningOutlined
            className="text-4xl "
            style={{ color: themeColor }}
          />
        </div>

        {/* عنوان */}
        <div className="flex justify-center gap-2">
          <MdOutlineTimer className="text-4xl text-[#d1182b]" />
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: themeColor }}
          >
            خرید موقتاً غیرفعال است
          </h2>
        </div>

        {/* پیام اصلی */}
        <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed font-bold">
          با عرض پوزش، سیستم خرید آنلاین در حال حاضر در دسترس نیست. ما در حال
          انجام به‌روزرسانی‌های لازم برای ارائه خدمات بهتر به شما هستیم
        </p>

        {/* راه‌های ارتباطی */}
        <div
          style={{
            borderTop: `1px solid ${themeColorRgb(0.08)}`,
          }}
          className="mb-8! pt-4 mt-4"
        >
          <h4 className="text-lg md:text-xl text-gray-800 mb-4 flex items-center justify-center gap-2">
            <CustomerServiceOutlined />
            راه‌های ارتباط با پشتیبانی
          </h4>

          <div className="flex flex-col gap-3 items-center">
            {/* شماره تلفن */}
            <Button
              type="default"
              icon={<PhoneOutlined />}
              onClick={handleCall}
              className="w-full max-w-[300px] h-12 rounded-lg flex items-center justify-center gap-2 border hover:opacity-90 transition-opacity hover:text-white! hover:bg-[#d1182b]!"
              style={{
                borderColor: themeColor,
                color: themeColor,
              }}
            >
              تماس با پشتیبانی: {tel}
            </Button>

            {/* ایمیل */}
            <Button
              type="default"
              icon={<MailOutlined />}
              onClick={handleContact}
              className="w-full max-w-[300px] h-12 rounded-lg flex items-center justify-center gap-2 border hover:opacity-90 transition-opacity hover:text-white! hover:bg-[#d1182b]!"
              style={{
                borderColor: themeColor,
                color: themeColor,
              }}
            >
              ارسال ایمیل: {email}
            </Button>
          </div>
        </div>

        {/* دکمه‌های عملی */}
        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            size="large"
            type="primary"
            icon={<HomeOutlined />}
            onClick={handleGoHome}
            className="h-12 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity"
            style={{
              background: themeColor,
              borderColor: themeColor,
            }}
          >
            بازگشت به صفحه اصلی
          </Button>

          <Button
            size="large"
            type="default"
            icon={<HiRefresh />}
            onClick={() => window.location.reload()}
            className="h-12 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity"
            style={{
              borderColor: themeColor,
              color: themeColor,
            }}
          >
            تلاش مجدد
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MaintenancePurchaseBlock;
