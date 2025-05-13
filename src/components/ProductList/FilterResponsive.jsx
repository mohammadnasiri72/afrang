"use client";
import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useState } from "react";
import { FaSortAmountUp } from "react-icons/fa";
import SelectCategoryFilter from "./SelectCategoryFilter";

function FilterResponsive() {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      // عملیات خروج
    }
    setVisible(false);
  };
  const menuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "پروفایل کاربری",
      onClick: () => console.log("Profile clicked"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "تنظیمات حساب",
      onClick: () => console.log("Settings clicked"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "خروج از حساب",
      danger: true,
    },
  ];

  return (
    <>
      {/* <span className="font-semibold cursor-pointer duration-300 text-[15px] whitespace-nowrap select-none hover:text-[#d1182b] border lg:border-none rounded-lg lg:rounded-none px-[15px] lg:px-0 py-[5px] lg:py-0 border-[#18d1be] flex lg:hidden items-center justify-center gap-1">
        <FaSortAmountUp className="lg:hidden" />
        فیلتر
      </span> */}
      {/* <Dropdown menu={{ items }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>Click me</Space>
        </a>
      </Dropdown> */}
      <Dropdown
        // overlayClassName={styles.fullscreenDropdown}
        overlayStyle={{ width: "100vw" }}
        placement="bottom"
        trigger={["click"]}
        open={visible}
        onOpenChange={(flag) => setVisible(flag)}
        // menu={{
        //   items: menuItems,
        //   onClick: handleMenuClick,
        //   style: {
        //     width: "100%",
        //     borderRadius: 0,
        //     padding: "20px 0",
        //   },
        // }}
        dropdownRender={() => (
          <div className="p-3 mt-3 absolute left-0 right-0">
            <div className=" bg-white rounded-lg p-3 shadow-lg">
              <SelectCategoryFilter />
            </div>
          </div>
        )}
      >
        {/* <Button type="text"> */}
        <span
          className={`font-semibold cursor-pointer duration-300 text-[15px] whitespace-nowrap select-none border lg:border-none rounded-lg lg:rounded-none px-[15px] lg:px-0 py-[5px] lg:py-0 flex lg:hidden items-center justify-center gap-1 ${
            visible ? "border-[#18d1be] text-[#d1182b]" : "border-[#d5d5d5]"
          }`}
        >
          <FaSortAmountUp className="lg:hidden" />
          فیلتر
        </span>
        {/* </Button> */}
      </Dropdown>
    </>
  );
}

export default FilterResponsive;
