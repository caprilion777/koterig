'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  BuildingOffice2Icon,
  BoltIcon,
  WrenchScrewdriverIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';

const icons = [
  BuildingOffice2Icon,
  BoltIcon,
  WrenchScrewdriverIcon,
  DocumentCheckIcon,
];

const textClass =
  'font-sans text-[18px] font-normal leading-[1.7] tracking-wide text-[#105483]';
const textStyle = { wordSpacing: '0.3em', letterSpacing: '0.02em' } as const;

const Services = () => {
  const t = useTranslations('services');
  const items = t.raw('items') as Array<{
    title: string;
    subtitle: string;
    description: string;
    bullets: string[];
  }>;

  return (
    <section id="design" className="py-30 bg-[#fafafa] font-sans scroll-mt-[25px] md:scroll-mt-[25px]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="font-sans font-bold uppercase text-[1.125rem] tracking-[0.04em] mb-4 text-[#105483]"
            style={{ letterSpacing: '0.04em' }}
          >
            {t('title')}
          </h2>
          <p className={`${textClass} max-w-4xl mx-auto text-left`} style={textStyle}>
            {t('intro')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {items.map((service, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-white hover:shadow-lg transition border border-gray-200 font-sans"
              >
                <Icon className="w-12 h-12 text-[#105483] mb-4 shrink-0" />
                <h3
                  className="font-sans font-bold text-[1.125rem] tracking-[0.04em] mb-1 text-[#105483]"
                  style={{ letterSpacing: '0.04em' }}
                >
                  {service.title}
                  {service.subtitle ? (
                    <>
                      {' '}
                      <span className="font-normal">({service.subtitle})</span>
                    </>
                  ) : null}
                </h3>
                <p className={`${textClass} mt-3 mb-4`} style={textStyle}>
                  {service.description}
                </p>
                <ul className={`${textClass} list-disc pl-6 space-y-2`} style={textStyle}>
                  {service.bullets.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
