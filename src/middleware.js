import { NextResponse } from "next/server";
import {
  getProductCategory,
  getProductId,
} from "./services/products/productService";
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
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // بررسی ریدایرکت محصولات
  if (pathname.startsWith("/Products/") || pathname.startsWith("/products/")) {
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
  } else if (
    pathname.startsWith("/Product/") ||
    pathname.startsWith("/product/")
  ) {
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
  } else if (
    pathname.startsWith("/Usedproduct/") ||
    pathname.startsWith("/usedproduct/")
  ) {
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

  // if (pathname.startsWith("/")) {
  //   const slug = pathname.slice(1);
  //   const data = await getItemByUrl(slug);

  //   if (data?.type === "error") {
  //     return NextResponse.rewrite(new URL("/404", request.url));
  //   }
  // }

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
