"use client";
import {
  selectUser,
  selectUserProfile,
  updateUserFields,
} from "@/redux/slices/userSlice";
import { updateUserProfile } from "@/services/dashboard/dashboardService";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FaTimes, FaUser } from "react-icons/fa";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

// Function to convert Persian date to required format
const convertPersianDate = (dateString) => {
  if (!dateString) return null;

  // Check if the date is already in English format (YYYY/MM/DD)
  if (dateString.includes("/")) {
    return dateString;
  }

  // Split the date string into year, month, and day
  const [year, month, day] = dateString.split("-");

  // Convert Persian numbers to English
  const persianToEnglish = (str) => {
    if (!str) return "";
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return str
      .split("")
      .map((char) => {
        const index = persianNumbers.indexOf(char);
        return index !== -1 ? index.toString() : char;
      })
      .join("");
  };

  // Convert each part to English numbers
  const englishYear = persianToEnglish(year);
  const englishMonth = persianToEnglish(month);
  const englishDay = persianToEnglish(day);

  // Return in the required format
  return `${englishYear}/${englishMonth}/${englishDay}`;
};

export default function EditProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      container: "toast-modal",
      popup: "swal2-popup-custom",
    },
  });

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.name);
      setLastName(userProfile.family);
      setEmail(userProfile.email || "");
      if (userProfile.brithDate) {
        // If the date is already in English format (YYYY/MM/DD), use it directly
        if (userProfile.brithDate.includes("/")) {
          setBirthDate(userProfile.brithDate);
        } else {
          // Otherwise, convert it to the required format
          setBirthDate(convertPersianDate(userProfile.brithDate));
        }
      }
    }
  }, [userProfile]);

  const validateForm = () => {
    const newErrors = {};

    if (!firstName || !firstName.trim()) {
      newErrors.firstName = "نام الزامی است";
    }

    if (!lastName || !lastName.trim()) {
      newErrors.lastName = "نام خانوادگی الزامی است";
    }

    // Optional email validation
    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "ایمیل معتبر نیست";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("FirstName", firstName.trim());
      formData.append("LastName", lastName.trim());
      formData.append("DisplayName", `${firstName.trim()} ${lastName.trim()}`);
      if (email.trim()) formData.append("Email", email.trim());
      if (birthDate) {
        const formattedDate = convertPersianDate(birthDate);
        formData.append("BirthDate", formattedDate);
      }

      // Call API to update profile
      await updateUserProfile(formData, user.token);

      // Update Redux store with new user data
      dispatch(
        updateUserFields({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          displayName: `${firstName.trim()} ${lastName.trim()}`,
          email: email.trim() || user.email,
          birthDate: birthDate ? convertPersianDate(birthDate) : null,
        })
      );

      Toast.fire({
        icon: "success",
        text: "اطلاعات کاربری با موفقیت بروزرسانی شد",
        customClass: {
          container: "toast-modal",
        },
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: error || "خطا در بروزرسانی اطلاعات",
        customClass: {
          container: "toast-modal",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // تابع تبدیل اعداد فارسی به انگلیسی (برای پردازش)
  const toEnglishNumber = (number) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return number.toString().replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d));
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 z-50 relative">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
          <FaUser className="text-[#d1182b]" />
        </div>
        <h1 className="text-xl font-bold">ویرایش اطلاعات کاربری</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* نام */}
          <div>
            <label className="block text-gray-700 mb-2">
              نام <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(toEnglishNumber(e.target.value));
                if (errors.firstName) {
                  setErrors({ ...errors, firstName: "" });
                }
              }}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
              placeholder="نام"
              dir="rtl"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* نام خانوادگی */}
          <div>
            <label className="block text-gray-700 mb-2">
              نام خانوادگی <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(toEnglishNumber(e.target.value)  );
                if (errors.lastName) {
                  setErrors({ ...errors, lastName: "" });
                }
              }}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
              placeholder="نام خانوادگی"
              dir="rtl"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* تاریخ تولد */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">تاریخ تولد</label>
          <div className="relative">
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={birthDate}
              onChange={(date) => {
                setBirthDate(date?.isValid ? date.format("YYYY-MM-DD") : null);
              }}
              format="YYYY/MM/DD"
              inputClass={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
              placeholder="انتخاب تاریخ تولد"
              calendarPosition="bottom-right"
            />
            {birthDate && (
              <button
                type="button"
                onClick={() => setBirthDate(null)}
                className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 !text-gray-400 hover:!text-gray-600 transition-colors"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* ایمیل */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">ایمیل</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(toEnglishNumber(e.target.value) );
              if (errors.email) {
                setErrors({ ...errors, email: "" });
              }
            }}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent`}
            placeholder="example@gmail.com"
            dir="ltr"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 !text-white bg-[#d1182b] rounded-lg transition-colors cursor-pointer ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#b91626]"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Spin className="white-spin" size="small" />
              <span>در حال ثبت تغییرات...</span>
            </div>
          ) : (
            "ثبت تغییرات"
          )}
        </button>
      </form>
      <style jsx global>{`
        .swal2-container {
          z-index: 99999 !important;
        }
        .swal2-popup-custom {
          z-index: 99999 !important;
        }
        .rmdp-container {
          width: 100%;
        }
        .rmdp-input {
          width: 100% !important;
          height: 42px;
          text-align: right;
          font-family: inherit;
          padding-left: 2.5rem !important;
        }
      `}</style>
    </div>
  );
}
