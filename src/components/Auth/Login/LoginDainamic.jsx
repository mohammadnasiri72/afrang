import { loginSendOtp } from "@/services/Account/AccountService";
import { authServiceSendOtp } from "@/services/Auth/authService";
import { getImageUrl } from "@/utils/mainDomain";
import "@ant-design/v5-patch-for-react-19";
import { Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;

function LoginDainamic({ setStateLogin, mobile, setMobile }) {
  const [loading, setLoading] = useState(false);
  const [errorMobile, setErrorMobile] = useState("");
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
        submitLoginSendOtp();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [mobile, loading]);

  const submitLoginSendOtp = async () => {
    if (!mobile) {
      setErrorMobile("شماره تلفن را وارد کنید");
    } else if (!mobile.match(paternMobile)) {
      setErrorMobile("شماره تلفن وارد شده اشتباه است");
    } else {
      setLoading(true);
      try {
        const res = await loginSendOtp(mobile);
        if (!res) {
          setStateLogin(3);
          Toast.fire({
            icon: "success",
            text: "کد ارسال شد",
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
        setLoading(false);
      }
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
                  شماره تلفن خود را وارد کنید
                </label>
                <div
                  className={`bg-[#f9f9f9] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 ${
                    errorMobile ? "border border-red-500" : ""
                  }`}
                >
                  <MdOutlinePhoneAndroid className="text-[#656565] text-2xl" />
                  <input
                    onChange={(e) => {
                      setMobile(e.target.value);
                      setErrorMobile("");
                    }}
                    value={mobile}
                    className="mr-[10px] py-[4px] w-full bg-transparent text-right outline-none text-lg"
                    type="tel"
                    name=""
                    id=""
                    placeholder="شماره تلفن"
                  />
                </div>
                {errorMobile && (
                  <p className="text-red-500 text-sm mt-1">{errorMobile}</p>
                )}
              </div>
            </div>
            <span
              onClick={() => {
                setStateLogin(1);
              }}
              className="text-[#d1182b] cursor-pointer font-semibold"
            >
              ورود با رمز ثابت
            </span>
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
                    onClick={submitLoginSendOtp}
                    className={`text-center text-[#fff] w-full rounded-[5px] bg-[#d1182b] block font-[600] px-0 py-[12px] ${
                      loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2 justify-center">
                        <span>لطفا صبر کنید</span>
                        <Spin className="white-spin" size="small" />
                      </div>
                    ) : (
                      "ادامه"
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

export default LoginDainamic;
