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

export default function AdminPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data: SessionInfo) => setSessionInfo(data))
      .catch(() => setSessionInfo(null));
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-semibold">Админ-панель</h1>

      <div className="w-full max-w-md rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
        <p className="mb-2 font-medium">Статус cookie-сессии</p>
        {sessionInfo === null ? (
          <p className="text-neutral-500">Проверка на сервере...</p>
        ) : sessionInfo.authenticated ? (
          <ul className="space-y-1 text-green-700 dark:text-green-400">
            <li>✓ Браузер отправил cookie «{sessionInfo.cookie.name}»</li>
            <li>✓ Сервер прочитал её из заголовка Cookie</li>
            <li>✓ Токен валиден, авторизация активна</li>
            {sessionInfo.cookie.expiresAt && (
              <li>
                Истекает: {new Date(sessionInfo.cookie.expiresAt).toLocaleString('ru-RU')}
              </li>
            )}
          </ul>
        ) : (
          <ul className="space-y-1 text-red-600 dark:text-red-400">
            <li>
              ✗ Cookie {sessionInfo.cookie.received ? 'получена, но невалидна' : 'не получена'}
            </li>
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="rounded border border-neutral-300 px-4 py-2 disabled:opacity-50 dark:border-neutral-700"
      >
        {isLoggingOut ? 'Выход...' : 'Выйти (удалить cookie)'}
      </button>
    </main>
  );
}
