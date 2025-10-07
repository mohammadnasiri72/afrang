"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentCart, fetchNextCart } from '@/redux/slices/cartSlice';

export default function ClearCart() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentCart());
    dispatch(fetchNextCart());
  }, [dispatch]);

  return null;
} 