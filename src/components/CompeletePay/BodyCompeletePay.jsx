"use client";
import { fetchCart } from "@/redux/slices/cartSlice";
import { getAddress, getWaySend } from "@/services/order/orderService";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoxAddress from "./BoxAddress";
import ShowProductBasket from "./ShowProductBasket";
import WaySend from "./WaySend";

function BodyCompeletePay() {
  const dispatch = useDispatch();
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [waySendList, setWaySendList] = useState({});
  const isRequestedAddress = useRef(false);
  const user = Cookies.get("user");
  const token = JSON.parse(user).token;

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

        setSelectedAddress(items[0] ? items[0] : {});
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
      const items = await getWaySend(selectedAddress?.provinceId, token);

      if (items) {
        setWaySendList(items);
      }
    } catch (error) { }
  };
  useEffect(() => {
    if (selectedAddress.provinceId) {
      WaySendFu();
    }
  }, [selectedAddress]);

  return (
    <>
      <div className="lg:w-3/4 w-full lg:pr-5 lg:mt-0 mt-3 relative z-50">

        <div>
          <BoxAddress
            addressList={addressList}
            getAddressFu={getAddressFu}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        </div>

        <div className="mt-5">
          <WaySend waySendList={waySendList} />
        </div>


        <div className="mt-5">
          <ShowProductBasket items={items} />
        </div>
      </div>
    </>
  );
}

export default BodyCompeletePay;
