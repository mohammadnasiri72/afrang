"use client";

import { fetchCartData } from "@/redux/slices/cartSlice";
import { addToCartNext, moveToCurrentCart } from "@/services/cart/CartServices";
import { getUserCookie } from "@/utils/cookieUtils";
import { getImageUrl } from "@/utils/mainDomain";
import { Divider, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { BsArchive } from "react-icons/bs";
import { FaAngleLeft, FaRecycle, FaShoppingCart } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loading from "../Loading";
import CartCounter from "../Product/CartCounter";

function sumAmount(array) {
  return array.reduce((total, current) => total + current.amount, 0);
}

function buildTree(items) {
  const itemMap = {};

  // ایجاد یک مپ برای دسترسی سریع با کلید منحصر به فرد
  items.forEach((item) => {
    const uniqueKey = `${item.productId}_${item.colorId}`;
    itemMap[uniqueKey] = { ...item, children: [] };
  });

  const tree = [];
  items.forEach((item) => {
    const uniqueKey = `${item.productId}_${item.colorId}`;

    if (item.parentId === -1) {
      tree.push(itemMap[uniqueKey]);
    } else {
      // پیدا کردن والد بر اساس productId بدون در نظر گرفتن colorId
      const parentEntries = Object.entries(itemMap)?.find(
        ([key, value]) => value.productId === item.parentId
      );

      if (parentEntries) {
        const parentKey = parentEntries[0];
        itemMap[parentKey].children.push(itemMap[uniqueKey]);
      }
    }
  });

  return tree;
}

// کامپوننت اسکلتون برای نمایش در زمان لودینگ
const BodyCardSkeleton = () => {
  return (
    <div className="flex flex-wrap">
      <div className="lg:w-3/4 w-full">
        <div className="flex flex-col gap-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-sm p-3 flex flex-wrap border-b-4 border-[#d1182b] relative z-50 animate-pulse"
            >
              <div className="sm:w-1/5 w-2/5 flex flex-col justify-between">
                <div className="relative rounded-lg overflow-hidden">
                  <div className="w-full aspect-square bg-gray-200 rounded-lg" />
                </div>
                <div className="mt-5">
                  <div className="h-6 bg-gray-200 rounded w-20 mx-auto" />
                </div>
              </div>
              <div className="sm:w-4/5 w-3/5 px-4 py-2 relative flex flex-col justify-between">
                <div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 !mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 !mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 !mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
                <div>
                  <div className="flex justify-between items-center flex-wrap mt-4">
                    <div className="flex flex-col gap-2">
                      <div className="h-5 bg-gray-200 rounded w-24" />
                      <div className="h-7 bg-gray-200 rounded w-32" />
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-32" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:w-1/4 w-full lg:pr-5 lg:mt-0 mt-3 relative z-50">
        <div className="bg-[#ececec] p-3 rounded-lg animate-pulse">
          <div className="flex justify-between py-1">
            <div className="h-5 bg-gray-200 rounded w-32" />
            <div className="h-5 bg-gray-200 rounded w-24" />
          </div>
          <div className="flex justify-between py-1 mt-2">
            <div className="h-5 bg-gray-200 rounded w-28" />
            <div className="h-5 bg-gray-200 rounded w-20" />
          </div>
          <hr className="border-[#6666] my-3" />
          <div className="bg-white p-3 rounded-lg !mb-3">
            <div className="flex justify-center items-center flex-col gap-2">
              <div className="h-6 bg-gray-200 rounded w-32" />
              <div className="h-8 bg-gray-200 rounded w-40" />
            </div>
          </div>
          <div className="h-10 bg-gray-200 rounded-lg mt-3" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-full mt-3" />
      </div>
    </div>
  );
};

const BodyCard = () => {
  const [amount, setAmount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const dispatch = useDispatch();
  const { currentItems, nextItems, cartType, loading } =
    useSelector((state) => state.cart);

  // فقط یک بار در mount شدن کامپوننت
  useEffect(() => {
    setMounted(true);
    // حذف dispatch از اینجا چون در Layout انجام می‌شود
  }, []);

  const items =
    cartType === "current" ? buildTree(currentItems) : buildTree(nextItems);

  useEffect(() => {
    if (mounted && currentItems.length > 0) {
      setAmount(sumAmount(currentItems.filter((e) => e.parentId !== -1)));
      setIsInitialLoad(false);
    }
  }, [currentItems, mounted]);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const router = useRouter();
  const [loadingItemId, setLoadingItemId] = useState(null);

 

  // محاسبه قیمت‌ها با چک کردن وجود فیلدها
  const totalPrice =
    items?.reduce((sum, item) => {
      const price = item.price1 || 0;
      const quantity = item.quantity || 0;
      return sum + price * quantity;
    }, 0) || 0;

  const totalDiscount =
    items?.reduce((sum, item) => {
      const oldPrice = item.price1 || 0;
      const price = item.finalPrice || 0;
      const quantity = item.quantity || 0;
      return sum + (oldPrice - price) * quantity;
    }, 0) || 0;

  const compeletePay = () => {
    const userData = getUserCookie();

    if (!userData?.token) {
      // ذخیره مسیر فعلی در localStorage
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push("/login");
     
    } else {
      router.push("/cart/infosend");
     
    }
  };

  const handleAddToNextCart = async (id) => {
    try {
      setLoadingItemId(id);
      const res = await addToCartNext(id);
      if (res.type === "error") {
        Toast.fire({
          icon: "error",
          text: res.message,
        });
        return;
      }
      dispatch(fetchCartData());
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: error.response.data ? error.response.data : "خطای شبکه",
      });
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleMoveToCurrentCart = async (id) => {
    try {
      setLoadingItemId(id);
      const res = await moveToCurrentCart(id);
      if (res.type === "error") {
        Toast.fire({
          icon: "error",
          text: res.message,
        });
        return;
      }
      dispatch(fetchCartData());
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: error.response.data ? error.response.data : "خطای شبکه",
      });
    } finally {
      setLoadingItemId(null);
    }
  };

  const renderCartCounter = (item) => {
    if (cartType === "next") {
      return (
        <div className="flex items-center justify-center mt-2 text-gray-600">
          <span className="text-sm">تعداد: {item.quantity}</span>
        </div>
      );
    }

    return <CartCounter quantity={item.quantity} cartId={item.id} />;
  };

  const renderActionButton = (item) => {
    const isLoading = loadingItemId === item.id;
    const buttonProps =
      cartType === "next"
        ? {
            onClick: () => !isLoading && handleMoveToCurrentCart(item.id),
            text: isLoading ? "در حال انتقال..." : "برگشت به سبد خرید",
          }
        : {
            onClick: () => !isLoading && handleAddToNextCart(item.id),
            text: isLoading ? "در حال افزودن..." : "افزودن به سبد خرید بعدی",
          };

    return (
      <div
        onClick={buttonProps.onClick}
        className={`cursor-pointer text-[#d1182b] text-xs font-semibold flex items-center gap-2 whitespace-nowrap ${
          isLoading ? "opacity-50" : "hover:opacity-80"
        }`}
      >
        {isLoading ? (
          <>
            <Spin className="custom-spin" size="small" />
            <span>{buttonProps.text}</span>
          </>
        ) : (
          <>
            <span>{buttonProps.text}</span>
            <FaAngleLeft />
          </>
        )}
      </div>
    );
  };

  // اضافه کردن منطق فیکس و اسکرول شدن باکس سبد خرید
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const [fixed, setFixed] = useState(false);
  const [stuckToBottom, setStuckToBottom] = useState(false);
  const [style, setStyle] = useState({});

  useEffect(() => {
    function handleScroll() {
      // فقط در دسکتاپ فعال باشد
      if (window.innerWidth < 1024) return;
      if (!containerRef.current || !innerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const innerRect = innerRef.current.getBoundingClientRect();
      const stickyTop = 150; // مثل offsetTop قبلی Affix
      if (containerRect.bottom <= stickyTop) {
        setFixed(false);
        setStuckToBottom(false);
        setStyle({});
      } else if (containerRect.bottom <= innerRect.height + stickyTop) {
        setFixed(false);
        setStuckToBottom(true);
        setStyle({
          position: "absolute",
          bottom: 0,
          left: 0,
          width: containerRect.width - 15,
          zIndex: 100,
        });
      } else if (containerRect.top <= stickyTop) {
        setFixed(true);
        setStuckToBottom(false);
        setStyle({
          position: "fixed",
          top: stickyTop,
          left: containerRect.left,
          width: containerRect.width - 15,
          zIndex: 100,
        });
      } else {
        setFixed(false);
        setStuckToBottom(false);
        setStyle({});
      }
    }
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // نمایش skeleton فقط در زمان loading اولیه یا عدم mount شدن
  if (!mounted || (loading && isInitialLoad)) {
    return <BodyCardSkeleton />;
  }

  return (
    <>
      <div className="flex flex-wrap z-[50] relative">
        {items?.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-10">
            <div className="text-4xl text-[#d1182b] !mb-4">
              <FaShoppingCart />
            </div>
            <h2 className="text-2xl font-semibold text-[#333] !mb-2">
              {cartType === "next" ? "لیست خرید بعدی" : "سبد خرید"} شما خالی است
            </h2>
            <p className="text-[#666]">
              برای مشاهده محصولات به صفحه اصلی مراجعه کنید
            </p>
          </div>
        ) : (
          <>
            <div className="lg:w-3/4 w-full">
              <div className="flex flex-col gap-5">
                {items?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-sm p-3 flex flex-wrap border-b-4 border-[#d1182b] relative z-50"
                  >
                    <div className="sm:w-1/5 w-2/5 flex flex-col justify-between">
                      <div className="relative rounded-lg overflow-hidden">
                        <Link
                          
                          href={item.url}
                        >
                          <Image
                           
                            className="w-full h-full object-contain"
                            src={getImageUrl(item.image)}
                            alt={item?.title}
                            width={150}
                            height={150}
                            unoptimized
                          />
                        </Link>
                        {item.discount !== 0 && (
                          <span className="absolute top-2 right-2 bg-[#d1182b] px-2 py-0.5 rounded-sm !text-white text-xs font-bold">
                            {item.discount}٪
                          </span>
                        )}
                      </div>
                      <div className="mt-5">{renderCartCounter(item)}</div>
                    </div>
                    <div className="sm:w-4/5 w-3/5 px-4 py-2 relative flex flex-col justify-between">
                      <div>
                        <Link
                         
                          href={item.url}
                        >
                          <h3 className="sm:font-semibold font-bold sm:text-lg text-sm text-[#333] !mb-3 hover:text-[#d1182b] transition-colors duration-300">
                            {item.title}
                          </h3>
                        </Link>
                        {item.warranty && (
                          <div className="flex items-center mt-2">
                            <BsArchive className="text-[#666]" />
                            <span className="px-2 sm:text-[13px] text-xs">
                              {item.warranty}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center mt-2">
                          <GoShieldCheck className="text-[#666]" />
                          <span className="px-2 sm:text-[13px] text-xs">
                            ضمانت اصل بودن کالا
                          </span>
                        </div>
                        {item.conditionId === 20 && (
                          <div className="flex items-center text-sm text-[#d1182b] mt-2">
                            <FaRecycle className="ml-1.5" />
                            <span className="font-semibold">کالای کارکرده</span>
                          </div>
                        )}
                        <div className="sm:block hidden">
                          {item.children?.length > 0 && (
                            <>
                              <div className="flex flex-wrap justify-start items-center mt-1">
                                {item.children.map((e) => (
                                  <div
                                    key={e.id}
                                    className="lg:w-1/3 w-full lg:mt-0 mt-3"
                                  >
                                    <div className="flex gap-1">
                                      <Link
                                       
                                        href={e.url}
                                      >
                                        <div className="relative w-14 h-14">
                                          <Image
                                           
                                            className="w-full h-full object-contain rounded-lg"
                                            src={getImageUrl(e.image)}
                                            alt={e?.title}
                                            width={20}
                                            height={20}
                                            unoptimized
                                          />
                                          {e.discount !== 0 && (
                                            <span className="absolute top-2 right-0 bg-[#d1182baa] px-2 py-0.5 rounded-sm !text-white text-xs font-bold">
                                              {e.discount}٪
                                            </span>
                                          )}
                                        </div>
                                      </Link>
                                      <div className="flex flex-col items-start justify-center">
                                        <Link
                                          
                                          className="hover:text-[#d1182b] text-[#0009] duration-300 px-2 !text-justify"
                                          href={e.url}
                                        >
                                          <span className="text-xs font-bold line-clamp-2 ">
                                            {e?.title}
                                          </span>
                                        </Link>
                                        {e.showPrice && (
                                          <span className=" font-bold line-clamp-2 text-[#d1182b] whitespace-nowrap px-2">
                                            {e?.finalPrice.toLocaleString()}
                                            <span className="text-xs px-1">
                                              تومان
                                            </span>
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <Divider style={{ margin: 5, padding: 0 }} />
                      <div>
                        <div className="flex justify-between items-center flex-wrap">
                          <div className="flex flex-col py-3">
                            {item.discount !== 0 && (
                              <div className="flex items-center">
                                <span className="font-semibold text-[#666] text-lg line-through">
                                  {item.price1.toLocaleString()}
                                </span>
                                <span className="px-2 text-xs text-[#666]">
                                  قیمت قبل ازتخفیف
                                </span>
                              </div>
                            )}
                            <div className="flex items-center text-[#d1182b]">
                              <span className="font-bold text-2xl">
                                {item.finalPrice.toLocaleString()}
                              </span>
                              <span className="px-2 text-xs font-bold">
                                تومان{" "}
                              </span>
                            </div>
                          </div>
                          {renderActionButton(item)}
                        </div>
                      </div>
                    </div>
                    <div className="sm:hidden block">
                      {item.children?.length > 0 && (
                        <>
                          <div className="flex flex-wrap justify-between items-center mt-2">
                            {item.children.map((e) => (
                              <div
                                key={e.id}
                                className="lg:w-1/3 w-full lg:mt-0 mt-3"
                              >
                                <div className="flex gap-1">
                                  <Link
                                    
                                    href={e.url}
                                  >
                                    <div className="relative w-14 h-14">
                                      <Image
                                       
                                        className="w-full h-full object-contain rounded-lg"
                                        src={getImageUrl(e.image)}
                                        alt={e?.title}
                                        width={20}
                                        height={20}
                                        unoptimized
                                      />
                                      {e.discount !== 0 && (
                                        <span className="absolute top-2 right-0 bg-[#d1182baa] px-2 py-0.5 rounded-sm !text-white text-xs font-bold">
                                          {e.discount}٪
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                  <div className="flex flex-col items-start justify-center">
                                    <Link
                                      
                                      className="hover:text-[#d1182b] text-[#0009] duration-300 px-2 !text-justify"
                                      href={e.url}
                                    >
                                      <span className="text-xs font-bold line-clamp-2 ">
                                        {e?.title}
                                      </span>
                                    </Link>
                                    {e.showPrice && (
                                      <span className=" font-bold line-clamp-2 text-[#d1182b] whitespace-nowrap px-2">
                                        {e?.finalPrice.toLocaleString()}
                                        <span className="text-xs px-1">
                                          تومان
                                        </span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* نمایش جمع و سود خرید برای موبایل و تبلت (بین sm و lg) */}
            {cartType === "current" && (
              <div className="w-full mt-3 lg:hidden">
                <div className="bg-[#ececec] p-3 rounded-lg">
                  <div className="flex justify-between text-[#444] py-1 font-bold text-sm">
                    <span>قیمت کالاها ({items?.length || 0})</span>
                    <span>{(totalPrice + amount).toLocaleString()}</span>
                  </div>
                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-[#444] py-1 font-bold text-sm">
                      <span>سود شما از این خرید</span>
                      <span>{totalDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  {/* جمع سبد خرید و دکمه فقط در md و پایین‌تر از lg اما بالاتر از sm نمایش داده شود */}
                  <div className="hidden md:block sm:block mt-3">
                    <div className="bg-white p-3 rounded-lg !mb-3">
                      <div className="flex justify-center items-center flex-col gap-2">
                        <span className="font-bold text-lg">جمع سبد خرید:</span>
                        <div className="flex items-center">
                          <span className="font-bold text-2xl text-[#d1182b]">
                            {(
                              totalPrice -
                              totalDiscount +
                              amount
                            ).toLocaleString()}
                          </span>
                          <span className="mr-1">تومان</span>
                        </div>
                      </div>
                      <button
                        onClick={compeletePay}
                        className="w-full flex justify-center items-center gap-2 !text-white bg-[#d1182b] cursor-pointer py-2 rounded-lg duration-300 hover:bg-[#40768c] mt-3"
                      >
                        <FaShoppingCart />
                        <span>تسویه حساب</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* جمع سبد خرید و دکمه فقط در دسکتاپ (lg و بالاتر) داخل باکس فیکس شده */}
            {cartType === "current" && (
              <div
                ref={containerRef}
                className="w-1/4 pr-5 lg:mt-0 mt-3 relative z-50 hidden lg:block"
                style={{ position: "relative" }}
              >
                <div
                  ref={innerRef}
                  style={
                    fixed || stuckToBottom
                      ? style
                      : { position: "sticky", top: 150 }
                  }
                >
                  <div className="bg-[#ececec] p-3 rounded-lg">
                    <div className="flex justify-between text-[#444] py-1 font-bold">
                      <span>قیمت کالاها ({items?.length || 0})</span>
                      <span>{(totalPrice + amount).toLocaleString()}</span>
                    </div>
                    {totalDiscount > 0 && (
                      <div className="flex justify-between text-[#444] py-1 font-bold">
                        <span>سود شما از این خرید</span>
                        <span>{totalDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    <hr className="border-[#6666] my-3" />
                    <div className="bg-white p-3 rounded-lg !mb-3">
                      <div className="flex justify-center items-center flex-col">
                        <span className="font-bold text-lg">جمع سبد خرید:</span>
                        <div className="flex items-center">
                          <span className="font-bold text-2xl text-[#d1182b]">
                            {(
                              totalPrice -
                              totalDiscount +
                              amount
                            ).toLocaleString()}
                          </span>
                          <span className="mr-1">تومان</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={compeletePay}
                      className="w-full sm:flex hidden justify-center items-center gap-2 !text-white bg-[#d1182b] cursor-pointer py-2 rounded-lg duration-300 hover:bg-[#40768c] mt-3"
                    >
                      <FaShoppingCart />
                      <span>تسویه حساب</span>
                    </button>
                  </div>
                  <p className="text-[#444]">
                    این سفارش نهایی نشده و افزودن کالاها به سبد خرید به منزله
                    رزرو آنها نمی‌باشد.
                  </p>
                </div>
              </div>
            )}

            <div className="fixed sm:hidden block bottom-10 left-0 right-0 z-[50] bg-[#ececec]">
              <div className="bg-white p-3 rounded-lg !mb-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">جمع سبد خرید:</span>
                  <div className="flex items-center">
                    <span className="font-bold text-2xl text-[#d1182b]">
                      {(totalPrice - totalDiscount).toLocaleString()}
                    </span>
                    <span className="mr-1">تومان</span>
                  </div>
                </div>
                <button
                  onClick={compeletePay}
                  className="w-full flex justify-center items-center gap-2 !text-white bg-[#d1182b] cursor-pointer py-2 rounded-lg duration-300 hover:bg-[#40768c] mt-3"
                >
                  <FaShoppingCart />
                  <span>تسویه حساب</span>
                </button>
              </div>
            </div>
          </>
        )}
        <style jsx global>{`
          .custom-spin .ant-spin-dot-item {
            background-color: #d1182b !important;
          }
        `}</style>
      </div>
    </>
  );
};

export default BodyCard;
