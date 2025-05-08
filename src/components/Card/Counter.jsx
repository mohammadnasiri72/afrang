"use client";

import React, { useState } from "react";
import { FaTrash } from "react-icons/fa"; 

const Counter = () => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleDelete = () => {
    console.log("محصول حذف شد!");
  };

  return (
    <div className="flex items-center border w-24 mx-auto mt-5 border-[#d1182b] rounded-lg ">
      <div className="w-1/3">
        <button
          onClick={handleIncrement}
          className="text-3xl text-[#d1182b] cursor-pointer font-semibold mx-auto flex justify-center"
        >
          +
        </button>
      </div>
      <div className="w-1/3">
        <span className="text-2xl font-bold text-center flex justify-center">{count}</span>
      </div>

      <div className="w-1/3">
        {count === 1 ? (
          <button
            onClick={handleDelete}
            className="text-[#d1182b] flex justify-center items-center mx-auto cursor-pointer"
          >
            <FaTrash />
          </button>
        ) : (
          <button
            onClick={handleDecrement}
            className="text-3xl text-[#d1182b] cursor-pointer font-semibold mx-auto flex justify-center"
          >
            -
          </button>
        )}
      </div>
    </div>
  );
};

export default Counter;
