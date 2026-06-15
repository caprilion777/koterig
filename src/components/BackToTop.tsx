'use client';
import React, { useEffect, useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';

const SCROLL_THRESHOLD = 400;

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      aria-label="Наверх"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#105483] text-[#fafafa] shadow-lg transition-all duration-300 hover:bg-[#0d4369] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#105483]/40 md:bottom-8 md:right-8 ${
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <HiArrowUp size={22} aria-hidden />
    </button>
  );
};

export default BackToTop;
