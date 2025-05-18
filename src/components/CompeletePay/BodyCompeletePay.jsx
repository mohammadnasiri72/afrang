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
import { setSelectedLegal } from '@/redux/slices/legalIdSlice';

export default function BodyCompeletePay() {
  const dispatch = useDispatch();
  const [addressList, setAddressList] = useState([]);
  const [waySendList, setWaySendList] = useState({});
  const isRequestedAddress = useRef(false);
  const user = Cookies.get("user");
  const token = JSON.parse(user).token;
  
  const selectedAddress = useSelector((state) => state.address.selectedAddress);
  const selectedShipping = useSelector((state) => state.shipping.selectedShipping);

  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchCart());
    }
  }, []);
  const { items } = useSelector((state) => state.cart);

  // get address
  const getAddressFu = async () => {
    try {
      const items = await getAddress(token);

      if (items) {
        setAddressList(items);
        if (items.length === 1) {
          dispatch(setSelectedAddress(items[0]));
        } else {
          dispatch(setSelectedAddress(null));
        }
      }
    } catch (error) { }
  };
  useEffect(() => {
    if (isRequestedAddress.current) return;
    isRequestedAddress.current = true;
    getAddressFu();
  }, []);

  // get WaySend
  const WaySendFu = async () => {
    try {
      if (selectedAddress?.provinceId) {
        const items = await getWaySend(selectedAddress.provinceId, token);
        if (items) {
          setWaySendList(items);
        }
      }
    } catch (error) { }
  };
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
        <WaySend
          waySendList={waySendList}
          selectedShipping={selectedShipping}
          setSelectedShipping={handleShippingChange}
        />
      </div>
      <div className="mt-5">
        <ShowProductBasket items={items} />
      </div>
    </div>
  );
}
