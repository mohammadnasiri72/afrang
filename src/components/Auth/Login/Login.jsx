"use client";

import "@ant-design/v5-patch-for-react-19";
import { useState } from "react";
import LoginDainamic from "./LoginDainamic";
import LoginStatic from "./LoginStatic";
import EnterCodeSent from "./EnterCodeSent";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const [stateLogin, setStateLogin] = useState(1);
  const [mobile, setMobile] = useState("");

  const searchParams = useSearchParams();
  const from = searchParams.get('from');


  return (
    <>
      <div className="bg-[#f4f4f4] min-h-screen relative">
        <div
          style={{
            backgroundImage: "url(/images/gallery/background-image.jpg)",
          }}
          className="w-[70%] min-h-screen absolute top-0 left-0 bottom-0 bg-cover bg-no-repeat"
        ></div>
        <div className="flex justify-start min-h-screen items-center">
          {stateLogin === 1 && <LoginStatic setStateLogin={setStateLogin} from={from}/>}
          {stateLogin === 2 && (
            <LoginDainamic
              setStateLogin={setStateLogin}
              mobile={mobile}
              setMobile={setMobile}
            />
          )}
          {stateLogin === 3 && <EnterCodeSent mobile={mobile} setStateLogin={setStateLogin} from={from}/>}
        </div>
      </div>
    </>
  );
}
