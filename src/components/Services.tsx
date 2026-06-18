/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { Check, Gem, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, Language } from '../context/LanguageContext';
import { SALON_SERVICES, ServiceCategory } from '../data/services';

interface Service {
  id: string;
  bookingName: string;
  name: string;
  category: ServiceCategory;
  price: string;
  features: string[];
  materials: string;
  description: string;
  image: string;
}

interface ServicesProps {
  onServiceSelect: (bookingName: string) => void;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  handleInquiry: (bookingName: string) => void;
  formulaLabel: string;
  btnInquireLabel: string;
  categoryLabel: string;
}

function ServiceCard({ service, index, handleInquiry, formulaLabel, btnInquireLabel, categoryLabel }: ServiceCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 25 }}
      transition={{ type: 'spring', damping: 25, stiffness: 80, delay: index * 0.08 }}
      whileHover={{ y: -12, rotate: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[36px] glass-panel border border-white/70 backdrop-blur-md premium-shadow transition-all duration-300 preserve-3d"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="relative aspect-[16/10.5] overflow-hidden bg-stone-50">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover scale-102 group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 left-4 glass-button text-[9px] uppercase font-bold tracking-widest text-[#B67C7C] px-3.5 py-1.5 rounded-full border border-white/60">
          {categoryLabel}
        </div>
        <div className="absolute top-4 right-4 glass-button text-[10px] font-bold tracking-wide text-[#2C2523] px-3.5 py-1.5 rounded-full border border-white/60 bg-white/80">
          {service.price}
        </div>
      </div>

      <div className="p-7 md:p-8 flex-grow flex flex-col justify-between preserve-3d" style={{ transform: 'translateZ(30px)' }}>
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#2C2523] group-hover:text-[#B67C7C] transition-colors duration-350">
            {service.name}
          </h3>

          <p className="text-xs text-stone-550 font-light leading-relaxed font-sans">
            {service.description}
          </p>

          <ul className="space-y-2 pt-2">
            {service.features.map((feat, f_idx) => (
              <li key={f_idx} className="flex items-start gap-2.5 text-xs text-stone-600 font-light font-sans">
                <Check className="w-4 h-4 text-[#D9A7A7] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-5 border-t border-[#D9A7A7]/20 space-y-4">
          <div className="text-[10px] uppercase font-black tracking-[0.08em] text-stone-400 flex items-center gap-1.5 font-sans">
            <Gem className="w-3.5 h-3.5 text-[#D9A7A7]" />
            <span>{formulaLabel}:</span>
            <span className="text-stone-600 font-semibold normal-case italic">
              {service.materials}
            </span>
          </div>

          <a
            href="#booking"
            onClick={() => handleInquiry(service.bookingName)}
            className="w-full py-4 rounded-full rose-gold-gradient text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-2xl hover:brightness-105 active:scale-98 cursor-pointer font-sans"
          >
            <span>{btnInquireLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function buildServicesList(lang: Language): Service[] {
  return SALON_SERVICES.map((s) => ({
    id: s.id,
    bookingName: s.bookingName,
    name: s[lang].name,
    category: s.category,
    price: s[lang].price,
    features: s[lang].features,
    materials: s[lang].materials,
    description: s[lang].description,
    image: s.image,
  }));
}

export default function Services({ onServiceSelect }: ServicesProps) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | ServiceCategory>('all');

  const servicesList = buildServicesList(lang);

  const filteredServices = activeTab === 'all'
    ? servicesList
    : servicesList.filter((s) => s.category === activeTab);

  const categoryLabels: Record<ServiceCategory, string> = {
    manicure: t.services.categoryManicure,
    pedicure: t.services.categoryPedicure,
    lamination: t.services.categoryLamination,
  };

  const handleInquiry = (bookingName: string) => {
    onServiceSelect(bookingName);

    // Force jump to booking first, then correct for sticky header with smooth offset.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const element = document.getElementById('booking');
        if (!element) {
          window.location.hash = 'booking';
          return;
        }

        window.location.hash = 'booking';
        const offset = 95;
        const targetTop = Math.max(element.getBoundingClientRect().top + window.scrollY - offset, 0);
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      });
    });
  };

  return (
    <section id="services" className="py-28 bg-transparent relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#D9A7A7]/15 to-transparent rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-[#E7C7A0]/10 to-transparent rounded-full blur-[95px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B67C7C] font-black block font-sans">
            {t.services.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2523] tracking-tight leading-tight">
            {t.services.titleNormal} <span className="italic font-light text-[#D9A7A7]">{t.services.titleItalic}</span>
          </h2>
          <p className="text-stone-500 font-light text-sm md:text-base leading-relaxed font-sans">
            {t.services.desc}
          </p>
          <div className="h-[1px] w-24 bg-[#D9A7A7]/50 mx-auto mt-6" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 mb-16">
          {[
            { id: 'all' as const, label: t.services.tabs.all },
            { id: 'manicure' as const, label: t.services.tabs.manicure },
            { id: 'pedicure' as const, label: t.services.tabs.pedicure },
            { id: 'lamination' as const, label: t.services.tabs.lamination },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 relative overflow-hidden cursor-pointer font-sans ${
                activeTab === tab.id
                  ? 'bg-[#2C2523] text-white shadow-xl'
                  : 'glass-button text-stone-600 hover:border-[#D9A7A7] hover:text-[#B67C7C]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                handleInquiry={handleInquiry}
                formulaLabel={t.services.formula}
                btnInquireLabel={t.services.btnInquire}
                categoryLabel={categoryLabels[service.category]}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
