"use client";

import { configureStore } from "@reduxjs/toolkit";
import menuResReducer from './slices/menuResSlice'
import shoppingReducer from './slices/shoppingSlice'
import userReducer from './slices/userSlice'
import socialNetworksReducer from './slices/socialNetworksSlice'
import supportBoxReducer from './slices/supportBoxSlice'
import settingsReducer from './slices/settingsSlice'
import Cookies from "js-cookie";
import cartReducer from './slices/cartSlice';
import paymentReducer from "./slices/paymentSlice";
import addressReducer from './slices/addressSlice';
import shippingReducer from './slices/shippingSlice';
import legalIdReducer from './slices/legalIdSlice';
import paymentWayReducer from './slices/paymentWaySlice';
import discountReducer from './slices/discountSlice';
import orderReducer from './slices/orderSlice';
import favoritesReducer from './slices/favoritesSlice';
import { loadState, saveState } from './middleware/persistState';
import { getUserCookie } from "@/utils/cookieUtils";
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import filterLoadingReducer from './features/filterLoadingSlice';

const persistedState = {
  user: {
    user: getUserCookie() || '',
  },
  ...loadState()
};

const rootReducer = combineReducers({
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
  order: orderReducer,
  favorites: favoritesReducer,
  filterLoading: filterLoadingReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'favorites']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      thunk: true
    }),
  preloadedState: persistedState,
})

export const persistor = persistStore(store);

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
    saveState(store.getState());
});