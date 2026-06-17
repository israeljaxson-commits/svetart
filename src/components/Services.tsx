/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, MouseEvent } from 'react';
import { Check, Sparkles, Gem, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface Service {
  id: string;
  name: string;
  category: 'nails' | 'lashes-brows' | 'signature';
  price: string;
  duration: string;
  features: string[];
  materials: string;
  description: string;
  image: string;
}

interface ServicesProps {
  onServiceSelect: (serviceId: string) => void;
}

const localServicesT = {
  en: {
    gelMani: {
      name: 'Structured Gel Manicure',
      materials: 'Japanese Bio-Gel & Luxury Pigments',
      description: 'Russian hardware prep combined with custom organic gel base overlay. Strengthens nail bed, yields flawless light reflections, and endures up to 5 weeks.',
      features: ['Deep cuticle alignment', 'Precision shape refinement', 'Double fiber-reinforced base', 'Cuticle oil infusion'],
    },
    frenchOverlay: {
      name: 'French Nail Architecture',
      materials: 'Hypoallergenic Self-leveling Gels',
      description: 'Hand-painted smile lines designed to match your fingers visual proportions in an elegant off-white or natural pastel shade.',
      features: ['Calibrated smile lines', 'Ultra-gloss stain-resistant top coat', 'High edge protection', 'Hydrating paraffin massage'],
    },
    lashLift: {
      name: 'Italian Lash Lamination & Lift',
      materials: 'InLei® Lash Filler (Made in Italy)',
      description: 'Strengthens, elevates, and thickens lashes. Infuses natural keratin and peptides for a persistent curl and 24% increase in hair diameter.',
      features: ['Precision safety lash mapping', 'Deep onyx black dye tinting', 'Peptide structure injection', 'Vitamin Lash Serum treatment'],
    },
    browArch: {
      name: 'Bespoke Brow Architecture',
      materials: 'Premium BrowXenna® Organic Pigments',
      description: 'Golden ratio brow shaping suited to your skeletal structure. Includes wax/tweezer mapping, premium long-lasting tinting, and laminating hydration.',
      features: ['Architectural thread mapping', 'Custom-blended tint coordinates', 'Organic botanical protection', 'Delicate grooming setup'],
    },
    luxuryCombo: {
      name: 'SvetArt Signature Look',
      materials: 'Elite European formulas',
      description: 'The ultimate luxury styling combo. Indulge in a full Structured Gel Manicure plus a custom Italian Lash Lamination and Brow Mapping carried out in a unified elite experience.',
      features: ['All signature treatments', 'Save €25 overall as a curated ritual', 'Moisturizing hand mask ritual', 'Complementary organic prosecco'],
    }
  },
  ro: {
    gelMani: {
      name: 'Manichiură Structurată cu Gel',
      materials: 'Bio-Gel Japonez & Pigmenți de Lux',
      description: 'Curățare rusească cu freză combinată cu o bază organică de gel. Întărește patul unghial, oferă reflexii ideale de lumină și rezistă până la 5 săptămâni.',
      features: ['Alinierea profundă a cuticulei', 'Rafinarea de precizie a formei', 'Bază dublu consolidată cu fibre', 'Infuzie de ulei de cuticule'],
    },
    frenchOverlay: {
      name: 'Arhitectură Unghii French',
      materials: 'Geluri Hipoalergenice Autonivelante',
      description: 'Linii de zâmbet pictate manual pentru a se potrivi proporțiilor vizuale ale degetelor, în nuanțe elegante de alb sau pastel natural.',
      features: ['Linii de zâmbet calibrate individual', 'Top coat rezistent la pete ultra-gloss', 'Protecție ridicată a marginilor', 'Masaj hidratant cu parafină'],
    },
    lashLift: {
      name: 'Laminare Gene Italiană (InLei®)',
      materials: 'InLei® Lash Filler (Fabricat în Italia)',
      description: 'Întărește, ridică și îngroașă genele. Infuzează keratină naturală și peptide pentru o curbură persistentă și creșterea cu 24% a diametrului firului de păr.',
      features: ['Cartografierea precisă a genelor', 'Vopsire profundă cu negru onix', 'Injecție cu structură de peptide', 'Tratament cu ser de vitamine pentru gene'],
    },
    browArch: {
      name: 'Arhitectură Sprâncene Personalizată',
      materials: 'Pigmenți Organici Premium BrowXenna®',
      description: 'Modelarea sprâncenelor conform secțiunii de aur, potrivită structurii feței tale. Include mapare cu fir, pensat/ceară, vopsire rezistentă și hidratare.',
      features: ['Mapare arhitecturală cu fir', 'Coordonate de nuanțe amestecate manual', 'Protecție botanică organică', 'Aranjare delicată a formei'],
    },
    luxuryCombo: {
      name: 'Look-ul Semnătură SvetArt',
      materials: 'Formule Europene de Elită',
      description: 'Combinația supremă de styling de lux. Răsfață-te cu o manichiură completă structurată cu gel, laminare premium de gene și sprâncene într-o singură vizită exclusivă.',
      features: ['Toate tratamentele semnătură incluse', 'Economisește €25 la pachetul combo', 'Mască hidratantă caldă pentru mâini', 'Pahar de prosecco organic inclus'],
    }
  },
  ru: {
    gelMani: {
      name: 'Структурированный гелевый маникюр',
      materials: 'Японский биогель и люкс-пигменты',
      description: 'Аппаратный маникюр в сочетании с выравниванием органической гелевой базой. Укрепляет ногтевую пластину, формирует идеальные блики и держится до 5 недель.',
      features: ['Глубокая обработка кутикулы', 'Выравнивание и точная форма', 'Двойное армирование микроволокнами', 'Питательный уход с маслом'],
    },
    frenchOverlay: {
      name: 'Архитектура френч-маникюра',
      materials: 'Гипоаллергенные самовыравнивающиеся гели',
      description: 'Прорисованная вручную линия улыбки, идеально подобранная под визуальные пропорции ваших пальцев в элегантных пастельных или натуральных тонах.',
      features: ['Калиброванная линия улыбки', 'Ультраглянцевое стойкое покрытие', 'Высокая защита торцов у ногтя', 'Увлажняющий парафиновый массаж'],
    },
    lashLift: {
      name: 'Итальянское ламинирование и лифтинг ресниц',
      materials: 'InLei® Lash Filler (Произведено в Италии)',
      description: 'Укрепляет, приподнимает и утолщает ресницы. Насыщает натуральным кератином и пептидами для стойкого изгиба и увеличения диаметра волосков на 24%.',
      features: ['Точная выкладка ресниц', 'Глубокое окрашивание в иссиня-черный', 'Пептидное укрепление структуры', 'Уход с витаминной сывороткой'],
    },
    browArch: {
      name: 'Архитектурное оформление бровей',
      materials: 'Премиальные органические пигменты BrowXenna®',
      description: 'Моделирование формы бровей по золотому сечению с учетом структуры вашего лица. Включает коррекцию нитью/пинцетом, стойкое окрашивание и увлажнение.',
      features: ['Разметка архитектурной нитью', 'Индивидуальный подбор оттенка', 'Органический уход и защита', 'Деликатное финишное оформление'],
    },
    luxuryCombo: {
      name: 'Фирменный образ SvetArt Signature',
      materials: 'Премиальные европейские составы',
      description: 'Идеальный комплексный люкс-уход за один визит. Элитный структурированный гелевый маникюр, итальянское ламинирование ресниц и моделирование бровей.',
      features: ['Все фирменные процедуры в комплексе', 'Экономия 25€ на полном ритуале', 'Увлажняющая спа-маска для рук', 'Бокал изысканного просекко в подарок'],
    }
  }
};

interface ServiceCardProps {
  key?: string;
  service: Service;
  index: number;
  handleInquiry: (name: string) => void;
  formulaLabel: string;
  btnInquireLabel: string;
  categoryLabel: string;
}

function ServiceCard({ service, index, handleInquiry, formulaLabel, btnInquireLabel, categoryLabel }: ServiceCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: y * -10 }); // Subtle 10-degree max tilt
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
      {/* Photo Segment with Hover Zoom effect */}
      <div className="relative aspect-[16/10.5] overflow-hidden bg-stone-50">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover scale-102 group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 glass-button text-[9px] uppercase font-bold tracking-widest text-[#B67C7C] px-3.5 py-1.5 rounded-full border border-white/60">
          {categoryLabel}
        </div>
      </div>

      {/* Main info wrapper */}
      <div className="p-7 md:p-8 flex-grow flex flex-col justify-between preserve-3d" style={{ transform: 'translateZ(30px)' }}>
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#2C2523] group-hover:text-[#B67C7C] transition-colors duration-350">
            {service.name}
          </h3>

          <p className="text-xs text-stone-550 font-light leading-relaxed font-sans">
            {service.description}
          </p>

          {/* Premium features checked lists */}
          <ul className="space-y-2 pt-2">
            {service.features.map((feat, f_idx) => (
              <li key={f_idx} className="flex items-start gap-2.5 text-xs text-stone-600 font-light font-sans">
                <Check className="w-4 h-4 text-[#D9A7A7] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Materials Formulation & Call-to-action button */}
        <div className="mt-8 pt-5 border-t border-[#D9A7A7]/20 space-y-4">
          <div className="text-[10px] uppercase font-black tracking-[0.08em] text-stone-400 flex items-center gap-1.5 font-sans">
            <Gem className="w-3.5 h-3.5 text-[#D9A7A7]" />
            <span>{formulaLabel}:</span>
            <span className="text-stone-600 font-semibold normal-case italic">
              {service.materials}
            </span>
          </div>

          <button
            onClick={() => handleInquiry(service.id)}
            className="w-full py-4 rounded-full rose-gold-gradient text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-2xl hover:brightness-105 active:scale-98 cursor-pointer font-sans"
          >
            <span>{btnInquireLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services({ onServiceSelect }: ServicesProps) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'nails' | 'lashes-brows' | 'signature'>('all');

  const st = localServicesT[lang] || localServicesT.en;

  const servicesList: Service[] = [
    {
      id: 'gel-mani',
      name: st.gelMani.name,
      category: 'nails',
      price: '€40',
      duration: '90m',
      materials: st.gelMani.materials,
      description: st.gelMani.description,
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600',
      features: st.gelMani.features,
    },
    {
      id: 'french-overlay',
      name: st.frenchOverlay.name,
      category: 'nails',
      price: '€45',
      duration: '105m',
      materials: st.frenchOverlay.materials,
      description: st.frenchOverlay.description,
      image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600',
      features: st.frenchOverlay.features,
    },
    {
      id: 'lash-lift',
      name: st.lashLift.name,
      category: 'lashes-brows',
      price: '€35',
      duration: '65m',
      materials: st.lashLift.materials,
      description: st.lashLift.description,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600',
      features: st.lashLift.features,
    },
    {
      id: 'brow-arch',
      name: st.browArch.name,
      category: 'lashes-brows',
      price: '€25',
      duration: '45m',
      materials: st.browArch.materials,
      description: st.browArch.description,
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600',
      features: st.browArch.features,
    },
    {
      id: 'luxury-combo',
      name: st.luxuryCombo.name,
      category: 'signature',
      price: '€65',
      duration: '140m',
      materials: st.luxuryCombo.materials,
      description: st.luxuryCombo.description,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600',
      features: st.luxuryCombo.features,
    },
  ];

  const filteredServices = activeTab === 'all'
    ? servicesList
    : servicesList.filter(s => s.category === activeTab);

  const handleInquiry = (serviceId: string) => {
    onServiceSelect(serviceId);

    // Smooth scroll to booking section
    setTimeout(() => {
      const element = document.querySelector('#booking');
      if (element) {
        const offset = 95;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 120);
  };

  return (
    <section id="services" className="py-28 bg-transparent relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#D9A7A7]/15 to-transparent rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-[#E7C7A0]/10 to-transparent rounded-full blur-[95px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Title Block */}
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

        {/* Categories Tab Selectors with micro-spring effects */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-16">
          {[
            { id: 'all', label: t.services.tabs.all },
            { id: 'nails', label: t.services.tabs.nails },
            { id: 'lashes-brows', label: t.services.tabs.lashesBrows },
            { id: 'signature', label: t.services.tabs.signature }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const categoryBadgeStr = service.category === 'nails' 
                ? t.services.categoryNails 
                : service.category === 'signature' 
                  ? t.services.categorySignature 
                  : t.services.categoryLasbBrows;

              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  handleInquiry={handleInquiry}
                  formulaLabel={t.services.formula}
                  btnInquireLabel={t.services.btnInquire}
                  categoryLabel={categoryBadgeStr}
                />
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
