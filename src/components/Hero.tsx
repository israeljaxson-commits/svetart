/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { ArrowRight, Sparkles, Star, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import clientAvatar1 from '../assets/avatars/client-1.jpg';
import clientAvatar2 from '../assets/avatars/client-2.jpg';
import clientAvatar3 from '../assets/avatars/client-3.jpg';
import heroImage from '../assets/hero/hero-image.jpg';

interface HeroProps {
  onBookClick: () => void;
  onContactClick: () => void;
}

const localHeroT = {
  en: {
    bookAppointment: "Book Your Appointment",
    viewInstagram: "View Instagram",
    scrollToDiscover: "Scroll To Discover",
    certifiedSeal: "15+ Years of Couture Mastery"
  },
  ro: {
    bookAppointment: "Programează o Vizită",
    viewInstagram: "Vezi Instagram",
    scrollToDiscover: "Derulează pentru a Descoperi",
    certifiedSeal: "15+ Ani de Măiestrie în Couture"
  },
  ru: {
    bookAppointment: "Забронировать визит",
    viewInstagram: "Наш Instagram",
    scrollToDiscover: "Листайте дальше",
    certifiedSeal: "15+ Лет кутюрного мастерства"
  }
};

export default function Hero({ onBookClick }: HeroProps) {
  const { lang, t } = useLanguage();
  const lt = localHeroT[lang] || localHeroT.en;
  const clientAvatars = [clientAvatar1, clientAvatar2, clientAvatar3];

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <section 
      id="hero-section"
      className="relative min-h-[100vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-[#F2E4DF]"
      style={{
        background: `
          radial-gradient(circle at 50% 0%, rgba(231, 211, 193, 0.6) 0%, transparent 60%),
          radial-gradient(circle at 15% 40%, rgba(216, 163, 163, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 85% 75%, rgba(184, 134, 107, 0.18) 0%, transparent 60%),
          #F2E4DF
        `
      }}
    >
      {/* Luxury Radial Spotlight Overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 15%, rgba(255, 255, 255, 0.6) 0%, transparent 50%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center relative z-10">
        
        {/* Left Side: Luxury Copywriting & Editorial Typography */}
        <div className="lg:col-span-7 space-y-10 text-left">
          
          {/* Subtle Elegance Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-white/60 border border-[#D8A3A3]/20 shadow-[0_4px_30px_rgba(42,35,33,0.02)] backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8A3A3] animate-pulse" />
            <span className="text-[10px] uppercase font-semibold tracking-[0.3em] text-[#B8866B] flex items-center gap-1.5 font-sans">
              <Sparkles className="w-3 h-3 text-[#B8866B]" /> {t.hero.badge}
            </span>
          </motion.div>

          {/* Heading Section inspired by Dior/Chanel typography */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7.5xl font-serif text-[#2A2321] leading-[1.1] tracking-tight relative"
            >
              <span className="block font-medium tracking-tight h-auto">
                {t.hero.titleFirstLine}
              </span>
              <span className="block mt-2 font-serif italic font-light text-[#D8A3A3] tracking-wide">
                {lang === 'en' ? 'for standard-defining beauty' : `${t.hero.titleItalic} ${t.hero.titleThirdLine.replace('.', '')}`}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
              className="text-[#2A2321]/80 font-sans font-light text-sm md:text-base leading-relaxed max-w-xl"
            >
              {t.hero.desc}
            </motion.p>
          </div>

          {/* Luxury Social Proof Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 pt-2"
          >
            <div className="flex -space-x-3">
              {clientAvatars.map((avatar, idx) => (
                <img
                  key={`hero-client-${idx}`}
                  src={avatar}
                  className="w-9 h-9 rounded-full border-2 border-[#F2E4DF] object-cover shadow-md"
                  alt={`Client ${idx + 1}`}
                />
              ))}
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D8A3A3] text-[#D8A3A3]" />
                ))}
                <span className="text-xs font-bold text-[#2A2321] ml-1 font-sans">{t.hero.reviewsRating}</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#B8866B] font-semibold font-sans">{t.hero.bookingsCount}</p>
            </div>
          </motion.div>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-4"
          >
            {/* Primary: Rose-Gold Metallic Gradient Button */}
            <button
              onClick={onBookClick}
              className="relative group overflow-hidden px-9 py-4 rounded-full bg-gradient-to-r from-[#D8A3A3] via-[#E7D3C1] to-[#D8A3A3] bg-[length:200%_auto] text-[#2A2321] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 hover:bg-right hover:scale-102 hover:shadow-[0_15px_30px_rgba(216,163,163,0.3)] active:scale-98 transition-all duration-500 cursor-pointer font-sans"
              style={{
                boxShadow: '0 8px 25px rgba(216, 163, 163, 0.2)'
              }}
            >
              <span className="relative z-10">{lt.bookAppointment}</span>
              <ArrowRight className="w-4 h-4 text-[#2A2321] relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              {/* Shimmer transition overlay */}
              <div className="absolute inset-x-0 top-0 h-full w-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
            </button>

            {/* Secondary: Luxury Glass Panel Instagram Button */}
            <a
              href="https://www.instagram.com/svetart.beauty?igsh=MmhidHgzbHh2dXRy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-4 rounded-full border border-[#D8A3A3]/40 text-[#2A2321] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 bg-white/20 backdrop-blur-xs hover:bg-[#F2E4DF] hover:border-[#D8A3A3] hover:text-[#B8866B] hover:shadow-[0_12px_24px_rgba(42,35,33,0.04)] hover:scale-102 active:scale-98 transition-all duration-300 cursor-pointer font-sans text-center"
            >
              <span>{lt.viewInstagram}</span>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Hero Image */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="relative w-full max-w-[460px] aspect-[4/5]" style={{ perspective: 1400 }}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
                scale: 1,
                rotateX: [2, -2, 2],
                rotateY: [-3, 3, -3],
              }}
              transition={{
                opacity: { duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.35 },
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                rotateX: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                rotateY: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{
                transformStyle: 'preserve-3d',
                rotateY: coords.x * 18,
                rotateX: coords.y * -14,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative h-full w-full rounded-[34px] overflow-hidden shadow-[0_30px_80px_rgba(42,35,33,0.18)] border border-white/50 bg-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-[#D8A3A3]/10 pointer-events-none" />
              <motion.img
                src={heroImage}
                alt="Beauty salon hero image"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ transform: 'translateZ(35px) scale(1)', objectPosition: '74% 62%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2321]/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute left-5 bottom-5 right-5 flex items-end justify-between gap-4" style={{ transform: 'translateZ(45px)' }}>
                <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 px-4 py-3 shadow-lg max-w-[72%]">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8866B] font-bold font-sans">SvetArt Beauty Studio</p>
                  <p className="mt-1 text-sm text-[#2A2321] font-serif leading-snug">Luxury beauty care, captured in a single frame.</p>
                </div>
                <div className="rounded-full bg-[#2A2321]/80 text-[#F2E4DF] px-4 py-2 text-[9px] uppercase tracking-[0.25em] font-black font-sans whitespace-nowrap shadow-lg">
                  {lt.certifiedSeal}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer pointer-events-none opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-[9px] uppercase tracking-[0.35em] text-[#B8866B] font-semibold font-sans">{lt.scrollToDiscover}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#D8A3A3]" />
        </motion.div>
      </div>

    </section>
  );
}
