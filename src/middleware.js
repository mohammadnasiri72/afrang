import { NextResponse } from 'next/server'

export function middleware(request) {
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

// Configure which routes to run middleware on
export const config = {
    matcher: [
        '/profile/:path*',
        '/dashboard/:path*'
    ]
}; 