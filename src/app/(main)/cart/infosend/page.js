"use client";

import Container from "@/components/container";
import Loading from "@/components/Loading";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeaderCard = dynamic(() => import("@/components/Card/HeaderCard"));
const CompeletePayWrapper = dynamic(() =>
  import("@/components/CompeletePay/CompeletePayWrapper")
);

export default function CompletePay() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.cart);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkAuthAndCart = async () => {
      try {
        // Check for user token
        const userCookie = Cookies.get("user");

        if (!userCookie) {
          startTransition(() => {
            router.push("/cart");
          });

          return;
        }

        const userData = JSON.parse(userCookie);
        if (!userData?.token) {
          startTransition(() => {
            router.push("/cart");
          });

          return;
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        startTransition(() => {
          router.push("/cart");
        });
      }
    };

    checkAuthAndCart();
  }, [dispatch, currentItems, router]);

  if (!mounted) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <div className="bg-[#f6f6f6] overflow-hidden max-w-[2000px] mx-auto">
        <Container>
          <HeaderCard />
          <CompeletePayWrapper />
        </Container>
      </div>
      {isPending && <Loading />}
    </>
  );
}
