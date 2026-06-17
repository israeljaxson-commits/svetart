/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Instagram, Heart, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';


const localFooterT = {
  en: {
    badge1: 'Autoclave Cleaned',
    badge2: 'Disposable Files Only',
    badge3: 'Dermatologically Safe',
    description: 'An intimate boutique beauty brand experience located in the historical heart of Chisinau. Devoted to high-integrity nails, custom brow shapes, and persistent eyelash health.',
    philosophyTitle: 'Treatment Philosophy',
    phil1: 'Structured Overlays',
    phil2: 'Italian Lash Lifts',
    phil3: 'Organic Keratin Infusions',
    phil4: 'Bespoke Shading Mapping',
    phil5: 'Sterile Class B hygiene',
    phil6: 'Personalized VIP scheduling',
    channelsTitle: 'Private Channels',
    address: 'Anestiade 3, Chisinau, Moldova',
    priorityNote: 'For customized VIP slots, direct messages are prioritized.',
    rights: 'All legal rights protected.',
    formulatedBy: 'Formulated by'
  },
  ro: {
    badge1: 'Sterilizat la Autoclav Clasa B',
    badge2: 'Doar Pile de Unică Folosință',
    badge3: 'Sigur Dermatologic',
    description: 'Un salon intim de înfrumusețare situat în inima istorică a Chișinăului. Dedicat unghiilor sănătoase, modelării sprâncenelor și laminării de gene.',
    philosophyTitle: 'Filozofia Serviciilor',
    phil1: 'Apex și Gel Structurat',
    phil2: 'Laminare Gene Italiană',
    phil3: 'Infuzii Organice cu Keratină',
    phil4: 'Arhitectură și Pensat de Precizie',
    phil5: 'Igienă și Sterilitate Medicală',
    phil6: 'Programări Solicitări VIP',
    channelsTitle: 'Canale Private',
    address: 'Str. Alexandru Anestiade 3, Chișinău, Moldova',
    priorityNote: 'Pentru programări VIP personalizate, mesajele directe au prioritate.',
    rights: 'Toate drepturile legale rezervate.',
    formulatedBy: 'Creat de'
  },
  ru: {
    badge1: 'Стерилизовано в автоклаве',
    badge2: 'Одноразовые пилочки',
    badge3: 'Дерматологически безопасно',
    description: 'Уютный салон красоты в самом центре Кишинева. Посвящен здоровью ногтей, индивидуальному оформлению бровей и уходу за ресницами.',
    philosophyTitle: 'Наша философия ухода',
    phil1: 'Структурированные гелевые ногти',
    phil2: 'Итальянское ламинирование ресниц',
    phil3: 'Органические кератиновые уходы',
    phil4: 'Индивидуальная архитектура бровей',
    phil5: 'Медицинская кушетка и гигиена класса B',
    phil6: 'Гибкие визиты высокого класса',
    channelsTitle: 'Закрытые каналы связи',
    address: 'ул. Александру Анестиаде 3, Кишинев, Молдова',
    priorityNote: 'Для индивидуальных записей приоритет имеют личные сообщения.',
    rights: 'Все права защищены.',
    formulatedBy: 'Разработано'
  }
};

export default function Footer() {
  const { lang, t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const st = localFooterT[lang] || localFooterT.en;

  const safetyBadges = [
    { text: st.badge1 },
    { text: st.badge2 },
    { text: st.badge3 }
  ];

  return (
    <footer className="bg-[#2C2523] text-stone-400 py-20 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Logo & Brand statement */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex flex-col">
              <span className="text-2xl font-sans font-black tracking-[0.12em] text-white uppercase">
                SVERTART BEAUTY
              </span>
            </div>
            
            <p className="text-xs text-stone-300 font-light leading-relaxed max-w-sm">
              {st.description}
            </p>

            {/* Health Safety indicators */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {safetyBadges.map((badge, b_idx) => (
                <span
                  key={b_idx}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest font-black text-[#D9A7A7] flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 shrink-0 text-[#D9A7A7]" />
                  {badge.text}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links & Treatments lists */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white text-xs uppercase tracking-widest font-black">
              {st.philosophyTitle}
            </h4>
            <div className="h-[1px] w-8 bg-[#D9A7A7]" />
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-light text-stone-300">
              <li className="hover:text-white transition-colors cursor-default">{st.phil1}</li>
              <li className="hover:text-white transition-colors cursor-default">{st.phil2}</li>
              <li className="hover:text-white transition-colors cursor-default">{st.phil3}</li>
              <li className="hover:text-white transition-colors cursor-default">{st.phil4}</li>
              <li className="hover:text-white transition-colors cursor-default">{st.phil5}</li>
              <li className="hover:text-white transition-colors cursor-default">{st.phil6}</li>
            </ul>
          </div>

          {/* Direct channels & Credits */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-xs uppercase tracking-widest font-black">
              {st.channelsTitle}
            </h4>
            <div className="h-[1px] w-8 bg-[#D9A7A7]" />

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/svetart.beauty?igsh=MmhidHgzbHh2dXRy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:border-[#D9A7A7] text-stone-300 hover:text-[#D9A7A7] flex items-center justify-center transition-all duration-300"
                title="Direct Messages"
              >
                <Instagram className="w-4 h-4" />
              </a>
              {/* WhatsApp removed — use Instagram direct messages above */}
            </div>

            <div className="text-xs text-stone-400 font-light pt-2">
              <p>{st.address}</p>
              <p className="mt-1.5">{st.priorityNote}</p>
            </div>
          </div>

        </div>

        {/* Lower row */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-stone-500 font-sans">
          <p>© {currentYear} SVERTART BEAUTY. {st.rights}</p>
          <p className="flex items-center gap-1.5 font-light normal-case">
            {st.formulatedBy} <span className="hover:text-white font-serif text-xs italic font-semibold text-[#D9A7A7] transition-all">Svetlana Motoc</span> with <Heart className="w-3.5 h-3.5 fill-rose-500/80 text-rose-500/80 inline" /> in Chisinau.
          </p>
        </div>

      </div>
    </footer>
  );
}
