"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchSocialNetworksData } from "@/redux/slices/socialNetworksSlice";

const SocialNetworks = () => {
  const dispatch = useDispatch();
  const { socialNetworks, loading } = useSelector((state) => state.socialNetworks);

  

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
      style={{ zIndex: "10020" }}
      className="fixed bottom-20 right-5 sm:flex hidden flex-col gap-3"
    >
      {socialNetworks?.map((item) => (
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
      ))}
    </div>
  );
};

export default SocialNetworks;
