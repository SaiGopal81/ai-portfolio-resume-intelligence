import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function proxy(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const path = request.nextUrl.pathname;

  if (path.startsWith('/api/')) {
    const windowMs = 60 * 1000;
    let maxRequests = 10;

    if (path === '/api/contact') maxRequests = 3;
    if (path.startsWith('/api/resume-studio/')) maxRequests = 5;

    const key = `${ip}-${path}`;
    const now = Date.now();
    
    let rateData = rateLimitMap.get(key);

    if (!rateData || now > rateData.resetTime) {
      rateData = { count: 1, resetTime: now + windowMs };
    } else {
      rateData.count++;
    }

    rateLimitMap.set(key, rateData);

    if (rateData.count > maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests, please try again later.' },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
