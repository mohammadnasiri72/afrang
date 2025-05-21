"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { MdMailOutline } from "react-icons/md";

import { fetchSettingsData } from "@/redux/slice/settings";
import { mainDomainImg } from "@/utils/mainDomain";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { fetchSocialNetworksData } from "@/redux/slice/socialNetworks";

const Footer = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.settings);
  const { items: socialNetworks } = useSelector((state) => state.socialNetworks);

  useEffect(() => {
    dispatch(fetchSettingsData());
    dispatch(fetchSocialNetworksData());
  }, [dispatch]);

  return (
    <div className="bg-[#f8f8f8]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">درباره ما</h3>
            <p className="text-gray-600">
              {items.find((item) => item.propertyKey === "site_about")?.value}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">تماس با ما</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">آدرس:</span>{" "}
                {items.find((item) => item.propertyKey === "site_address")?.value}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">تلفن:</span>{" "}
                {items.find((item) => item.propertyKey === "site_tel")?.value}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">ایمیل:</span>{" "}
                {items.find((item) => item.propertyKey === "site_email")?.value}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#d1182b]">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#d1182b]">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-[#d1182b]">
                  سوالات متداول
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">شبکه‌های اجتماعی</h3>
            <div className="flex space-x-4">
              {socialNetworks.map((network) => (
                <a
                  key={network.id}
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#d1182b]"
                >
                  <img
                    src={mainDomainImg + network.icon}
                    alt={network.name}
                    className="w-6 h-6"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>
            © {new Date().getFullYear()} خانه عکاسان افرانگ. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
