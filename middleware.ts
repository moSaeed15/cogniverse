// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define the paths that need authentication

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if the request is for a protected path
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    // If there is no token and the path is protected, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

// Specify which paths this middleware should apply to
export const config = {
  matcher: ['/dashboard'],
};
