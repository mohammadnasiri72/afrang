"use client";
import { getProductListId } from "@/services/products/productService";
import { getImageUrl, getImageUrl2 } from "@/utils/mainDomain";
import { useEffect, useState, useRef } from "react";
import { FaCaretDown } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { Modal, message } from "antd";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { addToCart, deleteCartItem } from "@/services/cart/cartService";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentCart, fetchNextCart } from "@/redux/slices/cartSlice";
import { getUserCookie } from "@/utils/cookieUtils";
import { getProductId } from "@/services/products/productService";
import { createPortal } from "react-dom";
import Link from "next/link";

const generateRandomUserId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

function SelectProductMokamel({ product }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [optionalProducts, setOptionalProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductToAdd, setSelectedProductToAdd] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [removingProductId, setRemovingProductId] = useState(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.cart);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0, width: 320 });

  // محاسبه موقعیت باکس نتایج هنگام نمایش و اسکرول/resize
  useEffect(() => {
    function updateDropdownPosition() {
      if (showResults && searchRef.current) {
        const rect = searchRef.current.getBoundingClientRect();
        setDropdownPosition({
          left: rect.left + window.scrollX,
          top: rect.bottom + window.scrollY + 4,
          width: rect.width,
        });
      }
    }
    if (showResults) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition, true);
      window.addEventListener('resize', updateDropdownPosition);
    }
    return () => {
      window.removeEventListener('scroll', updateDropdownPosition, true);
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [showResults]);

  useEffect(() => {
    const fetchOptionalProducts = async () => {
      if (product?.product?.optionalId) {
        const ids = product.product.optionalId.split(',').map(id => parseInt(id));
        const data = {
          ids: ids
        };

        const result = await getProductListId(data);
        if (result && Array.isArray(result)) {
          setOptionalProducts(result);
        }
      }
    };

    fetchOptionalProducts();
  }, [product]);

  // مقداردهی اولیه انتخاب‌شده‌ها بر اساس سبد خرید و لیست مکمل
  useEffect(() => {
    if (!optionalProducts.length || !currentItems) return;
    const itemsArray = Array.isArray(currentItems) ? currentItems : [];
    const selected = optionalProducts
      .map((p) => p.productId)
      .filter((id) => itemsArray.some((item) => item.productId === id));
    setSelectedProducts(selected);
  }, [optionalProducts, currentItems]);

  // هماهنگ‌سازی انتخاب‌ها با سبد خرید
  useEffect(() => {
    if (!currentItems) return;
    const itemsArray = Array.isArray(currentItems) ? currentItems : [];
    setSelectedProducts((prevSelected) =>
      prevSelected.filter((id) => itemsArray.some((item) => item.productId === id))
    );
  }, [currentItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddToCart = async (productId) => {
    setSelectedProductToAdd(productId);
    setIsLoading(true);
    setLoadingProductId(productId);
    try {
      const productDetails = await getProductId(productId);
      setSelectedProductDetails(productDetails);
      // انتخاب اولین گارانتی به صورت پیش‌فرض
      if (productDetails && Object.keys(productDetails.warranties).length > 0) {
        const firstWarrantyId = Object.keys(productDetails.warranties)[0];
        setSelectedWarranty({
          id: firstWarrantyId,
          title: productDetails.warranties[firstWarrantyId],
        });
      } else {
        setSelectedWarranty(null);
      }
      // انتخاب رنگ پیش‌فرض
      if (productDetails?.productModes && productDetails.productModes.length > 0) {
        setSelectedColorId(productDetails.productModes[0].id);
      } else {
        setSelectedColorId(null);
      }
      setIsModalOpen(true);
    } catch (error) {
      message.error("خطا در دریافت اطلاعات محصول");
    } finally {
      setIsLoading(false);
      setLoadingProductId(null);
    }
  };

  const handleConfirmAdd = async () => {
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
          Cookies.set("user", JSON.stringify(initialData), { expires: 7, path: "/" });
        }
      } else {
        userId = userData.userId;
      }
      await addToCart(selectedProductToAdd, selectedWarranty?.id || -1, userId, 1, selectedColorId ?? -1);
      setSelectedProducts([...selectedProducts, selectedProductToAdd]);
      setIsModalOpen(false);
      setSelectedProductDetails(null);
      setSelectedWarranty(null);
      setSelectedColorId(null);
      dispatch(fetchCurrentCart());
      dispatch(fetchNextCart());
      Swal.fire({
        icon: "success",
        text: "محصول با موفقیت به سبد خرید اضافه شد",
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: "toast-modal",
      });
    } catch (error) {
      message.error("خطا در افزودن به سبد خرید");
    } finally {
      setIsLoading(false);
      setLoadingProductId(null);
      setShowResults(false);
    }
  };

  // حذف از سبد خرید بدون کانفرم
  const handleRemoveFromCart = async (productId) => {
    try {
      setIsLoading(true);
      setRemovingProductId(productId);
      const userData = getUserCookie();
      let userId = userData?.userId;
      // پیدا کردن cartId مربوط به این محصول
      const cartItem = currentItems?.find(item => item.productId === productId);
      if (!cartItem || !userId) return;
      await deleteCartItem(cartItem.id, userId);
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
      dispatch(fetchCurrentCart());
      dispatch(fetchNextCart());
      Swal.fire({
        icon: "success",
        text: "محصول با موفقیت از سبد خرید حذف شد",
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: "toast-modal",
      });
    } catch (error) {
      message.error("خطا در حذف از سبد خرید");
    } finally {
      setIsLoading(false);
      setRemovingProductId(null);
      setShowResults(false);
    }
  };

  const filteredProducts = optionalProducts.filter((item) =>
    selectedProducts.includes(item.productId)
  );
  const searchResults = optionalProducts.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="mt-5 custom-select-productDetails">
        <div className="text-2xl font-bold py-3 text-[#d1182b]">کالای مکمل</div>
        <div className="" ref={searchRef}>
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#d1182b]"
            type="text"
            placeholder="جستجو و انتخاب کالای مکمل..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setShowResults(true);
            }}
            onClick={() => setShowResults(true)}
          />
          {showResults && typeof window !== 'undefined' && createPortal(
            <div
              ref={dropdownRef}
              className="absolute bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] max-h-96 overflow-y-auto z-[99]"
              style={{
                left: dropdownPosition.left,
                top: dropdownPosition.top,
                width: dropdownPosition.width,
                minWidth: 240,
              }}
            >
              <div className="p-2">
                {searchResults.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {searchResults.map(product => {
                      const isSelected = selectedProducts.includes(product.productId);
                      return (
                        <div
                          key={product.productId}
                          className={`flex items-center gap-3 p-3 transition-colors rounded-lg border border-gray-100 cursor-pointer ${isSelected ? 'bg-[#d1182b10]' : 'bg-white hover:bg-gray-50'} relative`}
                          onClick={() => {
                            if (isSelected) {
                              handleRemoveFromCart(product.productId);
                            } else {
                              handleAddToCart(product.productId);
                            }
                          }}
                          onMouseDown={e => e.preventDefault()}
                        >
                          {/* لودینگ هنگام افزودن یا حذف */}
                          {(loadingProductId === product.productId || removingProductId === product.productId) && (
                            <span className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-lg">
                              <span className="inline-block w-5 h-5 border-2 border-[#d1182b] border-t-transparent rounded-full animate-spin align-middle" style={{ borderRightColor: 'transparent', borderBottomColor: 'transparent' }}></span>
                            </span>
                          )}
                          <div className="w-16 h-16 relative flex-shrink-0 overflow-hidden">
                            <img
                              src={getImageUrl2(product.image)}
                              alt={product.title}
                              width={64}
                              height={64}
                              className="object-contain w-16 h-16"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                              {product.title}
                            </h3>
                            <div className="mt-1 flex items-center gap-2">
                              {product.finalPrice > 0 && !product.callPriceButton && (
                                <>
                                  <span className="text-sm font-bold text-[#d1182b]">
                                    {product.finalPrice.toLocaleString()}
                                  </span>
                                  <span className="text-xs text-gray-500">تومان</span>
                                </>
                              )}
                              {product.callPriceButton && (
                                <span className="text-sm font-bold text-[#d1182b]">تماس بگیرید</span>
                              )}
                              {!product.callPriceButton && product.finalPrice === 0 && (
                                <span className="text-sm font-bold text-[#d1182b]">بدون قیمت</span>
                              )}
                            </div>
                          </div>
                          {isSelected && (
                            <span className="text-[#d1182b] text-lg font-bold">✓</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-6">کالای مکملی یافت نشد</div>
                )}
              </div>
            </div>,
            window.document.body
          )}
        </div>
      </div>
      {/* محصولات انتخاب‌شده */}
      <div className="flex flex-col items-center mt-3 w-full">
        {filteredProducts.map((product) => (
          <div key={product.productId} className="w-full p-2">
            <div className="flex items-center gap-3 p-3 border border-gray-100 bg-white rounded-lg relative hover:bg-gray-50 transition-all w-full">
              {removingProductId === product.productId && (
                <span className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-lg">
                  <span className="inline-block w-5 h-5 border-2 border-[#d1182b] border-t-transparent rounded-full animate-spin align-middle" style={{ borderRightColor: 'transparent', borderBottomColor: 'transparent' }}></span>
                </span>
              )}
              <div className="w-16 h-16 relative flex-shrink-0 overflow-hidden">
                <img
                  src={getImageUrl2(product.image)}
                  alt={product.title}
                  width={64}
                  height={64}
                  className="object-contain w-16 h-16"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                  {product.title}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  {product.finalPrice > 0 && !product.callPriceButton && (
                    <>
                      <span className="text-sm font-bold text-[#d1182b]">
                        {product.finalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">تومان</span>
                    </>
                  )}
                  {product.callPriceButton && (
                    <span className="text-sm font-bold text-[#d1182b]">تماس بگیرید</span>
                  )}
                  {!product.callPriceButton && product.finalPrice === 0 && (
                    <span className="text-sm font-bold text-[#d1182b]">بدون قیمت</span>
                  )}
                </div>
              </div>
              <IoIosClose
                onClick={() => handleRemoveFromCart(product.productId)}
                className="cursor-pointer text-2xl text-[#d1182b] hover:bg-[#f3f3f3] rounded-full transition p-0.5"
                title="حذف از سبد خرید"
              />
            </div>
          </div>
        ))}
      </div>
      <Modal
        title=""
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        {selectedProductDetails && (
          <div className="flex flex-col gap-4">
            {/* اطلاعات محصول */}
            <div className="flex gap-4">
              <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={getImageUrl2(selectedProductDetails.product.image)}
                  alt={selectedProductDetails.product.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-800 mb-1 line-clamp-2 pl-2">{selectedProductDetails.product.title}</h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">{selectedProductDetails.product.description}</p>
                {/* قیمت */}
                <div>
                  {selectedProductDetails.product.discount > 0 ? (
                    <div className="flex flex-col">
                      <span className="text-gray-400 line-through text-xs">
                        {selectedProductDetails.product.price1?.toLocaleString()} تومان
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#d1182b] text-lg font-bold">
                          {selectedProductDetails.product.finalPrice?.toLocaleString()} تومان
                        </span>
                        <span className="text-xs bg-red-100 text-[#d1182b] px-1.5 py-0.5 rounded">
                          {selectedProductDetails.product.discount}% تخفیف
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[#d1182b] text-lg font-bold">
                      {selectedProductDetails.product.finalPrice?.toLocaleString()} تومان
                    </span>
                  )}
                </div>
                {/* رنگ‌ها */}
                {selectedProductDetails?.productModes && selectedProductDetails.productModes.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">انتخاب رنگ</h4>
                    <div className="flex gap-4 flex-wrap">
                      {selectedProductDetails.productModes.map((mode) => {
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
                                <svg className="absolute text-white text-base bg-blue-500 rounded-full p-0.5 w-3 h-3 -bottom-1 -left-1 shadow" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
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
                {/* گارانتی‌ها */}
                {Object.keys(selectedProductDetails.warranties).length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">انتخاب گارانتی</h4>
                    <div className="space-y-1.5">
                      {Object.entries(selectedProductDetails.warranties).map(([id, title]) => (
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
              </div>
            </div>
            {/* دکمه تایید و مشاهده جزئیات */}
            <div className="mt-2 flex justify-end gap-2">
              {selectedProductDetails && selectedProductDetails.product && selectedProductDetails.product.url && (
                <Link href={selectedProductDetails.product.url} target="_blank">
                <button
                  type="button"
                  className="bg-[#40768c] text-white px-4 py-1.5 rounded-lg hover:bg-[#28506a] transition-colors duration-300 text-sm cursor-pointer"
                >
                  مشاهده جزئیات محصول
                </button>
              </Link>
              )}
              <button
                onClick={handleConfirmAdd}
                disabled={isLoading || !selectedProductDetails.canAddCart}
                className="bg-[#d1182b] text-white px-5 py-1.5 rounded-lg hover:bg-[#b31525] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
              >
                {isLoading ? "در حال افزودن..." : "تایید و افزودن به سبد خرید"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default SelectProductMokamel;
