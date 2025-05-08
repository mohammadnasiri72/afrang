"use client";
import "@ant-design/v5-patch-for-react-19";
import { useState } from "react";
import RegisterOtp from "./RegisterOtp";
import RegisterStepTwo from "./RegisterStepTwo";

export default function Register() {
  const [stateRegister, setStateRegister] = useState(1);
  const [mobile, setMobile] = useState("");
  return (
    <>
      <div className="bg-[#f4f4f4] min-h-screen relative">
        <div
          style={{
            backgroundImage: "url(/images/gallery/background-image.jpg)",
          }}
          className="w-[70%] min-h-screen absolute top-0 left-0 bottom-0 bg-cover bg-no-repeat "
        ></div>
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
