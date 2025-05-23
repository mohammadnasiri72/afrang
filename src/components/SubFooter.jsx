import { setOpenMenuRes } from "@/redux/slice/menuRes";
import { FaUserCircle } from "react-icons/fa";
import { FaBars, FaCartShopping } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import SearchSubfooter from "./SearchSubfooter";
import ShoppingDrawer from "./ShoppingDrawer";

export default function SubFooter() {
  const disPatch = useDispatch();
  return (
    <>
      <div className="sm:hidden flex justify-around px-2 fixed bottom-0 bg-white left-0 right-0 py-[18px] text-[#666] z-50">
        
        <ShoppingDrawer />

        <SearchSubfooter />
        <FaUserCircle className="text-3xl" />

        <FaBars
          onClick={() => {
            disPatch(setOpenMenuRes(true));
          }}
          className="text-3xl cursor-pointer"
        />
      </div>
    </>
  );
}
