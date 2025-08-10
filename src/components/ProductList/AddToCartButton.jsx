"use client";

import { fetchCurrentCart, fetchNextCart } from "@/redux/slices/cartSlice";
import { getUserCookie } from "@/utils/cookieUtils";
import { getImageUrl2 } from "@/utils/mainDomain";
import { Modal, message } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaCartShopping, FaCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addToCart } from "../../services/cart/cartService";
import { getProductId } from "../../services/products/productService";
import CartCounter from "../Product/CartCounter";
import Link from "next/link";

const generateRandomUserId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const AddToCartButton = ({ productId }) => {
  const { currentItems } = useSelector((state) => state.cart);
  const itemsArray = Array.isArray(currentItems) ? currentItems : [];
  const cartItem = itemsArray.find((item) => item.productId === productId);
  const [product, setProduct] = useState(null);
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const productDetails = await getProductId(productId);
      setProduct(productDetails);
      if (Object.keys(productDetails.warranties).length > 0) {
        const firstWarrantyId = Object.keys(productDetails.warranties)[0];
        setSelectedWarranty({
          id: firstWarrantyId,
          title: productDetails.warranties[firstWarrantyId],
        });
      }
      // انتخاب رنگ پیش‌فرض
      if (
        productDetails?.productModes &&
        productDetails.productModes.length > 0
      ) {
        setSelectedColorId(productDetails.productModes[0].id);
      } else {
        setSelectedColorId(null);
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      message.error("خطا در دریافت اطلاعات محصول");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      const userData = getUserCookie();
      let userId;
      if (!userData?.token) {
        if (userData?.userId) {
          userId = userData.userId;
        } else {
          userId = generateRandomUserId();
          const initialData = {
            token: "",
            refreshToken: "",
            expiration: "",
            userId: userId,
            displayName: "",
            roles: [],
          };
          Cookies.set("user", JSON.stringify(initialData), {
            expires: 7,
            path: "/",
          });
        }
      } else {
        userId = userData.userId;
      }
      await addToCart(
        productId,
        selectedWarranty?.id || -1,
        userId,
        1,
        selectedColorId ?? -1
      );

      setIsModalOpen(false);
      dispatch(fetchCurrentCart());
      dispatch(fetchNextCart());
      Toast.fire({
        icon: "success",
        text: "محصول با موفقیت به سبد خرید اضافه شد",
      });
    } catch (error) {
      message.error("خطا در افزودن به سبد خرید");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {(!cartItem || cartItem.quantity === 0) && (
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="flex items-center bg-[#d1182b] text-white duration-300 hover:bg-[#40768c] w-full p-2 justify-center gap-2 cursor-pointer rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaCartShopping className="" />
          <span className="">
            {isLoading ? "در حال بارگذاری..." : "افزودن به سبد خرید"}
          </span>
        </button>
      )}
      {cartItem && cartItem.quantity > 0 && (
        <CartCounter quantity={cartItem.quantity} cartId={cartItem.id} ctrl />
      )}

      <Modal
        title=""
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        {product && (
          <div className="flex flex-col gap-4">
            {/* اطلاعات محصول */}
            <div className="flex gap-4">
              <div className="sm:w-32 w-24 sm:h-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={getImageUrl2(product.product.image)}
                  alt={product.product.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-800 mb-1 line-clamp-2 pl-2">
                  {product.product.title}
                </h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                  {product.product.description}
                </p>
                {/* قیمت */}
                <div>
                  {product.product.discount > 0 ? (
                    <div className="flex flex-col">
                      <span className="text-gray-400 line-through text-xs">
                        {product.product.price1?.toLocaleString()} تومان
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[#d1182b] text-lg font-bold">
                          {product.product.finalPrice?.toLocaleString()} تومان
                        </span>
                        <span className="text-xs bg-red-100 text-[#d1182b] px-1.5 py-0.5 rounded">
                          {product.product.discount}% تخفیف
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[#d1182b] text-lg font-bold">
                      {product.product.finalPrice?.toLocaleString()} تومان
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* گارانتی‌ها */}
            {Object.keys(product.warranties).length > 0 && (
              <div className="mt-3">
                <h4 className="font-semibold text-gray-800 text-sm mb-2">
                  انتخاب گارانتی
                </h4>
                <div className="space-y-1.5">
                  {Object.entries(product.warranties).map(([id, title]) => (
                    <label
                      key={id}
                      className="flex items-center gap-2 cursor-pointer hover:text-[#d1182b] transition-colors duration-300"
                    >
                      <input
                        type="radio"
                        name="warranty"
                        value={id}
                        checked={selectedWarranty?.id === id}
                        onChange={() => setSelectedWarranty({ id, title })}
                        className="w-3.5 h-3.5 text-[#d1182b] border-gray-300 focus:ring-[#d1182b]"
                      />
                      <span className="text-xs">{title}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            {/* رنگ‌ها */}
            {product?.productModes && product.productModes.length > 0 && (
              <div className="mt-3">
                <h4 className="font-semibold text-gray-800 text-sm mb-2">
                  انتخاب رنگ
                </h4>
                <div className="flex gap-4 flex-wrap">
                  {product.productModes.map((mode) => {
                    let color = "#eee";
                    try {
                      const filesObj = JSON.parse(mode.files || "{}");
                      if (filesObj.Color) color = filesObj.Color;
                    } catch {}
                    const isSelected = selectedColorId === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setSelectedColorId(mode.id)}
                        className={`flex flex-col items-center group focus:outline-none cursor-pointer`}
                      >
                        <span
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-200 mb-1 relative flex items-center justify-center ${
                            isSelected
                              ? "border-blue-600 shadow-lg scale-110"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                        >
                          {isSelected && (
                            <FaCheck className="absolute text-white text-base bg-blue-500 rounded-full p-0.5 w-3 h-3 -bottom-1 -left-1 shadow" />
                          )}
                        </span>
                        <span
                          className={`text-xs text-gray-600 group-hover:text-blue-700 ${
                            isSelected ? "font-bold text-blue-700" : ""
                          }`}
                        >
                          {mode.propertyValue}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* دکمه تایید و مشاهده جزئیات */}
            <div className="mt-2 flex sm:flex-nowrap flex-wrap justify-end gap-2">
              {product && product.product && product.product.url && (
                <Link className="sm:w-auto w-full" href={product.product.url} target="_blank">
                  <button
                    type="button"
                    className="bg-[#40768c] sm:w-auto w-full text-white px-4 py-1.5 rounded-lg hover:bg-[#28506a] transition-colors duration-300 text-sm cursor-pointer"
                  >
                    مشاهده جزئیات محصول
                  </button>
                </Link>
              )}
              <button
                onClick={handleConfirm}
                disabled={isLoading || !product.canAddCart}
                className="bg-[#d1182b] sm:w-auto w-full text-white px-5 py-1.5 rounded-lg hover:bg-[#b31525] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
              >
                {isLoading ? "در حال پردازش..." : "تایید و افزودن به سبد خرید"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AddToCartButton;
