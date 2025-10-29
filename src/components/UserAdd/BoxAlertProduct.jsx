"use client";

import { Alert } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Loading from "../Loading";

function BoxAlertProduct() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <>
      <Alert
        message=" لطفا قبل از انجام هرگونه معامله، قوانین خرید و فروش را مطالعه نمایید "
        description={
          <Link
            href="/usedrules"
            onClick={(ev) => {
              ev.preventDefault();
              startTransition(() => {
                router.push("/usedrules");
              });
            }}
          >
            مشاهده قوانین خرید و فروش تجهیزات کارکرده و دست دوم.
          </Link>
        }
        type="warning"
        className="text-justify"
      />
      {isPending && <Loading />}
    </>
  );
}

export default BoxAlertProduct;
