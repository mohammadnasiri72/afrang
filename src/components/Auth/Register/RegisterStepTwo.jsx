import { setUser } from "@/redux/slices/userSlice";
import { Register } from "@/services/Account/AccountService";
import { getImageUrl } from "@/utils/mainDomain";
import "@ant-design/v5-patch-for-react-19";
import { Spin } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import EnterCodeSent from "./EnterCodeSent";

function RegisterStepTwo({ mobile, setStateRegister }) {
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { settings } = useSelector((state) => state.settings);

  const user = Cookies.get("user");
  const userId = JSON.parse(user).userId;

  const dispatch = useDispatch();

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
        submitRegister();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [name, family, password, loading]);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "نام الزامی است";
    }
    if (!family.trim()) {
      newErrors.family = "نام خانوادگی الزامی است";
    }

    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "ایمیل نامعتبر است";
    }

    if (!password) {
      newErrors.password = "رمز ورود الزامی است";
    } else if (password.length < 6) {
      newErrors.password = "رمز ورود باید حداقل 6 کاراکتر باشد";
    }

    if (!password2) {
      newErrors.password2 = "تکرار رمز ورود الزامی است";
    } else if (password !== password2) {
      newErrors.password2 = "رمز ورود و تکرار آن مطابقت ندارند";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitRegister = async () => {
    if (!validateForm()) {
      return;
    }

    const data = {
      LangCode: "fa",
      Name: name,
      Family: family,
      Mobile: mobile,
      Email: email,
      Password: password,
      Code: code,
      Newsletter: false,
      UserId: userId,
    };

    setLoading(true);

    try {
      const userData = await Register(data);

      if (userData.token) {
        Cookies.set("user", JSON.stringify(userData));
        dispatch(setUser(userData));
        router.push("/");
        Toast.fire({
          icon: "success",
          text: "ثبت نام شما با موفقیت انجام شد",
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
          <div className="flex flex-wrap">
            <EnterCodeSent setCode={setCode} />
            <div className="w-full flex items-center flex-wrap mt-4">
              <div className="sm:w-1/2 w-full mb-4 sm:pl-2">
                <label className="text-[#656565] text-[16px] mb-[10px]">
                  نام
                </label>
                <div
                  className={`bg-[#f9f9f9] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 ${
                    errors.name ? "border border-red-500" : ""
                  }`}
                >
                  <FaUser className="text-[#656565]" />
                  <input
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prev) => ({ ...prev, name: "" }));
                    }}
                    value={name}
                    className="mr-[10px] p-[4px] w-full bg-transparent text-right outline-none"
                    type="text"
                    name=""
                    id=""
                    placeholder="نام خود را وارد کنید."
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="sm:w-1/2 w-full mb-4 sm:pr-2">
                <label className="text-[#656565] text-[16px] mb-[10px]">
                  نام خانوادگی
                </label>
                <div
                  className={`bg-[#f9f9f9] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 ${
                    errors.family ? "border border-red-500" : ""
                  }`}
                >
                  <FaUser className="text-[#656565]" />
                  <input
                    onChange={(e) => {
                      setFamily(e.target.value);
                      setErrors((prev) => ({ ...prev, family: "" }));
                    }}
                    value={family}
                    className="mr-[10px] p-[4px] w-full bg-transparent text-right outline-none"
                    type="text"
                    name=""
                    id=""
                    placeholder="نام خانوادگی خود را وارد کنید."
                  />
                </div>
                {errors.family && (
                  <p className="text-red-500 text-sm mt-1">{errors.family}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
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
              <div className="w-full my-4 ">
                <label className="text-[#656565] text-[16px] mb-[10px]">
                  تکرار رمز ورود
                </label>
                <div
                  className={`bg-[#f9f9f9] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 ${
                    errors.password2 ? "border border-red-500" : ""
                  }`}
                >
                  <FaLock className="text-[#656565]" />
                  <input
                    onChange={(e) => {
                      setPassword2(e.target.value);
                      setErrors((prev) => ({ ...prev, password2: "" }));
                    }}
                    value={password2}
                    className="mr-[10px] p-[4px] w-full bg-transparent text-right outline-none"
                    type="password"
                    name=""
                    id=""
                    placeholder="رمز ورود خود را تکرار کنید."
                  />
                </div>
                {errors.password2 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password2}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full mb-4">
              <label className="text-[#656565] text-[16px] mb-[10px]">
                آدرس ایمیل ( اختیاری )
              </label>
              <div
                className={`bg-[#f9f9f9] rounded-[12px] w-full px-[20px] py-[10px] flex items-center mt-2 ${
                  errors.email ? "border border-red-500" : ""
                }`}
              >
                <MdEmail className="text-[#656565]" />
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  value={email}
                  className="mr-[10px] p-[4px] w-full bg-transparent text-right outline-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="afrang@gmail.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap mt-5">
            <div className="flex flex-col-reverse sm:flex-row w-full">
              <div className="sm:w-1/2 w-full mb-4 sm:pl-3">
                <div
                  onClick={() => {
                    setStateRegister(1);
                  }}
                  className="text-center text-[#545454] w-full rounded-[5px] bg-[#eceded] block font-[600] px-0 py-[12px] cursor-pointer"
                >
                  بازگشت
                </div>
              </div>

              <div className="sm:w-1/2 w-full mb-4 sm:pr-3">
                <button
                  onClick={submitRegister}
                  className={`text-center text-[#fff] w-full rounded-[5px] bg-[#d1182b] block font-[600] px-0 py-[12px] ${
                    loading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2 justify-center">
                      <span>درحال ثبت نام</span>
                      <Spin className="white-spin" size="small" />
                    </div>
                  ) : (
                    "تایید"
                  )}
                </button>
              </div>
            </div>

            <div className="w-full flex justify-center text-center text-[#656565] font-[600]">
              حساب کاربری دارید؟
              <Link className="text-[#d1182b]" href={"/login"}>
                وارد شوید
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterStepTwo;
