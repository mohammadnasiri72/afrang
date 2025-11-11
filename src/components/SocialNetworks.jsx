"use client";

import { mainDomainImg } from "@/utils/mainDomain";
import { Tooltip } from "antd";
import Link from "next/link";
import * as FaIcons from "react-icons/fa";
import { TbPhoneCall } from "react-icons/tb";

export function IconRenderer({ iconName, ...props }) {
  const IconComponent = FaIcons[iconName];

  if (!IconComponent) return null; // یا یه آیکون پیشفرض

  return <IconComponent {...props} />;
}

const SocialNetworks = ({ socialNetworks, settings, open }) => {
  const socialNetworksIsHome = socialNetworks.filter((e) => e.isHome);

  return (
    <>
     

      <div
        style={{ zIndex: "100000001" }}
        className={`fixed duration-300 right-1 flex flex-col gap-3 ${
          open ? "bottom-20 sm:bottom-[32px]" : "-bottom-56 sm:bottom-[32px]"
        }`}
      >
        {socialNetworksIsHome.map((item) => (
          <Tooltip placement="left" title={item.title} key={item.id}>
            <Link
              aria-label={item.title}
              href={item.sourceLink || "#"}
              className="relative flex items-center justify-center transition duration-200 group w-10 h-10"
            >
              {/* {item.itemKey && (
              <IconRenderer
                className="text-[#d1182b] group-hover:text-teal-500 duration-300 text-xl"
                iconName={item.itemKey}
              />
            )} */}
              {item.image ? (
                <img
                  src={mainDomainImg + item.image}
                  alt={item.title || "social network"}
                  className="w-10 h-10 object-contain "
                />
              ) : item.itemKey ? (
                <IconRenderer
                  className={`text-slate-800 group-hover:!text-[#d1182b] duration-300 text-xl ${item.itemKey}`}
                  iconName={item.itemKey}
                />
              ) : null}
            </Link>
          </Tooltip>
        ))}
        <Tooltip placement="left" title="تماس با ما">
          <Link
            aria-label="تماس با ما"
            href={`tel:${
              settings?.find((item) => item.propertyKey === "site_tel")
                ?.value || "02177615546"
            }`}
            className="relative bg-white p-2 rounded-full flex items-center justify-center shadow border border-transparent hover:bg-[#f5f5f5] transition duration-200 group w-10 h-10"
          >
            <TbPhoneCall className="text-[#d1182b] group-hover:text-teal-500 duration-300 text-xl" />
          </Link>
        </Tooltip>
      </div>
    </>
  );
};

export default SocialNetworks;
