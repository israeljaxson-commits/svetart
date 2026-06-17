/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SALON_SERVICES, ServiceCategory } from '../data/services';

export type Language = 'en' | 'ro' | 'ru';

interface TranslationSchema {
  nav: {
    services: string;
    admin: string;
    about: string;
    beforeAfter: string;
    gallery: string;
    reviews: string;
    faqs: string;
    contact: string;
    bookConsultation: string;
    bookAppointment: string;
  };
  hero: {
    badge: string;
    titleFirstLine: string;
    titleItalic: string;
    titleThirdLine: string;
    desc: string;
    reviewsRating: string;
    bookingsCount: string;
    ctaMessage: string;
    ctaServices: string;
  };
  services: {
    tag: string;
    titleNormal: string;
    titleItalic: string;
    desc: string;
    tabs: {
      all: string;
      manicure: string;
      pedicure: string;
      lamination: string;
    };
    categoryManicure: string;
    categoryPedicure: string;
    categoryLamination: string;
    formula: string;
    btnInquire: string;
  };
  about: {
    tag: string;
    titleNormal: string;
    titleItalic: string;
    credoTitle: string;
    credoText: string;
    credoAuthor: string;
    para1: string;
    para2: string;
    achievements: Array<{ title: string; desc: string }>;
    metrics: Array<{ value: string; label: string }>;
  };
  gallery: {
    tag: string;
    titleNormal: string;
    titleItalic: string;
    afterBadge: string;
    followInsta: string;
    treatmentTag: string;
    inspect: string;
    modalTitle: string;
    modalCTA: string;
  };
  reviews: {
    tag: string;
    titleNormal: string;
    titleItalic: string;
    desc: string;
    googleAvg: string;
    sterility: string;
    clientsServed: string;
    certified: string;
  };
  faq: {
    tag: string;
    titleNormal: string;
    titleItalic: string;
    promoTag: string;
    promoTitle: string;
    promoDesc: string;
    promoDetails: string;
    contactTitle: string;
    contactSub: string;
    preselectedService: string;
    clearSelection: string;
    formPlaceholder: string;
    formBtn: string;
    location: string;
    hours: string;
    address: string;
    hoursValue: string;
  };
  
  footer: {
    logoLabel: string;
    philosophyTitle: string;
    philosophyItems: string[];
    loungeTitle: string;
    legalRights: string;
    formulatedBy: string;
    inChisinau: string;
  };
}

