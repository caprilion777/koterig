'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const projectImages: string[][] = [
  ['/portfolio/a0001.jpg', '/portfolio/a0002.jpg', '/portfolio/a0003.jpg', '/portfolio/a0004.jpg'],
  ['/portfolio/b0001.jpg', '/portfolio/b0002.jpg', '/portfolio/b0003.jpg', '/portfolio/b0004.jpg'],
  ['/portfolio/c0001.jpg', '/portfolio/c0002.jpg', '/portfolio/c0003.jpg', '/portfolio/C0004.jpg'],
  ['/portfolio/d0001.jpg', '/portfolio/d0002.jpg', '/portfolio/d0003.jpg', '/portfolio/d0004.jpg'],
];

const textClass =
  'font-sans text-[18px] font-normal leading-[1.7] tracking-wide text-[#105483]';
const textStyle = { wordSpacing: '0.3em', letterSpacing: '0.02em' } as const;
const iconShadow = { filter: 'drop-shadow(0 1px 3px rgba(0,0,0,.6))' } as const;
const SWIPE_THRESHOLD = 60;

const ArrowOutline = ({ direction = 'left' }: { direction?: 'left' | 'right' }) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    style={{
      transform: direction === 'right' ? 'scaleX(-1)' : undefined,
      display: 'block',
      ...iconShadow,
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

const CloseOutline = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    style={{ display: 'block', ...iconShadow }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="18" r="16" stroke="white" strokeWidth="2.2" fill="none" />
    <line x1="13" y1="13" x2="23" y2="23" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="23" y1="13" x2="13" y2="23" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

type PortfolioProps = {
  standalone?: boolean;
};

type SelectedProject = {
  title: string;
  images: string[];
};

const Portfolio = ({ standalone = false }: PortfolioProps) => {
  const t = useTranslations('portfolio');
  const projectTitles = t.raw('projects') as Array<{ title: string }>;
  const projects = projectTitles
    .map((p, i) => ({
      id: i + 1,
      title: p.title,
      images: projectImages[i] ?? [],
    }))
    .filter((p) => p.images.length > 0);

  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [imgLoading, setImgLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const openProject = (project: SelectedProject) => {
    setSelectedProject(project);
    setCurrentImage(0);
    setImgLoading(true);
  };

  const closeProject = useCallback(() => setSelectedProject(null), []);

  const goPrev = useCallback(() => {
    if (!selectedProject || selectedProject.images.length < 2) return;
    setImgLoading(true);
    setCurrentImage((p) => (p === 0 ? selectedProject.images.length - 1 : p - 1));
  }, [selectedProject]);

  const goNext = useCallback(() => {
    if (!selectedProject || selectedProject.images.length < 2) return;
    setImgLoading(true);
    setCurrentImage((p) => (p === selectedProject.images.length - 1 ? 0 : p + 1));
  }, [selectedProject]);

  const goTo = (idx: number) => {
    if (idx === currentImage) return;
    setImgLoading(true);
    setCurrentImage(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!selectedProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape') closeProject();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedProject, goPrev, goNext, closeProject]);

  // Lock page scroll while the modal is open
  useEffect(() => {
    if (!selectedProject) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedProject]);

  // Preload neighbouring images
  useEffect(() => {
    if (!selectedProject) return;
    const n = selectedProject.images.length;
    if (n < 2) return;
    [currentImage + 1, currentImage - 1].forEach((i) => {
      const img = new window.Image();
      img.src = selectedProject.images[(i + n) % n];
    });
  }, [selectedProject, currentImage]);

  // If the image is already cached, onLoad may not fire again: check manually
  useEffect(() => {
    if (imgRef.current?.complete) setImgLoading(false);
  }, [selectedProject, currentImage]);

  const total = selectedProject?.images.length ?? 0;

  return (
    <section
      id={standalone ? undefined : 'portfolio'}
      className={`bg-[#fafafa] font-sans scroll-mt-[25px] min-h-screen pb-30 ${
        standalone ? 'pt-[calc(7.5rem+25px)]' : 'py-30'
      }`}
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
            {t('title')}
          </h2>
          <p className={`${textClass} max-w-4xl mx-auto text-left`} style={textStyle}>
            {t('intro')}
          </p>
        </motion.div>

        <div className="mx-auto grid w-full max-w-[912px] grid-cols-1 gap-8 sm:grid-cols-2 justify-items-center">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              role="button"
              tabIndex={0}
              aria-label={project.title}
              onClick={() => openProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProject(project);
                }
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="group relative h-[440px] w-full max-w-[440px] cursor-pointer overflow-hidden rounded-xl font-sans focus:outline-none focus-visible:ring-4 focus-visible:ring-[#105483]/50"
            >
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                sizes="(min-width: 640px) 440px, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] bg-gradient-to-t from-black/55 to-transparent pt-20 pb-6 px-6">
                <h3
                  className="font-sans font-bold uppercase text-[1.125rem] tracking-[0.04em] text-white"
                  style={{ letterSpacing: '0.04em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
                >
                  {project.title}
                </h3>
              </div>
              <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-5 py-2 font-semibold text-[#105483] shadow-md transition-colors duration-200 group-hover:bg-[#f5f5f5]">
                {t('more')}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={closeProject}
          >
            {/* Controls are fixed to the screen so they never jump */}
            <button
              className="fixed right-4 top-4 z-20 m-0 border-none bg-transparent p-0 outline-none transition-transform hover:scale-110 active:scale-95"
              onClick={(e) => {
                e.stopPropagation();
                closeProject();
              }}
              aria-label={t('close')}
            >
              <CloseOutline />
            </button>

            {total > 1 && (
              <>
                <button
                  className="fixed left-4 top-1/2 z-20 m-0 -translate-y-1/2 border-none bg-transparent p-0 outline-none transition-transform hover:scale-110 active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  aria-label={t('prevImage')}
                >
                  <ArrowOutline direction="left" />
                </button>
                <button
                  className="fixed right-4 top-1/2 z-20 m-0 -translate-y-1/2 border-none bg-transparent p-0 outline-none transition-transform hover:scale-110 active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label={t('nextImage')}
                >
                  <ArrowOutline direction="right" />
                </button>
              </>
            )}

            <div
              className="relative mx-auto flex max-h-[80vh] max-w-[90vw] items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                ref={imgRef}
                key={selectedProject.images[currentImage]}
                src={selectedProject.images[currentImage]}
                alt={`${selectedProject.title} — ${currentImage + 1}/${total}`}
                draggable={false}
                drag={total > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD) goNext();
                  else if (info.offset.x > SWIPE_THRESHOLD) goPrev();
                }}
                onLoad={() => setImgLoading(false)}
                onError={() => setImgLoading(false)}
                className="mx-auto max-h-[80vh] w-auto max-w-[90vw] select-none rounded-xl bg-[#f5f5f5] object-contain"
              />
              {imgLoading && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-white" />
                </div>
              )}
            </div>

            {total > 1 && (
              <div
                className="fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedProject.images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goTo(idx)}
                    aria-label={`${idx + 1}/${total}`}
                    aria-current={idx === currentImage}
                    className="flex h-6 w-6 items-center justify-center"
                  >
                    <span
                      className={`block h-2 w-2 rounded-full bg-white transition-opacity duration-200 ${
                        idx === currentImage ? 'opacity-100' : 'opacity-40'
                      }`}
                      style={{
                        boxShadow:
                          idx === currentImage ? '0 0 4px 1px rgba(0,0,0,0.25)' : undefined,
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
