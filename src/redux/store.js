"use client";

import { getUserCookie } from "@/utils/cookieUtils";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import compareReducer from './features/compareSlice';
import filterLoadingReducer from './features/filterLoadingSlice';
import { loadState, saveState } from './middleware/persistState';
import addressReducer from './slices/addressSlice';
import cartReducer from './slices/cartSlice';
import blogReducer from './slices/blogSlice';
import discountReducer from './slices/discountSlice';
import favoritesReducer from './slices/favoritesSlice';
import legalIdReducer from './slices/legalIdSlice';
import menuResReducer from './slices/menuResSlice';
import orderReducer from './slices/orderSlice';
import paymentReducer from "./slices/paymentSlice";
import paymentWayReducer from './slices/paymentWaySlice';
import settingsReducer from './slices/settingsSlice';
import shippingReducer from './slices/shippingSlice';
import shoppingReducer from './slices/shoppingSlice';
import socialNetworksReducer from './slices/socialNetworksSlice';
import supportBoxReducer from './slices/supportBoxSlice';
import userReducer from './slices/userSlice';
import productColorReducer from './slices/productColorSlice';

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
  blog: blogReducer,
  shipping: shippingReducer,
  legalId: legalIdReducer,
  paymentWay: paymentWayReducer,
  discount: discountReducer,
  order: orderReducer,
  favorites: favoritesReducer,
  filterLoading: filterLoadingReducer,
  compare: compareReducer,
  productColor: productColorReducer,
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