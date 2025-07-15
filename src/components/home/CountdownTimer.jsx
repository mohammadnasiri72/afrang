'use client';

import { useState, useEffect } from 'react';

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return {
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const totalHours = (days * 24) + Math.floor((difference / (1000 * 60 * 60)) % 24);

      return {
        hours: totalHours,
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    // اولین اجرای محاسبه
    setTimeLeft(calculateTimeLeft());

    // آپدیت هر ثانیه
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // پاکسازی تایمر
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <>
      <div className="sm:flex hidden justify-center gap-2 duration-300">
        <div className="flex rounded-md justify-center shadow-lg px-2 py-1 bg-white">
          <span className="text-[#d1182b] font-semibold">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="pr-1">ساعت</span>
        </div>
        <div className="flex rounded-md justify-center shadow-lg px-2 py-1 bg-white">
          <span className="text-[#d1182b] font-semibold">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="pr-1">دقیقه</span>
        </div>
        <div className="flex rounded-md justify-center shadow-lg px-2 py-1 bg-white">
          <span className="text-[#d1182b] font-semibold">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="pr-1">ثانیه</span>
        </div>
      </div>
      <div className="sm:hidden flex flex-wrap justify-center gap-2 -translate-y-1/2 duration-300 opacity-100">
        <div className="flex rounded-md justify-center shadow-lg px-2 py-1 bg-white">
          <span className="text-[#d1182b] font-semibold">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="pr-1">ساعت</span>
        </div>
        <div className="flex rounded-md justify-center shadow-lg px-2 py-1 bg-white">
          <span className="text-[#d1182b] font-semibold">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="pr-1">دقیقه</span>
        </div>
        <div className="sm:flex hidden rounded-md justify-center shadow-lg px-2 py-1 bg-white">
          <span className="text-[#d1182b] font-semibold">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="pr-1">ثانیه</span>
        </div>
      </div>
    </>
  );
}

export default CountdownTimer; 