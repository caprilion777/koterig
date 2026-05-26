'use client';
import React from 'react';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#105483] text-[#fafafa] text-sm font-sans">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-left">
            <h3
              className="font-sans font-bold uppercase text-[1.125rem] mb-4 tracking-[0.04em] text-[#fafafa]"
              style={{ letterSpacing: '0.04em' }}
            >
              Koterig OÜ
            </h3>
            <p
              className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide text-[#fafafa]"
              style={{
                wordSpacing: '0.3em',
                letterSpacing: '0.02em'
              }}
            >
              Проектируем. Строим. Сдаем. Ваш единственный подрядчик на всем пути от первого чертежа до ввода в эксплуатацию.
            </p>
          </div>
          <div className="text-center md:text-right md:justify-self-end">
            <h4
              className="font-sans font-bold uppercase text-[1.125rem] mb-4 tracking-[0.04em] text-[#fafafa]"
              style={{ letterSpacing: '0.04em' }}
            >
              Контакты
            </h4>
            <ul className="space-y-2">
              <li
                className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide text-[#fafafa]"
                style={{
                  wordSpacing: '0.3em',
                  letterSpacing: '0.02em'
                }}
              >
                Таллин, Эстония
              </li>
              <li>
                <div
                  className="flex items-center justify-center md:justify-end space-x-2 font-sans text-[18px] font-normal leading-[1.7] tracking-wide text-[#fafafa]"
                  style={{
                    wordSpacing: '0.3em',
                    letterSpacing: '0.02em'
                  }}
                >
                  <span>+372 5371 5636</span>
                  <FaWhatsapp size={20} className="text-[#fafafa]" />
                  <FaTelegramPlane size={20} className="text-[#fafafa]" />
                </div>
              </li>
              <li
                className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide text-[#fafafa]"
                style={{
                  wordSpacing: '0.3em',
                  letterSpacing: '0.02em'
                }}
              >
                info@koterig.eu
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#fafafa] mt-12 pt-8 text-center text-[#fafafa] font-sans text-sm tracking-wide">
          <p
            className="font-sans text-[16px] font-normal leading-[1.7] tracking-wide"
            style={{
              wordSpacing: '0.3em',
              letterSpacing: '0.02em'
            }}
          >
            &copy; 2026 Koterig OÜ. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;