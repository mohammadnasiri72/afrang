"use client";

import { Alert } from "antd";
import Link from "next/link";

function BoxAlertProduct() {
  return (
    <>
      <Alert
        message=" لطفا قبل از انجام هرگونه معامله، قوانین خرید و فروش را مطالعه نمایید "
        description={
          <Link href="/usedrules">
            مشاهده قوانین خرید و فروش تجهیزات کارکرده و دست دوم.
          </Link>
        }
        type="warning"
        className="text-justify"
      />
    </>
  );
}

export default BoxAlertProduct;
