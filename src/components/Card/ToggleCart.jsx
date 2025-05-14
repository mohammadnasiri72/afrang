"use client";

import { Segmented } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart } from '@/redux/slices/cartSlice';

function ToggleCart() {
  const [typeArticle, setTypeArticle] = useState("سبد خرید");
  const dispatch = useDispatch();

  const handleToggle = (value) => {
    setTypeArticle(value);
    // اگر "خرید بعدی" انتخاب شد، درخواست next را ارسال کن
    dispatch(fetchCart(value === "خرید بعدی" ? 'next' : 'current'));
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
