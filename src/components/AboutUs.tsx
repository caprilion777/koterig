'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const AboutUs = () => {
  const t = useTranslations('about');
  const items = t.raw('items') as Array<{ label: string; text: string }>;

  return (
    <section id="about-us" className="py-30 bg-[#fafafa] font-sans scroll-mt-[25px] md:scroll-mt-[25px]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-16"
        >
          <div className="w-full md:w-1/2 max-w-xl text-left mx-auto md:mx-0 text-[#105483]">
            <h2
              className="font-sans font-bold uppercase text-[1.125rem] tracking-[0.04em] mb-6 text-center md:text-left"
              style={{ letterSpacing: '0.04em' }}
            >
              {t('title')}
            </h2>
            <p
              className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide mb-4"
              style={{ wordSpacing: '0.3em', letterSpacing: '0.02em' }}
            >
              {t('p1')}
            </p>
            <p
              className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide mb-2"
              style={{ wordSpacing: '0.3em', letterSpacing: '0.02em' }}
            >
              {t('p2')}
            </p>
            <ul
              className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide mb-4 list-disc pl-6 space-y-2"
              style={{ wordSpacing: '0.3em', letterSpacing: '0.02em' }}
            >
              {items.map((item, i) => (
                <li key={i}>
                  <span className="font-semibold">{item.label}</span> {item.text}
                </li>
              ))}
            </ul>
            <p
              className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide mb-4"
              style={{ wordSpacing: '0.3em', letterSpacing: '0.02em' }}
            >
              {t('p3')}
            </p>
            <p
              className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide"
              style={{ wordSpacing: '0.3em', letterSpacing: '0.02em' }}
            >
              <span className="font-semibold">{t('p4Label')}</span> {t('p4')}
            </p>
          </div>

          <div className="md:w-1/2 w-full">
            <div className="relative aspect-square w-[77%] mx-auto rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/about_us.jpg"
                alt={t('imageAlt')}
                fill
                className="object-cover grayscale"
              />
              <div
                className="absolute inset-0 bg-[#105483] mix-blend-color pointer-events-none"
                aria-hidden
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
