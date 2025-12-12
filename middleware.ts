import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Use getUser() to validate the token and get user data
    const { data: { user }, error } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname

    // Public routes that don't require authentication
    const publicRoutes = [
        '/',
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password',
        '/callback',
    ]

    // Routes that require authentication
    const protectedRoutes = ['/dashboard', '/upload']

    // Check if current path is protected
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
    const isPublicRoute = publicRoutes.includes(path)
    const isAuthRoute = path.startsWith('/')

    // If user is not authenticated and trying to access protected route
    if (!user && isProtectedRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // If user is authenticated
    if (user) {
        const emailVerified = user.email_confirmed_at !== null

        // If email is not verified, only allow access to verify-email page
        if (!emailVerified && path !== '/verify-email') {
            const url = request.nextUrl.clone()
            url.pathname = '/verify-email'
            return NextResponse.redirect(url)
        }

        // If email is verified and user is on verify-email page, redirect to dashboard
        if (emailVerified && path === '/verify-email') {
            const url = request.nextUrl.clone()
            url.pathname = '/dashboard'
            return NextResponse.redirect(url)
        }

        // If user is verified and trying to access auth pages (except callback), redirect to dashboard
        if (emailVerified && isAuthRoute && path !== '/callback') {
            const url = request.nextUrl.clone()
            url.pathname = '/dashboard'
            return NextResponse.redirect(url)
        }
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc.)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
