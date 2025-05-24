"use client";

import dynamic from 'next/dynamic';
import Container from "@/components/container";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { fetchCartData } from '@/redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const HeaderCard = dynamic(() => import("@/components/Card/HeaderCard"));
const BodyPayment = dynamic(() => import("@/components/payment/BodyPayment"));

export default function CompletePay() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);
    const selectedAddress = useSelector((state) => state.address.selectedAddress);
    const selectedShipping = useSelector((state) => state.shipping.selectedShipping);

    // import sweet alert 2
    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: "toast-modal",
    });

    useEffect(() => {
        const checkCart = async () => {
            if (!items || items.length === 0) {
                router.push('/cart');
            }
        };
        checkCart();
    }, [dispatch, items, router]);

    useEffect(() => {
        if (!selectedAddress || !selectedShipping) {
            Toast.fire({
                icon: "warning",
                text: "لطفاً ابتدا آدرس و روش ارسال را انتخاب کنید",
                customClass: { container: "toast-modal" },
            });
            router.push("/cart/infosend");
        }
    }, [selectedAddress, selectedShipping]);

    return (
        <div className="bg-[#f6f6f6] overflow-hidden">
            <Container>
                <HeaderCard />
                <BodyPayment />
            </Container>
        </div>
    );
}
