"use client";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { MdRadioButtonUnchecked } from "react-icons/md";

function WarrantiesModal({
  warrantiesArray,
  disabled,
  warrantySelected,
  setWarrantySelected,
}) {
 
  const handleWarrantyToggle = (warrantyId) => {
    if (disabled) return;

    if (warrantySelected?.id === warrantyId) {
      // اگر همان گارانتی انتخاب شده بود، از انتخاب دربیاور
      setWarrantySelected(null);
    } else {
      // گارانتی جدید را انتخاب کن
      const selectedWarranty = warrantiesArray?.find(
        (ev) => ev.id === warrantyId
      );
      setWarrantySelected(selectedWarranty);
    }
  };

  return (
    <>
      <FormControl sx={{ width: "auto" }}>
        <div className="space-y-2">
          {warrantiesArray.map((warranty) => {
            const isSelected = warrantySelected?.id === warranty.id;

            return (
              <div
                key={warranty.id}
                onClick={() => handleWarrantyToggle(warranty.id)}
                className={`border border-[#0003] rounded-lg py-1 pl-3 relative transition-all duration-200 ${
                  isSelected ? "bg-blue-50! border-blue-200 text-blue-700" : ""
                } ${
                  disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-1.5 justify-between w-full">
                  {/* آیکون انتخاب */}
                  <div className="flex-shrink-0 mr-3">
                    <IconButton
                      size="small"
                      disabled={disabled}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWarrantyToggle(warranty.id);
                      }}
                      sx={{
                        padding: 0,
                        color: isSelected ? "#1976d2" : "rgba(0, 0, 0, 0.54)",
                      }}
                    >
                      {isSelected ? (
                        <BiCheckCircle className="text-lg" />
                      ) : (
                        <MdRadioButtonUnchecked className="text-lg" />
                      )}
                    </IconButton>
                  </div>

                  {/* محتوای گارانتی */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center w-full">
                      <span
                        className={`text-sm font-semibold ${
                          disabled ? "text-gray-500" : ""
                        }`}
                      >
                        {warranty.title} {warranty.desc}
                      </span>
                    </div>
                    {warranty.finalPrice > 0 && (
                      <div className="flex items-center gap-1 text-sm mt-1">
                        <span className="font-bold">
                          {warranty.finalPrice.toLocaleString()}
                        </span>
                        <span>تومان</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </FormControl>
    </>
  );
}

export default WarrantiesModal;
