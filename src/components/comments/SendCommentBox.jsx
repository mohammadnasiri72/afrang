"use client";

import { selectUser } from "@/redux/slices/userSlice";
import { sendComment } from "@/services/comments/serviceComment";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

// import sweet alert 2
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

const SendCommentBox = forwardRef(({ itemId, parentId = -1, type }, ref) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    body: "",
  });
  const [userIP, setUserIP] = useState("");
  const textareaRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusTextarea: () => {
      if (textareaRef.current) textareaRef.current.focus();
    },
  }));

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIP(data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };

    fetchIP();
  }, []);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    body: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      body: "",
    };
    let isValid = true;

    // Only validate name and email if user is not logged in
    if (!user.token) {
      // اعتبارسنجی نام
      if (!formData.name.trim()) {
        newErrors.name = "لطفا نام و نام خانوادگی را وارد کنید";
        isValid = false;
      }

      // اعتبارسنجی ایمیل
      if (!formData.email.trim()) {
        newErrors.email = "لطفا ایمیل را وارد کنید";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "لطفا یک ایمیل معتبر وارد کنید";
        isValid = false;
      }
    }

    // اعتبارسنجی متن کامنت
    if (!formData.body.trim()) {
      newErrors.body = "لطفا متن نظر خود را وارد کنید";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // پاک کردن خطای مربوطه هنگام تغییر مقدار
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const commentData = {
        ...formData,
        itemId,
        parentId,
        type,
        userIP,
      };

      if (user.token) {
        // If user is logged in, use their data
        commentData.name = user.name || user.fullName;
        commentData.email = user.email;
      }

      let response = null;

      if (user.token) {
        response = await sendComment(commentData, user.token);
      } else {
        response = await sendComment(commentData);
      }
      if (response.type === "error") {
        Toast.fire({
          icon: "error",
          text: response.message,
        });
        return;
      }
      Toast.fire({
        icon: "success",
        text: "با موفقیت انجام شد لطفا منتظر تایید ادمین باشید",
      });

      setFormData({
        name: "",
        email: "",
        body: "",
      });
    } catch (err) {
      Toast.fire({
        icon: "error",
        text: err.response?.data
          ? err.response?.data
          : "خطا در ارسال کامنت. لطفاً دوباره تلاش کنید.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {mounted && (
        <div className="bg-white p-4 mt-3 rounded-lg relative z-50">
          <span className="font-semibold text-[18px]">
            نظر خود را وارد کنید
          </span>
          <hr className="mt-4 border-[#40768c55]" />

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-5">
            {!user?.token && (
              <div className="flex flex-wrap">
                <div className="sm:w-1/2 w-full sm:pl-3">
                  <input
                    className={`w-full outline-none bg-[#f1f2f2] px-5 h-14 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg ${
                      errors.name
                        ? "border-2 border-red-500 placeholder-red-500"
                        : ""
                    }`}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={
                      errors.name ? errors.name : "*نام و نام خانوادگی"
                    }
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="sm:w-1/2 w-full sm:pr-3 sm:mt-0 mt-5">
                  <input
                    className={`w-full outline-none bg-[#f1f2f2] px-5 h-14 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg ${
                      errors.email
                        ? "border-2 border-red-500 placeholder-red-500"
                        : ""
                    }`}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={errors.email ? errors.email : "*ایمیل"}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="mt-5 w-full">
                  <textarea
                    ref={textareaRef}
                    className={`w-full outline-none bg-[#f1f2f2] px-5 py-2 sm:h-36 h-[4.5rem] rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg ${
                      errors.body
                        ? "border-2 border-red-500 placeholder-red-500"
                        : ""
                    }`}
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    placeholder={
                      errors.body ? errors.body : "نظر خود را اینجا بنویسید*"
                    }
                  ></textarea>
                  {errors.body && (
                    <p className="text-red-500 text-sm mt-1">{errors.body}</p>
                  )}
                </div>
              </div>
            )}

            {user?.token && (
              <div className="mt-5">
                <textarea
                  ref={textareaRef}
                  className={`w-full outline-none bg-[#f1f2f2] px-5 py-2 h-52 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg ${
                    errors.body
                      ? "border-2 border-red-500 placeholder-red-500"
                      : ""
                  }`}
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  placeholder={
                    errors.body ? errors.body : "نظر خود را اینجا بنویسید*"
                  }
                ></textarea>
                {errors.body && (
                  <p className="text-red-500 text-sm mt-1">{errors.body}</p>
                )}
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                className="w-[260px] bg-[#d1182b] !text-white cursor-pointer py-2 relative group disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                <div className="absolute right-0 top-0 bottom-0 left-full group-hover:left-0 bg-[#18d1be] duration-300"></div>
                <span className="relative">
                  {isSubmitting ? "در حال ارسال..." : "ارسال"}
                </span>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
});

export default SendCommentBox;
