import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const offerings = [
    {
      title: 'For Individuals & Families',
      points: [
        'Local point-to-point drop and round rides',
        'Outstation travel for family trips or events',
        'Airport transfers and railway station commutes',
        'Comfortable hatchbacks, sedans, and SUVs',
      ],
    },
    {
      title: 'For Businesses & Relocations',
      points: [
        'Household shifting and luggage relocation',
        'Commercial goods carriage and logistics distribution',
        'Corporate employee transport tie-ups',
        'Range of tempos (Tata Ace, Bolero Pickup, Trucks)',
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full pb-16 bg-slate-50">
      
      {/* Page Header */}
      <section className="bg-navy-950 text-white py-16 text-center relative z-0">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">About Us</h1>
          <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            D Anmol Enterprises is committed to providing reliable passenger commutes and goods transportation services across local and outstation routes.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl border border-slate-100 shadow-sm mt-12 relative z-10 flex flex-col gap-10">
        
        {/* Company Overview */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-black text-slate-900 border-l-4 border-red-600 pl-3.5">
            Who We Are
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            At D Anmol Enterprises, we operate a dual-purpose transit system that bridges passenger travel and logistics transport under one name. Our goal is to offer timely dispatch, clean vehicles, and well-behaved drivers to make transportation hassle-free.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            By avoiding complicated signup walls, we prioritize direct utility. Whether a customer requires an early morning ride to the airport or a medium-sized truck to shift household goods to a new flat, our simple online request portal gets things moving instantly.
          </p>
        </div>

        {/* Our Offerings Grid */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold text-slate-800 border-l-4 border-slate-900 pl-3.5">
            Our Service Scope
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offerings.map((offering, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-100 p-6 rounded-xl flex flex-col gap-4"
              >
                <h4 className="font-extrabold text-navy-950 text-base sm:text-lg">
                  {offering.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {offering.points.map((point, pIdx) => (
                    <li key={pIdx} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Our Approach */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-slate-800 border-l-4 border-slate-900 pl-3.5">
            Operational Values
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="flex flex-col gap-1.5 p-4 border border-slate-100 rounded-lg">
              <span className="font-extrabold text-slate-900">1. Customer Direct</span>
              <p className="text-slate-500 text-xs">No account creation walls. Access services directly and secure bookings rapidly.</p>
            </div>
            <div className="flex flex-col gap-1.5 p-4 border border-slate-100 rounded-lg">
              <span className="font-extrabold text-slate-900">2. Fleet Diversity</span>
              <p className="text-slate-500 text-xs">From hatchbacks for single riders to medium trucks for large business cargo.</p>
            </div>
            <div className="flex flex-col gap-1.5 p-4 border border-slate-100 rounded-lg">
              <span className="font-extrabold text-slate-900">3. Integrity Driven</span>
              <p className="text-slate-500 text-xs">We charge honest base prices and per-km rates with zero hidden premiums.</p>
            </div>
          </div>
        </div>

        {/* Book Now Section */}
        <div className="border-t border-slate-100 pt-8 mt-4 text-center flex flex-col items-center gap-4">
          <h3 className="text-lg font-bold text-slate-950">
            Need a Cab or Tempo? Book Now
          </h3>
          <Link
            href="/#booking-section"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold shadow-md transition-colors"
          >
            Start Booking Form
          </Link>
        </div>

      </section>
    </div>
  );
}
