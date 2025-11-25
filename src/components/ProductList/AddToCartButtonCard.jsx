"use client";

import { fetchCurrentCart, fetchNextCart } from "@/redux/slices/cartSlice";
import { getUserCookie } from "@/utils/cookieUtils";
import { message } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addToCart } from "../../services/cart/cartService";
import { getProductId } from "../../services/products/productService";
import ModalAddtoBasket from "../ModalAddtoBasket";
import DeleteProductModal from "../Product/DeleteProductModal";

const generateRandomUserId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const AddToCartButtonCard = ({ productId , accessory}) => {
  const { currentItems } = useSelector((state) => state.cart);
  const itemsArray = Array.isArray(currentItems) ? currentItems : [];
  const cartItem = itemsArray?.find((item) => item.productId === productId);
  const [product, setProduct] = useState(null);
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
      if (productDetails?.warranty?.warrantyWays.length > 0) {
        setSelectedWarranty(productDetails?.warranty?.warrantyWays[0] || null);
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
      {!cartItem || cartItem.quantity === 0 || cartItem.parentId !== -1 ? (
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className={`flex items-center bg-[#d1182b] !text-white duration-300 hover:bg-[#40768c] w-full justify-center gap-2 cursor-pointer rounded-sm disabled:opacity-50 disabled:cursor-not-allowed ${accessory ? 'p-1 !text-xs':'p-2'}`}
        >
          <FaCartShopping className="" />
          <span className="line-clamp-1">
            {isLoading ? "در حال بارگذاری..." : "افزودن به سبد خرید"}
          </span>
        </button>
      ) : (
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          disabled={isLoading}
          className="flex items-center bg-[#d1182b] !text-white duration-300 hover:bg-[#40768c] w-full p-2 justify-center gap-2 cursor-pointer rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaTrash className="" />
          <span className="">
            {isLoading ? "در حال بارگذاری..." : "حذف از سبد خرید"}
          </span>
        </button>
      )}

      <ModalAddtoBasket
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        product={product}
        selectedWarranty={selectedWarranty}
        setSelectedWarranty={setSelectedWarranty}
        isLoading={isLoading}
        selectedColorId={selectedColorId}
        setSelectedColorId={setSelectedColorId}
        handleConfirm={handleConfirm}
      />

      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        cartId={cartItem?.id}
      />
    </>
  );
};

export default AddToCartButtonCard;