const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      services: 'Services',
      admin: 'Admin',
      about: 'About Sveta',
      beforeAfter: 'Before & After',
      gallery: 'Gallery',
      reviews: 'Reviews',
      faqs: 'FAQs',
      contact: 'Contact',
      bookConsultation: 'Book Now',
      bookAppointment: 'Book Now',
    },
    hero: {
      badge: "Chisinau's Elite Beauty Aesthetics",
      titleFirstLine: 'Elite Artistry',
      titleItalic: 'for standard-defying',
      titleThirdLine: 'beauty.',
      desc: 'Professional manicure, pedicure, and lash & brow lamination in an exclusive private studio. Every session is tailored to your needs with sterile precision.',
      reviewsRating: '4.9/5',
      bookingsCount: 'Over 450+ verified luxury bookings',
      ctaMessage: 'Book via Message',
      ctaServices: 'Explore Services',
    },
    services: {
      tag: 'Luxurious Catalog',
      titleNormal: 'Tailored Elegance,',
      titleItalic: 'Expertly Rendered.',
      desc: 'Every session is treated as a private ritual, executing technical precision while matching your custom anatomical design parameters.',
      tabs: {
        all: 'All',
        manicure: 'Manicure',
        pedicure: 'Pedicure',
        lamination: 'Lamination',
      },
      categoryManicure: 'Manicure',
      categoryPedicure: 'Pedicure',
      categoryLamination: 'Lamination',
      formula: 'Formula:',
      btnInquire: 'Inquire & Check Slots',
    },
    about: {
      tag: 'Meet the Creator',
      titleNormal: 'Pristine Craftsmanship,',
      titleItalic: 'Uncompromised Science.',
      credoTitle: '“My Credo”',
      credoText: '"True luxury lies in the details. Every manicure, pedicure, and lamination is performed with sterile precision and care tailored to you."',
      credoAuthor: '— SVETLANA MOTOC',
      para1: 'Behind SvetArt is Svetlana Motoc, a certified beauty professional specializing in hygienic manicure, aesthetic pedicure, and professional lash & brow lamination. Every treatment is performed with clinical-grade sterility and personalized attention.',
      para2: 'In a market of hurried salon queues, SvetArt was established to offer a highly personalized, private, and leisurely alternative. Appointments are designed with generous margins to ensure each treatment is applied with sterile perfection.',
      achievements: [
        {
          title: 'Certified Manicure & Lamination Master',
          desc: 'International accreditation in manicure, pedicure, and professional lamination techniques.',
        },
        {
          title: 'Class B Autoclave Sterilization',
          desc: '100% sterile instruments. Your health and security are validated to strict clinical sterilization standards.',
        },
        {
          title: 'Premium Hypoallergenic Materials',
          desc: 'Professional-grade products for manicure, pedicure, and InLei® lamination treatments.',
        },
      ],
      metrics: [
        { value: '15+', label: 'Years of Expertise' },
        { value: '450+', label: 'Dedicated Clients' },
        { value: '100%', label: 'Hygiene Rating' },
        { value: '25+', label: 'Unique Colors' },
      ],
    },
    gallery: {
      tag: 'Visual Proofs',
      titleNormal: 'Flawless Results,',
      titleItalic: 'Unfiltered Evidence.',
      afterBadge: 'Laminated (After 1 Session)',
      followInsta: 'Follow @svetart_beauty',
      treatmentTag: 'Treatment',
      inspect: 'Inspect',
      modalTitle: 'Before / After Results',
      modalCTA: 'Contact Concierge about this look',
    },
    reviews: {
      tag: 'Veracious Reviews',
      titleNormal: 'Client Voices,',
      titleItalic: 'Endorsing Artistry.',
      desc: 'Read authentic stories from loyal clients who have transitioned to Sveta’s high-precision treatment regimes.',
      googleAvg: 'Google Average',
      sterility: 'Sterility Pledge',
      clientsServed: 'Clients Served',
      certified: 'Certified',
    },
    faq: {
      tag: 'Intuiting Needs',
      titleNormal: 'Expert',
      titleItalic: 'Answers.',
      promoTag: 'SvetArt Welcome Gift',
      promoTitle: 'Welcome offer for new clients',
      promoDesc: 'Book any manicure or lamination service and receive a complimentary nourishing hand treatment with your first visit!',
      promoDetails: 'Book any manicure or lamination service and receive a complimentary nourishing hand treatment with your first visit!',
      contactTitle: 'Bespoke scheduling coordinates',
      contactSub: 'Social Concierge',
      preselectedService: 'Preselected Service',
      clearSelection: 'Clear preselection',
      formPlaceholder: 'Write your custom slot inquiry message for Sveta...',
      formBtn: 'Contact Concierge',
      location: 'Location',
      hours: 'Salon Hours',
      hoursValue: 'Mon - Sat: 09:00 - 20:00',
      address: 'Anestiade 3, Chișinău, Moldova',
    },
    
    footer: {
      logoLabel: 'Beauty Lounge',
      philosophyTitle: 'Treatment Philosophy',
      philosophyItems: [
        'Hygienic Manicure',
        'Professional Pedicure',
        'Lash & Brow Lamination',
        'Sterile Execution',
      ],
      loungeTitle: 'Private Lounge Channels',
      legalRights: 'All legal rights protected.',
      formulatedBy: 'Formulated by',
      inChisinau: 'with love in Chisinau',
    },
  },
  ro: {
    nav: {
      services: 'Servicii',
      admin: 'Admin',
      about: 'Despre Sveta',
      beforeAfter: 'Înainte & După',
      gallery: 'Galerie',
      reviews: 'Recenzii',
      faqs: 'Întrebări',
      contact: 'Contact',
      bookConsultation: 'Rezervă Acum',
      bookAppointment: 'Rezervă Acum',
    },
    hero: {
      badge: 'Estetică de elită din Chișinău',
      titleFirstLine: 'Măiestrie de Elită',
      titleItalic: 'pentru o frumusețe',
      titleThirdLine: 'extraordinară.',
      desc: 'Manichiură, pedichiură și laminare gene & sprâncene într-un studio privat exclusiv. Fiecare ședință este personalizată cu precizie sterilă.',
      reviewsRating: '4.9/5',
      bookingsCount: 'Peste 450+ programări premium de succes',
      ctaMessage: 'Rezervă prin Mesaje',
      ctaServices: 'Explorează Serviciile',
    },
    services: {
      tag: 'Catalog de Lux',
      titleNormal: 'Elegență Personalizată,',
      titleItalic: 'Redată cu Măiestrie.',
      desc: 'Fiecare ședință este savurată ca un ritual privat, executat cu maximum de precizie tehnică pentru a-și completa profilul anatomic.',
      tabs: {
        all: 'Toate',
        manicure: 'Manichiură',
        pedicure: 'Pedichiură',
        lamination: 'Laminare',
      },
      categoryManicure: 'Manichiură',
      categoryPedicure: 'Pedichiură',
      categoryLamination: 'Laminare',
      formula: 'Formulă:',
      btnInquire: 'Solicită Detalii & Locuri Libere',
    },
    about: {
      tag: 'Cunoaște Creatorul',
      titleNormal: 'Măiestrie Impecabilă,',
      titleItalic: 'Știință Fără Compromis.',
      credoTitle: '„Membru Credo”',
      credoText: '"Adevăratul lux stă în detalii. Fiecare manichiură, pedichiură și laminare este executată cu precizie sterilă și grijă personalizată."',
      credoAuthor: '— SVETLANA MOTOC',
      para1: 'În spatele SvetArt se află Svetlana Motoc, specialistă certificată în manichiură igienică, pedichiură estetică și laminare profesională de gene și sprâncene. Fiecare tratament este realizat cu sterilitate de grad clinic.',
      para2: 'Într-o piață grăbită, SvetArt a fost creat pentru a oferi o alternativă personalizată, relaxată și selectă. Programările sunt planificate cu marje generoase de timp pentru a asigura perfecțiune sterilă.',
      achievements: [
        {
          title: 'Master Certificat Manichiură & Laminare',
          desc: 'Acreditare internațională în manichiură, pedichiură și tehnici profesionale de laminare.',
        },
        {
          title: 'Sterilizare în Autoclav Clasa B',
          desc: 'Instrumente 100% sterile. Sănătatea și siguranța ta sunt validate prin cele mai riguroase standarde clinice.',
        },
        {
          title: 'Materiale Premium Hipoalergenice',
          desc: 'Produse profesionale pentru manichiură, pedichiură și laminare InLei®.',
        },
      ],
      metrics: [
        { value: '15+ Ani', label: 'De Expertiză' },
        { value: '450+', label: 'Clienți Dedicați' },
        { value: '100%', label: 'Scor Igienă' },
        { value: '25+', label: 'Culori Unice' },
      ],
    },
    gallery: {
      tag: 'Dovezi FOTO',
      titleNormal: 'Rezultate Fără Cusur,',
      titleItalic: 'Dovezi Fără Filtru.',
      afterBadge: 'Laminat (După o Ședință)',
      followInsta: 'Urmărește @svetart_beauty',
      treatmentTag: 'Tratament',
      inspect: 'Inspectează',
      modalTitle: 'Rezultate Înainte / După',
      modalCTA: 'Solicită detalii prin Concierge Social despre acest look',
    },
    reviews: {
      tag: 'Recenzii Reale',
      titleNormal: 'Vocile Clienților,',
      titleItalic: 'Confirmarea Măiestriei.',
      desc: 'Citește poveștile autentice ale clienților devotați care au ales serviciile rezistente și de înaltă precizie ale lui Sveta.',
      googleAvg: 'Medie Google',
      sterility: 'Garanție Sterilitate',
      clientsServed: 'Clienți Deserviți',
      certified: 'Certificat',
    },
    faq: {
      tag: 'Nevoile Tale',
      titleNormal: 'Răspunsuri de la',
      titleItalic: 'Experți.',
      promoTag: 'Cadou de Bun Venit',
      promoTitle: 'Ofertă de bun venit pentru clienți noi',
      promoDesc: 'Rezervă orice serviciu de manichiură sau laminare și primești un tratament nutritiv gratuit pentru mâini la prima vizită!',
      promoDetails: 'Rezervă orice serviciu de manichiură sau laminare și primești un tratament nutritiv gratuit pentru mâini la prima vizită!',
      contactTitle: 'Programări și Contact',
      contactSub: 'Concierge Social',
      preselectedService: 'Serviciu Selectat',
      clearSelection: 'Șterge selecția',
      formPlaceholder: 'Scrie mesajul tău pentru a verifica disponibilitatea locurilor...',
      formBtn: 'Contactează Concierge',
      location: 'Locație',
      hours: 'Program Salon',
      hoursValue: 'Luni - Sâmbătă: 09:00 - 20:00',
      address: 'Anestiade 3, Chișinău, Moldova',
    },
    
    footer: {
      logoLabel: 'Salon de Estetică',
      philosophyTitle: 'Filozofie de Lucru',
      philosophyItems: [
        'Manichiură Igienică',
        'Pedichiură Profesională',
        'Laminare Gene & Sprâncene',
        'Execuție 100% Sterilă',
      ],
      loungeTitle: 'Canale Sociale Private',
      legalRights: 'Toate drepturile legale rezervate.',
      formulatedBy: 'Creat de',
      inChisinau: 'cu drag în Chișinău',
    },
  },
  ru: {
    nav: {
      services: 'Услуги',
      admin: 'Админ',
      about: 'О Свете',
      beforeAfter: 'До & После',
      gallery: 'Галерея',
      reviews: 'Отзывы',
      faqs: 'Вопросы',
      contact: 'Контакты',
      bookConsultation: 'Записаться сейчас',
      bookAppointment: 'Записаться сейчас',
    },
    hero: {
      badge: 'Элитная эстетика красоты в Кишиневе',
      titleFirstLine: 'Элитное искусство',
      titleItalic: 'для безупречной',
      titleThirdLine: 'красоты.',
      desc: 'Профессиональный маникюр, педикюр и ламинирование ресниц и бровей в эксклюзивной частной студии. Каждый сеанс выполняется с клинической стерильностью.',
      reviewsRating: '4.9/5',
      bookingsCount: 'Более 450+ верифицированных премиум-записей',
      ctaMessage: 'Записаться через сообщения',
      ctaServices: 'Посмотреть услуги',
    },
    services: {
      tag: 'Эксклюзивный каталог',
      titleNormal: 'Индивидуальная элегантность,',
      titleItalic: 'созданная с мастерством.',
      desc: 'Каждый сеанс проходит как закрытый ритуал, сочетающий в себе техническую точность и гармонию с вашими естественными пропорциями.',
      tabs: {
        all: 'Все',
        manicure: 'Маникюр',
        pedicure: 'Педикюр',
        lamination: 'Ламинирование',
      },
      categoryManicure: 'Маникюр',
      categoryPedicure: 'Педикюр',
      categoryLamination: 'Ламинирование',
      formula: 'Формула:',
      btnInquire: 'Узнать свободные места',
    },
    about: {
      tag: 'О создателе',
      titleNormal: 'Безупречное мастерство,',
      titleItalic: 'научный подход без компромиссов.',
      credoTitle: '«Мое кредо»',
      credoText: '"Истинная роскошь кроется в деталях. Каждый маникюр, педикюр и ламинирование выполняются со стерильной точностью и индивидуальным подходом."',
      credoAuthor: '— СВЕТЛАНА МОТОК',
      para1: 'За SvetArt стоит Светлана Моток, сертифицированный специалист по гигиеническому маникюру, эстетическому педикюру и профессиональному ламинированию ресниц и бровей. Каждая процедура выполняется с клинической стерильностью.',
      para2: 'На рынке торопливых салонов SvetArt был основан для того, чтобы предложить расслабленную, приватную и индивидуальную альтернативу. Записи планируются с комфортными интервалами для безупречного результата.',
      achievements: [
        {
          title: 'Сертифицированный мастер маникюра и ламинирования',
          desc: 'Международная аккредитация в маникюре, педикюре и профессиональном ламинировании.',
        },
        {
          title: 'Стерилизация в автоклаве класса B',
          desc: '100% стерильные инструменты. Ваша безопасность подтверждена строгими клиническими стандартами.',
        },
        {
          title: 'Гипоаллергенные материалы премиум-класса',
          desc: 'Профессиональные средства для маникюра, педикюра и ламинирования InLei®.',
        },
      ],
      metrics: [
        { value: '15+', label: 'Лет опыта' },
        { value: '450+', label: 'Преданных клиентов' },
        { value: '100%', label: 'Уровень гигиены' },
        { value: '25+', label: 'Уникальных цветов' },
      ],
    },
    gallery: {
      tag: 'Визуальные подтверждения',
      titleNormal: 'Безупречный результат,',
      titleItalic: 'снимки без фильтров.',
      afterBadge: 'Ламинирование (после 1 сеанса)',
      followInsta: 'Подпишитесь на @svetart_beauty',
      treatmentTag: 'Процедура',
      inspect: 'Посмотреть',
      modalTitle: 'Результаты До / После',
      modalCTA: 'Связаться с консьерж-службой о данном образе',
    },
    reviews: {
      tag: 'Реальные отзывы',
      titleNormal: 'Что говорят клиенты,',
      titleItalic: 'подтверждая класс.',
      desc: 'Читайте реальные истории преданных клиентов, которые выбрали бережный и точный уход от Светы.',
      googleAvg: 'Среднее в Google',
      sterility: 'Стандарт стерильности',
      clientsServed: 'Довольных клиентов',
      certified: 'Сертифицировано',
    },
    faq: {
      tag: 'Забота о деталях',
      titleNormal: 'Ответы',
      titleItalic: 'эксперта.',
      promoTag: 'Подарок для новых клиентов',
      promoTitle: 'Приветственное предложение для новых клиентов',
      promoDesc: 'Запишитесь на любой маникюр или ламинирование и получите питательный уход для рук в подарок при первом визите!',
      promoDetails: 'Запишитесь на любой маникюр или ламинирование и получите питательный уход для рук в подарок при первом визите!',
      contactTitle: 'Контакты и координаты',
      contactSub: 'Социальный консьерж',
      preselectedService: 'Выбранная услуга',
      clearSelection: 'Сбросить выбор',
      formPlaceholder: 'Напишите сообщение, чтобы подобрать удобное время для записи...',
      formBtn: 'Связаться с консьержем',
      location: 'Где мы находимся',
      hours: 'Режим работы',
      hoursValue: 'Пн - Сб: 09:00 - 20:00',
      address: 'ул. Александру Анестиаде 3, Кишинев, Молдова',
    },
    
    footer: {
      logoLabel: 'Салон эстетики',
      philosophyTitle: 'Наша философия',
      philosophyItems: [
        'Гигиенический маникюр',
        'Профессиональный педикюр',
        'Ламинирование ресниц и бровей',
        '100% стерильность',
      ],
      loungeTitle: 'Закрытые каналы связи',
      legalRights: 'Все права защищены.',
      formulatedBy: 'Разработано',
      inChisinau: 'с любовью в Кишиневе',
    },
  },
};

