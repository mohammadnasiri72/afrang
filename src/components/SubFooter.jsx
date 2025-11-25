"use client";

import { setOpenMenuRes } from "@/redux/slices/menuResSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { useDispatch } from "react-redux";
import Loading from "./Loading";
import SearchSubfooter from "./SearchSubfooter";
import SocialNetworks from "./SocialNetworks";
import SuportSubfooter from "./SuportSubfooter";

export default function SubFooter({ socialNetworks, settings }) {
  const disPatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <>
      <SocialNetworks socialNetworks={socialNetworks} settings={settings} />
      <div className="sm:hidden flex justify-around px-2 py-3 fixed bottom-0 bg-white left-0 right-0 text-[#666] z-100000 border-red-600 border-t">
        <SuportSubfooter socialNetworks={socialNetworks} settings={settings} />
        <SearchSubfooter />

        {/* <ShoppingDrawer startTransition={startTransition} /> */}
        <Link
          href="/cart"
          onClick={(ev) => {
            ev.preventDefault();
            startTransition(() => {
              router.push("/cart");
            });
          }}
        >
          <IoCartOutline className="text-[#d1182b] text-2xl" />
        </Link>

        <Link
          href="/profile/dashboard"
          onClick={(ev) => {
            ev.preventDefault();
            startTransition(() => {
              router.push("/profile/dashboard");
            });
          }}
        >
          <LuUserRound className="text-[#d1182b] text-2xl" />
        </Link>

        <HiOutlineMenu
          onClick={() => {
            disPatch(setOpenMenuRes(true));
          }}
          className="text-[#d1182b] text-2xl cursor-pointer"
        />
      </div>
      {isPending && <Loading />}
    </>
  );
}
