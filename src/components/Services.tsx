'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  BuildingOffice2Icon,
  BoltIcon,
  WrenchScrewdriverIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';

const services = [
  {
    icon: BuildingOffice2Icon,
    title: 'Проектирование',
    subtitle: 'Projekteerimine',
    description:
      'Полное сопровождение проектирования в соответствии с эстонскими строительными нормами.',
    items: [
      'Архитектурное и строительное проектирование: эскиз (eskiis), предварительный (eelprojekt), основной (põhiprojekt) и рабочий проект (tööprojekt)',
      'Подготовка и согласование документации для получения разрешения на строительство (ehitusluba)',
      'Конструктивные решения: расчёты и деталировка несущих конструкций',
    ],
  },
  {
    icon: BoltIcon,
    title: 'Инженерные системы',
    subtitle: 'Eriosad ja tehnosüsteemid',
    description:
      'Проектирование и интеграция инженерных систем с акцентом на энергоэффективность.',
    items: [
      'HVAC: отопление, вентиляция и кондиционирование',
      'Электроснабжение: силовые и слаботочные сети, автоматизация зданий',
      'Водоснабжение и канализация: внутренние и наружные сети',
    ],
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Строительство и генподряд',
    subtitle: 'Ehitus ja peatöövõtt',
    description:
      'Комплексное управление строительством и выполнение работ под ключ.',
    items: [
      'Генеральный подряд: координация субподрядчиков, сроки и бюджет',
      'Общестроительные работы',
      'Авторский надзор (autorijärelevalve): соответствие работ проекту',
    ],
  },
  {
    icon: DocumentCheckIcon,
    title: 'Ввод в эксплуатацию',
    subtitle: 'Kasutusloa taotlemine',
    description: 'Завершение проекта и сдача объекта.',
    items: [
      'Исполнительная документация (teostusjoonised), акты скрытых работ',
      'Получение разрешения на эксплуатацию (kasutusluba)',
      'Взаимодействие с независимым строительным надзором (omanikujärelevalve)',
    ],
  },
];

const textClass =
  'font-sans text-[18px] font-normal leading-[1.7] tracking-wide text-[#105483]';
const textStyle = { wordSpacing: '0.3em', letterSpacing: '0.02em' } as const;

const Services = () => {
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
            Наши услуги
          </h2>
          <p className={`${textClass} max-w-4xl mx-auto text-left`} style={textStyle}>
            Мы предоставляем услуги полного цикла реализации строительных проектов: от
            архитектурной идеи до ввода объекта в эксплуатацию и завершения всех юридических
            формальностей.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white hover:shadow-lg transition border border-gray-200 font-sans"
            >
              <service.icon className="w-12 h-12 text-[#105483] mb-4 shrink-0" />
              <h3
                className="font-sans font-bold text-[1.125rem] tracking-[0.04em] mb-1 text-[#105483]"
                style={{ letterSpacing: '0.04em' }}
              >
                {service.title}{' '}
                <span className="font-normal">({service.subtitle})</span>
              </h3>
              <p className={`${textClass} mt-3 mb-4`} style={textStyle}>
                {service.description}
              </p>
              <ul
                className={`${textClass} list-disc pl-6 space-y-2`}
                style={textStyle}
              >
                {service.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
