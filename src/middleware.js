import { NextResponse } from 'next/server'

export function middleware(request) {
    const url = request.nextUrl.clone();
    
    // تبدیل URL به حروف کوچک
    const pathname = url.pathname.toLowerCase();
    
    // اگر URL با حروف بزرگ وارد شده باشد، به نسخه کوچک ریدایرکت می‌کنیم
    if (url.pathname !== pathname) {
        url.pathname = pathname;
        return NextResponse.redirect(url);
    }

    // Get the pathname of the request
    const path = request.nextUrl.pathname;

    // Define protected routes that require authentication
    const protectedRoutes = ['/profile', '/dashboard'];
    
    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

    // Get the user cookie
    const userCookie = request.cookies.get('user')?.value;

    // Check if user cookie exists and has a valid token
    let hasValidToken = false;
    if (userCookie) {
        try {
            const userData = JSON.parse(userCookie);
            hasValidToken = !!userData?.token;
        } catch (error) {
            hasValidToken = false;
        }
    }

    // If it's a protected route and there's no valid token, redirect to unauthorized page
    if (isProtectedRoute && !hasValidToken) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
}

// تنظیم مسیرهایی که middleware باید روی آنها اعمال شود
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}; 