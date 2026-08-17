'use client';

import React from 'react';

export default function HelpDeskBanner() {
  const whatsappUrl = "https://wa.me/919041687157?text=Hi%20D-Anmol%20Enterprises%2C%20I%20want%20to%20inquire%20about%20a%20cab%2Ftempo%20booking.";

  return (
    <section className="bg-navy-950 text-white py-14 relative overflow-hidden border-t border-navy-900">
      {/* Blue Ambient Lighting */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-navy-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-navy-900/90 border border-navy-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-md">
          
          {/* Text Content & Online Status */}
          <div className="flex flex-col text-center lg:text-left gap-3 max-w-2xl">
            {/* Live Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-extrabold self-center lg:self-start">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span>24/7 DISPATCH DESK ONLINE</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Need Instant Booking Assistance or Special Rates?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect with our live dispatch officer directly for instant cab quotes, cargo tempo availability, and custom outstation packages.
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 bg-navy-950/80 px-3 py-1.5 rounded-lg border border-navy-800">
                ⚡ Avg Response: <strong className="text-white">&lt; 2 Mins</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-navy-950/80 px-3 py-1.5 rounded-lg border border-navy-800">
                📍 Coverage: <strong className="text-white">Tri-City & Pan-India</strong>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-2xl text-sm transition-all duration-200 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-3 group border border-blue-400/20"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">💬</span>
              <span>Chat on WhatsApp</span>
            </a>

            {/* Call Helpline Button */}
            <a
              href="tel:+919041687157"
              className="w-full sm:w-auto px-6 py-3.5 bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-extrabold rounded-2xl text-sm transition-all duration-200 shadow-lg shadow-brand-orange-500/20 flex items-center justify-center gap-3 group border border-orange-400/20"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">📞</span>
              <span>Call +91 90416-87157</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
