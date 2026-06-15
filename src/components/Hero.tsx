'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import SiteHeader from './SiteHeader';

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const offset = Math.min(window.scrollY * 0.18, 40);
        parallaxRef.current.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden" id="top">
      <div ref={parallaxRef} className="absolute inset-0 -z-10">
        <Image
          src="/hero-koterig.png"
          alt="Интерьер"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <div
          className="text-white text-center drop-shadow-lg px-6 md:px-8 mb-8 max-w-4xl mx-auto space-y-4"
          style={{ textShadow: '0 4px 24px rgba(0,0,0,0.85), 0 1.5px 8px rgba(0,0,0,0.7)' }}
        >
          <h1
            className="font-sans font-bold uppercase text-[1.125rem] tracking-[0.04em]"
            style={{ letterSpacing: '0.04em' }}
          >
            Полный цикл проектирования и строительства - от первой концепции и рабочих чертежей до ввода объекта в эксплуатацию.
          </h1>
          <p
            className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide"
            style={{ wordSpacing: '0.3em', letterSpacing: '0.02em' }}
          >
            Один подрядчик на всём пути: полная ответственность, прозрачные сроки и никаких разрывов между этапами.
          </p>
        </div>
        <a
          href="#contact"
          className="pointer-events-auto border border-white text-white px-7 py-2 rounded-md text-sm md:text-base font-sans font-bold bg-transparent hover:bg-white/10 transition-colors duration-200 uppercase tracking-[0.04em]"
          style={{ backdropFilter: 'blur(0px)' }}
        >
          ОСТАВЬТЕ ЗАЯВКУ
        </a>
      </div>
      <SiteHeader />
    </section>
  );
};

export default Hero;
