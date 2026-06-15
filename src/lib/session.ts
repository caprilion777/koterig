export const SESSION_COOKIE = 'session';

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  return process.env.SESSION_SECRET ?? 'dev-secret-change-in-production';
}

function base64url(data: Uint8Array | string): string {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlDecode(str: string): string {
  const padded = str + '='.repeat((4 - (str.length % 4)) % 4);
  return atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
}

async function sign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return base64url(new Uint8Array(sig));
}

export async function createSessionToken(): Promise<string> {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE * 1000 });
  const signature = await sign(payload);
  return `${base64url(payload)}.${signature}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const dot = token.lastIndexOf('.');
    if (dot === -1) return false;

    const payloadB64 = token.slice(0, dot);
    const signature = token.slice(dot + 1);

    let payload: string;
    try {
      payload = base64urlDecode(payloadB64);
    } catch {
      return false;
    }

    const expected = await sign(payload);
    if (signature !== expected) return false;

    const { exp } = JSON.parse(payload) as { exp: number };
    return Date.now() < exp;
  } catch {
    return false;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE,
  };
}

function getSessionTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  const match = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`));

  if (!match) return null;
  return decodeURIComponent(match.slice(SESSION_COOKIE.length + 1));
}

export async function isAuthenticated(request: Request): Promise<boolean> {
  const token = getSessionTokenFromRequest(request);
  if (!token) return false;
  return verifySessionToken(token);
}

export type SessionStatus = {
  cookieName: string;
  received: boolean;
  valid: boolean;
  expiresAt: number | null;
};

export async function getSessionStatus(request: Request): Promise<SessionStatus> {
  const token = getSessionTokenFromRequest(request);

  if (!token) {
    return { cookieName: SESSION_COOKIE, received: false, valid: false, expiresAt: null };
  }

  try {
    const dot = token.lastIndexOf('.');
    if (dot === -1) {
      return { cookieName: SESSION_COOKIE, received: true, valid: false, expiresAt: null };
    }

    const payload = base64urlDecode(token.slice(0, dot));
    const { exp } = JSON.parse(payload) as { exp: number };
    const valid = await verifySessionToken(token);

    return {
      cookieName: SESSION_COOKIE,
      received: true,
      valid,
      expiresAt: valid ? exp : null,
    };
  } catch {
    return { cookieName: SESSION_COOKIE, received: true, valid: false, expiresAt: null };
  }
}

export { SESSION_MAX_AGE };
