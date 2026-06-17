/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
      nails: string;
      lashesBrows: string;
      signature: string;
    };
    categoryNails: string;
    categorySignature: string;
    categoryLasbBrows: string;
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
      desc: 'Indulge in couture nail architecture, bespoke eyebrow geometry, and high-precision lash lamination. Tailored matches designed matching your specific features in an exclusive, private environment.',
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
        nails: 'Nails',
        lashesBrows: 'Lashes & Brows',
        signature: 'SvetArt Signature',
      },
      categoryNails: 'Nails',
      categorySignature: 'Signature',
      categoryLasbBrows: 'Lashes & Brows',
      formula: 'Formula:',
      btnInquire: 'Inquire & Check Slots',
    },
    about: {
      tag: 'Meet the Creator',
      titleNormal: 'Pristine Craftsmanship,',
      titleItalic: 'Uncompromised Science.',
      credoTitle: '“My Credo”',
      credoText: '"True luxury lies in the details. A manicure is not simply aesthetic polish, it is custom architecture tailored to complement your hand\'s native symmetry."',
      credoAuthor: '— SVETLANA MOTOC',
      para1: 'Behind SvetArt is Svetlana Motoc, an aesthetic innovator whose work bridges the gap between scientific nail integrity and bespoke artistic styling. Specializing in high-performance Japanese gel techniques and advanced Italian lamination, Svetlana treats every fingernail as a unique sculpture.',
      para2: 'In a market of hurried salon queues, SvetArt was established to offer a highly personalized, private, and leisurely alternative. Appointments are designed with generous margins to avoid any rushed transitions—ensuring each layer of gel, tint, or serum is applied with sterile perfection.',
      achievements: [
        {
          title: 'Certified Master of Gel & Lamination',
          desc: '12 international accreditation courses spanning advanced French styling, lash architecture, and sterile care.',
        },
        {
          title: 'Class B Autoclave Sterilization',
          desc: '100% sterile instruments. Your health and security are validated to strict clinical sterilization standards.',
        },
        {
          title: 'Premium Hypoallergenic Materials',
          desc: 'Curation of the world’s finest non-toxic gel polishes, builder gels, and lamination liquids.',
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
      promoTitle: 'Complimentary paraffin therapy',
      promoDesc: 'Book any Structured Gel Manicure or Lash Lift combo package and receive a luxurious warm peach paraffin moisturizing hand mask absolutely free!',
      promoDetails: 'Book any Structured Gel Manicure or Lash Lift combo package and receive a luxurious warm peach paraffin moisturizing hand mask absolutely free!',
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
        'Structured Overlays',
        'Sterile Execution',
        'Anatomical Alignment',
        'Clean Aesthetics',
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
      desc: 'Răsfață-te cu arhitectura unghiilor cu gel, geometria personalizată a sprâncenelor și laminarea genelor cu precizie maximă. Armonie perfectă adaptată trăsăturilor tale unice, într-un mediu privat.',
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
        nails: 'Unghii',
        lashesBrows: 'Gene & Sprâncene',
        signature: 'SvetArt Semnătură',
      },
      categoryNails: 'Unghii',
      categorySignature: 'Semnătură',
      categoryLasbBrows: 'Gene & Sprâncene',
      formula: 'Formulă:',
      btnInquire: 'Solicită Detalii & Locuri Libere',
    },
    about: {
      tag: 'Cunoaște Creatorul',
      titleNormal: 'Măiestrie Impecabilă,',
      titleItalic: 'Știință Fără Compromis.',
      credoTitle: '„Membru Credo”',
      credoText: '"Adevăratul lux stă în detalii. O manichiură nu este doar o simplă aplicare, ci o arhitectură adaptată pentru a completa simetria nativă a mâinilor tale."',
      credoAuthor: '— SVETLANA MOTOC',
      para1: 'În spatele SvetArt se află Svetlana Motoc, o inovatoare estetică a cărei muncă face legătura între integritatea științifică a unghiilor și designul artistic personalizat. Specializată în tehnici japoneze cu gel și laminare italiană avansată, Svetlana tratează fiecare unghie ca pe o sculptură.',
      para2: 'Într-o piață grăbită, SvetArt a fost creat pentru a oferi o alternativă personalizată, relaxată și selectă. Programările sunt planificate cu marje generoase de timp pentru a evita graba, asigurând că fiecare strat este aplicat cu o perfecțiune sterilă.',
      achievements: [
        {
          title: 'Master Certificat în Gel și Laminare',
          desc: '12 cursuri de acreditare internațională acoperind stilul francez avansat, arhitectura genelor și îngrijirea sterilă.',
        },
        {
          title: 'Sterilizare în Autoclav Clasa B',
          desc: 'Instrumente 100% sterile. Sănătatea și siguranța ta sunt validate prin cele mai riguroase standarde clinice.',
        },
        {
          title: 'Materiale Premium Hipoalergenice',
          desc: 'O selecție a celor mai bune oje semipermanente non-toxice, geluri de construcție și lichide de laminare din lume.',
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
      promoTitle: 'Terapie Gratuită cu Parafină',
      promoDesc: 'Rezervă orice Manichiură cu Gel sau pachet combo și primești absolut gratuit o mască hidratantă cu parafină caldă de piersici pentru mâini!',
      promoDetails: 'Rezervă orice Manichiură cu Gel sau pachet combo și primești absolut gratuit o mască hidratantă cu parafină caldă de piersici pentru mâini!',
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
        'Construcții Structurate',
        'Execuție 100% Sterilă',
        'Aliniere Anatomică',
        'Estetică Curată',
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
      desc: 'Побалуйте себя кутюрной архитектурой ногтей, индивидуальным моделированием бровей и высокоточным ламинированием ресниц. Процедуры подбираются под ваши уникальные черты лица в эксклюзивной частной атмосфере.',
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
        nails: 'Ногти',
        lashesBrows: 'Ресницы & Брови',
        signature: 'Фирменные SvetArt',
      },
      categoryNails: 'Ногти',
      categorySignature: 'Фирменные',
      categoryLasbBrows: 'Ресницы & Брови',
      formula: 'Формула:',
      btnInquire: 'Узнать свободные места',
    },
    about: {
      tag: 'О создателе',
      titleNormal: 'Безупречное мастерство,',
      titleItalic: 'научный подход без компромиссов.',
      credoTitle: '«Мое кредо»',
      credoText: '"Истинная роскошь кроется в деталях. Маникюр — это не просто эстетическое покрытие, это индивидуальная архитектура, созданная для того, чтобы подчеркнуть естественную симметрию ваших рук."',
      credoAuthor: '— СВЕТЛАНА МОТОК',
      para1: 'За SvetArt стоит Светлана Моток, новатор в сфере эстетики, чья работа сочетает в себе заботу о здоровье ногтей и индивидуальный художественный стиль. Специализируясь на высокотехнологичных японских гелевых техниках и передовом итальянском ламинировании, Светлана ухаживает за каждым ногтем как за уникальной скульптурой.',
      para2: 'На рынке торопливых салонов с бесконечными очередями, SvetArt был основан для того, чтобы предложить расслабленную, приватную и индивидуальную альтернативу. Записи планируются с комфортными временными интервалами, чтобы исключить спешку и гарантировать нанесение каждого слоя с клинической стерильностью.',
      achievements: [
        {
          title: 'Сертифицированный мастер геля и ламинирования',
          desc: '12 международных курсов аккредитации по передовому французскому стилю, архитектуре ресниц и стерильному уходу.',
        },
        {
          title: 'Стерилизация в автоклаве класса B',
          desc: '100% стерильные инструменты. Ваша безопасность и здоровье подтверждены строгими клиническими стандартами.',
        },
        {
          title: 'Гипоаллергенные материалы премиум-класса',
          desc: 'Лучший мировой выбор нетоксичных гель-лаков, моделирующих гелей и составов для ламинирования.',
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
      promoTitle: 'Спа-парафинотерапия рук в подарок',
      promoDesc: 'Запишитесь на любой структурированный гелевый маникюр или комбинированный комплекс и получите роскошную персиковую спа-парафинотерапию для рук абсолютно бесплатно!',
      promoDetails: 'Запишитесь на любой структурированный гелевый маникюр или комплекс для ресниц/бровей и получите процедуру парафинотерапии в подарок!',
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
        'Архитектура ногтей',
        '100% стерильность',
        'Анатомическая точность',
        'Чистая эстетика',
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
  category: 'nails' | 'lashes-brows' | 'signature';
  price: string;
  duration: string;
  features: string[];
  materials: string;
  description: string;
  image: string;
}

export const getLocalizedServices = (lang: Language): LocalizedService[] => {
  if (lang === 'ro') {
    return [
      {
        id: 'gel-mani',
        name: 'Manichiură cu Gel Structurat',
        category: 'nails',
        price: '€40',
        duration: '90m',
        materials: 'Bio-Gel Japonez și Pigmenți de Lux',
        description: 'Pregătire rusească cu freză combinată cu o bază de gel organic. Întărește patul unghial, oferă reflexii luminoase perfecte și durează până la 5 săptămâni.',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600',
        features: ['Alinierea profundă a cuticulei', 'Refinerea formei cu precizie', 'Bază dublă ranforsată cu fibre', 'Infuzie de ulei de cuticule'],
      },
      {
        id: 'french-overlay',
        name: 'Arhitectură Unghii French',
        category: 'nails',
        price: '€45',
        duration: '105m',
        materials: 'Geluri Autonivelante Hipoalergenice',
        description: 'Linii de zâmbet pictate manual, concepute pentru a se potrivi cu proporțiile vizuale ale degetelor tale într-o nuanță elegantă.',
        image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600',
        features: ['Linii de zâmbet calibrate index', 'Top coat ultra-lucios rezistent la pete', 'Protecție ridicată a marginilor', 'Masaj hidratant cu parafină'],
      },
      {
        id: 'lash-lift',
        name: 'Laminare și Lift Italian pentru Gene',
        category: 'lashes-brows',
        price: '€35',
        duration: '65m',
        materials: 'InLei® Lash Filler (Fabricat în Italia)',
        description: 'Întărește, ridică și îngroașă genele. Infuzează keratină naturală și peptide pentru o curbură de lungă durată și o creştere de 24% a diametrului firului.',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600',
        features: ['Aranjare de precizie a genelor', 'Vopsire profundă în negru onix', 'Injecție de structură peptidică', 'Tratament cu ser de vitamine'],
      },
      {
        id: 'brow-arch',
        name: 'Arhitectură Sprâncene la Comandă',
        category: 'lashes-brows',
        price: '€25',
        duration: '45m',
        materials: 'Pigmenți Organici Premium BrowXenna®',
        description: 'Pensat și conturat sprâncene pe baza proporției de aur adaptată structurii tale osoase. Include vopsire de lungă durată și hidratare.',
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600',
        features: ['Arhitectură cu ață de bumbac', 'Culori amestecate personalizat', 'Protecție botanică organică', 'Styling artistic și grooming'],
      },
      {
        id: 'luxury-combo',
        name: 'Look Semnătură SvetArt',
        category: 'signature',
        price: '€65',
        duration: '140m',
        materials: 'Formule Europene Supreme',
        description: 'Pachetul combo ideal. Manichiură cu gel structurat de elită, combinat cu laminare italiană de gene și formarea sprâncenelor pentru un look deplin.',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600',
        features: ['Toate tratamentele semnătură incluse', 'Economisești 25€ ca rit de frumusețe', 'Ritual cu mască hidratantă', 'Prosecco organic complementar inclus'],
      },
    ];
  }
  if (lang === 'ru') {
    return [
      {
        id: 'gel-mani',
        name: 'Структурированный гелевый маникюр',
        category: 'nails',
        price: '€40',
        duration: '90m',
        materials: 'Японский биогель и люкс-пигменты',
        description: 'Аппаратный маникюр в сочетании с выравниванием органической гелевой базой. Укрепляет ногтевую пластину, формирует идеальные блики и держится до 5 недель.',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600',
        features: ['Глубокая обработка кутикулы', 'Выравнивание и точная форма', 'Двойное армирование микроволокнами', 'Питательный уход с маслом'],
      },
      {
        id: 'french-overlay',
        name: 'Архитектура френч-маникюра',
        category: 'nails',
        price: '€45',
        duration: '105m',
        materials: 'Гипоаллергенные самовыравнивающиеся гели',
        description: 'Прорисованная вручную линия улыбки, идеально подобранная под визуальные пропорции ваших пальцев в элегантных пастельных или натуральных тонах.',
        image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600',
        features: ['Калиброванная линия улыбки', 'Ультраглянцевое стойкое покрытие', 'Высокая защита торцов у ногтя', 'Увлажняющий парафиновый массаж'],
      },
      {
        id: 'lash-lift',
        name: 'Итальянское ламинирование и лифтинг ресниц',
        category: 'lashes-brows',
        price: '€35',
        duration: '65m',
        materials: 'InLei® Lash Filler (Произведено в Италии)',
        description: 'Укрепляет, приподнимает и утолщает ресницы. Насыщает натуральным кератином и пептидами для стойкого изгиба и увеличения диаметра волосков на 24%.',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600',
        features: ['Точная выкладка ресниц', 'Глубокое окрашивание в иссиня-черный', 'Пептидное укрепление структуры', 'Уход с витаминной сывороткой'],
      },
      {
        id: 'brow-arch',
        name: 'Архитектурное оформление бровей',
        category: 'lashes-brows',
        price: '€25',
        duration: '45m',
        materials: 'Премиальные органические пигменты BrowXenna®',
        description: 'Моделирование формы бровей по золотому сечению с учетом структуры вашего лица. Включает коррекцию нитью/пинцетом, стойкое окрашивание и увлажнение.',
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600',
        features: ['Разметка архитектурной нитью', 'Индивидуальный подбор оттенка', 'Органический уход и защита', 'Деликатное финишное оформление'],
      },
      {
        id: 'luxury-combo',
        name: 'Фирменный образ SvetArt Signature',
        category: 'signature',
        price: '€65',
        duration: '140m',
        materials: 'Премиальные европейские составы',
        description: 'Идеальный комплексный люкс-уход за один визит. Элитный структурированный гелевый маникюр, итальянское ламинирование ресниц и моделирование бровей.',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600',
        features: ['Все фирменные процедуры в комплексе', 'Экономия 25€ на полном ритуале', 'Увлажняющая спа-маска для рук', 'Бокал изысканного органического просекко'],
      },
    ];
  }
  // Default EN
  return [
    {
      id: 'gel-mani',
      name: 'Structured Gel Manicure',
      category: 'nails',
      price: '€40',
      duration: '90m',
      materials: 'Japanese Bio-Gel & Luxury Pigments',
      description: 'Russian hardware prep combined with custom organic gel base overlay. Strengthens nail bed, yields flawless light reflections, and endures up to 5 weeks.',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600',
      features: ['Deep cuticle alignment', 'Precision shape refinement', 'Double fiber-reinforced base', 'Cuticle oil infusion'],
    },
    {
      id: 'french-overlay',
      name: 'French Nail Architecture',
      category: 'nails',
      price: '€45',
      duration: '105m',
      materials: 'Hypoallergenic Self-leveling Gels',
      description: 'Hand-painted smile lines designed to match your fingers visual proportions in an elegant off-white or natural pastel shade.',
      image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600',
      features: ['Individually calibrated smile lines', 'Ultra-gloss stain-resistant top coat', 'High edge protection', 'Hydrating paraffin massage'],
    },
    {
      id: 'lash-lift',
      name: 'Italian Lash Lamination & Lift',
      category: 'lashes-brows',
      price: '€35',
      duration: '65m',
      materials: 'InLei® Lash Filler (Made in Italy)',
      description: 'Strengthens, elevates, and thickens lashes. Infuses natural keratin and peptides for a persistent curl and 24% increase in hair diameter.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600',
      features: ['Precision safety lash mapping', 'Deep onyx black dye tinting', 'Peptide structure injection', 'Vitamin Lash Serum treatment'],
    },
    {
      id: 'brow-arch',
      name: 'Bespoke Brow Architecture',
      category: 'lashes-brows',
      price: '€25',
      duration: '45m',
      materials: 'Premium BrowXenna® Organic Pigments',
      description: 'Golden ratio brow shaping suited to your skeletal structure. Includes wax/tweezer mapping, premium long-lasting tinting, and laminating hydration.',
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600',
      features: ['Architectural thread mapping', 'Custom-blended tint coordinates', 'Organic botanical protection', 'Delicate grooming setup'],
    },
    {
      id: 'luxury-combo',
      name: 'SvetArt Signature Look',
      category: 'signature',
      price: '€65',
      duration: '140m',
      materials: 'Elite European formulas',
      description: 'The ultimate luxury styling combo. Indulge in a full Structured Gel Manicure plus a custom Italian Lash Lamination and Brow Mapping carried out in a unified elite experience.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600',
      features: ['All signature treatments', 'Save €25 overall as a curated ritual', 'Moisturizing hand mask ritual', 'Complementary organic prosecco'],
    },
  ];
};

export const getLocalizedFaqs = (lang: Language): Array<{ id: string; question: string; answer: string }> => {
  if (lang === 'ro') {
    return [
      {
        id: 'faq-1',
        question: 'Ce este o "Manichiură cu Gel Structurat" și cum variază de oja semipermanentă standard?',
        answer: 'Oja semipermanentă simplă este adflată. În manichiura cu gel structurat, Sveta modelează un arc anatomic dinamic (apexul) folosind geluri autonivelante premium. Acesta elimină tensiunea directă, fortifică unghia naturală și persistă impecabil până la 5 săptămâni.',
      },
      {
        id: 'faq-2',
        question: 'Cât durează rezultatele pentru un Laminat Italian de Gene?',
        answer: 'Rezultatele laminării și vopsirii persistă timp de 6 până la 8 săptămâni, în concordanță cu ciclul natural al genelor tale. Produs cu InLei®, tratamentul îngroașă genele cu 24% pe parcursul a trei ședințe consecutive.',
      },
      {
        id: 'faq-3',
        question: 'Sunt substanțele cosmetice din proceduri sigure și certificate?',
        answer: 'Absolut. SvetArt parteneriază exclusiv cu formule de lux italiene (InLei®) și pigmenți premium rusești (BrowXenna®) evaluați dermatologic, hipoalergenici și fortificați cu keratină, peptide și uleiuri naturale care ajută regenerarea corectă.',
      },
      {
        id: 'faq-4',
        question: 'Cum pot reprograma o vizită confirmată prin rețele?',
         answer: 'Da. Deoarece lucrăm pe un calendar privat de joasă densitate, te rugăm politicos să transmiți o notificare cu minim 24 de ore înainte prin Instagram sau prin serviciul nostru Concierge Social pentru a putea delega intervalul clienților din lista de așteptare.',
      },
    ];
  }
  if (lang === 'ru') {
    return [
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
         answer: 'Да, конечно. Поскольку салон SvetArt работает по индивидуальному календарю высокой точности с комфортной плотностью записей, мы убедительно просим предупреждать о переносе минимум за 24 часа через Instagram или через наш социальный консьерж, чтобы мы могли предложить освободившееся время другим клиентам.',
      },
    ];
  }
  return [
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
       answer: "Yes, you can reschedule. Because SvetArt operates on an exclusive, low-density private booking calendar, we kindly request at least 24 hours advance notice via Instagram or our social concierge to allow clients on the waiting list to fill your slot.",
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
