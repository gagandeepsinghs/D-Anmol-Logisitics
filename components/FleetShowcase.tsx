'use client';

import React from 'react';
import Link from 'next/link';

export default function FleetShowcase() {
  const vehicles = [
    {
      category: 'Taxi / Passenger Cab',
      name: 'Swift Dzire / Etios',
      badge: 'Economy Sedan',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      capacity: '4 Passengers + Driver',
      idealFor: 'City Commute, Airport Drops & Outstation Rides',
      specs: ['Full Air-Conditioned', 'Comfortable Legroom', 'Clean & Sanitized'],
      icon: '🚕',
      tab: 'cab',
    },
    {
      category: 'Taxi / Passenger Cab',
      name: 'Innova Crysta / Ertiga',
      badge: 'Executive SUV',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
      capacity: '6-7 Passengers + Driver',
      idealFor: 'Family Outings, Wedding & Group Tours',
      specs: ['Dual AC Comfort', 'Ample Luggage Space', 'Smooth Highway Ride'],
      icon: '🚘',
      tab: 'cab',
    },
    {
      category: 'Goods / Commercial Freight',
      name: 'Tata Ace (Chota Hathi)',
      badge: 'Light Commercial',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
      capacity: '750 kg Payload',
      idealFor: 'Local House Shifting, Furniture & Shop Deliveries',
      specs: ['7 ft Open / Covered Bed', 'Easy City Navigation', 'Quick Express Transport'],
      icon: '🚚',
      tab: 'tempo',
    },
    {
      category: 'Goods / Commercial Freight',
      name: 'Bolero Pickup / Maxi Truck',
      badge: 'Heavy Cargo',
      badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      capacity: '1.5 - 2.0 Ton Payload',
      idealFor: 'Industrial Goods, Commercial Materials & Intercity Freight',
      specs: ['8.2 ft Extended Loading Bed', 'Heavy Duty Load Capacity', 'GPS Tracked Route'],
      icon: '🚛',
      tab: 'tempo',
    },
  ];

  const handleBookVehicle = (tab: string) => {
    const section = document.getElementById('booking-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="fleet-section" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
            OUR FLEET & VEHICLES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Well-Maintained Vehicles For Every Need
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Whether you need a comfortable AC cab for travel or a reliable goods carrier for commercial freight, we have the perfect vehicle ready.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800/90 border border-slate-700/70 hover:border-red-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-600/10 group"
            >
              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl bg-slate-700/50 p-3 rounded-xl border border-slate-600/40 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${item.badgeBg}`}>
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-white group-hover:text-brand-orange-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">
                  {item.category}
                </p>

                {/* Key Capacity */}
                <div className="mt-4 py-2 px-3 bg-slate-900/60 rounded-lg border border-slate-700/50 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Capacity</span>
                  <span className="text-xs font-bold text-red-400">{item.capacity}</span>
                </div>

                {/* Specs List */}
                <ul className="mt-4 space-y-2 border-t border-slate-700/60 pt-4">
                  {item.specs.map((spec, specIdx) => (
                    <li key={specIdx} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="text-red-500 text-sm">✓</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-700/60">
                <button
                  onClick={() => handleBookVehicle(item.tab)}
                  className="w-full py-2.5 px-4 bg-slate-700 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm group-hover:bg-red-600"
                >
                  <span>Book This Vehicle</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quick Call Note */}
        <div className="mt-12 text-center bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4 sm:p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white">Need a specialized vehicle or heavy truck booking?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Talk to our dispatch executive directly for instant availability and rates.</p>
          </div>
          <a
            href="tel:+919041687157"
            className="px-5 py-2.5 bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-bold rounded-xl text-xs transition-colors shrink-0 shadow-md flex items-center gap-2"
          >
            <span>📞 Call +91 90416-87157</span>
          </a>
        </div>

      </div>
    </section>
  );
}
