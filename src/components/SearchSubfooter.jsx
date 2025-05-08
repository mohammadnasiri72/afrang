import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

function SearchSubfooter() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IoSearchSharp
        onClick={() => {
          setOpen(!open);
        }}
        className="text-3xl cursor-pointer"
      />
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
            className="w-full outline-none text-white px-2"
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
