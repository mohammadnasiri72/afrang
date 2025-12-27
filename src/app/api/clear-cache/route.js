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

  console.log(">>> CLEAR CACHE CALLED at", new Date().toISOString());

  // 1) پاک کردن Data Cache همه fetch هایی که این تگ رو دارن
  revalidateTag("global-cache");
  // اگر خواستی، می‌تونی به شکل دقیق‌تر فقط "main-menu" رو بزنی:
  // revalidateTag("main-menu");

  // 2) پاک کردن Route Cache صفحه / و layoutش (که منو رو رندر می‌کنن)
  revalidatePath("/", "layout");
  revalidatePath("/", "page");

  // 3) اختیاری: یک بار همین‌جا منو رو دوباره بخون (برای اطمینان)
  const menu = await fetchMenuItems();
  console.log(">>> MENU PREWARMED, length =", menu.length);

  return NextResponse.json({
    ok: true,
    revalidated: true,
    prewarmed: true,
    at: new Date().toISOString(),
  });
}