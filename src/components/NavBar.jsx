"use client";

import ResponsiveMenu from "./ResponsiveMenu";
import SearchNavbar from "./SearchNavbar";
import { getImageUrl } from "@/utils/mainDomain";
import { useSelector } from "react-redux";
import Link from "next/link";

const NavBar = () => {
  const { settings } = useSelector((state) => state.settings);

  return (
    <div className="bg-[#d1182b] px-2 flex items-center justify-between text-white">
      {/* <div className="px-3 ml-2 lg:hidden bg-white h-full flex items-center justify-center">
        {settings?.find((item) => item.propertyKey === "site_home_url") ? (
          <Link
            href={
              settings.find((item) => item.propertyKey === "site_home_url")
                ?.value
            }
          >
            <img
              className="lg:hidden w-12 "
              src={
                getImageUrl(
                  settings.find((item) => item.propertyKey === "site_footer_logo")
                    ?.value
                )
              }
              alt=""
            />
          </Link>
        ) : (
          <img className="lg:hidden w-12" src="/images/logo.png" alt="" />
        )}
      </div> */}

      <SearchNavbar />

      <div className="flex-1">
        <ResponsiveMenu />
      </div>
    </div>
  );
};

export default NavBar;
