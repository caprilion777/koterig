'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Портфолио 1',
    images: ['/portfolio/1.jpg', '/portfolio/11.jpg', '/portfolio/111.jpg'],
  },
  {
    id: 2,
    title: 'Портфолио 2',
    images: ['/portfolio/2.jpg', '/portfolio/22.jpg', '/portfolio/222.jpg'],
  },
  {
    id: 3,
    title: 'Портфолио 3',
    images: ['/portfolio/3.jpg', '/portfolio/33.jpg', '/portfolio/333.jpg'],
  },
  {
    id: 4,
    title: 'Портфолио 4',
    images: ['/portfolio/4.jpg', '/portfolio/44.jpg', '/portfolio/444.jpg'],
  },
];

const MENU_HEIGHT = 96;

const textClass =
  'font-sans text-[18px] font-normal leading-[1.7] tracking-wide text-[#105483]';
const textStyle = { wordSpacing: '0.3em', letterSpacing: '0.02em' } as const;

// SVG outline arrow (Instagram style)
const ArrowOutline = ({ direction = 'left' }: { direction?: 'left' | 'right' }) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    style={{
      transform: direction === 'right' ? 'scaleX(-1)' : undefined,
      display: 'block'
    }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="18" r="16" stroke="white" strokeWidth="2.2" fill="none" />
    <polyline
      points="21,12 15,18 21,24"
      fill="none"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// SVG outline close (Instagram style)
const CloseOutline = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    style={{ display: 'block' }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="18" r="16" stroke="white" strokeWidth="2.2" fill="none" />
    <line
      x1="13"
      y1="13"
      x2="23"
      y2="23"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <line
      x1="23"
      y1="13"
      x2="13"
      y2="23"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

type PortfolioProps = {
  standalone?: boolean;
};

const Portfolio = ({ standalone = false }: PortfolioProps) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [imgLoading, setImgLoading] = useState(false); // добавлено состояние загрузки

  const openProject = (project: any) => {
    setSelectedProject(project);
    setCurrentImage(0);
    setImgLoading(true); // при открытии сразу ставим загрузку
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgLoading(true); // ставим загрузку при смене
    setCurrentImage((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    );
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgLoading(true); // ставим загрузку при смене
    setCurrentImage((prev) =>
      prev === selectedProject.images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevImage(e as any);
      if (e.key === 'ArrowRight') nextImage(e as any);
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section
      id={standalone ? undefined : 'portfolio'}
      className={`py-30 bg-[#fafafa] font-sans ${standalone ? 'min-h-screen' : 'scroll-mt-[25px] md:scroll-mt-[25px]'}`}
      style={{ paddingTop: `${MENU_HEIGHT}px` }}
    >
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
            Наши проекты
          </h2>
          <p className={`${textClass} max-w-4xl mx-auto text-left`} style={textStyle}>
            Мы воплощаем сложные инженерные решения в качественные объекты. Каждый наш
            <br />
            проект - это результат строгого соблюдения строительных норм, использования надежных
            <br />
            технологий и полного контроля на всех этапах: от фундамента до сдачи в эксплуатацию.
          </p>
        </motion.div>
        <div className="mx-auto grid w-full max-w-[912px] grid-cols-1 gap-8 sm:grid-cols-2 justify-items-center">
          <AnimatePresence mode="wait">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative w-full max-w-[440px] overflow-hidden rounded-xl cursor-pointer font-sans"
                onClick={() => openProject(project)}
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-[440px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 z-[5] bg-gradient-to-t from-black/55 to-transparent pt-20 pb-6 px-6 pointer-events-none">
                  <h3
                    className="font-sans font-bold uppercase text-[1.125rem] tracking-[0.04em] text-white"
                    style={{ letterSpacing: '0.04em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
                  >
                    {project.title}
                  </h3>
                </div>
                <button
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-5 py-2 bg-white/60 text-[#105483] font-semibold rounded-lg shadow-md hover:bg-[#f5f5f5] transition-colors duration-200"
                  onClick={e => { e.stopPropagation(); openProject(project); }}
                >
                  Подробнее
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative flex flex-col items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              {/* Стрелки outline поверх картинки */}
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-0 m-0 bg-transparent border-none outline-none hover:scale-110 active:scale-95 transition-transform"
                    onClick={prevImage}
                    aria-label="Предыдущее изображение"
                  >
                    <ArrowOutline direction="left" />
                  </button>
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-0 m-0 bg-transparent border-none outline-none hover:scale-110 active:scale-95 transition-transform"
                    onClick={nextImage}
                    aria-label="Следующее изображение"
                  >
                    <ArrowOutline direction="right" />
                  </button>
                </>
              )}
              {/* Крестик outline поверх картинки */}
              <button
                className="absolute top-3 right-3 z-20 p-0 m-0 bg-transparent border-none outline-none hover:scale-110 active:scale-95 transition-transform"
                onClick={() => setSelectedProject(null)}
                aria-label="Закрыть"
              >
                <CloseOutline />
              </button>
              <div className="relative w-auto max-h-[80vh] max-w-[90vw] mx-auto">
                <img
                  src={selectedProject.images[currentImage]}
                  alt={selectedProject.title}
                  className="w-auto max-h-[80vh] max-w-[90vw] mx-auto object-contain rounded-xl bg-[#f5f5f5] transition-opacity duration-200"
                  style={{ opacity: 1 }}
                  onLoad={() => setImgLoading(false)}
                />
                {imgLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></span>
                  </div>
                )}
              </div>
              {/* Только точки-пагинация, без текста */}
              {selectedProject.images.length > 1 && (
                <div
                  className="absolute z-20 left-1/2 -translate-x-1/2"
                  style={{ bottom: '2%', pointerEvents: 'none' }}
                >
                  <div className="flex gap-1">
                    {selectedProject.images.map((_: any, idx: number) => (
                      <span
                        key={idx}
                        className={`block rounded-full transition-all duration-200 ${idx === currentImage
                          ? 'bg-white opacity-100 w-1.5 h-1.5'
                          : 'bg-white opacity-40 w-1.5 h-1.5'
                          }`}
                        style={{
                          boxShadow: idx === currentImage ? '0 0 4px 1px rgba(0,0,0,0.18)' : undefined
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;