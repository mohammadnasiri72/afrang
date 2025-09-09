import { setOpenMenuRes } from "@/redux/slices/menuResSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import SearchSubfooter from "./SearchSubfooter";
import ShoppingDrawer from "./ShoppingDrawer";

export default function SubFooter() {
  const disPatch = useDispatch();
  return (
    <>
      <div className="sm:hidden flex justify-around px-2 fixed bottom-0 bg-white left-0 right-0 py-[7px] text-[#666] z-50">
        <SearchSubfooter />

        <ShoppingDrawer />

        <Link href="/profile/dashboard">
          {/* Custom SVG User Icon */}
          <span
            className="text-3xl cursor-pointer inline-block align-middle"
            style={{ width: "1em", height: "1em" }}
          >
            <svg
              width="1.2em"
              height="1.2em"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="32"
                height="32"
                rx="16"
                fill="#d1182b"
                fillOpacity="0.08"
              />
              <circle cx="16" cy="13" r="5" stroke="#d1182b" strokeWidth="2" />
              <path
                d="M8 25c0-3.3137 3.582-6 8-6s8 2.6863 8 6"
                stroke="#d1182b"
                strokeWidth="2"
              />
            </svg>
          </span>
        </Link>

        {/* Custom SVG Bars Icon */}
        <span
          onClick={() => {
            disPatch(setOpenMenuRes(true));
          }}
          className="text-3xl cursor-pointer inline-block align-middle"
          style={{ width: "1em", height: "1em" }}
        >
          <svg
            width="1.2em"
            height="1.2em"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="32"
              height="32"
              rx="16"
              fill="#d1182b"
              fillOpacity="0.08"
            />
            <rect
              x="8"
              y="10"
              width="16"
              height="2.5"
              rx="1.25"
              fill="#d1182b"
            />
            <rect
              x="8"
              y="15"
              width="16"
              height="2.5"
              rx="1.25"
              fill="#d1182b"
            />
            <rect
              x="8"
              y="20"
              width="16"
              height="2.5"
              rx="1.25"
              fill="#d1182b"
            />
          </svg>
        </span>
      </div>
    </>
  );
}
