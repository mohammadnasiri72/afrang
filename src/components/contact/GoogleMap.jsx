"use client";

import { GrLocation } from "react-icons/gr";
import { useSelector } from "react-redux";

function GoogleMap() {
  const { settings, loading } = useSelector((state) => state.settings);
  const siteAddress = settings.find(item => item.propertyKey === "site_address1")?.value;
  const map = settings.find(item => item.propertyKey === "site_map_script")?.value;



  return (
    <>
      <div className="w-full -mt-14">
        <div className="mb-[30px]">
          <div className="google-map">
            <div dangerouslySetInnerHTML={{ __html: map }} />
          </div>

          <div className="max-w-[600px] py-[25px] px-[20px] flex rounded-[7px] bg-[#ffffffeb] m-auto relative z-10 mt-[-40px] items-center text-[13px] text-[#210600]">
            <div className="bg-[#18d1be] text-white w-[40px] text-[16px] flex items-center h-[40px] justify-center rounded-[4px] ml-[15px]">
              <GrLocation />
            </div>
            <div>
              <span className="text-[#747475]">آدرس ما</span>
              <p className="mb-0 font-[600]">
                {siteAddress || "میدان ونک، تهران"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GoogleMap;
