import { setOpenShopping } from "@/redux/slice/shopping";
import zIndex from "@mui/material/styles/zIndex";
import { Divider, Drawer } from "antd";
import Link from "next/link";
import { FaCartShopping, FaTrash } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function ShoppingDrawer() {
  const open = useSelector((store) => store.shopping.openShopping);
  const disPatch = useDispatch();

  const onClose = () => {
    disPatch(setOpenShopping(false));
  };

  const styles = {
    body: {
      padding: "10px",
    },
    header: {
      display: "none",
    },
  };

  return (
    <>
      <FaCartShopping
        onClick={() => {
          disPatch(setOpenShopping(true));
        }}
        className="text-[#d1182b] text-3xl cursor-pointer"
      />

      <Drawer
        zIndex={10000}
        placement={"left"}
        closable={true}
        onClose={onClose}
        open={open}
        width={300}
        // styles={{
        //   header: {
        //     display: "none",
        //   },
        // }}
        styles={styles}
      >
        <div className="flex justify-between items-center pb-3">
          <span className="text-[#666] text-[15px]">سبد خرید (3)</span>
          <IoCloseOutline
            onClick={onClose}
            className="text-3xl cursor-pointer hover:bg-[#0001] rounded-full duration-300 p-1"
          />
        </div>
        <div className="flex">
          <img
            className="w-20"
            src="/images/gallery/product-thumb-2.jpg"
            alt=""
          />
          <div className="flex flex-col items-start px-3 gap-1">
            <span>عنوان نمونه </span>
            <div className="flex ">
              <span className=" font-semibold">5,000,000</span>
              <span className="px-1">تومان</span>
            </div>
            <FaTrash className="text-[#d1182b] cursor-pointer" />
          </div>
        </div>
        <Divider variant="dashed" dashed></Divider>
        <div className="flex">
          <img
            className="w-20"
            src="/images/gallery/product-thumb-2.jpg"
            alt=""
          />
          <div className="flex flex-col items-start px-3 gap-1">
            <span>عنوان نمونه </span>
            <div className="flex ">
              <span className=" font-semibold">5,000,000</span>
              <span className="px-1">تومان</span>
            </div>
            <FaTrash className="text-[#d1182b] cursor-pointer" />
          </div>
        </div>
        <Divider variant="dashed" dashed></Divider>
        <div className="flex">
          <img
            className="w-20"
            src="/images/gallery/product-thumb-2.jpg"
            alt=""
          />
          <div className="flex flex-col items-start px-3 gap-1">
            <span>عنوان نمونه </span>
            <div className="flex ">
              <span className=" font-semibold">5,000,000</span>
              <span className="px-1">تومان</span>
            </div>
            <FaTrash className="text-[#d1182b] cursor-pointer" />
          </div>
        </div>
        <Divider variant="dashed" dashed></Divider>
        <div className="flex">
          <img
            className="w-20"
            src="/images/gallery/product-thumb-2.jpg"
            alt=""
          />
          <div className="flex flex-col items-start px-3 gap-1">
            <span>عنوان نمونه </span>
            <div className="flex ">
              <span className=" font-semibold">5,000,000</span>
              <span className="px-1">تومان</span>
            </div>
            <FaTrash className="text-[#d1182b] cursor-pointer" />
          </div>
        </div>
        <Divider variant="dashed" dashed></Divider>
        <div className="flex">
          <img
            className="w-20"
            src="/images/gallery/product-thumb-2.jpg"
            alt=""
          />
          <div className="flex flex-col items-start px-3 gap-1">
            <span>عنوان نمونه </span>
            <div className="flex ">
              <span className=" font-semibold">5,000,000</span>
              <span className="px-1">تومان</span>
            </div>
            <FaTrash className="text-[#d1182b] cursor-pointer" />
          </div>
        </div>
        <Divider variant="dashed" dashed></Divider>
        <div className="flex">
          <img
            className="w-20"
            src="/images/gallery/product-thumb-2.jpg"
            alt=""
          />
          <div className="flex flex-col items-start px-3 gap-1">
            <span>عنوان نمونه </span>
            <div className="flex ">
              <span className=" font-semibold">5,000,000</span>
              <span className="px-1">تومان</span>
            </div>
            <FaTrash className="text-[#d1182b] cursor-pointer" />
          </div>
        </div>
        <Divider
          style={{
            borderColor: "#666",
            marginTop: "30px",
            marginBottom: "10px",
          }}
        ></Divider>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[#666] text-[17px]">
            جمع خرید:
          </span>
          <div className="flex items-center font-semibold text-[#666] text-[16px]">
            <span>42,000,000</span>
            <span className="px-1">تومان</span>
          </div>
        </div>
        <div>
          <Link onClick={onClose} href={"/card"}>
            <button className="w-full bg-[#d1182b] text-white duration-300 hover:bg-[#18d1be] cursor-pointer py-3 mt-5 font-semibold">
              سبد خرید
            </button>
          </Link>
          <button className="w-full bg-[#d1182b] text-white duration-300 hover:bg-[#18d1be] cursor-pointer py-3 mt-5 font-semibold">
            تسویه حساب
          </button>
        </div>
      </Drawer>
    </>
  );
}

export default ShoppingDrawer;
