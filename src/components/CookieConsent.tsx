'use client';

import { useEffect, useState } from 'react';

const CONSENT_COOKIE = 'cookie_consent';
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

function getConsent(): string | null {
  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));

  return match ? decodeURIComponent(match.slice(CONSENT_COOKIE.length + 1)) : null;
}

function setConsent(value: 'accepted' | 'rejected') {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
}

const buttonBaseClass =
  'w-full px-7 py-2 rounded-md text-sm md:text-base font-sans font-bold uppercase tracking-[0.04em] transition-colors duration-200';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
  }, []);

  const handleChoice = (value: 'accepted' | 'rejected') => {
    setConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6 pointer-events-none">
      <div
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-desc"
        className="container mx-auto px-4 pointer-events-auto"
      >
        <div className="flex flex-col gap-5 rounded-lg border border-[#0d4369] bg-[#105483] p-4 font-sans text-[#fafafa] shadow-2xl md:p-6">
          <div id="cookie-consent-desc" className="space-y-3">
            <p
              id="cookie-consent-title"
              className="font-sans font-bold uppercase text-[15px] tracking-[0.04em] text-[#fafafa]"
              style={{ letterSpacing: '0.04em' }}
            >
              Мы используем файлы cookie
            </p>
            <p
              className="font-sans text-[14px] font-normal leading-[1.7] tracking-wide text-[#fafafa]"
              style={{ wordSpacing: '0.3em', letterSpacing: '0.02em' }}
            >
              Этот сайт использует файлы cookie, включая необходимые, для обеспечения его
              корректной работы, авторизации в административной панели и анализа использования
              сайта.
            </p>
            <p
              className="font-sans text-[14px] font-normal leading-[1.7] tracking-wide text-[#fafafa]"
              style={{ wordSpacing: '0.3em', letterSpacing: '0.02em' }}
            >
              Продолжая использовать сайт, вы подтверждаете согласие на использование файлов cookie
              в соответствии с нашей Политикой конфиденциальности.
            </p>
            <p
              className="font-sans text-[14px] font-normal leading-[1.7] tracking-wide text-[#fafafa]"
              style={{ wordSpacing: '0.3em', letterSpacing: '0.02em' }}
            >
              Вы можете управлять использованием файлов cookie или ограничить их в настройках
              вашего браузера.
            </p>
          </div>
          <div className="grid w-full max-w-md grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleChoice('rejected')}
              className={`${buttonBaseClass} border border-[#fafafa]/40 bg-transparent text-[#fafafa] hover:bg-[#fafafa]/10`}
              style={{ letterSpacing: '0.04em' }}
            >
              Не согласен
            </button>
            <button
              type="button"
              onClick={() => handleChoice('accepted')}
              className={`${buttonBaseClass} bg-[#fafafa] text-[#105483] hover:bg-white`}
              style={{ letterSpacing: '0.04em' }}
            >
              Согласен
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
