"use server";

import { revalidatePath } from "next/cache";
import { getItem } from "@/services/Item/item";

export async function getBlogPosts(params) {
  try {
    const blogs = await getItem({
      TypeId: 5,
      LangCode: "fa",
      PageSize: params.pageSize,
      PageIndex: params.page,
      CategoryIdArray: params.category,
      OrderBy: params.orderBy
    });

    // بعد از دریافت داده‌ها، مسیر رو revalidate می‌کنیم
    revalidatePath("/news");
    
    return { blogs };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { error: "خطا در دریافت مقالات" };
  }
} 