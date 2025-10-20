import { NextResponse } from "next/server";
import { getItemByUrl } from "./services/Item/item";
import {
  getProductCategory,
  getProductId,
  getProductPricing,
} from "./services/products/productService";
import { getSettings } from "./services/settings/settingsService";
import { getProductSecId } from "./services/UserAd/UserAdServices";

// مسیرهای محافظت شده که نیاز به احراز هویت دارند
const protectedRoutes = [
  "/profile",
  "/cart/infopay",
  "/cart/infosend",
  "/cart/order",
];

// مسیرهای استاتیک که نباید به حروف کوچک تبدیل شوند
const staticPaths = ["/_next", "/static", "/images", "/public", "/assets"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const userCookie = request.cookies.get("user")?.value;
  let userToken = null;

  const isDainamic =
    pathname !== "/" &&
    pathname !== "/cart" &&
    pathname !== "/cart/infopay" &&
    pathname !== "/cart/infosend" &&
    pathname !== "/cart/order" &&
    pathname !== "/login" &&
    pathname !== "/forgot-password" &&
    pathname !== "/register" &&
    pathname !== "/contect-us" &&
    pathname !== "/payment/result" &&
    pathname !== "/gallery" &&
    pathname !== "/news" &&
    pathname !== "/pricelist" &&
    pathname !== "/products" &&
    pathname !== "/product" &&
    pathname !== "/profile" &&
    pathname !== "/buyers" &&
    pathname !== "/compare" &&
    pathname !== "/dic" &&
    pathname !== "/usedproduct" &&
    pathname !== "/useds" &&
    !pathname.startsWith("/gallery/") &&
    !pathname.includes(".") && // فایل‌ها مثل .css, .js
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/products/") && // مسیرهای شناخته شده
    !pathname.startsWith("/product/") &&
    !pathname.startsWith("/profile/") &&
    !pathname.startsWith("/buyers/") &&
    !pathname.startsWith("/compare/") &&
    !pathname.startsWith("/dic/") &&
    !pathname.startsWith("/news/") &&
    !pathname.startsWith("/pricelist/") &&
    !pathname.startsWith("/usedproduct/") &&
    !pathname.startsWith("/useds/") &&
    !pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|css|js)$/i); // فایل‌های استاتیک

  try {
    if (userCookie) {
      const user = JSON.parse(userCookie);
      userToken = user?.token;
    }
  } catch (error) {
    console.error("Error parsing user cookie:", error);
  }

  // بررسی مسیرهای محافظت شده
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!userToken) {
      return NextResponse.redirect(new URL("/login", request.url), {
        status: 301,
      });
    }
  }

  // بررسی ریدایرکت محصولات
  if (pathname === "/index" || pathname === "/home") {
    return NextResponse.redirect(new URL("/", request.url), { status: 301 });
  } else if (pathname.startsWith("/products/")||pathname.startsWith("/Products/")) {
    try {
      const pathParts = pathname.split("/");
      // پیدا کردن آخرین عدد در URL
      let productId = null;
      for (let i = pathParts.length - 1; i >= 0; i--) {
        const num = Number(pathParts[i]);
        if (!isNaN(num)) {
          productId = num;
          break;
        }
      }

      if (productId !== null) {
        const productCategory = await getProductCategory(productId);
        const decodedPathname = decodeURIComponent(pathname);

        if (
          productCategory?.type === "error" &&
          productCategory?.status === 404 &&
          !productCategory?.isHard404
        ) {
          return NextResponse.rewrite(new URL("/404", request.url));
        } else if (
          productCategory?.type === "error" &&
          productCategory?.status === 404 &&
          productCategory?.isHard404
        ) {
          return NextResponse.rewrite(new URL(request.url), { status: 503 });
        } else if (productCategory?.type === "error") {
          return NextResponse.rewrite(new URL(request.url), {
            status: productCategory?.status,
          });
        }

        if (productCategory?.url && productCategory.url !== decodedPathname) {
          return NextResponse.redirect(
            new URL(productCategory.url, request.url),
            { status: 301 }
          );
        } else if (!staticPaths.some((path) => pathname.startsWith(path))) {
          // اگر نیاز به ریدایرکت محصول نبود، چک می‌کنیم که آیا نیاز به تبدیل حروف کوچک داریم
          const lowerCasePath = decodedPathname.toLowerCase();

          if (decodedPathname !== lowerCasePath) {
            const newUrl = new URL(request.url);
            newUrl.pathname = lowerCasePath;
            return NextResponse.redirect(newUrl, { status: 301 });
          }
        }
      }
    } catch (error) {
      console.error("Error in product redirect:", error);
    }
  } else if (pathname.startsWith("/product/")||pathname.startsWith("/Product/")) {
    try {
      const pathParts = pathname.split("/");
      // پیدا کردن آخرین عدد در URL
      let productId = null;
      for (let i = pathParts.length - 1; i >= 0; i--) {
        const num = Number(pathParts[i]);
        if (!isNaN(num)) {
          productId = num;
          break;
        }
      }

      if (productId !== null) {
        const productData = await getProductId(productId);
        const decodedPathname = decodeURIComponent(pathname);

        if (
          productData?.type === "error" &&
          productData?.status === 404 &&
          !productData?.isHard404
        ) {
          return NextResponse.rewrite(new URL("/404", request.url));
        } else if (
          productData?.type === "error" &&
          productData?.status === 404 &&
          productData?.isHard404
        ) {
          return NextResponse.rewrite(new URL(request.url), { status: 503 });
        } else if (productData?.type === "error") {
          return NextResponse.rewrite(new URL(request.url), {
            status: productData?.status,
          });
        }

        if (
          productData?.product?.url &&
          productData.product.url !== decodedPathname
        ) {
          return NextResponse.redirect(
            new URL(productData.product.url, request.url),
            { status: 301 }
          );
        } else if (!staticPaths.some((path) => pathname.startsWith(path))) {
          // اگر نیاز به ریدایرکت محصول نبود، چک می‌کنیم که آیا نیاز به تبدیل حروف کوچک داریم
          const lowerCasePath = decodedPathname.toLowerCase();

          if (decodedPathname !== lowerCasePath) {
            const newUrl = new URL(request.url);
            newUrl.pathname = lowerCasePath;
            return NextResponse.redirect(newUrl, { status: 301 });
          }
        }
      }
    } catch (error) {
      console.error("Error in product redirect:", error);
    }
  } else if (pathname.startsWith("/usedproduct/")||pathname.startsWith("/Usedproduct/")) {
    try {
      const pathParts = pathname.split("/");
      // پیدا کردن آخرین عدد در URL
      let productId = null;
      for (let i = pathParts.length - 1; i >= 0; i--) {
        const num = Number(pathParts[i]);
        if (!isNaN(num)) {
          productId = num;
          break;
        }
      }

      if (productId !== null) {
        const productCategory = await getProductSecId(productId);
        const decodedPathname = decodeURIComponent(pathname);

        if (
          productCategory?.type === "error" &&
          productCategory?.status === 404 &&
          !productCategory?.isHard404
        ) {
          return NextResponse.rewrite(new URL("/404", request.url));
        } else if (
          productCategory?.type === "error" &&
          productCategory?.status === 404 &&
          productCategory?.isHard404
        ) {
          return NextResponse.rewrite(new URL(request.url), { status: 503 });
        } else if (productCategory?.type === "error") {
          return NextResponse.rewrite(new URL(request.url), {
            status: productCategory?.status,
          });
        }

        if (productCategory?.url && productCategory.url !== decodedPathname) {
          return NextResponse.redirect(
            new URL(productCategory.url, request.url),
            { status: 301 }
          );
        } else if (!staticPaths.some((path) => pathname.startsWith(path))) {
          // اگر نیاز به ریدایرکت محصول نبود، چک می‌کنیم که آیا نیاز به تبدیل حروف کوچک داریم
          const lowerCasePath = decodedPathname.toLowerCase();

          if (decodedPathname !== lowerCasePath) {
            const newUrl = new URL(request.url);
            newUrl.pathname = lowerCasePath;
            return NextResponse.redirect(newUrl, { status: 301 });
          }
        }
      }
    } catch (error) {
      console.error("Error in product redirect:", error);
    }
  } else if (pathname.startsWith("/news/")||pathname.startsWith("/News/")) {
    const slug = decodeURIComponent(pathname).slice(1);
    const blog = await getItemByUrl(slug);
    if (blog?.type === "error" && blog?.status === 404 && !blog?.isHard404) {
      return NextResponse.rewrite(new URL("/404", request.url));
    } else if (
      blog?.type === "error" &&
      blog?.status === 404 &&
      blog?.isHard404
    ) {
      return NextResponse.rewrite(new URL(request.url), { status: 503 });
    } else if (blog?.type === "error") {
      return NextResponse.rewrite(new URL(request.url), {
        status: blog?.status,
      });
    }
  } else if (pathname.startsWith("/dic/")||pathname.startsWith("/Dic/")) {
    const slug = decodeURIComponent(pathname).slice(1);
    const dic = await getItemByUrl(slug);
    if (dic?.type === "error" && dic?.status === 404 && !dic?.isHard404) {
      return NextResponse.rewrite(new URL("/404", request.url));
    } else if (dic?.type === "error" && dic?.status === 404 && dic?.isHard404) {
      return NextResponse.rewrite(new URL(request.url), { status: 503 });
    } else if (dic?.type === "error") {
      return NextResponse.rewrite(new URL(request.url), {
        status: dic?.status,
      });
    }
  } else if (pathname === "/usedproduct" || pathname === "/Usedproduct") {
    return NextResponse.redirect(new URL("/useds/-1", request.url), {
      status: 301,
    });
  } else if (
    pathname.startsWith("/pricelist/") ||
    pathname.startsWith("/Pricelist/")
  ) {
    const pathParts = pathname.split("/");
    // پیدا کردن آخرین عدد در URL
    let id = null;
    for (let i = pathParts.length - 1; i >= 0; i--) {
      const num = Number(pathParts[i]);
      if (!isNaN(num)) {
        id = num;
        break;
      }
    }

    const pricing = await getProductPricing(id);
    if (
      pricing?.type === "error" &&
      pricing?.status === 404 &&
      !pricing?.isHard404
    ) {
      return NextResponse.rewrite(new URL("/404", request.url));
    } else if (
      pricing?.type === "error" &&
      pricing?.status === 404 &&
      pricing?.isHard404
    ) {
      return NextResponse.rewrite(new URL(request.url), { status: 503 });
    } else if (pricing?.type === "error") {
      return NextResponse.rewrite(new URL(request.url), {
        status: pricing?.status,
      });
    }
  } else if (isDainamic) {
    const slug = pathname.slice(1);
    const data = await getItemByUrl(slug);

    if (data?.type === "error" && data?.status === 404 && !data?.isHard404) {
      return NextResponse.rewrite(new URL("/404", request.url));
    } else if (
      data?.type === "error" &&
      data?.status === 404 &&
      data?.isHard404
    ) {
      return NextResponse.rewrite(new URL(request.url), { status: 503 });
    } else if (data?.type === "error") {
      return NextResponse.rewrite(new URL(request.url), {
        status: data?.status,
      });
    }
  } else if (!staticPaths.some((path) => pathname.startsWith(path))) {
    try {
      const decodedPath = decodeURIComponent(pathname);
      const lowerCasePath = decodedPath.toLowerCase();

      if (decodedPath !== lowerCasePath) {
        const newUrl = new URL(request.url);
        newUrl.pathname = lowerCasePath;
        return NextResponse.redirect(newUrl, { status: 301 });
      }
    } catch (error) {
      console.error("Error in lowercase conversion:", error);
    }
  }

  try {
    const settings = await getSettings();
    if (
      settings?.type === "error" &&
      settings?.status === 404 &&
      !settings?.isHard404
    ) {
      return NextResponse.rewrite(new URL("/404", request.url));
    } else if (
      settings?.type === "error" &&
      settings?.status === 404 &&
      settings?.isHard404
    ) {
      return NextResponse.rewrite(new URL(request.url), { status: 503 });
    } else if (settings?.type === "error") {
      return NextResponse.rewrite(new URL(request.url), {
        status: settings?.status,
      });
    }
  } catch (error) {
    console.error("Error fetching setting:", error);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/cart/:path*",
    "/Products/:path*",
    "/products/:path*",
    "/Product/:path*",
    "/product/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
