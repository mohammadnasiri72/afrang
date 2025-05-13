"use client";

import { configureStore } from "@reduxjs/toolkit";
import menuResReducer from '../redux/slice/menuRes'
import shoppingReducer from '../redux/slice/shopping'
import userReducer from '../redux/slice/user'
import socialNetworksReducer from '../redux/slice/socialNetworks'
import supportBoxReducer from './slice/supportBox'
import settingsReducer from './slice/settings'
import Cookies from "js-cookie";
import cartReducer from './slices/cartSlice';
import paymentReducer from "./slices/paymentSlice";
import addressReducer from './slices/addressSlice';
import shippingReducer from './slices/shippingSlice';
import legalIdReducer from './slices/legalIdSlice';
import paymentWayReducer from './slices/paymentWaySlice';
import discountReducer from './slices/discountSlice';
import orderReducer from './slices/orderSlice';

const loadUserFromCookie = () => {
  try {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      return JSON.parse(userCookie);
    }
  } catch (error) {
    console.error("Error loading user from cookie:", error);
  }
  return null;
};

export const store = configureStore({
  reducer: {
    menuRes: menuResReducer,
    shopping: shoppingReducer,
    user: userReducer,
    socialNetworks: socialNetworksReducer,
    supportBox: supportBoxReducer,
    settings: settingsReducer,
    cart: cartReducer,
    payment: paymentReducer,
    address: addressReducer,
    shipping: shippingReducer,
    legalId: legalIdReducer,
    paymentWay: paymentWayReducer,
    discount: discountReducer,
    order: orderReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      thunk: true
    }),
  preloadedState: {
    user: {
      user: loadUserFromCookie(),
    },
  },
})