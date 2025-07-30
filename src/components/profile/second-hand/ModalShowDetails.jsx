"use client";

import { selectUser } from "@/redux/slices/userSlice";
import { getUserSellAdId } from "@/services/UserSellAd/UserSellAdServices";
import { Button, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function ModalShowDetails({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const user = useSelector(selectUser);

  console.log(productDetails);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  useEffect(() => {
    const fetchProductsSec = async () => {
      setIsLoading(true);
      try {
        const productsData = await getUserSellAdId(id, user?.token);
        if (productsData.type === "error") {
          Toast.fire({
            icon: "error",
            title: productsData.message,
          });
          return;
        }
        setProductDetails(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isModalOpen) {
      fetchProductsSec();
    }
  }, [isModalOpen]);

  return (
    <>
      <Tooltip placement="top" title={"نمایش جزئیات"} arrow={true}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="p-1.5 text-gray-400 hover:text-teal-500 transition-colors cursor-pointer"
        >
          <FaEye className="text-lg" />
        </button>
      </Tooltip>
      <Modal
        title={<p className="text-xl font-semibold">جزئیات آگهی</p>}
        footer={
          <Button type="primary" onClick={() => setIsModalOpen(false)}>
            بستن
          </Button>
        }
        loading={isLoading}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default ModalShowDetails;
