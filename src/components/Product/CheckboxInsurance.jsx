import {
  setSelectedIdInsurance,
  setSelectedInsurance,
} from "@/redux/slices/selectedInsurance";
import { Checkbox, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function CheckboxInsurance({ insurance }) {
  const [valCheckbox, setValCheckbox] = useState(false);
  const selectedInsurance = useSelector(
    (state) => state.selectedInsurance.selectedInsurance
  );
  const { currentItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (selectedInsurance.find((e) => e.id === insurance.id)) {
    if (currentItems.find((e) => e.productId === insurance.id)) {
      setValCheckbox(true);
    } else {
      setValCheckbox(false);
    }
  }, [currentItems]);

  const handleChangeCheckbox = async (e) => {
    if (e.target.checked) {
      dispatch(setSelectedInsurance([...selectedInsurance, insurance]));
    } else {
      dispatch(setSelectedInsurance([]));
    }

    setValCheckbox(e.target.checked);
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
        onClick={() => {
          dispatch(setSelectedIdInsurance(insurance));
        }}
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
