"use client";
import { useState } from "react";

function SelectColorProduct({ product }) {
    const [colorProduct, setColorProduct] = useState("black");
    return (
        <>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => {
                        setColorProduct("black");
                    }}
                    className={`flex gap-3 w-28 rounded-lg mx-auto py-2 justify-center items-center cursor-pointer border-[#18d1be] ${colorProduct === "black"
                        ? "bg-[#e8fbf9] border"
                        : "bg-[#f6f6f6]"
                        }`}
                >
                    <img src="/images/gallery/camera-thumb-3.png" />
                    مشکی
                </button>
                <button
                    onClick={() => {
                        setColorProduct("white");
                    }}
                    className={`flex gap-3 w-28 rounded-lg mx-auto py-2 justify-center items-center cursor-pointer border-[#18d1be] ${colorProduct === "white"
                        ? "bg-[#e8fbf9] border"
                        : "bg-[#f6f6f6]"
                        }`}
                >
                    <img src="/images/gallery/camera-thumb-4.png" />
                    سفید
                </button>
            </div>
        </>
    );
}

export default SelectColorProduct;
