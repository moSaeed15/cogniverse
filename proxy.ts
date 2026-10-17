// proxy.ts (Next.js 16 renamed middleware.ts to proxy.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // No valid session: send the user to the login page and remember where
  // they were going so they land there after signing in.
  if (!token) {
    const loginUrl = new URL('/', req.url);
    loginUrl.searchParams.set(
      'callbackUrl',
      req.nextUrl.pathname + req.nextUrl.search
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Protect /dashboard and every route below it. API routes check the session
// themselves so they can return JSON 401s instead of redirects.
export const config = {
  matcher: ['/dashboard/:path*'],
};
