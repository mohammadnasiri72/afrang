"use client";

import "@ant-design/v5-patch-for-react-19";
import { Spin } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { getImageUrl } from "@/utils/mainDomain";
import { ResetPassword } from "@/services/Account/AccountService";

const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;
const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { settings } = useSelector((state) => state.settings);
  const router = useRouter();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !loading) {
        handleSubmit();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [username, loading]);

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "شماره تلفن/آدرس ایمیل الزامی است";
    } else if (!paternMobile.test(username) && !patternEmail.test(username)) {
      newErrors.username = "لطفا یک شماره موبایل یا ایمیل معتبر وارد کنید";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await ResetPassword(username);
      if (response.type === "error") {
        Toast.fire({
          icon: "error",
          text: response.message,
        });
        return;
      }

      Toast.fire({
        icon: "success",
        text: "لینک بازیابی رمز عبور به ایمیل/شماره تلفن شما ارسال شد",
        customClass: {
          container: "toast-modal",
        },
      });

      router.push("/login");
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

  return (
    <>
      <div className="bg-[#f4f4f4] min-h-screen relative">
        <div
          style={{
            backgroundImage: "url(/images/gallery/background-image.jpg)",
          }}
          className="w-[70%] min-h-screen absolute top-0 left-0 bottom-0 bg-cover bg-no-repeat"
        ></div>
        <div className="flex justify-start min-h-screen items-center">
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
                فراموشی رمز عبور
              </div>
            </div>

            <div className="text-[16px]">
              <div>
                <div className="flex flex-wrap">
                  <div className="w-full mb-4">
                    <label className="text-[#656565] text-[16px] mb-[10px]">
                      شماره تلفن/آدرس ایمیل
                    </label>
                    <div
                      className={`bg-[#f9f9f9] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 ${
                        errors.username ? "border border-red-500" : ""
                      }`}
                    >
                      <FaUser className="text-[#656565]" />
                      <input
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setErrors((prev) => ({ ...prev, username: "" }));
                        }}
                        value={username}
                        className="mr-[10px] p-[4px] w-full bg-transparent text-right outline-none"
                        type="text"
                        placeholder="شماره تلفن یا ایمیل خود را وارد کنید"
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.username}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap mt-5">
                  <div className="flex flex-col-reverse sm:flex-row w-full">
                    <div className="sm:w-1/2 w-full mb-4 sm:pl-3">
                      <div
                        onClick={() => {
                          router.back();
                        }}
                        className="text-center text-[#545454] w-full rounded-[5px] bg-[#eceded] block font-[600] px-0 py-[12px] cursor-pointer"
                      >
                        بازگشت
                      </div>
                    </div>

                    <div className="sm:w-1/2 w-full mb-4 sm:pr-3">
                      <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className={`text-center text-[#fff] w-full rounded-[5px] bg-[#d1182b] block font-[600] px-0 py-[12px] ${
                          loading ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2 justify-center">
                            <span>در حال ارسال</span>
                            <Spin className="white-spin" size="small" />
                          </div>
                        ) : (
                          "ارسال لینک بازیابی"
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="w-full flex justify-center text-center text-[#656565] font-[600]">
                    <Link className="text-[#d1182b]" href={"/login"}>
                      بازگشت به صفحه ورود
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
