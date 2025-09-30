"use client";



import { getItemById } from "@/services/Item/item";
import { getUserAdContact } from "@/services/UserAd/UserAdServices";
import { Button, Modal } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
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

function ShowUserContact({product}) {
  const [dataContact, setDataContact] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const user = Cookies.get("user");
  const token = JSON.parse(user).token;
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (id) => {    
    setLoadingConfirm(true);
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
      setLoadingConfirm(false);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // تابع نمایش HTML content
  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };

  const fetchDataModal = async () => {
    setLoading(true);
    try {
      const itemsData = await getItemById(31927, token);
      setModalData(itemsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchDataModal();
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="pt-3">
        {!dataContact.contactInfoType && (
          <div className="w-full">
            <Button className="w-full" type="primary" onClick={showModal}>
              نمایش اطلاعات تماس
            </Button>
            <Modal
              loading={loading}
              footer={
                <div className="flex justify-start gap-2 border-t border-[#3335] pt-3">
                  <Button
                    className="!bg-green-600 duration-300 hover:!bg-green-700 !font-semibold"
                    type="primary"
                    onClick={() => {
                      handleOk(product.id);
                    }}
                    loading={loadingConfirm}
                    disabled={loadingConfirm}
                  >
                    مورد تایید است
                  </Button>
                  <Button type="primary" onClick={handleCancel}>
                    بستن
                  </Button>
                </div>
              }
              title={
                <span className="font-semibold text-lg">
                  {modalData?.title}
                </span>
              }
              closable={{ "aria-label": "Custom Close Button" }}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div className="overflow-auto max-h-[50vh] p-2">
                <div
                  className="text-gray-700 leading-relaxed prose prose-sm max-w-none !text-justify"
                  dangerouslySetInnerHTML={renderHTML(modalData.body)}
                />
              </div>
            </Modal>
          </div>
        )}
        {dataContact.contactInfoType && (
          <div className="flex flex-col gap-2 font-bold px-2">
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

export default ShowUserContact;
