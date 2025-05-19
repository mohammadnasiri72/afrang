"use client";

import Link from "next/link";
import { FaAngleLeft, FaHome } from "react-icons/fa6";

const Breadcrumb = ({ items }) => {
  return (
    <div className="bg-white shadow-sm mb-6 py-4">
      <div className="container xl:px-16 mx-auto">
        <nav className="flex items-center text-sm">
          <Link
            href="/"
            className="text-gray-500 hover:text-[#d1182b] transition-colors duration-200 flex items-center"
          >
            <FaHome className="text-lg" />
            <span className="mr-2">خانه</span>
          </Link>

          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              <FaAngleLeft className="mx-3 text-gray-400" />
              {index === items.length - 1 ? (
                <span className="text-[#d1182b] font-semibold">{item.title}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-[#d1182b] transition-colors duration-200"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb; 