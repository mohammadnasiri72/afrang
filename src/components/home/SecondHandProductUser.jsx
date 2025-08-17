"use client";
import { getUserAdSell } from "@/services/UserAd/UserAdServices";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCaretLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import ProductMain from "./ProductMain";
import ProductMainUser from "./ProductMainUser";

function SecondHandProductUser() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const fetchProductsSec = async (data) => {
    setLoading(true);
    try {
      const productsData = await getUserAdSell(data);
      if (productsData?.type === "error") {
        Toast.fire({
          icon: "error",
          title: productsData.message,
        });
        return;
      }
      setFilteredProducts(productsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsSec({
      LangCode: "fa",
      PageSize: 10,
      PageIndex: 1,
      OrderBy: 1,
    });
  }, []);

  //   useEffect(() => {
  //     const fetchOldProducts = async () => {
  //       try {
  //         const oldProduct = await getProducts({
  //           page: 1,
  //           pageSize: 12,
  //           orderBy: "2",
  //           ConditionId: 20,
  //         });
  //         if (oldProduct.type === "error") {
  //           Toast.fire({
  //             icon: "error",
  //             text: oldProduct.message,
  //           });
  //           return;
  //         } else {
  //           setOldProducts(oldProduct);
  //         }
  //       } catch (error) {
  //         Toast.fire({
  //           icon: "error",
  //           text: error.response?.data ? error.response?.data : "خطای شبکه",
  //         });
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchOldProducts();
  //   }, []);

  // اسکلتون لودینگ

  const SecondHandProductSkeleton = () => {
    return (
      <div className="animate-pulse sm:px-16 px-2">
        {/* اسکلتون بخش موبایل */}
        <div className="lg:hidden w-full">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center gap-2 min-w-max px-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center">
                  <div className="h-5 w-20 bg-gray-200 rounded"></div>
                  {item < 5 && <span className="mx-2">/</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center sm:px-4">
          {/* اسکلتون عنوان */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="h-8 w-64 bg-gray-200 rounded-lg"></div>
          </div>

          {/* اسکلتون دسته‌بندی‌ها در دسکتاپ */}
          <div className="hidden lg:flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center">
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
                {item < 5 && <span className="mx-2">/</span>}
              </div>
            ))}
          </div>

          {/* اسکلتون دکمه نمایش همه در دسکتاپ */}
          <div className="hidden lg:flex">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* اسکلتون محصولات */}
        <div className="mt-10">
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="bg-white rounded-lg p-4">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
            {/* اسکلتون دکمه‌های ناوبری */}
            <div className="sm:hidden flex items-center justify-between absolute left-0 right-0 bottom-1">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <SecondHandProductSkeleton />;
  }

  return (
    <>
      <div className="sm:px-16 px-2">
        {/* بخش موبایل */}
        <div className="lg:hidden w-full">
          <div className="flex items-center justify-between mb-3 px-2">
            <h2 className="title-SecondHand relative text-[#222] duration-300 text-lg font-semibold">
              {" "}
              دست دوم های کاربران
            </h2>
            <button
              onClick={() => {
                router.push(`/useds/-1`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-1 text-[#d1182b] hover:text-[#d1182b]/80 transition-colors cursor-pointer"
            >
              <span className="text-sm">نمایش همه</span>
              <FaCaretLeft className="text-sm" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center sm:px-4">
          <div className="lg:flex hidden flex-wrap gap-4 items-center">
            <button className="title-SecondHand relative text-[#222] duration-300 text-lg font-semibold">
              دست دوم های کاربران
            </button>
          </div>

          {/* دکمه نمایش همه در دسکتاپ */}
          <div
            onClick={() => {
              router.push(`/useds/-1`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hidden lg:flex items-center cursor-pointer duration-300 hover:text-[#d1182b] font-medium"
          >
            <span>نمایش همه</span>
            <FaCaretLeft />
          </div>
        </div>
        <div className="mt-5">
          <ProductMainUser products={filteredProducts} />
        </div>
      </div>
    </>
  );
}

export default SecondHandProductUser;
