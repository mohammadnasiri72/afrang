"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { getUserCookie } from "@/utils/cookieUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = getUserCookie();
    setUser(userData);
    setLoading(false);
  }, []);

  if (!loading) {
    return (
      <AuthContext.Provider value={{ user, isLoading: false }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return null;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 