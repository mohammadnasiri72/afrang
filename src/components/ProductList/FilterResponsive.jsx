"use client";
import { Dropdown } from "antd";
import { useState } from "react";
import { FaSortAmountUp } from "react-icons/fa";
import SelectCategoryFilter from "./SelectCategoryFilter";

function FilterResponsive({resultFilter}) {
  const [visible, setVisible] = useState(false);

 
 

  return (
    <>
      <Dropdown
        overlayStyle={{ width: "100vw" }}
        placement="bottom"
        trigger={["click"]}
        open={visible}
        onOpenChange={(flag) => setVisible(flag)}
      
        popupRender={() => (
          <div className="p-3 mt-3 absolute left-0 right-0">
            <div className=" bg-white rounded-lg p-3 shadow-lg">
              <SelectCategoryFilter resultFilter={resultFilter} setVisible={setVisible}/>
            </div>
          </div>
        )}
      >
        <span
          className={`font-semibold cursor-pointer duration-300 text-[15px] whitespace-nowrap select-none border lg:border-none rounded-lg lg:rounded-none px-[15px] lg:px-0 py-[5px] lg:py-0 flex lg:hidden items-center justify-center gap-1 ${
            visible ? "border-[#18d1be] text-[#d1182b]" : "border-[#d5d5d5]"
          }`}
        >
          <FaSortAmountUp className="lg:hidden" />
          فیلتر
        </span>
      </Dropdown>
    </>
  );
}

export default FilterResponsive;
