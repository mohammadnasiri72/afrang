"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { fetchCartData } from '@/redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import HeaderCard from '@/components/Card/HeaderCard';
import BodyPayment from '@/components/payment/BodyPayment';

export default function OrderPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);

    useEffect(() => {
        const checkCart = async () => {
            await dispatch(fetchCartData());
            if (!items || items.length === 0) {
                router.push('/cart');
            }
        };
        checkCart();
    }, [dispatch, items, router]);

    return (
        <div className="bg-[#f6f6f6] overflow-hidden">
            <div className="container mx-auto px-4">
                <HeaderCard />
                <BodyPayment />
            </div>
        </div>
    );
} 