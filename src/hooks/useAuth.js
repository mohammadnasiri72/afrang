"use client";

import { useSelector } from "react-redux";

export function useAuth() {
  const user = useSelector((state) => state.user.user);

  return {
    isAuthenticated: !!user,
    user,
    isLoading: false
  };
} 