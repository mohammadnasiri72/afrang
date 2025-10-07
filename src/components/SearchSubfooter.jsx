import Link from "next/link";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

function SearchSubfooter() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Custom SVG Box Icon */}
      <Link href="/products" aria-label="محصولات">
        <span
          className="text-3xl cursor-pointer inline-block align-middle"
          style={{ width: "1.5em", height: "1.5em" }}
        >
          <svg
            width="1.2em"
            height="1.2em"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <rect
              width="32"
              height="32"
              rx="16"
              fill="#d1182b"
              fillOpacity="0.08"
            />
            <path
              d="M7 12l9 5 9-5"
              stroke="#d1182b"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M7 12v8a2 2 0 0 0 1 1.73l8 4.62a2 2 0 0 0 2 0l8-4.62A2 2 0 0 0 25 20v-8"
              stroke="#d1182b"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M16 17v7"
              stroke="#d1182b"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </Link>
      <div
        style={{ zIndex: "80" }}
        className={`bg-[#d1182b] w-full fixed duration-300 py-3 ${
          open
            ? "bottom-14 opacity-100 visible"
            : "bottom-0 opacity-0 invisible"
        }`}
      >
        <div className="flex px-3">
          <IoSearchSharp className="text-white text-2xl cursor-pointer" />
          <input
            type="text"
            className="w-full outline-none !text-white px-2"
            placeholder="جستجو..."
          />
        </div>
      </div>
      {open && (
        <div
          onClick={() => {
            setOpen(false);
          }}
          style={{ zIndex: "70" }}
          className="fixed top-0 bottom-0 left-0 right-0 bg-[#0005]"
        ></div>
      )}
    </>
  );
}

export default SearchSubfooter;
