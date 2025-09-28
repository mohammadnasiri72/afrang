"use client";

import ResponsiveMenu from "./ResponsiveMenu";
import SearchNavbar from "./SearchNavbar";

const NavBar = ({ activeMenu, setActiveMenu, menuItems, startTransition }) => {
  return (
    <div className="bg-[#d1182b] w-full">
      <div
        style={{ maxWidth: "2000px", margin: "0 auto", width: "100%" }}
        className="px-2 flex justify-between items-center text-white"
      >
        {menuItems && menuItems.length > 0 && (
          <div className="flex-1">
            <ResponsiveMenu
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              initialItems={menuItems}
              startTransition={startTransition}
            />
          </div>
        )}
        <SearchNavbar />
      </div>
    </div>
  );
};

export default NavBar;
