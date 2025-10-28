"use client";

import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSelectedColorMode } from "@/redux/slices/productColorSlice";

function SelectColorProduct({ productModes, onChange }) {
  const modes = productModes || [];
  
  const [selectedColorId, setSelectedColorId] = useState(modes[0]?.id || null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modes.length && selectedColorId === null) {
      setSelectedColorId(modes[0].id);
      if (onChange) onChange(modes[0].id);
      dispatch(setSelectedColorMode(modes[0]));
    }
  }, [modes]);

  useEffect(() => {
    if (selectedColorId !== null) {
      const selectedMode = modes?.find((m) => m.id === selectedColorId);
      if (selectedMode) dispatch(setSelectedColorMode(selectedMode));
    }
  }, [selectedColorId]);

  const handleSelect = (id) => {
    setSelectedColorId(id);
    if (onChange) onChange(id);
    const selectedMode = modes?.find((m) => m.id === id);
    if (selectedMode) dispatch(setSelectedColorMode(selectedMode));
  };

  if (!modes.length) return null;

  return (
    <div className="">
      <div className="flex gap-4 flex-wrap">
        {modes.map((mode) => {
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
              onClick={() => handleSelect(mode.id)}
              className={`flex flex-col items-center group focus:outline-none cursor-pointer`}
            >
              <span
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 !mb-1 relative flex items-center justify-center ${
                  isSelected
                    ? "border-blue-600 shadow-lg scale-110"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              >
                {isSelected && (
                  <FaCheck className="absolute !text-white text-base bg-blue-500 rounded-full p-0.5 w-3 h-3 -bottom-1 -left-1 shadow" />
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
  );
}

export default SelectColorProduct;
