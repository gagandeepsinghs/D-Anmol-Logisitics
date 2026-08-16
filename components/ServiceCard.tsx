'use client';

import React from 'react';
import Link from 'next/link';

export default function ServiceCard() {
  const services = [
    {
      title: 'Cab Service 🚕',
      tagline: 'Local & Outstation Passenger Rides',
      bulletPoints: [
        'Local & Outstation trips',
        'Comfortable & air-conditioned rides',
        'Easy online booking request',
        'Professional, reliable & safe drivers',
      ],
      buttonText: 'Book a Cab',
      iconBg: 'bg-red-50 text-red-600',
      borderColor: 'hover:border-red-500/30',
      actionTab: 'cab',
    },
    {
      title: 'Tempo / Goods Transport 🚚',
      tagline: 'Safe & Reliable Carrier Services',
      bulletPoints: [
        'Household shifting / relocation',
        'Business goods & cargo transport',
        'Local pickup & city delivery',
        'Reliable vehicles (Tata Ace, Bolero, etc.)',
      ],
      buttonText: 'Book a Tempo',
      iconBg: 'bg-navy-50 text-navy-800',
      borderColor: 'hover:border-navy-600/30',
      actionTab: 'tempo',
    },
  ];

  return (
    <section id="services-section" className="py-16 bg-slate-50 border-y border-slate-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-red-600 font-bold uppercase tracking-wider text-xs sm:text-sm">What We Offer</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl mt-1">Our Services</h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-lg mx-auto">
            Choose the service that suits your requirements. We provide high-quality logistics and commute solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl shadow-md p-6 sm:p-8 border border-slate-100 flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${service.borderColor}`}
            >
              <div>
                {/* Header */}
                <h3 className="text-2xl font-black text-slate-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm font-bold text-slate-500 mb-6">
                  {service.tagline}
                </p>

                {/* Bullet Points */}
                <ul className="flex flex-col gap-4 mb-8">
                  {service.bulletPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                      {/* Check Icon */}
                      <span className="p-0.5 rounded-full bg-green-50 text-green-600 shrink-0 mt-0.5">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking Action CTA */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('booking-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  window.dispatchEvent(new CustomEvent('change-booking-tab', { detail: service.actionTab }));
                }}
                className="w-full text-center py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-bold shadow-sm transition-colors outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
              >
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
