import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

export const config = { matcher: ['/dashboard/:path*'] };

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.redirect(
      'https://cogniverse-ky601sa32-mosaeed15s-projects.vercel.app/'
    );
  }
}
