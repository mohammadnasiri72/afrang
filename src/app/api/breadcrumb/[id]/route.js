import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    // اینجا می‌تونید از سرویس‌های خودتون برای دریافت دیتا استفاده کنید
    // برای مثال:
    const breadcrumbData = [
      { href: "/products", title: "محصولات", format: "type" },
      { href: "/products/3301/دوربین-عکاسی-دیجیتال", title: "دوربین عکاسی دیجیتال", format: "category" },
      { href: "/products/3340/-دوربین-dslr", title: " دوربین DSLR  ", format: "category" },
      { href: "", title: "دوربین کانن", format: "selftext" }
    ];

    return NextResponse.json(breadcrumbData);
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در دریافت اطلاعات مسیر' },
      { status: 500 }
    );
  }
} 