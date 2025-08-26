import { fetchCurrentCart } from "@/redux/slices/cartSlice";
import { addToCart, deleteCartItem } from "@/services/cart/cartService";
import { getUserCookie } from "@/utils/cookieUtils";
import { Checkbox, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const generateRandomUserId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

function CheckboxInsurance({ insurance, product }) {
  const [valCheckbox, setValCheckbox] = useState(false);
  const userData = getUserCookie();
  const { currentItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (currentItems.find((e) => e.parentId === product?.product?.productId)) {
      setValCheckbox(true);
    } else {
      setValCheckbox(false);
    }
  }, [currentItems, product]);

  const dispatch = useDispatch();

  const handleChangeCheckbox = async (e) => {
    let userId;
    if (!userData?.token) {
      if (userData?.userId) {
        userId = userData.userId;
      } else {
        userId = generateRandomUserId();
        const initialData = {
          token: "",
          refreshToken: "",
          expiration: "",
          userId: userId,
          displayName: "",
          roles: [],
        };
        Cookies.set("user", JSON.stringify(initialData), {
          expires: 7,
          path: "/",
        });
      }
    } else {
      userId = userData.userId;
    }
    if (e.target.checked) {
      const response = await addToCart(
        insurance.id,
        -1,
        userId,
        1,
        -1,
        product?.product?.productId,
        insurance.finalPrice
      );
      if (response) {
        dispatch(fetchCurrentCart());
      }
    }
    if (!e.target.checked) {
      const response = await deleteCartItem(insurance.id, userId);
      if (response) {
        dispatch(fetchCurrentCart());
      }
    }
    setValCheckbox(e.target.checked);
  };

  return (
    <>
      <Checkbox
        checked={valCheckbox}
        className={`border border-[#0002] rounded-2xl !p-2 !w-full  duration-300 relative ${
          valCheckbox ? "bg-slate-200" : "hover:bg-slate-100"
        }`}
        onChange={handleChangeCheckbox}
      >
        <div className="flex flex-col select-none">
          <span className="font-semibold">{insurance.title}</span>
          <div className="flex items-center gap-1.5 font-semibold">
            {/* {insurance.price !== insurance.finalPrice && (
              <span className="line-through text-[#0005]">
                {insurance.price.toLocaleString()}
              </span>
            )} */}
            <span className="">{insurance.finalPrice.toLocaleString()}</span>
            <span>تومان</span>
          </div>
        </div>
        {insurance.desc && (
          <div className="absolute left-2 top-2">
            <Tooltip title={insurance.desc}>
              <FaInfoCircle className="text-[#4A90E2]" />
            </Tooltip>
          </div>
        )}
      </Checkbox>
    </>
  );
}

export default CheckboxInsurance;
