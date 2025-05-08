"use client";

import { useState, useEffect } from "react";
import { toGregorian } from "jalaali-js";

const Timer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // تبدیل تاریخ شمسی به میلادی
    const [year, month, day] = targetDate.split("/").map(Number);
    const gregorianDate = toGregorian(year, month, day);

    // ایجاد تاریخ میلادی
    const target = new Date(
      gregorianDate.gy,
      gregorianDate.gm - 1,
      gregorianDate.gd
    );

    const updateTimer = () => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [targetDate]);

  return (
    <div className="countdown-timer">
      <div className="flex gap-2 items-center">
        <div className="flex bg-[#ececec] py-0.5 rounded-sm items-center w-1/4 justify-center">
          <span className="font-semibold text-lg">{timeLeft.days}</span>
          <span className="pr-2 text-[#666] text-xs">روز</span>
        </div>
        <div className="flex bg-[#ececec] py-0.5 rounded-sm items-center w-1/4 justify-center">
          <span className="font-semibold text-lg">{timeLeft.hours}</span>
          <span className="pr-2 text-[#666] text-xs">ساعت</span>
        </div>
        <div className="flex bg-[#ececec] py-0.5 rounded-sm items-center w-1/4 justify-center">
          <span className="font-semibold text-lg">{timeLeft.minutes}</span>
          <span className="pr-2 text-[#666] text-xs">دقیقه</span>
        </div>
        <div className="flex bg-[#ececec] py-0.5 rounded-sm items-center w-1/4 justify-center">
          <span className="font-semibold text-lg">{timeLeft.seconds}</span>
          <span className="pr-2 text-[#666] text-xs">ثانیه</span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
