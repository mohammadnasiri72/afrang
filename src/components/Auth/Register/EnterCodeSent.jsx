import { setUser } from "@/redux/slice/user";
import { authServiceOtp } from "@/services/Auth/authService";
import { Alert, Spin } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
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

function EnterCodeSent({setCode}) {
  const [loading, setLoading] = useState(false);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(()=>{
    setCode(digits.map((d) => toEnglishNumber(d)).join(""))
  },[digits])

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
        </div>
      </div>
    </>
  );
}

export default EnterCodeSent;
