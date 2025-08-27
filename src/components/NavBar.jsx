"use client";

import ResponsiveMenu from "./ResponsiveMenu";
import SearchNavbar from "./SearchNavbar";

const NavBar = ({ activeMenu, setActiveMenu }) => {
 
  return (
    <div className="bg-[#d1182b] w-full">
      <div
        style={{ maxWidth: "2000px", margin: "0 auto", width: "100%" }}
        className="px-2 flex justify-between items-center text-white"
      >
        <div className="flex-1">
          <ResponsiveMenu
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
        <SearchNavbar />
      </div>
    </div>
  );
};

export default NavBar;
