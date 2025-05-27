"use client";

import DeleteProductModal from "@/components/Product/DeleteProductModal";
import { setOpenShopping } from "@/redux/slice/shopping";
import { fetchCurrentCart } from "@/redux/slices/cartSlice";
import { updateCart } from "@/services/cart/cartService";
import { getUserCookie } from "@/utils/cookieUtils";
import { getImageUrl2 } from "@/utils/mainDomain";
import { Drawer, Tooltip } from "antd";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { FaCartShopping, FaTrash } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function ShoppingDrawer() {
  const open = useSelector((store) => store.shopping.openShopping);
  const { currentItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [userId, setUserId] = useState(null);

  console.log(currentItems);
  

  useEffect(() => {
    const userData = getUserCookie();
    setUserId(userData?.userId || null);
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCurrentCart());
    }
  }, [dispatch, userId]);

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
    if (!userId) return;
    try {
      await updateCart(item.id, 1, userId);
      dispatch(fetchCurrentCart());
    } catch (error) {
      console.error('Failed to increment:', error);
    }
  };

  const handleDecrement = async (item) => {
    if (!userId) return;
    if (item.quantity > 1) {
      try {
        await updateCart(item.id, -1, userId);
        dispatch(fetchCurrentCart());
      } catch (error) {
        console.error('Failed to decrement:', error);
      }
    }
  };

  // تابع برای مدیریت کلیک روی لینک‌ها
  const handleNavigation = (url) => {
    // بستن دراور
    dispatch(setOpenShopping(false));
    
    // هدایت به URL مورد نظر
    router.push(url);
  };

  // محاسبه جمع کل
  const totalPrice = currentItems?.reduce((sum, item) => {
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
        {currentItems?.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#d1182b] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {currentItems.length}
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
              سبد خرید ({currentItems?.length || 0})
            </span>
            <IoCloseOutline
              onClick={onClose}
              className="text-3xl cursor-pointer hover:bg-[#0001] rounded-full duration-300 p-1"
            />
          </div>

          {currentItems?.length === 0 ? (
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
                {currentItems?.map((item) => (
                  <div key={item.id} className="group">
                    <div className="flex flex-col p-3 relative">
                      {/* تصویر و عنوان */}
                      <div className="flex items-start gap-3">
                        <div className="w-20 h-20 flex-shrink-0 border border-[#0001] p-2 shadow-lg rounded-lg overflow-hidden flex items-center justify-center relative">
                          {item.image ? (
                            <img
                              className="w-full h-full object-contain"
                              src={getImageUrl2(item.image)}
                              alt={item.title}
                            />
                          ) : (
                            <span className="text-xs text-gray-500 text-center p-1 line-clamp-2">
                              {item.title}
                            </span>
                          )}
                          {/* لیبل تخفیف */}
                          {item.discount > 0 && (
                            <div className="absolute top-0 right-0 bg-[#d1182b] text-white text-xs px-2 py-1 rounded-bl-lg">
                              {item.discount}% 
                            </div>
                          )}
                          {/* تعداد محصول */}
                          <div className="absolute bottom-0 left-0 right-0 bg-[#d1182b]/90 text-white text-xs px-2 py-1 text-center">
                            {item.quantity} عدد
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col">
                          <div 
                            onClick={() => handleNavigation(item.url)}
                            className="text-sm text-right transition-colors duration-300 font-bold text-gray-800 hover:text-[#d1182b] cursor-pointer"
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxHeight: '2.5em',
                              lineHeight: '1.25em'
                            }}
                          >
                            {item.title}
                          </div>
                          <div className="flex justify-end mt-2">
                            <Tooltip title="حذف از سبد خرید" placement="left" zIndex={10001}>
                              <button
                                onClick={() => handleDeleteClick(item)}
                                className="text-[#d1182b] hover:bg-red-50 p-1.5 rounded-lg transition-all duration-300 cursor-pointer"
                              >
                                <FaTrash className="text-sm" />
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>

                      {/* اطلاعات محصول */}
                      <div className="mt-3 space-y-3">
                        {/* گارانتی */}
                        {item.warranty && (
                          <div className="flex items-center justify-between bg-[#d1182b]/5 px-4 py-2 rounded-lg border border-[#d1182b]/10">
                            <span className="text-sm font-bold text-[#d1182b]">{item.warranty}</span>
                          </div>
                        )}

                        {/* قیمت */}
                        <div className="flex items-center justify-between bg-[#d1182b]/5 px-4 py-2 rounded-lg border border-[#d1182b]/10">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">قیمت :</span>
                            <div className="flex items-center">
                              <span className="text-lg font-bold text-[#d1182b]">
                                {item.finalPrice.toLocaleString()}
                              </span>
                              <span className="mr-1 text-sm text-[#d1182b]">تومان</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-[1px] bg-[#d1182b]/10 my-2"></div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-[#666] text-[17px]">
                    جمع خرید:
                  </span>
                  <div className="flex items-center font-bold text-[#d1182b] text-[20px]">
                    <span>{totalPrice.toLocaleString()}</span>
                    <span className="px-1 text-[16px]">تومان</span>
                  </div>
                </div>
                <div>
                  <button 
                    onClick={() => handleNavigation("/cart")}
                    className={`w-full text-white duration-300 cursor-pointer py-2 mb-3 font-semibold rounded-lg relative z-[10001] ${
                      pathname === '/cart' 
                        ? 'bg-[#b91626]' 
                        : 'bg-[#d1182b] hover:bg-[#b91626]'
                    }`}
                  >
                    سبد خرید
                  </button>
                  <button 
                    onClick={() => handleNavigation("/cart/infosend")}
                    className={`w-full text-white duration-300 cursor-pointer py-2 font-semibold rounded-lg relative z-[10001] ${
                      pathname === '/cart/infosend'
                        ? 'bg-[#b91626]' 
                        : 'bg-[#d1182b] hover:bg-[#b91626]'
                    }`}
                  >
                    تسویه حساب
                  </button>
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
        cartType="current"
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
