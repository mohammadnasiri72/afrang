import { authServiceStatic } from "@/services/Auth/authService";
import { Spin } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { getImageUrl } from "@/utils/mainDomain";
import { login } from "@/services/Account/AccountService";

function LoginStatic({ setStateLogin, from }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { settings } = useSelector((state) => state.settings);

  const router = useRouter();
  // import sweet alert 2
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
        submitLogin();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [username, password, loading]);

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "نام کاربری/ایمیل الزامی است";
    }

    if (!password) {
      newErrors.password = "رمز ورود الزامی است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const userData = await login({
        username,
        password,
        remember: true,
      });
      if (userData.token) {
        Cookies.set("user", JSON.stringify(userData));

        // بررسی مسیر ذخیره شده در localStorage
        const redirectPath = localStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin"); // پاک کردن مسیر از localStorage
          router.push(redirectPath);
        } else if (!from) {
          router.push("/");
        } else {
          if (from === "card") {
            router.push("/card/compeletePay");
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
          text: userData.response?.data ? userData.response?.data : "خطای شبکه",
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
                    name=""
                    id=""
                    placeholder="نام کاربری/ایمیل را وارد کنید."
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
              <div className="w-full my-4 ">
                <label className="text-[#656565] text-[16px] mb-[10px]">
                  رمز ورود
                </label>
                <div
                  className={`bg-[#f9f9f9] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 ${
                    errors.password ? "border border-red-500" : ""
                  }`}
                >
                  <FaLock className="text-[#656565]" />
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    value={password}
                    className="mr-[10px] p-[4px] w-full bg-transparent text-right outline-none"
                    type="password"
                    name=""
                    id=""
                    placeholder="رمز ورود خود را وارد کنید."
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>
            <div className="flex justify-start gap-4 items-center mb-4">
              <span
                onClick={() => {
                  setStateLogin(2);
                }}
                className="text-[#d1182b] cursor-pointer font-semibold"
              >
                ورود با رمز یکبار مصرف
              </span>
              <Link
                href="/forgot-password"
                className="text-[#d1182b] cursor-pointer font-semibold hover:text-[#b91626] transition-colors"
              >
                فراموشی رمز عبور
              </Link>
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
                    onClick={submitLogin}
                    className={`text-center text-[#fff] w-full rounded-[5px] bg-[#d1182b] block font-[600] px-0 py-[12px] ${
                      loading ? "cursor-not-allowed" : "cursor-pointer"
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

              <div className="w-full flex justify-center text-center text-[#656565] font-[600]">
                حساب کاربری ندارید؟
                <Link className="text-[#d1182b]" href={"/register"}>
                  ساخت حساب کاربری
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginStatic;
