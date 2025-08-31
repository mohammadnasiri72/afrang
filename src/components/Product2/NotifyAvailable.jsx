import React from "react";
import Swal from "sweetalert2";
import { fetchNotifyAvailable } from "@/services/products/productService";
import { getUserCookie } from "@/utils/cookieUtils";
import { useRouter } from "next/navigation";

function NotifyAvailable({id}) {
  // SweetAlert2 Toast instance
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const userData = getUserCookie();
  const router = useRouter();

  

  return (
    <>
      <button
        className="w-full cursor-pointer mt-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        type="button"
        aria-label="Add to favorites"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Add to favorites"
        data-bs-original-title="Add to favorites"
        data-bs-trigger="hover"
        data-bs-delay="500"
        data-bs-html="true"
        onClick={async () => {
          if (!userData?.token) {
            if (typeof window !== 'undefined') {
              localStorage.setItem('redirectAfterLogin', window.location.pathname);
            }
            router.push("/login");
            return;
          }
          try {
            const res = await fetchNotifyAvailable(id, userData.token);
            if (res.type === 'error') {
              Toast.fire({
                icon: "error",
                text: res.message || "خطای شبکه",
              });
            } else {                
              Toast.fire({
                icon: "success",
                text: res || "درخواست با موفقیت ثبت شد",
              });
            }
          } catch (error) {
            Toast.fire({
              icon: "error",
              text: error?.message || "خطای شبکه",
            });
          }
        }}
      >
        موجود شد به من اطلاع بده
      </button>
    </>
  );
}

export default NotifyAvailable;
