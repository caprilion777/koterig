'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-30 bg-[#fafafa] font-sans scroll-mt-[25px] md:scroll-mt-[25px]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2
              className="font-sans font-bold uppercase text-[1.125rem] tracking-[0.04em] mb-4 text-[#105483]"
              style={{ letterSpacing: '0.04em' }}
            >
              Свяжитесь с нами
            </h2>
            <p
              className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide text-[#105483]"
              style={{
                wordSpacing: '0.3em',
                letterSpacing: '0.02em'
              }}
            >
              Оставьте заявку, и мы свяжемся с вами для обсуждения вашего проекта
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3
                className="font-sans font-bold uppercase text-[1.125rem] tracking-[0.04em] mb-6 text-[#105483]"
                style={{ letterSpacing: '0.04em' }}
              >
                Контактная информация
              </h3>
              <div className="space-y-4">
                <div>
                  <h4
                    className="font-sans font-bold text-[16px] mb-2 text-[#105483]"
                  >
                    Адрес
                  </h4>
                  <p
                    className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide text-[#105483]"
                    style={{
                      wordSpacing: '0.3em',
                      letterSpacing: '0.02em'
                    }}
                  >
                    Таллин, Эстония
                  </p>
                </div>
                <div>
                  <h4
                    className="font-sans font-bold text-[16px] mb-2 text-[#105483]"
                  >
                    Телефон
                  </h4>
                  <div
                    className="flex items-center space-x-2 font-sans text-[18px] font-normal leading-[1.7] tracking-wide text-[#105483]"
                    style={{
                      wordSpacing: '0.3em',
                      letterSpacing: '0.02em'
                    }}
                  >
                    <span>+372 5371 5636</span>
                    <a
                      href="https://wa.me/37253715636"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="hover:text-green-500 transition-colors"
                    >
                      <FaWhatsapp size={20} />
                    </a>
                    <a
                      href="https://t.me/koterig"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Telegram"
                      className="hover:text-blue-500 transition-colors"
                    >
                      <FaTelegramPlane size={20} />
                    </a>
                  </div>
                </div>
                <div>
                  <h4
                    className="font-sans font-bold text-[16px] mb-2 text-[#105483]"
                  >
                    Email
                  </h4>
                  <p
                    className="font-sans text-[18px] font-normal leading-[1.7] tracking-wide text-[#105483]"
                    style={{
                      wordSpacing: '0.3em',
                      letterSpacing: '0.02em'
                    }}
                  >
                    info@koterig.eu
                  </p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block font-sans font-normal text-[16px] mb-2 text-[#105483]"
                >
                  Ваше имя
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 bg-transparent text-[#105483] border border-[#105483] rounded-lg focus:ring-2 focus:ring-[#105483] focus:border-transparent font-sans"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label
                  className="block font-sans font-normal text-[16px] mb-2 text-[#105483]"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 bg-transparent text-[#105483] border border-[#105483] rounded-lg focus:ring-2 focus:ring-[#105483] focus:border-transparent font-sans"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label
                  className="block font-sans font-normal text-[16px] mb-2 text-[#105483]"
                >
                  Телефон
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-4 py-2 bg-transparent text-[#105483] border border-[#105483] rounded-lg focus:ring-2 focus:ring-[#105483] focus:border-transparent font-sans"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label
                  className="block font-sans font-normal text-[16px] mb-2 text-[#105483]"
                >
                  Сообщение
                </label>
                <textarea
                  name="message"
                  className="w-full px-4 py-2 bg-transparent text-[#105483] border border-[#105483] rounded-lg focus:ring-2 focus:ring-[#105483] focus:border-transparent h-32 font-sans"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.95 }}
                className={`w-full px-7 py-2 rounded-md text-sm md:text-base font-sans font-bold uppercase tracking-[0.04em] transition-colors duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-[#105483] text-[#fafafa] hover:bg-[#0d4669] active:bg-[#0b3d5c]'
                }`}
                style={{ letterSpacing: '0.04em' }}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : null}
                {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
              </motion.button>
              {status === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 text-center font-sans"
                >
                  Спасибо! Ваша заявка отправлена.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-center font-sans"
                >
                  Ошибка отправки. Попробуйте позже.
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
        <style jsx global>{`
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active,
          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:focus,
          textarea:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px #fafafa inset !important;
            -webkit-text-fill-color: #105483 !important;
            border-color: #105483 !important;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Contact;