import { fetchCurrentCart } from "@/redux/slices/cartSlice";
import { setSelectedInsurance } from "@/redux/slices/selectedInsurance";
import { addToCart, deleteCartItem } from "@/services/cart/cartService";
import { Checkbox, Tooltip } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

function CheckboxInsurance({ insurance, product }) {
  const [valCheckbox, setValCheckbox] = useState(false);
  const selectedInsurance = useSelector(
    (state) => state.selectedInsurance.selectedInsurance
  );

  const { currentItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const productId = currentItems.find(
    (e) => e.productId === product?.product?.productId
  )?.productId;

  useEffect(() => {
    if (currentItems.find((e) => e.productId === insurance.id)) {
      setValCheckbox(true);
      if (selectedInsurance.find((e) => e.id === insurance.id)) {
        dispatch(setSelectedInsurance([...selectedInsurance]));
      } else {
        dispatch(setSelectedInsurance([...selectedInsurance, insurance]));
      }
    } else {
      setValCheckbox(false);
      if (selectedInsurance.find((e) => e.id === insurance.id)) {
        dispatch(
          setSelectedInsurance(
            selectedInsurance.filter(
              (e) => e !== selectedInsurance.find((e) => e.id === insurance.id)
            )
          )
        );
      }
    }
  }, [currentItems]);

  const handleChangeCheckbox = async (e) => {
    if (e.target.checked) {
      if (selectedInsurance.find((e) => e === insurance)) {
        dispatch(setSelectedInsurance([...selectedInsurance]));
      } else {
        dispatch(setSelectedInsurance([...selectedInsurance, insurance]));
      }

      if (productId) {
        handleAddInsurance(insurance?.id, productId, insurance.finalPrice);
      }
    } else {
      dispatch(
        setSelectedInsurance(selectedInsurance.filter((e) => e !== insurance))
      );
      if (productId) {
        handleRemoveInsurance(
          currentItems.find((e) => e.productId === insurance?.id)?.id
        );
      }
    }

    setValCheckbox(e.target.checked);
  };

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      const initialData = {
        token: "",
        refreshToken: "",
        expiration: "",
        userId:JSON.parse(Cookies.get("user"))?.userId,
        displayName: "",
        roles: [],
      };
      Cookies.set("user", JSON.stringify(initialData), {
        expires: 7,
        path: "/",
      });
    }
  }, []);

  

  const handleRemoveInsurance = async (id) => {
    const userId = JSON.parse(Cookies.get("user"))?.userId;
    try {
      await deleteCartItem(id, userId);
      dispatch(fetchCurrentCart());
      Toast.fire({
        icon: "success",
        text: "بیمه با موفقیت حذف شد",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        text: "مشکلی در حذف بیمه پیش آمده است",
      });
      console.error("Error removing item:", error);
    } finally {
    }
  };

  const handleAddInsurance = async (id, parentId, finalPrice) => {
    const userId = JSON.parse(Cookies.get("user"))?.userId;
    const response = await addToCart(
      id,
      -1,
      userId,
      1,
      -1,
      parentId,
      finalPrice
    );
    if (response) {
      dispatch(fetchCurrentCart());
      Toast.fire({
        icon: "success",
        text: "بیمه با موفقیت اضافه شد",
      });
    }
  };

  return (
    <>
      <Checkbox
        // disabled={loading}
        checked={valCheckbox}
        className={`border border-[#0002] rounded-2xl !p-2 !w-full  duration-300 relative ${
          valCheckbox ? "bg-slate-200" : "hover:bg-slate-100"
        }`}
        onChange={handleChangeCheckbox}
      >
        <div className="flex flex-col select-none">
          <span className="font-semibold">{insurance.title}</span>
          {insurance.finalPrice > 0 ? (
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="">{insurance.finalPrice.toLocaleString()}</span>
              <span>تومان</span>
            </div>
          ) : (
            <div>
              <span>رایگان</span>
            </div>
          )}
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
