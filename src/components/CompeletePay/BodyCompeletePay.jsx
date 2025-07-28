"use client";
import { setSelectedAddress } from '@/redux/slices/addressSlice';
import { setSelectedShipping } from '@/redux/slices/shippingSlice';
import { getWaySend } from "@/services/order/orderService";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoxAddress from "./BoxAddress";
import BoxLegal from "./BoxLegal";
import ShowProductBasket from "./ShowProductBasket";
import WaySend from "./WaySend";
import { getAddress } from '@/services/User/UserServices';

// کامپوننت اسکلتون برای نمایش در زمان لودینگ
const WaySendSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-xl p-6 shadow-lg z-50 relative">
        <div className="flex items-center justify-between pb-5">
          <div className="h-7 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
        <div className="w-full space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="w-full flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 animate-pulse"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-grow">
                <div className="flex flex-col gap-2">
                  <div className="h-5 bg-gray-200 rounded w-40" />
                  <div className="h-4 bg-gray-200 rounded w-64" />
                </div>
              </div>
              <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function BodyCompeletePay() {
  const dispatch = useDispatch();
  const selectedAddress = useSelector((state) => state.address.selectedAddress);
  const [waySendList, setWaySendList] = useState({});
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const user = Cookies.get("user");
  const token = JSON.parse(user).token;
  
  
  const selectedShipping = useSelector((state) => state.shipping.selectedShipping);
 

  const [highlightShipping, setHighlightShipping] = useState(false);
  const waySendRef = useRef(null);

  // Highlight and scroll to shipping after address selection
  useEffect(() => {
    if (selectedAddress && selectedAddress.id) {
      setHighlightShipping(true);
      if (waySendRef.current) {
        const rect = waySendRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || window.pageYOffset;
        const top = rect.top + scrollTop - 150;
        window.scrollTo({ top, behavior: "smooth" });
      }
      const timer = setTimeout(() => setHighlightShipping(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedAddress]);

  

  // get WaySend
  const WaySendFu = async () => {
    try {
      if (selectedAddress?.provinceId) {
        setIsShippingLoading(true);
        const items = await getWaySend(selectedAddress.provinceId, token);
        if (items) {
          setWaySendList(items);
          if (items.shippingWays?.length === 1) {
            // اگر فقط یک روش ارسال وجود دارد، آن را انتخاب کن
            dispatch(setSelectedShipping(items.shippingWays[0]));
          } else {
            // اگر چند روش ارسال وجود دارد، هیچ کدام را انتخاب نکن
            dispatch(setSelectedShipping(null));
          }
        }
      } else {
        // اگر آدرسی انتخاب نشده، لیست روش‌های ارسال را پاک کن
        setWaySendList({ shippingWays: [] });
        dispatch(setSelectedShipping(null));
      }
    } catch (error) {
      console.error('Error fetching shipping methods:', error);
    } finally {
      setIsShippingLoading(false);
    }
  };

  

  // Load shipping methods when address changes
  useEffect(() => {
    if (selectedAddress?.provinceId) {
      WaySendFu();
    }
  }, [selectedAddress]);

  const handleShippingChange = (shipping) => {
    dispatch(setSelectedShipping(shipping));
  };

 

 

  return (
    <div className="lg:w-3/4 w-full lg:pl-5">
      <div className="bg-white rounded-[12px] p-4">
        <BoxLegal />
      </div>
      <div className="mt-5">
        <BoxAddress
          onAddressDelete={() => setWaySendList({ shippingWays: [] })}
        />
      </div>
      <div className="mt-4" ref={waySendRef}>
        {isShippingLoading ? (
          <WaySendSkeleton />
        ) : (
          <div className={highlightShipping ? "ring-4 ring-[#d1182b] rounded-xl transition-all duration-500" : "transition-all duration-500"}>
            <WaySend
              waySendList={waySendList}
              selectedShipping={selectedShipping}
              setSelectedShipping={handleShippingChange}
            />
          </div>
        )}
      </div>
      <div className="mt-5">
        <ShowProductBasket />
      </div>
    </div>
  );
}
