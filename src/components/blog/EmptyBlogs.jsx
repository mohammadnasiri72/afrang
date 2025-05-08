import Link from "next/link";
import { FaBookOpen } from "react-icons/fa";

function EmptyBlogs() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 relative z-50">
      <div className="max-w-md w-full text-center">
        {/* آیکون اصلی */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-[#f1f2f2] rounded-full flex items-center justify-center mx-auto">
            <FaBookOpen className="text-4xl text-[#40768c]" />
          </div>
        </div>

        {/* متن اصلی */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          هیچ مطلبی یافت نشد
        </h2>
        <p className="text-gray-600 mb-8">
          متاسفانه در حال حاضر هیچ مطلبی در این بخش وجود ندارد. به زودی مطالب
          جدیدی اضافه خواهد شد.
        </p>

        {/* دکمه‌های عملیاتی */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[#d1182b] text-white rounded-lg hover:bg-[#b31524] transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <span>بازگشت به صفحه اصلی</span>
          </Link>
          <Link
            href="/news"
            className="px-6 py-3 bg-[#40768c] text-white rounded-lg hover:bg-[#2d5a6b] transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <span>مشاهده همه مطالب</span>
          </Link>
        </div>

        {/* متن تشویقی */}
        <p className="mt-8 text-sm text-gray-500">
          برای اطلاع از مطالب جدید، می‌توانید در خبرنامه ما عضو شوید
        </p>
      </div>
    </div>
  );
}

export default EmptyBlogs;
