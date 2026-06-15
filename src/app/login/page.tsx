'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type SessionInfo = {
  authenticated: boolean;
  cookie: {
    name: string;
    received: boolean;
    valid: boolean;
    expiresAt: number | null;
  };
};

type LoginCookieInfo = {
  name: string;
  httpOnly: boolean;
  maxAge: number;
  message: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [loginCookieInfo, setLoginCookieInfo] = useState<LoginCookieInfo | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data: SessionInfo) => setSessionInfo(data))
      .catch(() => setSessionInfo(null));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoginCookieInfo(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setLoginCookieInfo(data.cookie);
        setSessionInfo({
          authenticated: true,
          cookie: {
            name: data.cookie.name,
            received: true,
            valid: true,
            expiresAt: Date.now() + data.cookie.maxAge * 1000,
          },
        });
        setTimeout(() => {
          router.push('/admin');
          router.refresh();
        }, 1500);
        return;
      }

      setError('Неверный пароль');
    } catch {
      setError('Ошибка соединения');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg border border-neutral-200 p-6 dark:border-neutral-800"
        >
          <h1 className="text-xl font-semibold">Вход</h1>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-neutral-900 px-4 py-2 text-white disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <p className="mb-2 font-medium">Статус cookie</p>
          {sessionInfo === null ? (
            <p className="text-neutral-500">Проверка...</p>
          ) : sessionInfo.authenticated ? (
            <ul className="space-y-1 text-green-700 dark:text-green-400">
              <li>✓ Cookie «{sessionInfo.cookie.name}» в браузере</li>
              <li>✓ Сервер получил cookie из заголовка Cookie</li>
              <li>✓ Подпись и срок действия валидны</li>
              {sessionInfo.cookie.expiresAt && (
                <li>
                  Истекает: {new Date(sessionInfo.cookie.expiresAt).toLocaleString('ru-RU')}
                </li>
              )}
            </ul>
          ) : (
            <ul className="space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>✗ Cookie «session» не найдена</li>
              <li>После входа сервер установит httpOnly cookie</li>
            </ul>
          )}
        </div>

        {loginCookieInfo && (
          <div className="rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
            <p className="font-medium">Cookie установлена</p>
            <p className="mt-1">{loginCookieInfo.message}</p>
            <p className="mt-2 text-xs opacity-80">
              Имя: {loginCookieInfo.name} · httpOnly: {loginCookieInfo.httpOnly ? 'да' : 'нет'} ·
              maxAge: {loginCookieInfo.maxAge}s
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
