import { getImageUrl } from "@/utils/mainDomain";
import React from "react";

function HeaderContact({ data }) {
  console.log(data);

  return (
    <>
      <div className="relative w-full">
        <img
          className="w-full "
          src={getImageUrl(data.image)}
          alt={data.title}
        />
        <div className="absolute bg-[#f155327a] w-full h-full top-0 right-0 z-10"></div>
      </div>
    </>
  );
}

export default HeaderContact;
