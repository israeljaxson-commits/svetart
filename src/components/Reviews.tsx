/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, Quote, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface Review {
  id: string;
  name: string;
  rating: number;
  treatment: string;
  date: string;
  feedback: string;
  avatar: string;
}

const localReviewsT = {
  en: {
    tag: 'Veracious Reviews',
    titleNormal: 'Client Voices,',
    titleItalic: 'Endorsing Artistry.',
    subtitle: 'Read authentic stories from loyal clients who have transitioned to Svetlana’s high-precision treatment regimes.',
    googleAverage: 'Google Average',
    sterilityPledge: 'Sterility Pledge',
    clientsServed: 'Clients Served',
    certified: 'Certified',
    rev1: {
      treatment: 'Hygienic Manicure',
      feedback: 'My nails have never looked so clean and healthy. Svetlana is incredibly meticulous with cuticle care and shaping. The sterile environment gives me complete peace of mind every visit.',
      date: 'June 2026',
    },
    rev2: {
      treatment: 'Eyelash Lamination',
      feedback: 'The eyelash lamination is absolutely stunning. My natural lashes look lifted, dark, and long without any mascara. Svetlana is gentle, highly meticulous, and explains every step with warm details.',
      date: 'May 2026',
    },
    rev3: {
      treatment: 'Eyelash + Eyebrow Lamination',
      feedback: 'The only studio in Chisinau I fully trust for sterile treatment. Svetlana opens the medical autoclave pouch with certified indicators right in front of you. The combined lash and brow lamination is flawless.',
      date: 'April 2026',
    }
  },
  ro: {
    tag: 'Recenzii Veridice',
    titleNormal: 'Vocile Clientelor,',
    titleItalic: 'Garanția Calității.',
    subtitle: 'Citește povești autentice de la clientele noastre loiale care au ales tratamentele de înaltă precizie oferite de Svetlana.',
    googleAverage: 'Medie Google',
    sterilityPledge: 'Sterilitate 100%',
    clientsServed: 'Cliente Fericite',
    certified: 'Certificat',
    rev1: {
      treatment: 'Manichiură Igienică',
      feedback: 'Unghiile mele nu au arătat niciodată atât de curate și sănătoase. Svetlana este extrem de meticuloasă cu îngrijirea cuticulei. Mediul steril îmi oferă liniște deplină la fiecare vizită.',
      date: 'Iunie 2026',
    },
    rev2: {
      treatment: 'Laminare Gene',
      feedback: 'Laminarea genelor este absolut superbă. Genele mele naturale par ridicate, negre și lungi fără niciun strop de rimel. Svetlana este fină, meticuloasă și explică fiecare etapă cu drag.',
      date: 'Mai 2026',
    },
    rev3: {
      treatment: 'Laminare Gene + Sprâncene',
      feedback: 'Singurul salon din Chișinău pe care îl vizitez cu inima împăcată în privința sterilizării. Svetlana deschide punga de la autoclav chiar în fața ochilor tăi. Laminarea combinată gene și sprâncene este impecabilă.',
      date: 'Aprilie 2026',
    }
  },
  ru: {
    tag: 'Реальные отзывы',
    titleNormal: 'Что говорят клиенты,',
    titleItalic: 'подтверждая класс.',
    subtitle: 'Читайте искренние отзывы постоянных клиентов, которые доверяют заботу о себе Светлане.',
    googleAverage: 'Среднее в Google',
    sterilityPledge: 'Стандарт Стерильности',
    clientsServed: 'Довольных клиентов',
    certified: 'Сертифицировано',
    rev1: {
      treatment: 'Гигиенический маникюр',
      feedback: 'Мои ногти ещё никогда не выглядели настолько чистыми и здоровыми. Светлана невероятно внимательна к обработке кутикулы. Стерильная обстановка даёт полное спокойствие при каждом визите.',
      date: 'Июнь 2026',
    },
    rev2: {
      treatment: 'Ламинирование ресниц',
      feedback: 'Ламинирование ресниц — потрясающий результат. Мои натуральные ресницы выглядят приподнятыми, густыми и длинными без всякой туши. Светлана очень нежный и внимательный мастер.',
      date: 'Май 2026',
    },
    rev3: {
      treatment: 'Ламинирование ресниц + бровей',
      feedback: 'Единственный салон в Кишиневе, где я полностью спокойна за стерилизацию. Светлана вскрывает крафт-пакет из автоклава прямо при мне. Комбинированное ламинирование безупречно.',
      date: 'Апрель 2026',
    }
  }
};

