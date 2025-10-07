"use client";

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import compareReducer from "./features/compareSlice";
import filterLoadingReducer from "./features/filterLoadingSlice";
import activeTabReducer from "./slices/activeTab";
import addressReducer from "./slices/addressSlice";
import blogReducer from "./slices/blogSlice";
import cartReducer from "./slices/cartSlice";
import discountReducer from "./slices/discountSlice";
import favoritesReducer from "./slices/favoritesSlice";
import idEditReducer from "./slices/idEditSec";
import layoutProductsReducer from "./slices/layoutProducts";
import legalIdReducer from "./slices/legalIdSlice";
import menuResReducer from "./slices/menuResSlice";
import orderReducer from "./slices/orderSlice";
import paymentReducer from "./slices/paymentSlice";
import paymentWayReducer from "./slices/paymentWaySlice";
import popupsReducer from "./slices/popupsSlice";
import productColorReducer from "./slices/productColorSlice";
import settingsReducer from "./slices/settingsSlice";
import shippingReducer from "./slices/shippingSlice";
import shoppingReducer from "./slices/shoppingSlice";
import socialNetworksReducer from "./slices/socialNetworksSlice";
import supportBoxReducer from "./slices/supportBoxSlice";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  menuRes: menuResReducer,
  shopping: shoppingReducer,
  user: userReducer,
  socialNetworks: socialNetworksReducer,
  supportBox: supportBoxReducer,
  settings: settingsReducer,
  payment: paymentReducer,
  address: addressReducer,
  blog: blogReducer,
  cart: cartReducer,
  shipping: shippingReducer,
  legalId: legalIdReducer,
  paymentWay: paymentWayReducer,
  discount: discountReducer,
  order: orderReducer,
  favorites: favoritesReducer,
  filterLoading: filterLoadingReducer,
  compare: compareReducer,
  productColor: productColorReducer,
  layoutProducts: layoutProductsReducer,
  activeTab: activeTabReducer,
  popups: popupsReducer,
  idEdit: idEditReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "favorites", "address", "shipping"],
};

// ایجاد store به صورت singleton
let storeInstance = null;
let persistorInstance = null;

export function makeStore(preloadedState) {
  const isClient = typeof window !== "undefined";
  
  // اگر store قبلاً ایجاد شده، همان را برگردان
  if (storeInstance) {
    return { store: storeInstance, persistor: persistorInstance };
  }
  
  const reducer = isClient ? persistReducer(persistConfig, rootReducer) : rootReducer;
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
        thunk: true,
      }),
    preloadedState,
  });
  
  const persistor = isClient ? persistStore(store) : null;
  
  // ذخیره store برای استفاده بعدی
  storeInstance = store;
  persistorInstance = persistor;
  
  return { store, persistor };
}




