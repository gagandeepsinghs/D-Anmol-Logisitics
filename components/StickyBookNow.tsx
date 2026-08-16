'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function StickyBookNow() {
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 250px
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false); // Close dropdown if widget hides
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookClick = (tab: 'cab' | 'tempo') => {
    setIsOpen(false);
    if (pathname === '/') {
      const el = document.getElementById('booking-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      window.location.hash = `booking-section#tab=${tab}`;
      window.dispatchEvent(new CustomEvent('change-booking-tab', { detail: tab }));
    } else {
      router.push(`/#booking-section#tab=${tab}`);
    }
  };

  return (
    <div
      className={`fixed top-24 right-6 z-40 flex flex-col items-end gap-2 transition-all duration-300 transform select-none
        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-12 opacity-0 scale-90 pointer-events-none'}`}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Main Trigger Button */}
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-[0_8px_30px_rgba(225,29,72,0.4)] border border-red-500/20 cursor-pointer outline-none focus:ring-4 focus:ring-red-400/50"
        aria-label="Book Now Options"
      >
        <span className="text-base animate-pulse">📅</span>
        <span>Book Now</span>
        <svg
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Options Dropdown */}
      <div
        className={`w-48 rounded-xl bg-slate-950/90 text-white border border-white/10 shadow-2xl backdrop-blur-md p-1.5 flex flex-col gap-1 transition-all duration-300 transform origin-top-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
      >
        <button
          type="button"
          onClick={() => handleBookClick('cab')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-left text-xs sm:text-sm font-bold transition-colors cursor-pointer"
        >
          <span>🚕</span>
          <span>Book a Cab</span>
        </button>
        <button
          type="button"
          onClick={() => handleBookClick('tempo')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-left text-xs sm:text-sm font-bold transition-colors cursor-pointer border-t border-white/5"
        >
          <span>🚚</span>
          <span>Book a Truck</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            router.push('/contact');
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-left text-xs sm:text-sm font-bold transition-colors cursor-pointer border-t border-white/5"
        >
          <span>✉️</span>
          <span>Contact Us</span>
        </button>
      </div>
    </div>
  );
}
