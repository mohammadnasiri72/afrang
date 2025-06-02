"use client";

import { Breadcrumb } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBreadcrumb, getBreadcrumbProduct } from "@/services/Category/categoryService";
import { useParams, usePathname } from "next/navigation";

function BreadcrumbNav() {
  // استیت برای نگهداری آیتم‌های مسیر
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  const params = useParams();
  const pathname = usePathname();

  useEffect(() => {
    // تابع دریافت اطلاعات مسیر
    const fetchBreadcrumb = async () => {
      // اگر مسیر فقط /products باشد، فقط خانه و محصولات را نمایش بده
      if (pathname === '/products') {
        setBreadcrumbItems([
          {
            title: (
              <Link href="/" className="text-gray-500 hover:text-[#d1182b] font-[Yekan]">
                خانه
              </Link>
            ),
          },
          {
            title: <span className="text-[#d1182b] font-[Yekan]">محصولات</span>,
          },
        ]);
        return;
      }

      

      // اگر شناسه محصول در URL وجود داشت
      if (params?.slug?.[params?.slug?.length - 2]) {
        // اگر در صفحه محصول هستیم از getBreadcrumbProduct استفاده کن
        const isProductPage = pathname.includes('/product/');
        const data = isProductPage 
          ? await getBreadcrumbProduct(params?.slug?.[params?.slug?.length - 2])
          : await getBreadcrumb(params?.slug?.[params?.slug?.length - 2]);

        if (data) {
          // تنظیم آیتم‌های مسیر
          setBreadcrumbItems([
            {
              // آیتم خانه همیشه اول مسیر است
              title: (
                <Link href="/" className="text-gray-500 hover:text-[#d1182b] font-[Yekan]">
                  خانه
                </Link>
              ),
            },
            // تبدیل داده‌های دریافتی به فرمت مورد نیاز کامپوننت Breadcrumb
            ...data.map((item) => ({
              title: item.href ? (
                <Link href={item.href} className="text-gray-500 hover:text-[#d1182b] font-[Yekan]">
                  {item.title}
                </Link>
              ) : (
                <span className="text-[#d1182b] font-[Yekan]">{item.title}</span>
              ),
            })),
          ]);
        }
      }
    };

    fetchBreadcrumb();
  }, [params?.slug, pathname]); // اجرای مجدد با تغییر URL

  // اگر آیتمی وجود نداشت چیزی نمایش نده
  if (!breadcrumbItems.length) return null;

  return (
    <div className="bg-white py-4 px-5 rounded-lg xl:px-16">
      <Breadcrumb
        items={breadcrumbItems}
        separator={<span className="text-gray-400 mx-2 text-xs font-[Yekan]">&gt;</span>}
        className="font-[Yekan]"
      />
    </div>
  );
}

export default BreadcrumbNav; 