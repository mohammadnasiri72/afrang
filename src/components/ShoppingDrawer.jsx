"use client";

import { setOpenShopping } from "@/redux/slice/shopping";
import { Divider, Drawer } from "antd";
import Link from "next/link";
import { FaCartShopping, FaTrash } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { mainDomainImg } from "@/utils/mainDomain";
import { deleteCartItem } from "@/services/cart/cartService";
import { fetchCart } from "@/redux/slices/cartSlice";
import Cookies from "js-cookie";
import { useState } from "react";
import Swal from "sweetalert2";
import DeleteProductModal from "@/components/Product/DeleteProductModal";

function ShoppingDrawer() {
  const open = useSelector((store) => store.shopping.openShopping);
  const { items, cartType } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const userId = JSON.parse(Cookies.get("user"))?.userId;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const onClose = () => {
    dispatch(setOpenShopping(false));
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  // محاسبه جمع کل
  const totalPrice = items?.reduce((sum, item) => {
    const price = item.finalPrice || 0;
    const quantity = item.quantity || 0;
    return sum + price * quantity;
  }, 0) || 0;

  const styles = {
    body: {
      padding: "10px",
    },
    header: {
      display: "none",
    },
  };

  return (
    <>
      <div className="relative">
        <FaCartShopping
          onClick={() => {
            dispatch(setOpenShopping(true));
          }}
          className="text-[#d1182b] text-3xl cursor-pointer"
        />
        {items?.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#d1182b] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </div>

      <Drawer
        zIndex={10000}
        placement={"left"}
        closable={true}
        onClose={onClose}
        open={open}
        width={300}
        styles={styles}
      >
        <div className="flex justify-between items-center pb-3">
          <span className="text-[#666] text-[15px]">
            سبد خرید ({items?.length || 0})
          </span>
          <IoCloseOutline
            onClick={onClose}
            className="text-3xl cursor-pointer hover:bg-[#0001] rounded-full duration-300 p-1"
          />
        </div>

        {items?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="text-4xl text-[#d1182b] mb-4">
              <FaCartShopping />
            </div>
            <p className="text-[#666] text-center">
              سبد خرید شما خالی است
            </p>
          </div>
        ) : (
          <>
            {items?.map((item) => (
              <div key={item.id}>
                <div className="flex">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    {item.image ? (
                      <img
                        className="w-full h-full object-cover"
                        src={mainDomainImg + item.image}
                        alt={item.title}
                      />
                    ) : (
                      <span className="text-xs text-gray-500 text-center p-1 line-clamp-3">
                        {item.title}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-start px-3 gap-1 flex-1 min-w-0">
                    <span className="text-sm line-clamp-2 w-full">{item.title}</span>
                    <div className="flex items-center">
                      <span className="font-semibold">
                        {item.finalPrice.toLocaleString()}
                      </span>
                      <span className="px-1 text-xs">تومان</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        تعداد: {item.quantity}
                      </span>
                      <FaTrash
                        onClick={() => handleDeleteClick(item)}
                        className="text-[#d1182b] cursor-pointer hover:text-[#b91626] transition-colors"
                      />
                    </div>
                  </div>
                </div>
                <Divider variant="dashed" dashed />
              </div>
            ))}

            <Divider
              style={{
                borderColor: "#666",
                marginTop: "30px",
                marginBottom: "10px",
              }}
            />
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#666] text-[17px]">
                جمع خرید:
              </span>
              <div className="flex items-center font-semibold text-[#666] text-[16px]">
                <span>{totalPrice.toLocaleString()}</span>
                <span className="px-1">تومان</span>
              </div>
            </div>
            <div>
              <Link onClick={onClose} href={"/cart"}>
                <button className="w-full bg-[#d1182b] text-white duration-300 hover:bg-[#b91626] cursor-pointer py-3 mt-5 font-semibold rounded-lg">
                  سبد خرید
                </button>
              </Link>
              <Link onClick={onClose} href={"/cart/infosend"}>
                <button className="w-full bg-[#d1182b] text-white duration-300 hover:bg-[#b91626] cursor-pointer py-3 mt-5 font-semibold rounded-lg">
                  تسویه حساب
                </button>
              </Link>
            </div>
          </>
        )}
      </Drawer>

      <DeleteProductModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        cartId={itemToDelete?.id}
        cartType={cartType}
      />

      <style jsx global>{`
        .confirm-modal-wrapper {
          position: fixed;
          inset: 0;
          z-index: 99999;
        }
      `}</style>
    </>
  );
}

export default ShoppingDrawer;
