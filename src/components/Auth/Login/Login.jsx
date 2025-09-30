"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import EnterCodeSent from "./EnterCodeSent";
import LoginDainamic from "./LoginDainamic";
import LoginStatic from "./LoginStatic";

export default function Login() {
  const [stateLogin, setStateLogin] = useState(1);
  const [mobile, setMobile] = useState("");

  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  return (
    <>
      <div className="bg-[#f4f4f4] min-h-screen relative">
        <div className="w-[70%] min-h-screen absolute top-0 left-0 bottom-0 overflow-hidden">
          <Image
            src="/images/gallery/background-image.jpg"
            alt="پس‌زمینه گالری"
            fill
            priority
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,..." // جایگزین با base64 واقعی
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 70vw"
          />
        </div>
        <div className="flex justify-start min-h-screen items-center">
          {stateLogin === 1 && (
            <LoginStatic setStateLogin={setStateLogin} from={from} />
          )}
          {stateLogin === 2 && (
            <LoginDainamic
              setStateLogin={setStateLogin}
              mobile={mobile}
              setMobile={setMobile}
            />
          )}
          {stateLogin === 3 && (
            <EnterCodeSent
              mobile={mobile}
              setStateLogin={setStateLogin}
              from={from}
            />
          )}
        </div>
      </div>
    </>
  );
}
