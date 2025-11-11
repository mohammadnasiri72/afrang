"use client";

import { useState } from "react";
import { BiSupport } from "react-icons/bi";
import SocialNetworks from "./SocialNetworks";

function SuportSubfooter({ socialNetworks, settings }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BiSupport
        onClick={() => {
          setOpen((e) => !e);
        }}
        className="text-[#d1182b] text-2xl cursor-pointer"
      />
      <SocialNetworks
        socialNetworks={socialNetworks}
        settings={settings}
        open={open}
      />
    </>
  );
}

export default SuportSubfooter;
