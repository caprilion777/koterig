import { NextRequest, NextResponse } from 'next/server';
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  sessionCookieOptions,
} from '@/lib/session';

export async function POST(request: NextRequest) {
  let password: string | undefined;
  try {
    const body = await request.json();
    password = body?.password;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin';
  if (!password || password !== adminPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({
    ok: true,
    cookie: {
      name: SESSION_COOKIE,
      httpOnly: true,
      maxAge: SESSION_MAX_AGE,
      message: 'Cookie установлена. Браузер будет отправлять её на сервер автоматически.',
    },
  });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());

  return response;
}
