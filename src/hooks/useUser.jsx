"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice/user";

export function useUser() {
  //   const [user, setUser] = useState(null);
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // این کد فقط در سمت کلاینت اجرا می‌شود
    const userCookie = Cookies.get("user");
    dispatch(setUser(userCookie ? JSON.parse(userCookie) : null));
    setIsLoading(false);
  }, []);

  return { user, isLoading };
}
