import { NextRequest, NextResponse } from 'next/server';
import { getSessionStatus } from '@/lib/session';

export async function GET(request: NextRequest) {
  const status = await getSessionStatus(request);

  return NextResponse.json({
    authenticated: status.valid,
    cookie: {
      name: status.cookieName,
      received: status.received,
      valid: status.valid,
      expiresAt: status.expiresAt,
    },
  });
}