export interface LocalizedService {
  id: string;
  name: string;
  category: ServiceCategory;
  price: string;
  duration: string;
  features: string[];
  materials: string;
  description: string;
  image: string;
}

export const getLocalizedServices = (lang: Language): LocalizedService[] =>
  SALON_SERVICES.map((s) => ({
    id: s.id,
    name: s[lang].name,
    category: s.category,
    price: s[lang].price,
    duration: '',
    materials: s[lang].materials,
    description: s[lang].description,
    image: s.image,
    features: s[lang].features,
  }));

export const getLocalizedFaqs = (lang: Language): Array<{ id: string; question: string; answer: string }> => {
  if (lang === 'ro') {
    return [
      {
        id: 'faq-1',
        question: 'Ce include o Manichiură Igienică?',
        answer: 'Manichiura igienică include curățarea unghiilor, îngrijirea cuticulei, modelarea formei și un finisaj curat. Este ideală pentru menținerea sănătoasă a unghiilor naturale.',
      },
      {
        id: 'faq-2',
        question: 'Cât durează rezultatele laminării genelor?',
        answer: 'Laminarea genelor durează de obicei 6–8 săptămâni, în funcție de ciclul natural de creștere. Rezultatul include o curbă ridicată și gene mai definite fără rimel.',
      },
      {
        id: 'faq-3',
        question: 'Oferiți cursuri de formare profesională?',
        answer: 'Da. SvetArt oferă cursuri de Manichiură (350€ / 250€), Pedichiură (200€) și Laminare (250€), conduse de Svetlana Motoc cu training practic și certificare.',
      },
      {
        id: 'faq-4',
        question: 'Pot reprograma o vizită confirmată?',
        answer: 'Da. Te rugăm să anunți cu cel puțin 24 de ore înainte prin Instagram sau mesaj direct, pentru a permite altor clienți să ocupe slotul.',
      },
    ];
  }
  if (lang === 'ru') {
    return [
      {
        id: 'faq-1',
        question: 'Что входит в гигиенический маникюр?',
        answer: 'Гигиенический маникюр включает очищение ногтей, уход за кутикулой, формирование и аккуратный финиш. Идеален для поддержания здоровья натуральных ногтей.',
      },
      {
        id: 'faq-2',
        question: 'Как долго держится ламинирование ресниц?',
        answer: 'Ламинирование ресниц обычно держится 6–8 недель в зависимости от естественного цикла роста. Результат — выразительный изгиб и ухоженный вид без туши.',
      },
      {
        id: 'faq-3',
        question: 'Проводите ли вы обучающие курсы?',
        answer: 'Да. SvetArt предлагает курсы маникюра (350€ / 250€), педикюра (200€) и ламинирования (250€) под руководством Светланы Моток с практикой и сертификацией.',
      },
      {
        id: 'faq-4',
        question: 'Можно ли перенести подтвержденную запись?',
        answer: 'Да. Пожалуйста, предупредите минимум за 24 часа через Instagram или личное сообщение, чтобы мы могли предложить время другим клиентам.',
      },
    ];
  }
  return [
    {
      id: 'faq-1',
      question: 'What is included in a Hygienic Manicure?',
      answer: 'A hygienic manicure includes nail cleansing, cuticle care, shaping, and a clean finish. It is ideal for maintaining healthy natural nails.',
    },
    {
      id: 'faq-2',
      question: 'How long does eyelash lamination last?',
      answer: 'Eyelash lamination typically lasts 6–8 weeks depending on your natural lash cycle. Results include a lifted curl and defined lashes without mascara.',
    },
    {
      id: 'faq-3',
      question: 'Do you offer professional training courses?',
      answer: 'Yes. SvetArt offers Manicure Course (350€ / 250€), Pedicure Course (200€), and Lamination Course (250€) led by Svetlana Motoc with hands-on training and certification.',
    },
    {
      id: 'faq-4',
      question: 'Can I reschedule an existing booking?',
      answer: 'Yes. We kindly request at least 24 hours advance notice via Instagram or direct message so we can offer your slot to clients on the waiting list.',
    },
  ];
};

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('svetart_lang');
    if (saved === 'ro' || saved === 'ru' || saved === 'en') {
      return saved as Language;
    }
    return 'en';
  });

  const setLang = (nextLang: Language) => {
    setLangState(nextLang);
    localStorage.setItem('svetart_lang', nextLang);
  };

  useEffect(() => {
    // Sync document language tag
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
