/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { Heart, MessageCircle, Instagram, Sparkles, ZoomIn, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface InstagramPost {
  id: string;
  image: string;
  likes?: number;
  comments?: number;
  caption: string;
  tags: string[];
  treatment: string;
  gridClass: string; // Specific column-span/row-span layout coords
  heightClass: string;
}

const localLookbookT = {
  en: {
    comparisonTitle: "Eyelash Lamination Comparison",
    comparisonSub: "Drag the rose slider to compare natural lashes and 1 session of professional lamination.",
    beforeLabel: "Natural (Before)",
    feedTitle: "SvetArt Lookbook Feed",
    feedSub: "Interactive preview of our latest manicure, pedicure, and lamination work.",
    post1: {
      treatment: 'Hygienic Manicure',
      caption: 'Clean, healthy nails with precise cuticle care and a polished finish. The foundation of every beautiful manicure at SvetArt.',
    },
    post2: {
      treatment: 'Nail Extensions',
      caption: 'Custom nail extensions shaped to perfection. Professional length and architecture tailored to your style.',
    },
    post3: {
      treatment: 'Eyelash Lamination',
      caption: 'A lifted, defined curl that enhances your natural lashes for weeks. Wake up with a camera-ready gaze.',
    },
    post4: {
      treatment: 'Eyebrow Lamination',
      caption: 'Fuller, groomed brows with hairs set in a uniform direction. A polished frame for your face.',
    },
    post5: {
      treatment: 'Aesthetic Pedicure',
      caption: 'Silky smooth feet with deep cleansing, exfoliation, and a premium finish. Pure comfort and elegance.',
    },
    post6: {
      treatment: 'Eyelash + Eyebrow Lamination',
      caption: 'Harmonized lash and brow lamination in one session. The complete SvetArt look, effortlessly refined.',
    }
  },
  ro: {
    comparisonTitle: "Laminare Gene — Înainte / După",
    comparisonSub: "Trage de glisor pentru a compara genele naturale cu rezultatul după laminare.",
    beforeLabel: "Natural (Înainte)",
    feedTitle: "Lookbook SvetArt",
    feedSub: "Previzualizare interactivă a celor mai recente lucrări de manichiură, pedichiură și laminare.",
    post1: {
      treatment: 'Manichiură Igienică',
      caption: 'Unghii curate și sănătoase cu îngrijire precisă a cuticulei. Baza fiecărei manichiuri frumoase la SvetArt.',
    },
    post2: {
      treatment: 'Extensii Unghii',
      caption: 'Extensii personalizate modelate la perfecțiune. Lungime și arhitectură profesională adaptate stilului tău.',
    },
    post3: {
      treatment: 'Laminare Gene',
      caption: 'O curbă ridicată care evidențiază genele naturale săptămâni întregi. Privire gata de fotografiat.',
    },
    post4: {
      treatment: 'Laminare Sprâncene',
      caption: 'Sprâncene mai pline, aranjate uniform. Un cadru îngrijit pentru fața ta.',
    },
    post5: {
      treatment: 'Pedichiură Estetică',
      caption: 'Picioare catifelate cu curățare profundă, exfoliere și finisaj premium. Confort și eleganță pură.',
    },
    post6: {
      treatment: 'Laminare Gene + Sprâncene',
      caption: 'Laminare armonizată gene și sprâncene într-o singură ședință. Look-ul complet SvetArt, rafinat fără efort.',
    }
  },
  ru: {
    comparisonTitle: "Ламинирование ресниц — До и После",
    comparisonSub: "Перемещайте розовый слайдер, чтобы сравнить ресницы до и после ламинирования.",
    beforeLabel: "Натуральные (До)",
    feedTitle: "Лукбук SvetArt",
    feedSub: "Интерактивная подборка наших последних работ: маникюр, педикюр и ламинирование.",
    post1: {
      treatment: 'Гигиенический маникюр',
      caption: 'Чистые, здоровые ногти с точным уходом за кутикулой. Основа каждого красивого маникюра в SvetArt.',
    },
    post2: {
      treatment: 'Наращивание ногтей',
      caption: 'Индивидуальное наращивание с идеальной формой. Профессиональная длина и архитектура под ваш стиль.',
    },
    post3: {
      treatment: 'Ламинирование ресниц',
      caption: 'Выразительный изгиб, подчёркивающий натуральные ресницы на несколько недель. Взгляд готов к камере.',
    },
    post4: {
      treatment: 'Ламинирование бровей',
      caption: 'Более густые, уложенные брови. Аккуратное обрамление лица.',
    },
    post5: {
      treatment: 'Эстетический педикюр',
      caption: 'Гладкие стопы с глубоким очищением, пилингом и премиальным финишем. Комфорт и элегантность.',
    },
    post6: {
      treatment: 'Ламинирование ресниц + бровей',
      caption: 'Гармоничное ламинирование ресниц и бровей за один визит. Полный образ SvetArt без усилий.',
    }
  }
};

import img1 from '../../assets/gallery/img1.jpg';
import img2 from '../../assets/gallery/img2.jpg';
import img4 from '../../assets/gallery/img4.jpg';
import img5 from '../../assets/gallery/img5.jpg';
import img6 from '../../assets/gallery/img6.jpg';
import lamination from '../../assets/gallery/lamination.jpg';

export default function Gallery() {
  const { lang, t } = useLanguage();
  const st = localLookbookT[lang] || localLookbookT.en;

  const [posts, setPosts] = useState<InstagramPost[]>([
    {
      id: 'post-1',
      image: img1,
      likes: 184,
      comments: 24,
      treatment: st.post1.treatment,
      caption: st.post1.caption,
      tags: ['#HygienicManicure', '#SvetArtBeauty', '#Manicure', '#NailCare'],
      gridClass: 'lg:col-span-1 lg:row-span-2',
      heightClass: 'aspect-[3/4.5] lg:h-full min-h-[460px]'
    },
    {
      id: 'post-2',
      image: img2,
      likes: 245,
      comments: 31,
      treatment: st.post2.treatment,
      caption: st.post2.caption,
      tags: ['#NailExtensions', '#Manicure', '#ChisinauBeauty', '#SvetArt'],
      gridClass: 'lg:col-span-1',
      heightClass: 'aspect-square h-[300px] lg:h-[340px]'
    },
    {
      id: 'post-3',
      image: lamination,
      treatment: st.post3.treatment,
      caption: st.post3.caption,
      tags: ['#EyelashLamination', '#InLei', '#LashLift', '#SvetArt'],
      gridClass: 'lg:col-span-1',
      heightClass: 'aspect-square h-[300px] lg:h-[340px]'
    },
    {
      id: 'post-4',
      image: img4,
      likes: 198,
      comments: 19,
      treatment: st.post4.treatment,
      caption: st.post4.caption,
      tags: ['#EyebrowLamination', '#BrowCare', '#BeautyBySvetlana', '#SvetArt'],
      gridClass: 'lg:col-span-1',
      heightClass: 'aspect-square h-[300px] lg:h-[340px]'
    },
    {
      id: 'post-5',
      image: img5,
      likes: 289,
      comments: 37,
      treatment: st.post5.treatment,
      caption: st.post5.caption,
      tags: ['#AestheticPedicure', '#Pedicure', '#FootCare', '#SvetArt'],
      gridClass: 'lg:col-span-1 lg:row-span-2',
      heightClass: 'aspect-[3/4.5] lg:h-full min-h-[460px]'
    },
    {
      id: 'post-6',
      image: img6,
      likes: 324,
      comments: 43,
      treatment: st.post6.treatment,
      caption: st.post6.caption,
      tags: ['#LashBrowCombo', '#Lamination', '#SvetArtBeauty', '#Chisinau'],
      gridClass: 'lg:col-span-1',
      heightClass: 'aspect-square h-[300px] lg:h-[340px]'
    }
  ]);

  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const toggleLike = (postId: string, e: MouseEvent) => {
    e.stopPropagation();
    const isLiked = likedPosts[postId];
    setLikedPosts(prev => ({ ...prev, [postId]: !isLiked }));
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const current = p.likes ?? 0;
        return { ...p, likes: isLiked ? current - 1 : current + 1 };
      }
      return p;
    }));
  };

  return (
    <section id="gallery" className="py-28 bg-[#F2E4DF] relative overflow-hidden">
      
      {/* Editorial Decorative Background Details */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#F8E6DF]/20 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2523] tracking-tight leading-tight">
            {t.gallery.titleNormal} <span className="italic font-light text-[#D9A7A7]">{t.gallery.titleItalic}</span>
          </h2>
          <div className="h-[1px] w-24 bg-[#D9A7A7]/50 mx-auto mt-6" />
        </div>

        {/* ================= SECTION B: LUXURY EDITORIAL MASONRY GRID ================= */}
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="font-serif text-3xl font-bold text-[#2C2523]">{st.feedTitle}</h3>
              <p className="text-xs text-stone-500 font-light font-sans">{st.feedSub}</p>
            </div>
            <button
              onClick={() => {
                setTimeout(() => {
                  const element = document.querySelector('#booking');
                  if (element) {
                    const offset = 95;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }, 120);
              }}
              className="px-6 py-4 rounded-full rose-gold-gradient text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-305 shadow-md hover:shadow-2xl hover:brightness-105 active:scale-98 cursor-pointer font-sans"
            >
              <Instagram className="w-4 h-4 text-white" />
              <span>{t.gallery.followInsta}</span>
            </button>
          </div>


          {/* EDITORIAL MASONRY GRID CONSTRUCT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => {
              const isLiked = !!likedPosts[post.id];
              return (
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ y: -10, rotate: 0.5 }}
                  transition={{ type: 'spring', damping: 24, stiffness: 80 }}
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`group relative overflow-hidden cursor-pointer rounded-[36px] shadow-md hover:premium-shadow border border-white/70 bg-stone-50 transition-all duration-500 ${post.gridClass} ${post.heightClass}`}
                >
                  {/* Photo with zoom depth transition */}
                  <img
                    src={post.image}
                    alt={post.treatment}
                    className="w-full h-full object-cover scale-100 group-hover:scale-106 transition-transform duration-800 ease-out"
                  />
                  
                  {/* Luxury editorial visual overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2523]/80 via-[#2C2523]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-between p-7 text-white" />

                  {/* Details panel overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-7 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400 z-10">
                    <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#FAF6F4] glass-panel-dark px-3.5 py-1.5 rounded-full border border-white/10 self-start font-sans">
                      {post.treatment}
                    </span>

                    <p className="text-xs font-light line-clamp-4 leading-relaxed text-stone-150 italic font-sans pr-2">
                      "{post.caption}"
                    </p>

                    <div className="flex items-center justify-end border-t border-white/25 pt-4">
                      <span className="text-[10px] uppercase tracking-widest text-[#FAF6F4] font-black flex items-center gap-1 font-sans">
                        <ZoomIn className="w-3.5 h-3.5 text-[#E7C7A0]" /> {t.gallery.inspect}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Modal Inspection Overlay */}
        <AnimatePresence>
          {selectedPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
                className="absolute inset-0 bg-[#2C2523]/85 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 25 }}
                transition={{ type: 'spring', damping: 25, stiffness: 100 }}
                className="glass-panel-opaque rounded-[40px] overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 shadow-2xl relative border border-white/60"
              >
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="aspect-square bg-stone-100 relative">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.treatment}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-7 md:p-9 flex flex-col justify-between font-sans">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#D9A7A7]/20 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full rose-gold-gradient flex items-center justify-center font-serif text-sm font-bold text-white shadow-md">
                          SB
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2523]">SvertArt Beauty</h4>
                          <span className="text-[10px] text-stone-400">Chisinau Studio</span>
                        </div>
                      </div>
                      
                      <span className="text-[10px] uppercase tracking-wide bg-[#2C2523] text-[#F8E6DF] font-bold px-3 py-1.5 rounded-full border border-white/10">
                        {selectedPost.treatment}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm font-light text-stone-600 leading-relaxed italic">
                        "{selectedPost.caption}"
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPost.tags.map((tg) => (
                          <span key={tg} className="text-[10px] text-[#B67C7C] hover:underline font-semibold font-sans">
                            {tg}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#D9A7A7]/20">
                    <button
                      onClick={() => {
                        setTimeout(() => {
                          const element = document.querySelector('#booking');
                          if (element) {
                            const offset = 95;
                            const bodyRect = document.body.getBoundingClientRect().top;
                            const elementRect = element.getBoundingClientRect().top;
                            const elementPosition = elementRect - bodyRect;
                            const offsetPosition = elementPosition - offset;

                            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                          }
                        }, 120);
                      }}
                      className="w-full py-4 rose-gold-gradient text-white hover:brightness-105 hover:shadow-lg rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer text-center"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E7C7A0]" />
                      {t.gallery.followInsta}
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
