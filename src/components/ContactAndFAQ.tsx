/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronDown, Clock, MapPin, Instagram, Sparkles, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, getLocalizedFaqs } from '../context/LanguageContext';
import { getServiceByBookingName } from '../data/services';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface ContactAndFAQProps {
  selectedServiceName?: string;
  onClearPreselection?: () => void;
}

export default function ContactAndFAQ({ selectedServiceName = '', onClearPreselection }: ContactAndFAQProps) {
  const { lang, t } = useLanguage();
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const faqs: FaqItem[] = getLocalizedFaqs(lang);
  const preselected = selectedServiceName ? getServiceByBookingName(selectedServiceName) : undefined;
  const preselectedLabel = preselected ? preselected[lang].name : selectedServiceName;

  // WhatsApp redirect removed

  const handleInstagramRedirect = () => {
    window.open(`https://www.instagram.com/svetart.beauty?igsh=MmhidHgzbHh2dXRy`, '_blank');
  };

  const infoNotice = {
    en: "💅 Click any service above to preselect, or send a general luxury booking request immediately below.",
    ro: "💅 Apasă pe orice serviciu de mai sus pentru a-l preselecta, sau trimite o solicitare de rezervare generală mai jos.",
    ru: "💅 Нажмите на любую услугу выше для выбора, или отправьте общий запрос на бронирование ниже."
  };

  const instagramText = {
    en: "Message on Instagram Only",
    ro: "Trimite mesaj privat pe Instagram",
    ru: "Написать в Instagram"
  };

  const privateSlotsNotice = {
    en: "ℹ️ Private VIP slots can also be coordinated directly via social direct messages.",
    ro: "ℹ️ Sloturile private VIP pot fi coordonate direct și prin mesaje private pe rețelele sociale.",
    ru: "ℹ️ Индивидуальное время VIP-записи также можно согласовать в личных сообщениях в соцсетях."
  };

  return (
    <section id="faq" className="py-28 bg-[#F2E4DF] relative overflow-hidden">
      
      {/* Dynamic Glow Accents */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-[#D9A7A7]/10 to-transparent rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-[#E7C7A0]/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT PANEL: FAQs & PREMIUM SEASONAL PROMO */}
          <div className="lg:col-span-6 space-y-12">
            
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#B67C7C] font-black block font-sans">
                {t.faq.tag}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2523] tracking-tight leading-tight">
                {t.faq.titleNormal} <br />
                <span className="italic font-light text-[#D9A7A7]">{t.faq.titleItalic}</span>
              </h2>
              <div className="h-[1px] w-20 bg-[#D9A7A7]/50 mt-4" />
            </div>

            {/* Accordion List with custom springs */}
            <div className="space-y-4">
              {faqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border-b border-[#D9A7A7]/20 pb-4 transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full py-3.5 flex items-center justify-between text-left font-serif group focus:outline-none cursor-pointer"
                    >
                      <span className="text-base md:text-lg font-bold text-[#2C2523] group-hover:text-[#B67C7C] transition-colors duration-250">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#B67C7C] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs md:text-sm text-stone-550 font-light leading-relaxed pt-2 pb-4 font-sans leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Premium Seasonal Promotional Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-[32px] glass-panel border border-[#D9A7A7]/15 flex flex-col sm:flex-row items-center sm:items-start gap-4 select-none relative font-sans"
            >
              <div className="p-3.5 bg-[#F2E4DF] hover:bg-white rounded-2xl text-[#B67C7C] shadow-sm shrink-0 border border-white/60">
                <Gift className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-[10px] uppercase tracking-widest font-black text-[#B67C7C] block">{t.faq.promoTag}</span>
                <h4 className="font-serif text-lg font-bold text-[#2C2523]">{t.faq.promoTitle}</h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  {t.faq.promoDesc}
                </p>
              </div>
            </motion.div>

          </div>

          {/* RIGHT PANEL: CONCIERGE BOOKING & EMBEDDED MAP */}
          <div id="contact" className="lg:col-span-6 space-y-8">
            
            {/* Exclusive Social Concierge Card */}
            <div className="bg-[#2C2523] text-[#FAF6F4] rounded-[36px] p-8 md:p-10 shadow-2xl relative border border-white/10 overflow-hidden">
              <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 text-[#E7C7A0] rounded-full border border-white/10">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold tracking-wide text-white">{t.faq.contactTitle}</h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#D9A7A7] font-black">{t.faq.contactSub}</p>
                  </div>
                </div>

                {/* Preselection notice */}
                {selectedServiceName ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-white/5 rounded-2xl border border-[#D9A7A7]/30 flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#D9A7A7] block font-bold mb-0.5">{t.faq.preselectedService}</span>
                      <p className="font-serif text-sm text-white font-semibold italic">"{preselectedLabel}"</p>
                    </div>
                    {onClearPreselection && (
                      <button
                        onClick={onClearPreselection}
                        className="text-[10px] text-stone-400 hover:text-white underline font-bold shrink-0 cursor-pointer"
                      >
                        {t.faq.clearSelection}
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10 text-xs text-stone-300 font-light select-none leading-relaxed">
                    {infoNotice[lang] || infoNotice.en}
                  </div>
                )}

                {/* Direct interaction buttons */}
                <div className="space-y-4">
                  
                  {/* Social Action: Instagram only (WhatsApp removed) */}
                  <button
                    onClick={handleInstagramRedirect}
                    className="w-full py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-colors duration-300 cursor-pointer"
                  >
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span>{instagramText[lang] || instagramText.en}</span>
                  </button>

                </div>

                <p className="text-[10px] text-center text-stone-400 font-light select-none italic pt-2 font-sans">
                  {privateSlotsNotice[lang] || privateSlotsNotice.en}
                </p>

                {/* Studio Information Details */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 text-xs">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#D9A7A7]">
                      <MapPin className="w-4 h-4 text-[#D9A7A7]" />
                      <span className="font-black uppercase tracking-wider text-[9px]">{t.faq.location}</span>
                    </div>
                    <p className="text-white font-light text-xs leading-relaxed font-sans">
                      {t.faq.address} <br />
                      Chisinau, MD-2001
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#D9A7A7]">
                      <Clock className="w-4 h-4 text-[#D9A7A7]" />
                      <span className="font-black uppercase tracking-wider text-[9px]">{t.faq.hours}</span>
                    </div>
                    <p className="text-white font-light text-xs leading-relaxed font-sans">
                      {t.faq.hoursValue} <br />
                      Sunday: By VIP Request
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Embedded maps IFrame */}
            <div className="rounded-[36px] overflow-hidden shadow-lg border-2 border-white aspect-[16/10] w-full bg-stone-100">
               <iframe
                title="SVERTART BEAUTY Chisinau Locator"
                src="https://maps.google.com/maps?q=Strada%20Alexandru%20Anestiade%203,%20Chisinau,%20Moldova&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
