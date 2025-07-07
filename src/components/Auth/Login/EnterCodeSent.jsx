import { loginOtp, loginSendOtp } from "@/services/Account/AccountService";
import { getImageUrl } from "@/utils/mainDomain";
import { Alert, Spin } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
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

function EnterCodeSent({ mobile, setStateLogin, from }) {
  const [loading, setLoading] = useState(false);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(120); // 2 minutes in seconds
  const inputRefs = useRef([]);
  const { settings } = useSelector((state) => state.settings);

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

  // Timer effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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

  const handleResendCode = async () => {
    if (countdown > 0 || resendLoading) return;

    setResendLoading(true);
    try {
      const res = await loginSendOtp(mobile);
      if (!res) {
        setCountdown(120); // Reset timer
        Toast.fire({
          icon: "success",
          text: "کد جدید ارسال شد",
          customClass: {
            container: "toast-modal",
          },
        });
      } else {
        Toast.fire({
          icon: "error",
          text: res.response?.data ? res.response?.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        text: err.response?.data ? err.response?.data : "خطای شبکه",
        customClass: {
          container: "toast-modal",
        },
      });
    } finally {
      setResendLoading(false);
    }
  };

  const submitLogin = async () => {
    // بررسی تعداد اعداد وارد شده
    const filledDigits = digits.filter((digit) => digit !== "").length;
    if (filledDigits < 6) {
      setError("لطفا کد 6 رقمی را کامل وارد کنید");
      return;
    }

    if (loading) return; // جلوگیری از ارسال چندباره در زمان لودینگ

    setLoading(true);
    try {
      const englishCode = digits.map((d) => toEnglishNumber(d)).join("");
      const userData = await loginOtp({
        mobile,
        code: englishCode,
      });

      if (userData.token) {
        // تنظیم کوکی با زمان انقضا
        Cookies.set("user", JSON.stringify(userData), {
          expires: new Date(userData.expiration),
          secure: true,
          sameSite: "strict",
        });

        // بررسی مسیر ذخیره شده در localStorage
        const redirectPath = localStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin"); // پاک کردن مسیر از localStorage
          router.push(redirectPath);
        } else if (!from) {
          router.push("/");
        } else {
          if (from === "card") {
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
      } else {
        Toast.fire({
          icon: "error",
          text: userData.response?.data
            ? userData.response?.data
            : "کد وارد شده اشتباه است",
          customClass: {
            container: "toast-modal",
          },
        });
      }
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
            <div>
              <Link href="/">
                <Image
                  src={getImageUrl(
                    settings?.find(
                      (item) => item.propertyKey === "site_footer_logo"
                    )?.value
                  )}
                  width={57}
                  height={57}
                  alt="logo"
                  className="object-contain"
                  unoptimized
                />
              </Link>
            </div>
            <div className="logo-text hover:text-[#d1182b] duration-300">
              <Link href="/">
                <span>خانــه عکاســــان افــــــــــرنـگ</span>
              </Link>
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
                    dir="ltr"
                  />
                ))}
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={handleResendCode}
                  disabled={countdown > 0 || resendLoading}
                  className={`text-[#d1182b] text-sm font-semibold ${
                    countdown > 0 || resendLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-[#b91626] cursor-pointer"
                  }`}
                >
                  {resendLoading ? (
                    <div className="flex items-center gap-2">
                      <span>در حال ارسال</span>
                      <Spin size="small" />
                    </div>
                  ) : countdown > 0 ? (
                    `ارسال مجدد کد (${formatTime(countdown)})`
                  ) : (
                    "ارسال مجدد کد"
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap mt-5">
              <div className="flex flex-col-reverse sm:flex-row w-full">
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
      </div>
    </>
  );
}

export default EnterCodeSent;
