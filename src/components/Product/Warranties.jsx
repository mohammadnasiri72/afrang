"use client";
import { Radio, Tooltip } from "antd";
import { FaInfoCircle } from "react-icons/fa";

function Warranties({
  selectedWarranty,
  setSelectedWarranty,
  warrantiesArray,
  disabled,
}) {
  const handleWarrantyChange = (e) => {
    if (!disabled) {
      setSelectedWarranty(e.target.value);
    }
  };

  return (
    <>
      <p
        className={`text-sm pt-2 font-semibold ${
          disabled ? "text-gray-500" : ""
        }`}
      >
        گارانتی
      </p>
      <Radio.Group
        onChange={handleWarrantyChange}
        value={selectedWarranty}
        disabled={disabled}
      >
        {warrantiesArray.map((warranty) => (
          <Radio
            className={`border border-[#0003] !p-2 rounded-2xl !mt-1 w-full relative ${
              warranty.id === selectedWarranty.id ? "!bg-[#4A90E255]" : ""
            }`}
            key={warranty.id}
            value={warranty}
          >
            <div className="!w-full">
              <div className="flex justify-between items-center w-full">
                <span className={`text-xs ${disabled ? "text-gray-500" : ""}`}>
                  {warranty.title}
                </span>
              </div>
              {warranty.finalPrice > 0 && (
                <div className="flex items-center gap-1">
                  <span>{warranty.finalPrice.toLocaleString()}</span>
                  <span>تومان</span>
                </div>
              )}
              {warranty.desc && (
                <div className="absolute left-2 top-2">
                  <Tooltip title={warranty.desc}>
                    <FaInfoCircle className="text-[#4A90E2]" />
                  </Tooltip>
                </div>
              )}
            </div>
          </Radio>
        ))}
      </Radio.Group>
    </>
  );
}

export default Warranties;
