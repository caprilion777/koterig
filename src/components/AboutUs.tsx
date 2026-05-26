'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section id="about-us" className="py-30 bg-[#fafafa] font-sans scroll-mt-[25px] md:scroll-mt-[25px]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-16"
        >
          {/* Text content on the left (1/3 on desktop, full width on mobile) */}
          <div className="w-full md:w-1/2 max-w-xl text-left mx-auto md:mx-0 text-[#105483]">
            <h2
              className="font-sans font-bold uppercase text-[1.125rem] tracking-[0.04em] mb-6 text-center md:text-left"
              style={{ letterSpacing: '0.04em' }}
            >
              О НАС
            </h2>
            <p
              className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide mb-4"
              style={{
                wordSpacing: '0.3em',
                letterSpacing: '0.02em'
              }}
            >
              Мы убеждены, что строительство должно быть предсказуемым и комфортным процессом. Поэтому мы работаем по принципу «одного окна» — берем на себя управление всем проектом от начальной идеи до финала.
            </p>
            <p
              className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide mb-2"
              style={{
                wordSpacing: '0.3em',
                letterSpacing: '0.02em'
              }}
            >
              Мы закрываем весь цикл задач:
            </p>
            <ul
              className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide mb-4 list-disc pl-6 space-y-2"
              style={{
                wordSpacing: '0.3em',
                letterSpacing: '0.02em'
              }}
            >
              <li>
                <span className="font-semibold">Проектирование:</span> создаем архитектурную концепцию и точные инженерные расчеты.
              </li>
              <li>
                <span className="font-semibold">Бюрократия:</span> сами получаем разрешения на строительство и проходим все инстанции.
              </li>
              <li>
                <span className="font-semibold">Строительство:</span> возводим объект, строго контролируя качество, сроки и смету.
              </li>
              <li>
                <span className="font-semibold">Ввод в эксплуатацию:</span> оформляем финальные документы и передаем вам ключи.
              </li>
            </ul>
            <p
              className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide mb-4"
              style={{
                wordSpacing: '0.3em',
                letterSpacing: '0.02em'
              }}
            >
              Ваша выгода — отсутствие стресса. Вам не нужно искать разных исполнителей, координировать их и нести риски за ошибки на стыке этапов. За всё отвечает одна компания. Вы принимаете только ключевые решения, а всю рутину мы забираем на себя.
            </p>
            <p
              className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide"
              style={{
                wordSpacing: '0.3em',
                letterSpacing: '0.02em'
              }}
            >
              <span className="font-semibold">Ваш единственный подрядчик:</span> мы ведем проект от первого чертежа до готового объекта.
            </p>
          </div>

          {/* Image on the right (2/3) */}
          <div className="md:w-1/2 w-full">
            <div className="relative aspect-square w-[77%] mx-auto rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/about_us.jpg"
                alt="О нас - Novanezis"
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