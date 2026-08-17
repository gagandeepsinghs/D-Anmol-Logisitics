'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = 2026; // Using 2026 as per user prompt/system timing

  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Cab Service', href: '/#services-section' },
    { label: 'Tempo Service', href: '/#services-section' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Book Now', href: '/#booking-section' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ];

  return (
    <footer className="bg-navy-950 text-white border-t border-slate-900">
      {/* Top half */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3.5 group outline-none">
              <Image
                src="/logo.png"
                alt="D-Anmol Enterprises Logo"
                width={48}
                height={48}
                style={{ width: 'auto' }}
                className="h-12 w-auto object-contain bg-white p-1 rounded-lg transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex flex-col justify-center border-l border-slate-800 pl-3.5 py-0.5">
                <span className="text-xl font-black font-logo text-brand-orange-500 tracking-tight leading-none uppercase">
                  D-ANMOL
                </span>
                <span className="text-[9px] sm:text-[10px] font-extrabold font-logo text-brand-300 tracking-[0.25em] mt-2 leading-none uppercase">
                  ENTERPRISES
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-200 max-w-sm leading-relaxed">
              Providing premium and reliable Cab Bookings (local/outstation) and Tempo / Goods Transportation services across India. Dedicated to safety, speed, and absolute customer satisfaction.
            </p>
          </div>

          {/* Useful links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-red-500 uppercase tracking-widest">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-200 hover:text-white transition-colors outline-none focus:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-red-500 uppercase tracking-widest">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3 text-sm font-medium text-slate-200">
              <div className="flex items-start gap-2.5">
                {/* Phone Icon */}
                <svg className="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex flex-col gap-1">
                  <a href="tel:+919041687157" className="hover:text-white transition-colors outline-none">+91 90416 87157</a>
                  <a href="tel:+919911344396" className="hover:text-white transition-colors outline-none">+91 99113 44396</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                {/* Mail Icon */}
                <svg className="h-5 w-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@danmol.com" className="hover:text-white transition-colors outline-none">info@danmol.com</a>
              </div>
              <div className="flex items-start gap-2.5">
                {/* Location Icon */}
                <svg className="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Shop No. 298, 1st Floor, Gali No. 4, Burail, Sector 45, Chandigarh - 160047</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom half */}
      <div className="border-t border-slate-900 bg-navy-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-300">
            &copy; {currentYear} D Anmol Enterprises. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            {/* Social Icons Placeholders */}
            <span className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Connect with us:</span>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 bg-slate-800 rounded-lg text-slate-200 hover:text-white hover:bg-brand-orange-500 transition-all duration-300 transform hover:scale-105 shadow-xs" aria-label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg text-slate-200 hover:text-white hover:bg-brand-orange-500 transition-all duration-300 transform hover:scale-105 shadow-xs" aria-label="Twitter">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg text-slate-200 hover:text-white hover:bg-brand-orange-500 transition-all duration-300 transform hover:scale-105 shadow-xs" aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
