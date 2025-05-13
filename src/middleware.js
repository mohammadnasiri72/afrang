import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request) {
    // Check if the request is for profile routes
    if (request.nextUrl.pathname.startsWith('/profile')) {
        const cookieStore = cookies()
        const user = cookieStore.get('user')

        // If no user cookie or invalid token, redirect to 404
        if (!user) {
            return NextResponse.rewrite(new URL('/not-found', request.url))
        }

        try {
            const userData = JSON.parse(user.value)
            if (!userData.token) {
                return NextResponse.rewrite(new URL('/not-found', request.url))
            }
        } catch (error) {
            return NextResponse.rewrite(new URL('/not-found', request.url))
        }
    }

    return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
    matcher: '/profile/:path*'
} 