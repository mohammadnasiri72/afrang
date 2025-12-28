// app/api/clear-cache/route.js
import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { fetchMenuItems } from "@/services/menuService";

export const dynamic = "force-dynamic"; // مهم: این روت حتماً باید داینامیک باشه

const SECRET = "pn5HR7NznTvaMmFodFdeYhKvRtn2xhab";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");

  if (secret !== SECRET) {
    return NextResponse.json(
      { message: "Invalid secret" },
      { status: 401 }
    );
  }


  // 1) پاک کردن Data Cache همه fetch هایی که این تگ رو دارن
  const tagRevalidated = await revalidateTag("global-cache");
  // اگر خواستی، می‌تونی به شکل دقیق‌تر فقط "main-menu" رو بزنی:
  // revalidateTag("main-menu");

  // 2) پاک کردن Route Cache صفحه / و layoutش (که منو رو رندر می‌کنن)
  const pathRevalidated = await revalidatePath("/");

  // 3) اختیاری: یک بار همین‌جا منو رو دوباره بخون (برای اطمینان)
  // prewarm with a fresh fetch to ensure updated data (bypass local fetch cache)
  const menu = await fetchMenuItems({ force: true });

  return NextResponse.json({
    ok: true,
    revalidated: true,
    prewarmed: true,
    at: new Date().toISOString(),
  });
}