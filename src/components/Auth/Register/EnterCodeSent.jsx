import { RegisterSendOtp } from "@/services/Account/AccountService";
import { Spin } from "antd";
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
// const englishCode = digits.map((d) => toEnglishNumber(d)).join("");

function EnterCodeSent({ setCode, mobile }) {
  const [loading, setLoading] = useState(false);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(120); // 2 minutes in seconds
  const inputRefs = useRef([]);
  const router = useRouter();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

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
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    setCode(digits.map((d) => toEnglishNumber(d)).join(""));
  }, [digits]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleResendCode = async () => {
    if (countdown > 0 || resendLoading) return;

    setResendLoading(true);
    try {
      const res = await RegisterSendOtp(mobile);
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

    setError("");
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
      <div className="flex w-full">
        <label className="text-[#656565] text-[16px] mb-[10px]">
          کد ارسالی
        </label>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center gap-4 font-sans" dir="ltr">
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

          {error && <div className="text-red-500 text-sm mt-1">{error}</div>}

          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleResendCode}
              disabled={countdown > 0 || resendLoading}
              className={`text-[#d1182b] text-sm font-semibold ${countdown > 0 || resendLoading
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
      </div>
    </>
  );
}

export default EnterCodeSent;
