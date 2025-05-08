import { deleteAddress, getAddress } from "@/services/order/orderService";
import { Spin } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

function DeleteAddress({ id , getAddressFu}) {
  const [loading, setLoading] = useState(false);
  const user = Cookies.get("user");
  const token = JSON.parse(user).token;

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

 

  const deleteHandler = async () => {
    setLoading(true);
    try {
      await deleteAddress(id, token);
      getAddressFu();
      Toast.fire({
        icon: "success",
        text: "آدرس با موفقیت حذف شد",
        customClass: {
          container: "toast-modal",
        },
      });
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
      <div className="w-auto">
        <div className="w-full">
          <button
            disabled={loading}
            onClick={deleteHandler}
            className={`text-center text-[#fff] w-full rounded-[5px] bg-[#d1182b] block font-[600] p-2 ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2 justify-center">
                <span>درحال حذف</span>
                <Spin className="white-spin" size="small" />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <FaTrashAlt />
                <span>حذف</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteAddress;
