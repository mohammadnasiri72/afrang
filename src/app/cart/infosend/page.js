"use client";

import dynamic from 'next/dynamic';
import Container from "@/components/container";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { fetchCartData } from '@/redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

const HeaderCard = dynamic(() => import("@/components/Card/HeaderCard"));
const CompeletePayWrapper = dynamic(() => import("@/components/CompeletePay/CompeletePayWrapper"));

export default function CompletePay() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { currentItems } = useSelector((state) => state.cart);

    useEffect(() => {
        const checkCart = async () => {
            if (!currentItems || currentItems.length === 0) {
                router.push('/cart');
            }
        };
        checkCart();
    }, [dispatch, currentItems, router]);

    

    return (
        <div className="bg-[#f6f6f6] overflow-hidden">
            <Container>
                <HeaderCard />
                <CompeletePayWrapper />
            </Container>
        </div>
    );
}
