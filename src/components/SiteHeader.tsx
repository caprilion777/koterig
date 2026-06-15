'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';

const scrollSections = [
  { id: 'design', label: 'Услуги' },
  { id: 'about-us', label: 'О нас' },
  { id: 'contact', label: 'Контакты' },
];

const languages = [
  { code: 'et', label: 'Eesti', Flag: EstoniaFlag },
  { code: 'ru', label: 'Русский', Flag: RussiaFlag },
  { code: 'en', label: 'English', Flag: UkFlag },
];

const flagButtonClass =
  'overflow-hidden rounded-sm border border-[#105483]/15 shadow-[0_2px_6px_rgba(16,84,131,0.22),0_1px_2px_rgba(0,0,0,0.08)] transition-all hover:opacity-90 hover:shadow-[0_4px_12px_rgba(16,84,131,0.28),0_2px_4px_rgba(0,0,0,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#105483]/40';

const navLinkClass = (active: boolean) =>
  `relative pb-1 transition-all
    after:content-[''] after:block after:absolute after:left-0 after:bottom-0 after:h-[1.7px] after:bg-[#105483] after:w-full
    after:origin-left after:scale-x-0 after:transition-transform after:duration-300
    ${active ? 'after:scale-x-100' : 'hover:after:scale-x-100'}`;

function EstoniaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" className={className} aria-hidden>
      <rect width="36" height="8" fill="#4891D9" />
      <rect y="8" width="36" height="8" fill="#000" />
      <rect y="16" width="36" height="8" fill="#FFF" />
    </svg>
  );
}

function RussiaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" className={className} aria-hidden>
      <rect width="36" height="8" fill="#FFF" />
      <rect y="8" width="36" height="8" fill="#0039A6" />
      <rect y="16" width="36" height="8" fill="#D52B1E" />
    </svg>
  );
}

function UkFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" className={className} aria-hidden>
      <rect width="36" height="24" fill="#012169" />
      <path d="M0,0 36,24 M36,0 0,24" stroke="#FFF" strokeWidth="3.6" />
      <path d="M0,0 36,24 M36,0 0,24" stroke="#C8102E" strokeWidth="2" />
      <rect x="15" width="6" height="24" fill="#FFF" />
      <rect y="9" width="36" height="6" fill="#FFF" />
      <rect x="16" width="4" height="24" fill="#C8102E" />
      <rect y="10" width="36" height="4" fill="#C8102E" />
    </svg>
  );
}

const SiteHeader = () => {
  const pathname = usePathname();
  const isPortfolioPage = pathname === '/portfolio';
  const isHomePage = pathname === '/';

  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  const handleHashNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActive(id);
    setMenuOpen(false);

    if (isHomePage) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    window.location.href = `/#${id}`;
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHomePage) return;
    e.preventDefault();
    setActive('');
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActive('');
        return;
      }
      let current = '';
      for (const section of scrollSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = section.id;
        }
      }
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div
      className={`main-header fixed top-0 left-0 w-full z-50 bg-[#fafafa] text-[#105483] transition-none ${menuOpen ? 'md:shadow-none' : 'shadow-lg md:shadow-none'}`}
      style={{ backgroundColor: '#fafafa' }}
    >
      <div className="container mx-auto flex justify-between items-center px-6 md:px-12 py-6 md:py-4">
        <Link
          href="/"
          className="inline-flex items-center shrink-0"
          onClick={handleLogoClick}
        >
          <Image
            src="/Koterig_Logo_Blue.svg"
            alt="Koterig"
            width={127}
            height={44}
            className="h-10 w-auto md:h-11"
            priority
            unoptimized
          />
        </Link>

        <div className="flex items-center min-h-10">
          <nav className="hidden md:flex items-center gap-6">
            <ul
              className="flex gap-8 font-sans font-semibold text-[1.125rem] tracking-[0.04em] uppercase"
              style={{ letterSpacing: '0.04em' }}
            >
              <li>
                <Link
                  href="/portfolio"
                  className={navLinkClass(isPortfolioPage)}
                  style={{ position: 'relative' }}
                >
                  Портфолио
                </Link>
              </li>
              {scrollSections.map(section => (
                <li key={section.id}>
                  <a
                    href={isHomePage ? `#${section.id}` : `/#${section.id}`}
                    className={navLinkClass(isHomePage && active === section.id)}
                    style={{ position: 'relative' }}
                    onClick={e => handleHashNavClick(e, section.id)}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2.5 pl-1">
              {languages.map(({ code, label, Flag }) => (
                <button
                  key={code}
                  type="button"
                  aria-label={label}
                  className={flagButtonClass}
                >
                  <Flag className="block h-[18px] w-[27px]" />
                </button>
              ))}
            </div>
          </nav>
          {!menuOpen && (
            <button
              className="md:hidden z-50 text-[#105483]"
              aria-label="Открыть меню"
              onClick={() => setMenuOpen(true)}
            >
              <HiMenu size={27} />
            </button>
          )}
          {menuOpen && (
            <button
              className="md:hidden z-50 text-[#105483]"
              aria-label="Закрыть меню"
              onClick={() => setMenuOpen(false)}
            >
              <HiX size={27} />
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden w-full bg-[#fafafa] pt-5 pb-9 flex flex-col items-center">
          <nav className="mt-4 flex flex-col gap-1 w-full items-center">
            <Link
              href="/portfolio"
              className={`relative inline-block text-[1.125rem] font-sans font-semibold uppercase tracking-[0.04em] py-2 px-2 rounded transition-colors text-center
                after:content-[''] after:block after:absolute after:left-0 after:bottom-1 after:h-[0.85px] after:bg-[#105483] after:w-full after:origin-center after:scale-x-0 after:transition-transform after:duration-300
                ${isPortfolioPage ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
              `}
              style={{ position: 'relative' }}
              onClick={() => setMenuOpen(false)}
            >
              Портфолио
            </Link>
            {scrollSections.map(section => (
              <a
                key={section.id}
                href={isHomePage ? `#${section.id}` : `/#${section.id}`}
                className={`relative inline-block text-[1.125rem] font-sans font-semibold uppercase tracking-[0.04em] py-2 px-2 rounded transition-colors text-center
                  after:content-[''] after:block after:absolute after:left-0 after:bottom-1 after:h-[0.85px] after:bg-[#105483] after:w-full after:origin-center after:scale-x-0 after:transition-transform after:duration-300
                  ${isHomePage && active === section.id ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
                `}
                style={{ position: 'relative' }}
                onClick={e => handleHashNavClick(e, section.id)}
              >
                {section.label}
              </a>
            ))}
            <div className="mt-4 flex items-center justify-center gap-3">
              {languages.map(({ code, label, Flag }) => (
                <button
                  key={code}
                  type="button"
                  aria-label={label}
                  className={flagButtonClass}
                >
                  <Flag className="block h-[20px] w-[30px]" />
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default SiteHeader;
