// components/RouteLoader.jsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function RouteLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {

    const handleStart = (url) => {
      setLoading(true);
    };
    
    const handleComplete = (url) => {
      // کمی تاخیر برای اینکه لودینگ دیده شود
      setTimeout(() => {
        setLoading(false);
      }, 100);
    };

    const handleError = (err, url) => {
      console.error(`❌ Route change error: ${err} for ${url}`);
      setLoading(false);
    };

    // استفاده از رویدادهای Router در Next.js
    router.events?.on('routeChangeStart', handleStart);
    router.events?.on('routeChangeComplete', handleComplete);
    router.events?.on('routeChangeError', handleError);

    // همچنین برای back/forward مرورگر
    window.addEventListener('popstate', () => {
      setLoading(true);
    });

    return () => {
      router.events?.off('routeChangeStart', handleStart);
      router.events?.off('routeChangeComplete', handleComplete);
      router.events?.off('routeChangeError', handleError);
      window.removeEventListener('popstate', () => {});
    };
  }, [router]);

  // وقتی route تغییر کرد، لودینگ را پنهان کن
  useEffect(() => {
    if (pathname) {
      // کمی تاخیر برای اطمینان
      setTimeout(() => {
        setLoading(false);
      }, 150);
    }
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
          100% { transform: translateX(400%); }
        }
        .animate-progress {
          animation: progress 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}