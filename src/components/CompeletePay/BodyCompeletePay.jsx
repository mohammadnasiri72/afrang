"use client";
import { fetchCart } from "@/redux/slices/cartSlice";
import { getAddress, getWaySend } from "@/services/order/orderService";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoxAddress from "./BoxAddress";
import ShowProductBasket from "./ShowProductBasket";
import WaySend from "./WaySend";
import BoxLegal from "./BoxLegal";
import { setSelectedAddress } from '@/redux/slices/addressSlice';
import { setSelectedShipping } from '@/redux/slices/shippingSlice';
import { useRouter } from 'next/navigation';

export default function BodyCompeletePay() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [addressList, setAddressList] = useState([]);
  const [waySendList, setWaySendList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const user = Cookies.get("user");
  const token = JSON.parse(user).token;
  
  const selectedAddress = useSelector((state) => state.address.selectedAddress);
  const selectedShipping = useSelector((state) => state.shipping.selectedShipping);
  const { items } = useSelector((state) => state.cart);

  // get address
  const getAddressFu = async () => {
    try {
      setIsLoading(true);
      const items = await getAddress(token);

      if (items) {
        setAddressList(items);
        if (items.length === 1) {
          // اگر فقط یک آدرس وجود دارد، آن را انتخاب کن
          dispatch(setSelectedAddress(items[0]));
        } else {
          // اگر چند آدرس وجود دارد، هیچ کدام را انتخاب نکن
          dispatch(setSelectedAddress(null));
        }
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      await getAddressFu();
    };
    loadInitialData();
  }, []);

  // Load shipping methods when address changes
  useEffect(() => {
    if (selectedAddress?.provinceId) {
      WaySendFu();
    }
  }, [selectedAddress]);

  const handleShippingChange = (shipping) => {
    dispatch(setSelectedShipping(shipping));
  };

  const handleAddressSelect = (address) => {
    dispatch(setSelectedAddress(address));
  };

  if (isLoading) {
    return (
      <div className="lg:w-3/4 w-full lg:pl-5">
        <div className="bg-white rounded-[12px] p-4">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d1182b]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-3/4 w-full lg:pl-5">
      <div className="bg-white rounded-[12px] p-4">
        <BoxLegal />
      </div>
      <div className="mt-5">
        <BoxAddress
          addressList={addressList}
          getAddressFu={getAddressFu}
          selectedAddress={selectedAddress}
          setSelectedAddress={handleAddressSelect}
          onAddressDelete={() => setWaySendList({ shippingWays: [] })}
        />
      </div>
      <div className="mt-4">
        {isShippingLoading ? (
          <div className="bg-white rounded-[12px] p-4">
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#d1182b]"></div>
            </div>
          </div>
        ) : (
          <WaySend
            waySendList={waySendList}
            selectedShipping={selectedShipping}
            setSelectedShipping={handleShippingChange}
          />
        )}
      </div>
      <div className="mt-5">
        <ShowProductBasket items={items} />
      </div>
    </div>
  );
}
