/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import CalendarBooking from './components/CalendarBooking';
import { useState, FormEvent, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import ContactAndFAQ from './components/ContactAndFAQ';
import Footer from './components/Footer';
import AdminBookings from './components/AdminBookings';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { lang, t } = useLanguage();
  const [selectedService, setSelectedService] = useState('')
  

  const handleScrollToBooking = () => {
    setTimeout(() => {
      const element = document.querySelector('#booking');
      if (element) {
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 150);
  };

  const handleScrollToContact = () => {
    setTimeout(() => {
      const element = document.querySelector('#contact');
      if (element) {
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 150);
  };

  

  // Callback to clean preselected service state when client clears it inside FAQ panel
  const handleClearPreselection = () => {
    setSelectedService('');
  };

  return (
    <div className="font-sans antialiased text-luxury-charcoal bg-luxury-cream selection:bg-luxury-blush selection:text-luxury-bronze scroll-smooth min-h-screen">
      
      <div className="flex flex-col min-h-screen">
        
        {/* Sticky premium Navigation bar */}
        <Navbar
          onBookClick={handleScrollToBooking}
        />

        {/* Layout Main Stream */}
        <main className="flex-grow">
          
          {/* 1. Hero Section */}
          <Hero
            onBookClick={handleScrollToBooking}
            onContactClick={handleScrollToContact}
          />

          {/* 2. Services Section: select service callback sets state */}
          <Services
            onServiceSelect={(id) => {
              setSelectedService(id);
            }}
          />

          {/* 3. About Section */}
          <About />

          {/* 4. Interactive Gallery & Before/After Comparison */}
          <Gallery />

          {/* 5. Customer Reviews Section */}
          <Reviews />
          <CalendarBooking preselectedServiceId={selectedService} />
          <AdminBookings />
          {/* 6. Contact, Promotions & FAQ Section */}
          <ContactAndFAQ
            selectedServiceName={selectedService}
            onClearPreselection={handleClearPreselection}
          />

        </main>

        {/* General luxury brands footer */}
        <Footer />

        

      </div>

    </div>
  );
}
