"use client";

import { PostContactForm } from "@/services/form/formService";
import { Segmented, Select } from "antd";
import { useState } from "react";
import {
  FaCaretDown,
  FaMobileScreen,
  FaPhoneVolume,
  FaRegUser,
} from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import { LuTag } from "react-icons/lu";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function BodyContact() {
  const [typeArticle, setTypeArticle] = useState("شماره های تماس");
  const { settings } = useSelector((state) => state.settings);

  // Form states
  const [formData, setFormData] = useState({
    nameFamily: "",
    part: "فروش",
    tel: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Toast configuration
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  // Helper function to render phone numbers
  const renderPhoneNumbers = (phoneString) => {
    if (!phoneString) return null;

    const numbers = phoneString.split("|").map((num) => num.trim());

    return (
      <div className="flex flex-wrap gap-2">
        {numbers.map((number, index) => (
          <a
            key={index}
            href={`tel:${number}`}
            className="text-[#424242] hover:text-[#18d1be] transition-colors duration-300"
          >
            {number}
          </a>
        ))}
      </div>
    );
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "nameFamily":
        if (!value.trim()) error = "نام و نام خانوادگی الزامی است";
        break;
      case "tel":
        if (!value.trim()) error = "شماره تماس الزامی است";
        break;
      case "message":
        if (!value.trim()) error = "پیام الزامی است";
        break;
      case "email":
        if (!value.trim()) {
          error = "ایمیل الزامی است";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "ایمیل نامعتبر است";
        }
        break;
      default:
        break;
    }
    return error;
  };

  // تابع تبدیل اعداد فارسی به انگلیسی (برای پردازش)
  const toEnglishNumber = (number) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return number.toString().replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: toEnglishNumber(value),
    }));

    // Validate field on change
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      part: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all required fields
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      const data = {
        langCode: "fa",
        ...formData,
      };

      const response = await PostContactForm(data);

      if (response) {
        Toast.fire({
          icon: "success",
          text: "پیام شما با موفقیت ارسال شد",
          customClass: {
            container: "toast-modal",
          },
        });

        // Reset form and errors
        setFormData({
          nameFamily: "",
          part: "فروش",
          tel: "",
          email: "",
          message: "",
        });
        setErrors({});
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: error.response?.data || "خطا در ارسال پیام",
        customClass: {
          container: "toast-modal",
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

 

  if (!settings || !Array.isArray(settings)) {
    return <div>اطلاعاتی یافت نشد</div>;
  }

  const sitePostalCode = settings?.find(
    (item) => item.propertyKey === "site_postalcode"
  )?.value;
  const sitePhone = settings?.find(
    (item) => item.propertyKey === "site_tel"
  )?.value;
  const siteMobile = settings?.find(
    (item) => item.propertyKey === "site_social_tel"
  )?.value;
  const siteManagerName = settings?.find(
    (item) => item.propertyKey === "site_admin_tel"
  )?.title;
  const siteManagerMobile = settings?.find(
    (item) => item.propertyKey === "site_admin_tel"
  )?.value;
  const siteSalesManagerName = settings?.find(
    (item) => item.propertyKey === "site_adminsale_tel"
  )?.title;
  const siteSalesManagerMobile = settings?.find(
    (item) => item.propertyKey === "site_adminsale_tel"
  )?.value;
  const siteEmail = settings?.find(
    (item) => item.propertyKey === "site_email"
  )?.value;
  const siteWorkingHours = settings?.find(
    (item) => item.propertyKey === "site_worktime"
  )?.value;

  const renderContactCards = () => {
    switch (typeArticle) {
      case "شماره های تماس":
        return (
          <>
            <div className="w-full lg:w-1/3 p-3">
              <div className="bg-[#fafafa] text-[#424242] flex rounded-lg relative z-10 text-[17px] font-[600] items-start ">
                <div className="bg-white ml-[15px] rounded-lg p-[10px]">
                  <div className="bg-[#18d1be] !text-white w-[40px] text-[16px] flex items-center justify-center h-[40px] rounded-sm">
                    <FaPhoneVolume />
                  </div>
                </div>
                <div className="py-4 px-2 pl-[50px]">
                  <span className="text-[#616161] text-[13px] font-bold">
                    تلفن
                  </span>
                  {renderPhoneNumbers(sitePhone)}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3 p-3">
              <div className="bg-[#fafafa] text-[#424242] flex rounded-lg relative z-10 text-[17px] font-[600] items-start ">
                <div className="bg-white ml-[15px] rounded-lg p-[10px]">
                  <div className="bg-[#18d1be] !text-white w-[40px] text-[16px] flex items-center justify-center h-[40px] rounded-sm">
                    <FaMobileScreen />
                  </div>
                </div>
                <div className="py-4 px-2 pl-[50px]">
                  <span className="text-[#616161] text-[13px] font-bold">
                    موبایل
                  </span>
                  {renderPhoneNumbers(siteMobile)}
                </div>
              </div>
            </div>
          </>
        );

      case "ایمیل و کد پستی":
        return (
          <>
            <div className="w-full lg:w-1/3 p-3">
              <div className="bg-[#fafafa] text-[#424242] flex rounded-lg relative z-10 text-[17px] font-[600] items-start ">
                <div className="bg-white ml-[15px] rounded-lg p-[10px]">
                  <div className="bg-[#18d1be] !text-white w-[40px] text-[16px] flex items-center justify-center h-[40px] rounded-sm">
                    <GoMail />
                  </div>
                </div>
                <div className="py-4 px-2 pl-[50px]">
                  <span className="text-[#616161] text-[13px] font-bold">
                    ایمیل
                  </span>
                  <p className="mb-0">{siteEmail}</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3 p-3">
              <div className="bg-[#fafafa] text-[#424242] flex rounded-lg relative z-10 text-[17px] font-[600] items-start ">
                <div className="bg-white ml-[15px] rounded-lg p-[10px]">
                  <div className="bg-[#18d1be] !text-white w-[40px] text-[16px] flex items-center justify-center h-[40px] rounded-sm">
                    <LuTag />
                  </div>
                </div>
                <div className="py-4 px-2 pl-[50px]">
                  <span className="text-[#616161] text-[13px] font-bold">
                    کد پستی
                  </span>
                  <p className="mb-0">{sitePostalCode}</p>
                </div>
              </div>
            </div>
          </>
        );

      case "ساعات کار":
        return (
          <div className="w-full lg:w-1/3 p-3">
            <div className="bg-[#fafafa] text-[#424242] flex flex-wrap rounded-lg relative z-10 text-[17px] font-[600] items-start ">
              <div className="bg-white ml-[15px] rounded-lg p-[10px]">
                <div className="bg-[#18d1be] !text-white w-[40px] text-[16px] flex items-center justify-center h-[40px] rounded-sm">
                  <LuTag />
                </div>
              </div>
              <div className="py-4 px-2 sm:pl-[50px]">
                <span className="text-[#616161] text-[13px] font-bold">
                  ساعات کاری
                </span>
                <p className="mb-0">{siteWorkingHours}</p>
              </div>
            </div>
          </div>
        );

      case "فکس و سایر تلفن ها":
        return (
          <>
            <div className="w-full lg:w-1/3 p-3">
              <div className="bg-[#fafafa] text-[#424242] flex rounded-lg relative z-10 text-[17px] font-[600] items-start ">
                <div className="bg-white ml-[15px] rounded-lg p-[10px]">
                  <div className="bg-[#18d1be] !text-white w-[40px] text-[16px] flex items-center justify-center h-[40px] rounded-sm">
                    <FaPhoneVolume />
                  </div>
                </div>
                <div className="py-4 px-2 pl-[50px]">
                  <span className="text-[#616161] text-[13px] font-bold">
                    فکس
                  </span>
                  {renderPhoneNumbers(siteManagerMobile)}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/3 p-3">
              <div className="bg-[#fafafa] text-[#424242] flex flex-wrap rounded-lg relative z-10 text-[17px] font-[600] items-start  mltp_col_info">
                <div className="bg-white ml-[15px] rounded-lg p-[10px]">
                  <div className="bg-[#18d1be] !text-white w-[40px] text-[16px] flex items-center justify-center h-[40px] rounded-sm">
                    <FaRegUser />
                  </div>
                </div>
                <div className="py-4 px-2 pl-[50px]">
                  <span className="text-[#616161] text-[13px] font-bold">
                    {siteManagerName}
                  </span>
                  {renderPhoneNumbers(siteManagerMobile)}
                </div>

                <div className="py-4 px-2 pl-[50px]">
                  <span className="text-[#616161] text-[13px] font-bold">
                    {siteSalesManagerName}
                  </span>
                  {renderPhoneNumbers(siteSalesManagerMobile)}
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 mt-10 py-5">
        <img className="w-2" src="/images/icons/Polygon_2.png" alt="" />
        <h4 className="font-bold text-xl text-[#0a1d39]"> تماس باما </h4>
        <img
          className="w-2 rotate-180"
          src="/images/icons/Polygon_2.png"
          alt=""
        />
      </div>

      <div className="w-full SegmentedContact overflow-hidden mx-auto flex justify-center p-5">
        <Segmented
          className="font-semibold text-3xl w-full overflow-auto"
          dir="rtl"
          style={{
            paddingTop: "8px",
            paddingBottom: "8px",
            fontFamily: "yekan",
          }}
          value={typeArticle}
          onChange={(e) => {
            setTypeArticle(e);
          }}
          options={[
            "شماره های تماس",
            "فکس و سایر تلفن ها",
            "ایمیل و کد پستی",
            "ساعات کار",
          ]}
        />
      </div>

      <div className="mt-8">
        <div className="rounded-lg bg-white p-5">
          <div id="tab-1" className="tab-item">
            <div className="flex flex-wrap">{renderContactCards()}</div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="rounded-lg bg-white p-5 relative">
          <div className="flex justify-center items-center gap-4 py-5">
            <img src="/images/icons/polygon.png" alt="" />
            <h4 className="font-semibold text-lg text-[#0a1d39]">
              فرم ارتباط با ما
            </h4>
            <img
              className="rotate-180"
              src="/images/icons/polygon.png"
              alt=""
            />
          </div>
          <div className="lg:px-10">
            <div className="flex items-start flex-wrap">
              <div className="sm:w-1/3 w-full p-2">
                <p className="font-semibold text-sm">نام و نام خانوادگی</p>

                <div className="w-full mt-2">
                  <input
                    className={`w-full outline-none bg-[#f1f2f2] px-5 h-12 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg ${
                      errors.nameFamily ? "border border-red-500" : ""
                    }`}
                    type="text"
                    name="nameFamily"
                    value={formData.nameFamily}
                    onChange={handleInputChange}
                    placeholder="لطفا نام و نام خانوادگی خود را وارد کنید"
                  />
                  {errors.nameFamily && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nameFamily}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:w-2/3 w-full p-2">
                <p className="font-semibold text-sm"> ارسال به بخش </p>
                <div className="mt-2">
                  <Select
                    className="custom-selectContact h-12 w-full border-none bg-[#f0f0f0] rounded-[8px]"
                    size="large"
                    value={formData.part}
                    onChange={handleSelectChange}
                    suffixIcon={
                      <FaCaretDown className="text-[#d1182b] text-lg" />
                    }
                    options={[
                      {
                        value: "فروش",
                        label: "فروش",
                      },
                      { value: "مدیریت", label: "مدیریت" },
                    ]}
                  />
                </div>
              </div>
              <div className="sm:w-1/3 w-full p-2">
                <p className="font-semibold text-sm"> شماره تماس </p>

                <div className="w-full mt-2">
                  <input
                    className={`w-full outline-none bg-[#f1f2f2] px-5 h-12 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg ${
                      errors.tel ? "border border-red-500" : ""
                    }`}
                    type="text"
                    name="tel"
                    value={formData.tel}
                    onChange={handleInputChange}
                    placeholder="مثلا 09211390622"
                  />
                  {errors.tel && (
                    <p className="text-red-500 text-sm mt-1">{errors.tel}</p>
                  )}
                </div>
              </div>
              <div className="sm:w-2/3 w-full p-2">
                <p className="font-semibold text-sm">ایمیل</p>

                <div className="w-full mt-2">
                  <input
                    className={`w-full outline-none bg-[#f1f2f2] px-5 h-12 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg ${
                      errors.email ? "border border-red-500" : ""
                    }`}
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="modino@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="w-full p-2">
                <p className="font-semibold text-sm">پیام</p>
                <div className="mt-2">
                  <textarea
                    className={`w-full outline-none bg-[#f1f2f2] px-5 py-2 h-36 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg ${
                      errors.message ? "border border-red-500" : ""
                    }`}
                    placeholder="لطفا پیام خود را وارد کنید"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end w-full p-2">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`w-[260px] bg-[#d1182b] !text-white cursor-pointer py-2 relative group ${
                    submitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <div className="absolute right-0 top-0 bottom-0 left-full group-hover:left-0 bg-[#18d1be] duration-300"></div>
                  <span className="relative">
                    {submitting ? "در حال ارسال..." : "ارسال"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BodyContact;
