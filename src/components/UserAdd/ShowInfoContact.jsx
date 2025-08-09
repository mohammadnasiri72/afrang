import { getUserAdContact } from "@/services/UserAd/UserAdServices";
import { Button } from "antd";
import React, { useState } from "react";
import Swal from "sweetalert2";

// تنظیمات Toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

function ShowInfoContact({ id }) {
  const [dataContact, setDataContact] = useState({});
  const [loadingBtn, setLoadingBtn] = useState(false);

  const ShowInfo = async () => {
    setLoadingBtn(true);
    try {
      const response = await getUserAdContact(id);
      if (response.type === "error") {
        Toast.fire({
          icon: "error",
          title: response?.message,
        });
        return;
      }
      setDataContact(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingBtn(false);
    }
  };
  return (
    <>
      <div>
        {!dataContact.contactInfoType && (
          <Button
            loading={loadingBtn}
            disabled={loadingBtn}
            type="primary"
            onClick={() => {
              ShowInfo();
            }}
          >
            نمایش اطلاعات تماس
          </Button>
        )}
        {dataContact.contactInfoType && (
          <div className="flex flex-col gap-2 pt-4 text-sm font-bold">
            {dataContact?.mobile && (
              <div className="flex items-center gap-2">
                <span>شماره تماس :</span>
                <span>
                  {dataContact.mobile ? dataContact.mobile : "ثبت نشده"}
                </span>
              </div>
            )}
            {dataContact?.email && (
              <div className="flex items-center gap-2">
                <span>ایمیل :</span>
                <span>
                  {dataContact.email ? dataContact.email : "ثبت نشده"}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ShowInfoContact;
