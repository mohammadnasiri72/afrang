"use client";

import DeleteProductModal from "@/components/Product/DeleteProductModal";
import { setOpenShopping } from "@/redux/slice/shopping";
import { fetchCartData } from "@/redux/slices/cartSlice";
import { updateCart } from "@/services/cart/cartService";
import { getImageUrl } from "@/utils/mainDomain";
import { Divider, Drawer } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import { FaCartShopping, FaTrash, FaPlus, FaMinus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

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
  

  const handleIncrement = async (item) => {
    try {
      await updateCart(item.id, 1, userId);
      dispatch(fetchCartData(cartType));
    } catch (error) {
      console.error('Failed to increment:', error);
    }
    // console.log(item.id);
    
  };

  const handleDecrement = async (item) => {
    if (item.quantity > 1) {
      try {
        await updateCart(item.id, -1, userId);
        dispatch(fetchCartData(cartType));
      } catch (error) {
        console.error('Failed to decrement:', error);
      }
    }
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
          className="text-3xl cursor-pointer"
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
        <div className="flex flex-col h-full">
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
              <div className="flex-1 overflow-auto">
                {items?.map((item) => (
                  <div key={item.id}>
                    <div className="flex flex-col sm:flex-row p-3">
                      <div className="w-full sm:w-20 sm:h-20 w-36 h-36 border border-[#0001] p-3 shadow-lg rounded-lg overflow-hidden flex items-center justify-center relative">
                        {item.image ? (
                          <img
                            className="w-full h-full object-contain"
                            src={getImageUrl(item.image)}
                            alt={item.title}
                          />
                        ) : (
                          <span className="text-xs text-gray-500 text-center p-1 line-clamp-3">
                            {item.title}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-start px-3 gap-1 flex-1 min-w-0 mt-5 sm:mt-0">
                        <Link 
                          href={item.url}
                          onClick={onClose}
                          className="text-sm line-clamp-2 w-full hover:text-[#d1182b] transition-colors duration-300 font-bold !text-gray-800 no-underline"
                        >
                          {item.title}
                        </Link>
                        <div className="flex items-center">
                          <span className="font-semibold">
                            {item.finalPrice.toLocaleString()}
                          </span>
                          <span className="px-1 text-xs">تومان</span>
                        </div>
                        
                        {/* دکمه‌های کنترل تعداد و حذف */}
                        <div className="flex items-center gap-2 mt-1 w-full">
                          {/* گروه دکمه‌های + و - */}
                          <div className="flex items-center border border-[#d1182b] rounded-lg sm:hidden">
                            <button
                              onClick={() => handleIncrement(item)}
                              className="text-lg text-[#d1182b] cursor-pointer font-semibold px-3 py-1 hover:text-red-700 transition-colors"
                            >
                              +
                            </button>
                            <span className="text-base font-bold px-2">{item.quantity}</span>
                            <button
                              onClick={() => handleDecrement(item)}
                              disabled={item.quantity === 1}
                              className={`text-lg font-semibold px-3 py-1 transition-colors ${
                                item.quantity === 1 
                                  ? 'text-gray-300 cursor-not-allowed' 
                                  : 'text-[#d1182b] cursor-pointer hover:text-red-700'
                              }`}
                            >
                              -
                            </button>
                          </div>

                          {/* دکمه حذف */}
                          <button
                            onClick={() => handleDeleteClick(item)}
                            className="p-1.5 text-[#d1182b] hover:bg-red-50 rounded-lg transition-colors cursor-pointer sm:hidden"
                          >
                            <FaTrash className="text-base" />
                          </button>

                          {/* نسخه دسکتاپ - نمایش با هاور */}
                          <div className="hidden sm:block absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100">
                              <button
                                onClick={() => handleIncrement(item)}
                                className="w-7 h-6 flex items-center justify-center text-white bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl cursor-pointer text-xs"
                              >
                                <FaPlus />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(item)}
                                className="w-7 h-6 flex items-center justify-center text-white bg-[#d1182b]/80 hover:bg-[#d1182b] rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl cursor-pointer text-xs"
                              >
                                <FaTrash />
                              </button>
                              <button
                                onClick={() => handleDecrement(item)}
                                disabled={item.quantity === 1}
                                className={`w-7 h-6 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg cursor-pointer text-xs ${
                                  item.quantity === 1 
                                    ? 'text-gray-300 bg-gray-400/30 cursor-not-allowed' 
                                    : 'text-white bg-black/50 hover:bg-black/70 hover:scale-110 active:scale-95 hover:shadow-xl'
                                }`}
                              >
                                <FaMinus />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Divider variant="dashed" dashed />
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
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
                    <button className="w-full bg-[#d1182b] text-white duration-300 hover:bg-[#b91626] cursor-pointer py-3 mb-3 font-semibold rounded-lg">
                      سبد خرید
                    </button>
                  </Link>
                  <Link onClick={onClose} href={"/cart/infosend"}>
                    <button className="w-full bg-[#d1182b] text-white duration-300 hover:bg-[#b91626] cursor-pointer py-3 font-semibold rounded-lg">
                      تسویه حساب
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
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
