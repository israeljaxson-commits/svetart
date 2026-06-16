/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronDown, Clock, MapPin, MessageSquare, Instagram, Sparkles, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface ContactAndFAQProps {
  selectedServiceName?: string;
  onClearPreselection?: () => void;
}

const localFaqs = {
  en: [
    {
      id: 'faq-1',
      question: 'What is a "Structured Gel Manicure" and how does it differ from standard gel polish?',
      answer: "Standard gel polish is painted flat. In a Structured Gel Manicure, Sveta models a dynamic anatomical arch (the apex) using self-leveling fiber builder gels. This distributes mechanical stress, strengthens natural nail beds, prevents cracking, and results in a beautiful linear light reflection. It routinely persists without chips for up to 5 weeks.",
    },
    {
      id: 'faq-2',
      question: 'How long does Italian Lash Lamination last?',
      answer: "Lash lamination lifts and tinting results persist for 6 to 8 weeks, following your natural lash shedding cycle. Formulated with InLei® Lash Filler, the treatment clinically thickens natural hair diameters up to 24% across three consecutive sessions. No mascara is needed, and it is fully waterproof within 24 hours.",
    },
    {
      id: 'faq-3',
      question: 'Are your cosmetic lamination substances safe?',
      answer: "Absolutely. SvetArt uses elite Italian formulations (InLei®) and premium Russian pigments (BrowXenna®) that are dermatologically evaluated, hypoallergenic, non-toxic, and enriched with organic keratin, peptides, and natural castor oils to encourage real-time lash/brow growth.",
    },
    {
      id: 'faq-4',
      question: 'Can I reschedule an existing social booking?',
      answer: "Yes, you can reschedule. Because SvetArt operates on an exclusive, low-density private booking calendar, we kindly request at least 24 hours advance notice via WhatsApp or Instagram to allow clients on the waiting list to fill your slot.",
    },
  ],
  ro: [
    {
      id: 'faq-1',
      question: 'Ce este o „Manichiură Structurată cu Gel” și cum diferă de oja semipermanentă standard?',
      answer: 'Oja semipermanentă standard se aplică plat. Între o Manichiură Structurată, Sveta modelează o curbă anatomică dinamică (apexul) folosind geluri de construcție autonivelante. Acest lucru distribuie tensiunea mecanică, protejează și întărește patul unghial, prevenind crăparea și obținând un blic ideal de lumină. Rezistă fără nicio ciobire până la 5 săptămâni.',
    },
    {
      id: 'faq-2',
      question: 'Cât timp durează Laminarea de Gene Italiană?',
      answer: 'Rezultatele de ridicare și nuanțare persistă între 6 și 8 săptămâni, în funcție de ciclul natural de creștere al genelor tale. Formulat cu InLei® Lash Filler, tratamentul îngroașă firele naturale cu până la 24% în trei ședințe consecutive. Nu este nevoie de rimel și devine complet rezistent la apă după 24 de ore.',
    },
    {
      id: 'faq-3',
      question: 'Sunt sigure substanțele cosmetice utilizate la laminare?',
      answer: 'Absolut. SvetArt folosește exclusiv formule italiene de elită (InLei®) și pigmenți premium rusești (BrowXenna®) care sunt evaluați dermatologic, hipoalergenici, non-toxici și îmbogățiți cu keratină organică, peptide și ulei natural de ricin pentru a stimula creșterea.',
    },
    {
      id: 'faq-4',
      question: 'Pot reprograma o programare socială existentă?',
      answer: 'Da, poți reprograma. Deoarece SvetArt funcționează pe baza unui calendar privat exclusiv, cu densitate scăzută, te rugăm să transmiți o notificare cu cel puțin 24 de ore înainte pe WhatsApp sau Instagram pentru a permite clienților din lista de așteptare să ocupe slotul.',
    },
  ],
  ru: [
    {
      id: 'faq-1',
      question: 'Что такое «структурированный гелевый маникюр» и чем он отличается от обычного гель-лака?',
      answer: 'При обычном покрытии гель-лак наносится ровным слоем под ногти. В структурированном гелевом маникюре мастер выстраивает анатомически правильную архитектуру и апекс с помощью самовыравнивающихся укрепляющих гелей. Это распределяет нагрузку на ноготь, укрепляет его, предотвращает трещины и отслойки, а также создает идеальный линейный блик. Покрытие держится абсолютно без сколов до 5 недель.',
    },
    {
      id: 'faq-2',
      question: 'Как долго держится итальянское ламинирование ресниц?',
      answer: 'Эффект лифтинга и окрашивания сохраняется от 6 до 8 недель, в зависимости от естественного цикла обновления ваших ресниц. Благодаря профессиональному составу InLei® Lash Filler ресницы утолщаются на 24% после трех последовательных процедур. Использование туши больше не потребуется, а умываться можно уже через 24 часа.',
    },
    {
      id: 'faq-3',
      question: 'Безопасны ли косметические составы для ламинирования?',
      answer: 'Абсолютно. SvetArt работает исключительно с элитными итальянскими составами (InLei®) и российскими пигментами премиум-класса (BrowXenna®). Все средства прошли клинические испытания, гипоаллергенны, не токсичны и обогащены органическим кератином, пептидами икасторовым маслом для стимуляции роста собственных волосков.',
    },
    {
      id: 'faq-4',
      question: 'Можно ли перенести подтвержденную запись?',
      answer: 'Да, конечно. Поскольку салон SvetArt работает по индивидуальному календарю высокой точности с комфортной плотностью записей, мы убедительно просим предупреждать о переносе минимум за 24 часа через WhatsApp или Instagram, чтобы мы могли предложить освободившееся время другим клиентам.',
    },
  ]
};

export default function ContactAndFAQ({ selectedServiceName = '', onClearPreselection }: ContactAndFAQProps) {
  const { lang, t } = useLanguage();
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const businessPhone = '37379166006'; // format: MD code

  const faqs: FaqItem[] = localFaqs[lang] || localFaqs.en;

  const handleWhatsappRedirect = () => {
    const defaultText = selectedServiceName
      ? `${t.faq.formPlaceholder || "Buna, Sveta! I am interested in booking structured manicure:"} "${selectedServiceName}"`
      : (t.faq.formPlaceholder || "Buna, Sveta! I would love to check slot availability for manicures...");
    window.open(`https://wa.me/${businessPhone}?text=${encodeURIComponent(defaultText)}`, '_blank');
  };

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
                      <p className="font-serif text-sm text-white font-semibold italic">"{selectedServiceName}"</p>
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
                  
                  {/* WhatsApp Big Action */}
                  <button
                    onClick={handleWhatsappRedirect}
                    className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-colors duration-300 shadow-md hover:shadow-xl cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-white/10 text-white" />
                    <span>{t.faq.formBtn}</span>
                  </button>

                  {/* Instagram Big Action */}
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
