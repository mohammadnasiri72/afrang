"use client";

import Loading from "@/components/Loading";
import { useRouter, usePathname } from "next/navigation";
import { useTransition, useEffect, Suspense } from "react";

function CustomRouteLoaderContent() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Monkey patch کردن router.push و router.replace
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (...args) => {
      startTransition(() => {
        originalPush.apply(router, args);
      });
    };

    router.replace = (...args) => {
      startTransition(() => {
        originalReplace.apply(router, args);
      });
    };

    // رهگیری کلیک روی لینک‌های داخلی
    const handleClick = (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // فقط لینک‌های داخلی
      const isInternalLink = 
        href.startsWith("/") || 
        href.startsWith(window.location.origin);
      
      if (!isInternalLink) return;

      // ignore موارد خاص
      if (
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        link.hasAttribute("data-fancybox") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      e.preventDefault();
      
      startTransition(() => {
        router.push(href);
      });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router, startTransition]);

  if (!isPending) return null;
  return <Loading />;
}

export default function CustomRouteLoader() {
  return (
    <Suspense fallback={null}>
      <CustomRouteLoaderContent />
    </Suspense>
  );
}