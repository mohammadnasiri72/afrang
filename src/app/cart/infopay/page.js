"use client";

import Container from "@/components/container";
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const HeaderCard = dynamic(() => import("@/components/Card/HeaderCard"));
const BodyPayment = dynamic(() => import("@/components/payment/BodyPayment"));

export default function CompletePay() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { currentItems } = useSelector((state) => state.cart);
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

    const [mounted, setMounted] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const checkAuthAndCart = async () => {
            try {
                // Check for user token
                const userCookie = Cookies.get('user');
                if (!userCookie) {
                    router.push('/cart');
                    return;
                }

                const userData = JSON.parse(userCookie);
                if (!userData?.token) {
                    router.push('/cart');
                    return;
                }

                // Check cart items
                if (!currentItems || currentItems.length === 0) {
                    const currentPath = window.location.pathname;
                    const searchParams = window.location.search;
                    // اگر در صفحه سفارشات با trackCode هستیم، اجازه خالی بودن سبد خرید رو بده
                    if (!currentPath.includes('/profile/orders') || !searchParams.includes('trackCode')) {
                        router.push('/cart');
                        return;
                    }
                }

                // Check address and shipping - فقط بعد از mount شدن
                if (mounted && (!selectedAddress || !selectedShipping)) {
                    Toast.fire({
                        icon: "warning",
                        text: "لطفاً ابتدا آدرس و روش ارسال را انتخاب کنید",
                        customClass: { container: "toast-modal" },
                    });
                    router.push("/cart/infosend");
                    return;
                }

                setIsChecking(false);
            } catch (error) {
                console.error('Error checking auth:', error);
                router.push('/cart');
            }
        };

        if (mounted) {
            checkAuthAndCart();
        }
    }, [dispatch, currentItems, router, selectedAddress, selectedShipping, mounted]);


    // نمایش loading تا زمانی که چک‌ها تمام نشده
    if (!mounted || isChecking) {
        return (
            <div className="w-full min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d1182b]"></div>
            </div>
        );
    }

    // اگر هنوز آدرس یا shipping انتخاب نشده، loading نمایش بده
    if (!selectedAddress || !selectedShipping) {
        return (
            <div className="w-full min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d1182b]"></div>
            </div>
        );
    }


    return (
        <div className="bg-[#f6f6f6] overflow-hidden">
            <Container>
                <HeaderCard />
                <BodyPayment />
            </Container>
        </div>
    );
}
