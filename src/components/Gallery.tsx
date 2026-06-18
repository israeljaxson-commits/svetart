/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLanguage } from '../context/LanguageContext';



export default function Gallery() {
  const { lang, t } = useLanguage();

  return (
    <section id="gallery" className="py-28 bg-[#F2E4DF] relative overflow-hidden">
      
      {/* Editorial Decorative Background Details */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#F8E6DF]/20 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
      </div>
    </section>
  );
}
