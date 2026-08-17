'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll to add slight shadow for premium look
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  const handleNavLinkClick = (href: string) => {
    if (href.includes('#booking-section')) {
      const tab = href.includes('tab=tempo') ? 'tempo' : href.includes('tab=cab') ? 'cab' : null;
      
      if (pathname === '/') {
        const el = document.getElementById('booking-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (tab) {
          window.dispatchEvent(new CustomEvent('change-booking-tab', { detail: tab }));
        }
      }
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Cab Service', href: '/#booking-section?tab=cab' },
    { label: 'Tempo Service', href: '/#booking-section?tab=tempo' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white
        ${isScrolled ? 'shadow-md py-3' : 'shadow-sm py-4 border-b border-slate-100'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 group outline-none">
            <Image
              src="/logo.png"
              alt="D-Anmol Enterprises Logo"
              width={48}
              height={48}
              style={{ width: 'auto' }}
              className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center border-l border-slate-200 pl-3.5 py-0.5">
              <span className="text-xl sm:text-2xl font-black font-logo text-brand-orange-500 tracking-tight leading-none uppercase">
                D-ANMOL
              </span>
              <span className="text-[9px] sm:text-[10px] font-extrabold font-logo text-brand-800 tracking-[0.25em] mt-2 leading-none uppercase">
                ENTERPRISES
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleNavLinkClick(link.href)}
                className={`text-base font-semibold transition-colors outline-none focus:text-red-600 hover:text-red-600
                  ${isActive(link.href) ? 'text-red-600' : 'text-slate-700'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Header Action Buttons Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-bold shadow-xs transition-colors outline-none focus:ring-2 focus:ring-slate-300"
            >
              Contact Us
            </Link>
            <Link
              href="/#booking-section"
              onClick={() => handleNavLinkClick('/#booking-section')}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold shadow-sm transition-colors outline-none focus:ring-2 focus:ring-red-400"
            >
              Book Now
            </Link>
          </div>

          {/* Hamburger Button Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-md text-slate-600 hover:text-navy-950 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                // Close Icon
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Menu Icon
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (with slide-down transition) */}
      {isOpen && (
        <div className="lg:hidden animate-slideDown border-t border-slate-100 bg-white shadow-inner">
          <div className="px-2 pt-3 pb-5 space-y-1.5 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => {
                  setIsOpen(false);
                  handleNavLinkClick(link.href);
                }}
                className={`block px-3 py-2.5 rounded-md text-base font-bold transition-colors
                  ${isActive(link.href) ? 'bg-red-50 text-red-600' : 'text-slate-700 hover:bg-slate-50 hover:text-navy-950'}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 px-3 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full block text-center py-3 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 rounded-lg text-base font-bold shadow-xs transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/#booking-section"
                onClick={() => {
                  setIsOpen(false);
                  handleNavLinkClick('/#booking-section');
                }}
                className="w-full block text-center py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-base font-bold shadow-md transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
