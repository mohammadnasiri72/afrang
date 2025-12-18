// components/RouteLoader.jsx - نسخه اصلاح شده
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function RouteLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => {
      console.log('🏁 Route change started');
      setLoading(true);
    };
    
    const handleComplete = () => {
      console.log('✅ Route change completed');
      setTimeout(() => {
        setLoading(false);
      }, 300); // کمی تاخیر برای smoothness
    };

    // لودینگ رو برای route فعلی پنهان کن
    handleComplete();

    // این رویدادها در Next.js 13+ کار می‌کنند
    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);

    // همچنین برای back/forward
    window.addEventListener('popstate', handleStart);

    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
      window.removeEventListener('popstate', handleStart);
    };
  }, []);

  // وقتی route تغییر کرد
  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999]">
      <div className="h-1 bg-gray-200 overflow-hidden">
        <div 
          className="h-full bg-[#d1182b] animate-progress"
          style={{
            width: '100%',
            animation: 'progress 1.5s ease-in-out infinite'
          }}
        />
      </div>
      <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}