"use client";
import { Radio } from "antd";

function Warranties({ selectedWarranty, setSelectedWarranty , warrantiesArray}) {
 

  const handleWarrantyChange = (e) => {
    setSelectedWarranty(e.target.value);
  };

  return (
    <>
      <p className="text-sm pt-2 font-semibold">گارانتی</p>
      <Radio.Group onChange={handleWarrantyChange} value={selectedWarranty}>
        {warrantiesArray.map((warranty) => (
          <Radio key={warranty.value} value={warranty.value}>
            <span className="text-xs">{warranty.label}</span>
          </Radio>
        ))}
      </Radio.Group>
    </>
  );
}

export default Warranties;
