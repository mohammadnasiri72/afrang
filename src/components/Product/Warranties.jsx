"use client";
import { setWarrantySelected } from "@/redux/slices/warrantySelected";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import { FaInfoCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function Warranties({ warrantiesArray, disabled }) {
  const { warrantySelected } = useSelector((state) => state.warranty);
  const dispatch = useDispatch();

  const handleWarrantyChange = (e) => {
    if (!disabled) {
      dispatch(
        setWarrantySelected(
          warrantiesArray.find((ev) => ev.id === Number(e.target.value))
        )
      );
    }
  };

  return (
    <>
     
      <FormControl sx={{ width: "90%" }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          onChange={handleWarrantyChange}
          name="radio-buttons-group"
          
        >
          {warrantiesArray.map((warranty) => (
            <FormControlLabel
            key={warranty.id}
              value={warranty.id}
              className={`border border-[#0003]  rounded-2xl !mt-1 !w-full relative ${
                warranty.id === warrantySelected?.id ? "!bg-[#4A90E255]" : ""
              }`}
              checked={warranty.id === warrantySelected?.id}
              control={<Radio size="small" />}
              label={
                <div className="!w-full py-1">
                  <div className="flex justify-between items-center w-full">
                    <span
                      className={`text-xs font-semibold ${
                        disabled ? "text-gray-500" : ""
                      }`}
                    >
                      {warranty.title}
                    </span>
                  </div>
                  {warranty.finalPrice > 0 && (
                    <div className="flex items-center gap-1 text-xs">
                      <span className="font-bold">
                        {warranty.finalPrice.toLocaleString()}
                      </span>
                      <span>تومان</span>
                    </div>
                  )}
                  {warranty.desc && (
                    <div className="absolute left-2 top-2">
                      <Tooltip
                        sx={{ fontFamily: "yekan" }}
                        title={warranty.desc}
                      >
                        <FaInfoCircle className="text-[#4A90E2]" />
                      </Tooltip>
                    </div>
                  )}
                </div>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default Warranties;
