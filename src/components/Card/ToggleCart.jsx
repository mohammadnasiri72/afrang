"use client";

import { Segmented } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentCart, fetchNextCart, setCartType } from '@/redux/slices/cartSlice';

function ToggleCart() {
  const [typeArticle, setTypeArticle] = useState("سبد خرید");
  const dispatch = useDispatch();
  const { cartType } = useSelector((state) => state.cart);

  // دریافت هر دو سبد خرید در ابتدای لود کامپوننت
  useEffect(() => {
    dispatch(fetchCurrentCart());
    dispatch(fetchNextCart());
  }, [dispatch]);

  const handleToggle = (value) => {
    setTypeArticle(value);
    const newCartType = value === "خرید بعدی" ? 'next' : 'current';
    dispatch(setCartType(newCartType));
  };

  return (
    <>
      <div className="bg-[#ebebeb] my-3 py-2 flex justify-center SegmentedCard">
        <div className="w-60">
          <Segmented
            className="font-semibold text-3xl w-full"
            dir="ltr"
            style={{
              padding: 0,
              fontFamily: "yekan",
            }}
            value={typeArticle}
            onChange={handleToggle}
            options={["خرید بعدی", "سبد خرید"]}
          />
        </div>
      </div>
    </>
  );
}

export default ToggleCart;
