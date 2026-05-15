import { useState, useCallback, useEffect, useRef } from 'react';
import { COLLECTIONS } from '../../constants/collections';
import SlideContent from './SlideContent';
import BackgroundNumber from './BackgroundNumber';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { gsap } from 'gsap';

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTransitioning = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex((prev) => (prev + 1) % COLLECTIONS.length);
    setTimeout(() => {
      isTransitioning.current = false;
    }, 2200);
  }, []);

  const prevSlide = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex((prev) => (prev - 1 + COLLECTIONS.length) % COLLECTIONS.length);
    setTimeout(() => {
      isTransitioning.current = false;
    }, 2200);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 60) {
        if (e.deltaY > 0) nextSlide();
        else prevSlide();
      }
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 15;
      const yPos = (clientY / window.innerHeight - 0.5) * 15;
      gsap.to(containerRef.current, {
        x: xPos,
        y: yPos,
        duration: 2.5,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#F2F1EF]">
      <BackgroundNumber number={COLLECTIONS[currentIndex].number} />

      <div ref={containerRef} className="relative w-full h-full">
        {COLLECTIONS.map((collection, index) => (
          <SlideContent
            key={collection.id}
            collection={collection}
            isActive={index === currentIndex}
            index={index}
            total={COLLECTIONS.length}
          />
        ))}
      </div>

      {/* Vertical Navigation Dots (Right Side) */}
      <div className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 z-50 flex-col gap-8 items-center">
        <div className="w-[1px] h-32 bg-black/10 absolute -z-10" />
        {COLLECTIONS.map((_, index) => (
          <button
            key={index}
            onClick={() => { if (!isTransitioning.current) setCurrentIndex(index); }}
            className="group relative flex items-center justify-center p-2"
          >
            <div className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-700",
              index === currentIndex ? "bg-black scale-125" : "bg-black/20 group-hover:bg-black/60"
            )} />
            {index === currentIndex && (
              <motion.div layoutId="activeNav" className="absolute -inset-1 border border-black/20 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Footer Content */}
      <div className="absolute bottom-6 md:bottom-8 left-0 w-full px-6 md:px-12 flex items-end justify-between z-50">
        <div className="flex items-center gap-3 md:gap-4 cursor-pointer group">
          <div className="relative w-6 h-6 md:w-8 md:h-8 rounded-full border border-black/[0.06] flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <div className="w-1 h-1 bg-black/40 rounded-full" />
          </div>
          <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] md:tracking-[0.4em] font-bold opacity-40 group-hover:opacity-100 transition-opacity max-w-[80px] md:max-w-none text-left">
            Scroll to discover
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-8 flex-wrap justify-end max-w-[150px] md:max-w-none">
          {['Instagram', 'Facebook', 'Twitter'].map((social) => (
            <a
              key={social}
              href="#"
              className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold opacity-30 hover:opacity-100 transition-all"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
