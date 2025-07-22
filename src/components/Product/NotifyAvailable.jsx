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
        className="w-full cursor-pointer mt-2 py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded transition-colors duration-200"
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
