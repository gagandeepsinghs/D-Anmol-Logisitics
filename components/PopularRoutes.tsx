'use client';

import React, { useState } from 'react';

export default function PopularRoutes() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'intercity' | 'hill' | 'local'>('all');

  const routes = [
    {
      id: 1,
      pickup: 'Chandigarh / Mohali',
      drop: 'New Delhi (IGI Airport / NCR)',
      distance: '~245 km',
      category: 'intercity',
      cabPrice: '₹2,999',
      tempoPrice: '₹4,500',
      badge: '🔥 Most Popular',
      badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20',
      features: ['24x7 Airport Drop', 'Toll Option', 'Express Highway'],
    },
    {
      id: 2,
      pickup: 'Chandigarh / Tri-City',
      drop: 'Ludhiana City',
      distance: '~105 km',
      category: 'intercity',
      cabPrice: '₹1,650',
      tempoPrice: '₹2,800',
      badge: '🏭 Commercial Hub',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      features: ['Same-Day Cargo', 'Ac Taxi Rides', 'Doorstep Pickup'],
    },
    {
      id: 3,
      pickup: 'Chandigarh / Kalka',
      drop: 'Shimla / Solan Hills',
      distance: '~115 km',
      category: 'hill',
      cabPrice: '₹2,200',
      tempoPrice: '₹3,500',
      badge: '⛰️ Hill Route Special',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      features: ['Experienced Hill Drivers', 'Scenic Tour', 'Safe Mountain Transport'],
    },
    {
      id: 4,
      pickup: 'Tri-City Local',
      drop: 'Chandigarh • Mohali • Zirakpur • Panchkula',
      distance: 'Local City',
      category: 'local',
      cabPrice: '₹299',
      tempoPrice: '₹400',
      badge: '⚡ 15-Min Pickup',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      features: ['House Shifting', 'City Taxi', 'Tata Ace Ready'],
    },
    {
      id: 5,
      pickup: 'Chandigarh',
      drop: 'Amritsar (Golden Temple)',
      distance: '~230 km',
      category: 'intercity',
      cabPrice: '₹2,850',
      tempoPrice: '₹4,200',
      badge: '✨ Outstation Special',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      features: ['Family Outstation', 'One-Way / Round Trip', 'Spacious SUV'],
    },
    {
      id: 6,
      pickup: 'Chandigarh / Zirakpur',
      drop: 'Ambala / Karnal Highway',
      distance: '~45 - 120 km',
      category: 'intercity',
      cabPrice: '₹850',
      tempoPrice: '₹1,400',
      badge: '🚚 Express Freight',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      features: ['Heavy Load Pickup', 'Fast Highway Route', 'Commercial Rates'],
    },
  ];

  const filteredRoutes = activeFilter === 'all' 
    ? routes 
    : routes.filter(r => r.category === activeFilter);

  const handleQuickBook = (pickup: string, drop: string) => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="popular-routes-section" className="py-16 bg-navy-950 text-white relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block px-3.5 py-1 bg-brand-orange-500/20 text-brand-orange-400 border border-brand-orange-500/30 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
              POPULAR DESTINATIONS & FARES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Frequent Routes & Transparent Rates
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
              Check transparent estimated fares for passenger cabs and goods transport across top North India routes.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              All Routes
            </button>
            <button
              onClick={() => setActiveFilter('intercity')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'intercity'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Intercity
            </button>
            <button
              onClick={() => setActiveFilter('hill')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'hill'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Hill Stations
            </button>
            <button
              onClick={() => setActiveFilter('local')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'local'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Local Tri-City
            </button>
          </div>
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-brand-orange-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-orange-500/10 group"
            >
              <div>
                {/* Header Badge & Distance */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${route.badgeColor}`}>
                    {route.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700/60">
                    📍 {route.distance}
                  </span>
                </div>

                {/* Pickup -> Drop */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{route.pickup}</span>
                  </div>
                  <div className="border-l-2 border-dashed border-slate-700 ml-1 pl-3.5 py-0.5 my-0.5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Direct Transit Route</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-extrabold text-white group-hover:text-brand-orange-400 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>{route.drop}</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 mb-5">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
                      <span>🚕</span> Cab Starting
                    </span>
                    <span className="text-lg font-black text-emerald-400 mt-0.5">
                      {route.cabPrice}
                    </span>
                  </div>
                  <div className="flex flex-col border-l border-slate-800 pl-3">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
                      <span>🚚</span> Tempo Starting
                    </span>
                    <span className="text-lg font-black text-brand-orange-400 mt-0.5">
                      {route.tempoPrice}
                    </span>
                  </div>
                </div>

                {/* Features Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {route.features.map((feat, fIdx) => (
                    <span key={fIdx} className="text-[10px] font-medium text-slate-300 bg-slate-800/70 px-2 py-0.5 rounded border border-slate-700/50">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleQuickBook(route.pickup, route.drop)}
                className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-brand-orange-500 hover:from-red-700 hover:to-brand-orange-600 text-white font-extrabold text-xs rounded-xl transition-all duration-200 shadow-md shadow-red-600/20 flex items-center justify-center gap-2"
              >
                <span>Book This Route Now</span>
                <span className="text-sm">→</span>
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Banner note */}
        <div className="mt-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>📍</span> Looking for a custom route not listed above?
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">We cover all towns across Punjab, Haryana, Himachal Pradesh, Delhi NCR & Rajasthan.</p>
          </div>
          <a
            href="tel:+919041687157"
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-xl text-xs border border-slate-700 transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Call Dispatch +91 90416-87157</span>
          </a>
        </div>

      </div>
    </section>
  );
}
