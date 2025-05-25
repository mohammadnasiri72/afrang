import { authServiceOtp } from "@/services/Auth/authService";
import { Alert, Spin } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

// تابع تبدیل اعداد انگلیسی به فارسی
const toPersianNumber = (number) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return number.toString().replace(/\d/g, (d) => persianDigits[d]);
};

// تابع تبدیل اعداد فارسی به انگلیسی (برای پردازش)
const toEnglishNumber = (number) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return number.toString().replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d));
};

function EnterCodeSent({ mobile, setStateLogin , from}) {
  const [loading, setLoading] = useState(false);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // جلوگیری از رفتار پیش‌فرض Enter
        submitLogin();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [digits]); // فقط به digits وابسته است

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // تبدیل اعداد وارد شده به فارسی
    const persianValue = toPersianNumber(value);

    // بررسی عدد بودن
    if (persianValue && !/^[۰۱۲۳۴۵۶۷۸۹]$/.test(persianValue)) {
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = persianValue;
    setDigits(newDigits);

    if (persianValue && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // پاک کردن خطا فقط زمانی که کاربر در حال وارد کردن کد است
    setError("");
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const submitLogin = async () => {
    // بررسی تعداد اعداد وارد شده
    const filledDigits = digits.filter(digit => digit !== "").length;
    if (filledDigits < 6) {
      setError("لطفا کد 6 رقمی را کامل وارد کنید");
      return;
    }

    if (loading) return; // جلوگیری از ارسال چندباره در زمان لودینگ

    setLoading(true);
    try {
      const englishCode = digits.map((d) => toEnglishNumber(d)).join("");
      const res = await authServiceOtp.login(mobile, englishCode);
      const userData = res.data; 
             
      // تنظیم کوکی با زمان انقضا
      Cookies.set("user", JSON.stringify(userData), {
        expires: new Date(userData.expiration),
        secure: true,
        sameSite: 'strict'
      });

      if (!from) {
        router.push("/");
      } else {
        if (from === 'card') {
          router.push("/cart/infosend");
        }
      }
      Toast.fire({
        icon: "success",
        text: "با موفقیت وارد شدید",
        customClass: {
          container: "toast-modal",
        },
      });
    } catch (err) {
      Toast.fire({
        icon: "error",
        text: err.response?.data ? err.response?.data : "خطای شبکه",
        customClass: {
          container: "toast-modal",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  return (
    <>
      <div className="bg-white sm:mr-[4%] sm:w-[560px] w-full sm:min-h-auto min-h-screen relative z-10 p-[30px] sm:rounded-[24px] shadow-lg">
        <div className="flex flex-wrap">
          <div className="sm:w-1/2 w-full mb-[40px] sm:border-l align-middle flex items-center">
            <div className="max-w-[57px]">
              <a href="#">
                <img href="#" src="/images/logo.png" />
              </a>
            </div>
            <div className="logo-text hover:text-blue-700 duration-300">
              <a href="#">خانــه عکاســــان افــــــــــرنـگ</a>
            </div>
          </div>
          <div className="sm:w-1/2 w-full items-center flex justify-center text-[#656565] text-[16px] font-[600] mb-[40px]">
            ورود به حساب کاربری
          </div>
        </div>

        <div className="text-[16px]">
          <div>
            <div className="w-full flex justify-center pb-5 sm:px-5 px-0">
              <Alert
                style={{ width: "100%" }}
                message={`کد تایید به ${mobile} ارسال شد`}
                description="لطفا کد 6 رقمی را وارد کنید"
                type="info"
                showIcon
              />
            </div>
            <div
              className="flex flex-col items-center gap-4 font-sans"
              dir="ltr"
            >
              <div className="flex gap-2">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="sm:w-14 w-11 h-14 text-center text-2xl border border-gray-300 rounded-md 
                      focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                      transition-all duration-200"
                    inputMode="numeric"
                    dir="ltr" // جهت اعداد چپ به راست
                  />
                ))}
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>

            <div className="flex flex-wrap mt-5">
              <div className="sm:w-1/2 w-full mb-4 sm:pl-3">
                <div
                  onClick={() => {
                    setStateLogin(2);
                  }}
                  className="text-center text-[#545454] w-full rounded-[5px] bg-[#eceded] block font-[600] px-0 py-[12px] cursor-pointer"
                >
                  بازگشت
                </div>
              </div>

              <div className="sm:w-1/2 w-full mb-4 sm:pr-3">
                <button
                  disabled={loading || !digits.every((digit) => digit !== "")}
                  onClick={submitLogin}
                  className={`text-center text-[#fff] w-full rounded-[5px] bg-[#d1182b] block font-[600] px-0 py-[12px] ${
                    loading || !digits.every((digit) => digit !== "")
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2 justify-center">
                      <span>درحال ورود</span>
                      <Spin className="white-spin" size="small" />
                    </div>
                  ) : (
                    "ورود"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnterCodeSent;
