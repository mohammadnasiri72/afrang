"use client";

import { sendComment } from "@/services/comments/serviceComment";
import React, { useState } from "react";
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

function SendCommentBox({ itemId, parentId = -1, onCommentSent , type}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    body: "",
  });

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
      };
      
      await sendComment(commentData);

      Toast.fire({
        icon: "success",
        text: "با موفقیت انجام شد لطفا منتظر تایید ادمین باشید",
      });

      setFormData({
        name: "",
        email: "",
        body: "",
      });

      if (onCommentSent) {
        onCommentSent();
      }
    } catch (err) {
      setError("خطا در ارسال کامنت. لطفاً دوباره تلاش کنید.");
      Toast.fire({
        icon: "error",
        text: "خطا در ارسال کامنت. لطفاً دوباره تلاش کنید.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-4 mt-3 rounded-lg relative z-50">
      <h2 className="font-semibold text-[18px]">نظر خود را وارد کنید</h2>
      <hr className="mt-4 border-[#40768c55]" />

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="flex flex-wrap">
          <div className="sm:w-1/2 w-full sm:pl-3">
            <input
              className={`w-full outline-none bg-[#f1f2f2] px-5 h-14 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg ${
                errors.name ? "border-2 border-red-500 placeholder-red-500" : ""
              }`}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={errors.name ? errors.name : "*نام و نام خانوادگی"}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="sm:w-1/2 w-full sm:pr-3 sm:mt-0 mt-5">
            <input
              className={`w-full outline-none bg-[#f1f2f2] px-5 h-14 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg ${
                errors.email ? "border-2 border-red-500 placeholder-red-500" : ""
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
        </div>

        <div className="mt-5">
          <textarea
            className={`w-full outline-none bg-[#f1f2f2] px-5 py-2 h-36 rounded-lg focus:bg-white duration-300 focus:shadow-[0px_0px_10px_1px_#0005] focus:text-lg ${
              errors.body ? "border-2 border-red-500 placeholder-red-500" : ""
            }`}
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder={errors.body ? errors.body : "نظر خود را اینجا بنویسید*"}
          ></textarea>
          {errors.body && (
            <p className="text-red-500 text-sm mt-1">{errors.body}</p>
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="w-[260px] bg-[#d1182b] text-white cursor-pointer py-2 relative group disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}

export default SendCommentBox;
