import { motion } from 'motion/react';

export default function Navbar() {
  const navLinks = ['Collections', 'About', 'Journal', 'Stores'];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-8 md:px-12"
    >
      <div className="flex items-center gap-2 group cursor-pointer w-1/4 sm:w-1/3">
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold">Menu</span>
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black" />
      </div>

      <div className="flex flex-col items-center gap-4 w-2/4 sm:w-1/3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-light tracking-[0.2em] sm:tracking-[0.5em] uppercase leading-none">
          Velóura
        </h1>
        <div className="hidden lg:flex items-center justify-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-60 hover:opacity-100 transition-opacity"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 group cursor-pointer w-1/4 sm:w-1/3">
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold">Search</span>
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] font-bold">0</span>
      </div>
    </motion.nav>
  );
}
