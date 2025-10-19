import { getCsrf } from "@/services/csrf/csrf";
import { newsletter } from "@/services/Newsletter/NewsletterServices";
import { message, Spin } from "antd";
import { useState } from "react";
import { MdMailOutline } from "react-icons/md";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async () => {
    if (!email) {
      message.error("لطفا ایمیل خود را وارد کنید");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error("لطفا یک ایمیل معتبر وارد کنید");
      return;
    }

    setLoading(true);
    try {
      const csrf = await getCsrf();
      const result = await newsletter(email , csrf);
      if (result.type === "error") {
        message.error(result.message);
      } else {
        message.success("ایمیل شما با موفقیت ثبت شد");
        setEmail("");
      }
    } catch (error) {
      message.error("خطا در ثبت ایمیل");
    } finally {
      setLoading(false);
    }
  };

  // تابع تبدیل اعداد فارسی به انگلیسی (برای پردازش)
  const toEnglishNumber = (number) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return number.toString().replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d));
  };

  return (
    <>
      <div className="flex items-center justify-between p-2 rounded-[50px] bg-white mt-2">
        <div className="px-3">
          <MdMailOutline className="text-xl text-[#666] " />
        </div>
        <input
          className="w-full outline-none !text-[16px]"
          type="email"
          value={email}
          onChange={(e) => setEmail(toEnglishNumber(e.target.value))}
          placeholder="ایمیل خود را وارد کنید"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-[#d1182b] rounded-[50px] px-8 py-1.5 !text-white cursor-pointer hover:bg-[#18d1be] duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? <Spin size="small" className="text-white" /> : "ارسال"}
        </button>
      </div>
    </>
  );
}

export default Newsletter;
