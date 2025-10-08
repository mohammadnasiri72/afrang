"use client";
import Image from "next/image";
import { useState } from "react";
import RegisterOtp from "./RegisterOtp";
import RegisterStepTwo from "./RegisterStepTwo";

export default function Register() {
  const [stateRegister, setStateRegister] = useState(1);
  const [mobile, setMobile] = useState("");

  return (
    <>
      <div className="bg-[#f4f4f4] min-h-screen relative">
        <div className="w-[70%] min-h-screen absolute top-0 left-0 bottom-0 overflow-hidden">
          <Image
            src="/images/background-image.jpg"
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
          {stateRegister === 1 && (
            <RegisterOtp
              mobile={mobile}
              setMobile={setMobile}
              setStateRegister={setStateRegister}
            />
          )}
          {stateRegister === 2 && (
            <RegisterStepTwo
              mobile={mobile}
              setStateRegister={setStateRegister}
            />
          )}
        </div>
      </div>
    </>
  );
}
