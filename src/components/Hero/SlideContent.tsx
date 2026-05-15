import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { Collection } from '../../constants/collections';
import { cn } from '../../lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface SlideContentProps {
  collection: Collection;
  isActive: boolean;
  index: number;
  total: number;
  key?: string;
}

export default function SlideContent({ collection, isActive, index, total }: SlideContentProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.1 },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 2.4, ease: 'power4.inOut' }
      );
    }
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 flex items-center justify-center transition-opacity duration-1000",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
      )}
    >

      <div className="relative w-full h-full flex flex-col md:flex-row md:items-center px-6 md:px-24">

        <div className="hidden md:flex absolute left-4 md:left-12 top-1/2 -translate-y-1/2 h-fit items-center z-20">
          <span className="vertical-text text-[8px] md:text-[9px] uppercase tracking-[0.6em] md:tracking-[0.8em] opacity-60 font-bold rotate-180 whitespace-nowrap">
            Luminaire / Collection
          </span>
        </div>

        {/* Center Main Model Image */}
        <div className="absolute inset-0 md:inset-auto md:left-1/2 md:top-[55%] md:-translate-y-1/2 md:-translate-x-1/2 md:w-auto md:h-[88vh] md:aspect-[9/16] z-10 pointer-events-none">
          <div ref={imageRef} className="w-full h-full relative overflow-hidden">
            <img
              src={collection.image}
              alt={collection.title}
              className="w-full h-full object-cover object-center md:object-top"
              referrerPolicy="no-referrer"
            />
            {/* Mobile Gradient Overlay for Text Readability */}
            <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-gradient-to-t from-[#F2F1EF] via-[#F2F1EF]/90 to-transparent md:hidden" />
          </div>
        </div>

        {/* Text Area */}
        <div className="relative z-20 flex-1 w-full max-w-2xl mt-[48vh] md:mt-16 mx-auto md:ml-12 flex flex-col items-center md:items-start text-center md:text-left">
          <AnimatePresence>
            {isActive && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3 mb-2 md:mb-3 justify-center md:justify-start w-full md:w-auto px-4 md:px-0"
                >
                  <div className="flex-1 md:flex-none max-w-[30px] md:max-w-none md:w-10 h-[1px] bg-black/40" />
                  <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold opacity-80 whitespace-nowrap">New Collection</span>
                  <div className="flex-1 md:hidden max-w-[30px] h-[1px] bg-black/40" />
                </motion.div>

                <div className="overflow-hidden mb-3 md:mb-5">
                  <motion.h2
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.7, duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
                    className="text-[52px] sm:text-[60px] md:text-[92px] font-serif font-light leading-[1] md:leading-[1.05] tracking-tight max-w-[12ch] md:max-w-none mx-auto md:mx-0"
                  >
                    {collection.title}
                  </motion.h2>
                </div>

                <div className="overflow-hidden mb-6 md:mb-8">
                  <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                    className="text-[12px] sm:text-[13px] md:text-[14px] text-black/60 max-w-[280px] md:max-w-[300px] leading-[1.6] md:leading-[1.7] mx-auto md:mx-0"
                  >
                    A study of simplicity, light and form. Timeless silhouettes crafted for a new generation.
                  </motion.p>
                </div>

                <div className="flex flex-row justify-center md:justify-start gap-8 md:gap-16 w-full items-center md:items-center">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 1 }}
                    className="flex flex-col md:flex-row items-center gap-3 md:gap-5 group"
                  >
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-700 ease-out shadow-sm">
                      <ArrowUpRight size={14} className="md:w-[14px] md:h-[14px]" />
                    </div>
                    <div className="flex items-center gap-3 relative">
                      <span className="text-[9px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold whitespace-nowrap">
                        Explore
                        <span className="hidden md:inline"> Collection</span>
                      </span>
                      <div className="hidden md:block absolute -bottom-1 left-0 w-8 h-[1px] bg-black/10 group-hover:w-full transition-all duration-500" />
                    </div>
                  </motion.button>

                  <div className="w-[1px] h-10 bg-black/10 md:hidden" />

                  {/* Collection Film */}
                  <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 cursor-pointer group mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                      className="w-12 h-8 md:w-16 md:h-10 bg-black/10 overflow-hidden relative shadow-md rounded-[1px]"
                    >
                      <img src={collection.previewImage} alt="Film" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-transparent transition-colors">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-sm transition-transform duration-500 group-hover:scale-110">
                          <div className="w-0 h-0 border-t-[2px] border-t-transparent border-l-[3px] border-l-white border-b-[2px] border-b-transparent translate-x-[1px]" />
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="flex flex-col items-center md:items-start"
                    >
                      <span className="text-[9px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold opacity-80 mb-0.5 whitespace-nowrap">
                        <span className="hidden md:inline">Collection Film</span>
                        <span className="md:hidden">Play Film</span>
                      </span>
                      <span className="hidden md:block text-[7px] md:text-[8px] uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-50 font-bold">Play Now</span>
                    </motion.div>
                  </div>
                </div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side Content */}
        <div className="hidden md:flex absolute right-16 md:right-24 top-1/2 -translate-y-1/2 w-[380px] flex-col justify-between h-[80vh] z-20">

          {/* Top Right Detail Image with Frame */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
            transition={{ delay: 1.6, duration: 1.2 }}
            className="self-end relative mt-8 mr-16"
          >
            <div className="w-48 h-64 relative">
              <img src={collection.previewImage} alt="Detail" className="w-full h-full object-contain transition-opacity duration-1000" />
            </div>
            <div className="absolute -bottom-8 right-0">
              <span className="text-[10px] font-bold tracking-[0.4em] opacity-80">0{index + 1} / 0{total}</span>
            </div>
          </motion.div>

          {/* Bottom Right Quotation - Aligned to Image Left Edge */}
          <div className="self-end mr-16 w-48 relative mb-8">
            <span className="text-[100px] font-serif text-black/[0.03] absolute -left-12 -top-12 italic leading-none pointer-events-none select-none">“</span>
            <motion.div
              key={collection.id + 'text'}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1 }}
            >
              <p className="text-[18px] font-serif italic text-black/90 leading-tight mb-6 w-full">
                {collection.quote.replace(/"/g, '')}
              </p>
              <span className="font-serif italic text-2xl text-black/50 font-light block tracking-widest">
                Veloura
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
