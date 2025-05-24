"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData } from '@/redux/slices/cartSlice';

export default function ClearCart() {
  const dispatch = useDispatch();
  const { cartType } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(fetchCartData(cartType));
  }, [dispatch, cartType]);

  return null;
} 