export default function Reviews() {
  const { lang, t } = useLanguage();
  const st = localReviewsT[lang] || localReviewsT.en;

  const reviewsList: Review[] = [
    {
      id: 'rev-1',
      name: 'Ana-Maria Rusu',
      rating: 5,
      treatment: st.rev1.treatment,
      date: st.rev1.date,
      feedback: st.rev1.feedback,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120',
    },
    {
      id: 'rev-2',
      name: 'Cristina Vasilache',
      rating: 5,
      treatment: st.rev2.treatment,
      date: st.rev2.date,
      feedback: st.rev2.feedback,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
    },
    {
      id: 'rev-3',
      name: 'Elena Morari',
      rating: 5,
      treatment: st.rev3.treatment,
      date: st.rev3.date,
      feedback: st.rev3.feedback,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120&h=120',
    },
  ];

  return (
    <section id="reviews" className="py-28 bg-[#F2E4DF] relative overflow-hidden">
      
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-gradient-to-l from-[#D9A7A7]/10 to-transparent rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-[300px] h-[300px] bg-gradient-to-r from-[#E7C7A0]/10 to-transparent rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B67C7C] font-black block font-sans">
            {st.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2523] tracking-tight leading-tight">
            {st.titleNormal} <span className="italic font-light text-[#D9A7A7]">{st.titleItalic}</span>
          </h2>
          <p className="text-stone-500 font-light text-sm md:text-base leading-relaxed font-sans">
            {st.subtitle}
          </p>
          <div className="h-[1px] w-24 bg-[#D9A7A7]/50 mx-auto mt-6" />
        </div>

        {/* Global Score Metric overview */}
        <div className="max-w-md mx-auto grid grid-cols-3 gap-4 items-center justify-center rounded-[28px] bg-white/45 border border-[#D9A7A7]/20 p-6 shadow-md mb-20 text-center font-sans">
          <div className="space-y-0.5">
            <span className="block text-4xl font-serif font-bold text-[#B67C7C]">4.93</span>
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-black block">{st.googleAverage}</span>
          </div>
          <div className="border-x border-[#D9A7A7]/20 space-y-0.5 py-2">
            <span className="block text-4xl font-serif font-bold text-[#B67C7C]">100%</span>
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-black block">{st.sterilityPledge}</span>
          </div>
          <div className="space-y-0.5">
            <span className="block text-4xl font-serif font-bold text-[#B67C7C]">450+</span>
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-black block">{st.clientsServed}</span>
          </div>
        </div>

        {/* Reviews Horizontal Cards list with spring reveals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {reviewsList.map((review, r_idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', damping: 24, stiffness: 80, delay: r_idx * 0.1 }}
              key={review.id}
              className="relative rounded-[36px] glass-panel border border-white/70 backdrop-blur-md p-8 md:p-10 hover:premium-shadow transition-all duration-350 flex flex-col justify-between"
            >
              
              {/* Background watermark quote mark */}
              <div className="absolute top-6 right-8 text-[#D9A7A7]/15 pointer-events-none">
                <Quote className="w-14 h-14" />
              </div>

              <div className="space-y-6">
                {/* 5-star metric block */}
                <div className="flex items-center gap-1 font-sans">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E7C7A0] text-[#E7C7A0]" />
                  ))}
                  <div className="flex items-center gap-1 text-[9px] uppercase font-bold tracking-widest text-[#B67C7C] pl-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B67C7C]" /> {st.certified}
                  </div>
                </div>

                {/* Actual Message */}
                <p className="text-stone-600 font-light text-xs md:text-sm leading-relaxed italic relative font-sans">
                  "{review.feedback}"
                </p>
              </div>

              {/* Verified Author Footer */}
              <div className="mt-8 pt-6 border-t border-[#D9A7A7]/20 flex items-center justify-between font-sans">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-[#D9A7A7]/30 shrink-0">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover scale-102 hover:scale-108 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#2C2523] leading-tight">
                      {review.name}
                    </h4>
                    <span className="text-[10px] text-[#B67C7C] font-semibold block mt-0.5">
                      {review.treatment}
                    </span>
                  </div>
                </div>

                <div className="text-[9px] uppercase tracking-widest text-stone-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#B67C7C]" />
                  {review.date}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
