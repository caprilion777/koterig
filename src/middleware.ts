import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { SESSION_COOKIE, verifySessionToken } from './lib/session';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    try {
      if (!token || !(await verifySessionToken(token))) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(ru|en)/:path*',
    '/((?!api|admin|login|_next|_vercel|.*\\..*).*)',
  ],
};
