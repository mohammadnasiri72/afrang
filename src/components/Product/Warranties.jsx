"use client";
import { Radio } from "antd";

function Warranties({ selectedWarranty, setSelectedWarranty, warrantiesArray, disabled }) {
  const handleWarrantyChange = (e) => {
    if (!disabled) {
      setSelectedWarranty(e.target.value);
    }
  };

  return (
    <>
      <p className={`text-sm pt-2 font-semibold ${disabled ? 'text-gray-500' : ''}`}>گارانتی</p>
      <Radio.Group onChange={handleWarrantyChange} value={selectedWarranty} disabled={disabled}>
        {warrantiesArray.map((warranty) => (
          <Radio key={warranty.value} value={warranty.value}>
            <span className={`text-xs ${disabled ? 'text-gray-500' : ''}`}>{warranty.label}</span>
          </Radio>
        ))}
      </Radio.Group>
    </>
  );
}

export default Warranties;
