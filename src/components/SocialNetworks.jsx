"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchSocialNetworksData } from "@/redux/slices/socialNetworksSlice";

const SocialNetworks = () => {
  const dispatch = useDispatch();
  const { socialNetworks, loading } = useSelector(
    (state) => state.socialNetworks
  );
  const { settings } = useSelector((state) => state.settings);

  useEffect(() => {
    if (!socialNetworks || socialNetworks.length === 0) {
      dispatch(fetchSocialNetworksData());
    }
  }, [dispatch, socialNetworks]);

  if (loading) {
    return (
      <div
        style={{ zIndex: "10020" }}
        className="fixed bottom-20 right-5 sm:flex hidden flex-col gap-3"
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#aaa5] p-2 rounded-lg w-10 h-10 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{ zIndex: "60" }}
      className="fixed sm:bottom-[32px] bottom-40 right-5 flex flex-col gap-3"
    >
      {/* {socialNetworks?.map((item) => (
        <Link
          key={item.id}
          href={item.sourceLink || "#"}
          target="_blank"
          className="bg-[#aaa5] p-2 rounded-lg cursor-pointer duration-300 hover:bg-white hover:text-[#d1182b] group hover:shadow-lg hover:border-[#0001] border border-transparent overflow-hidden"
        >
          <img
            src={`https://afrangadmin.aitest2.ir${item.image}`}
            alt={item.title || "social network"}
            className="w-6 h-6 object-contain "
          />
        </Link>
      ))} */}
      <Link
        aria-label="تماس با ما"
        href={`tel:${
          settings?.find((item) => item.propertyKey === "site_tel")?.value ||
          "02177615546"
        }`}
        className="relative bg-white p-2 rounded-full flex items-center justify-center shadow border border-transparent hover:bg-[#f5f5f5] transition duration-200 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 21 21"
          fill="none"
        >
          <path
            d="M17.7138 16.4214C17.7138 16.7141 17.6488 17.015 17.5106 17.3077C17.3723 17.6004 17.1934 17.8768 16.9577 18.137C16.5592 18.5761 16.1202 18.8932 15.6242 19.0965C15.1363 19.2998 14.6078 19.4055 14.0386 19.4055C13.2093 19.4055 12.323 19.2103 11.3879 18.8119C10.4529 18.4135 9.51783 17.8768 8.5909 17.202C7.65584 16.519 6.76957 15.7628 5.92395 14.9253C5.08646 14.0797 4.33028 13.1934 3.65541 12.2665C2.98868 11.3396 2.45203 10.4126 2.06175 9.49383C1.67146 8.5669 1.47632 7.68063 1.47632 6.83501C1.47632 6.2821 1.57389 5.75359 1.76903 5.26573C1.96418 4.76975 2.27315 4.31441 2.70409 3.90786C3.22447 3.39561 3.79364 3.14355 4.39533 3.14355C4.623 3.14355 4.85066 3.19234 5.05394 3.28991C5.26534 3.38748 5.45235 3.53384 5.59871 3.74525L7.48509 6.40407C7.63145 6.60734 7.73715 6.79435 7.81033 6.97323C7.88351 7.14398 7.92416 7.31473 7.92416 7.46922C7.92416 7.66436 7.86725 7.85951 7.75341 8.04652C7.64771 8.23353 7.49322 8.42867 7.29808 8.62382L6.68013 9.26616C6.59069 9.3556 6.55003 9.46131 6.55003 9.5914C6.55003 9.65645 6.55816 9.71336 6.57443 9.77841C6.59882 9.84346 6.62321 9.89225 6.63947 9.94103C6.78583 10.2094 7.03789 10.559 7.39565 10.9818C7.76154 11.4046 8.15183 11.8355 8.57464 12.2665C9.01371 12.6974 9.43652 13.0958 9.86746 13.4617C10.2903 13.8195 10.6399 14.0634 10.9164 14.2098C10.957 14.226 11.0058 14.2504 11.0627 14.2748C11.1278 14.2992 11.1928 14.3074 11.266 14.3074C11.4042 14.3074 11.5099 14.2586 11.5994 14.1691L12.2173 13.5593C12.4206 13.356 12.6157 13.2015 12.8027 13.104C12.9897 12.9901 13.1768 12.9332 13.38 12.9332C13.5345 12.9332 13.6971 12.9657 13.876 13.0389C14.0549 13.1121 14.2419 13.2178 14.4452 13.356L17.1365 15.2668C17.3479 15.4132 17.4943 15.5839 17.5837 15.7872C17.665 15.9905 17.7138 16.1937 17.7138 16.4214Z"
            stroke="#D1182B"
            strokeWidth="1.2"
            strokeMiterlimit="10"
          />
          <path
            d="M14.8922 8.83509C14.8922 8.34723 14.5101 7.59919 13.9409 6.98936C13.4205 6.42833 12.7294 5.98926 12.0464 5.98926"
            stroke="#D1182B"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.7381 8.83522C17.7381 5.68854 15.1931 3.14355 12.0464 3.14355"
            stroke="#D1182B"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded-lg px-2 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
          تماس با ما
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </Link>
    </div>
  );
};

export default SocialNetworks;
