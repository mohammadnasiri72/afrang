"use client";
import { getUserAdSell } from "@/services/UserAd/UserAdServices";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function BoxSellSec() {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  console.log(productList);

  // تنظیمات Toast
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
      setLoading(true);
      const data = {
        LangCode: "fa",
        CategoryIdArray: [],
        // Amount1: "",
        // Amount2: "",
        // IsActive: true,
        OrderBy: 1,
        OrderOn: 1,
        PageSize: 20,
        PageIndex: 1,
      };
      try {
        const productsData = await getUserAdSell(data);
        if (productsData.type === "error") {
          Toast.fire({
            icon: "error",
            title: productsData.message,
          });
          return;
        }
        setProductList(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsSec();
  }, []);

  return (
    <>
      <div>BoxSellSec</div>
    </>
  );
}

export default BoxSellSec;
