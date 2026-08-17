import React from 'react';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import BookingForm from '@/components/BookingForm';
import MarqueeTicker from '@/components/MarqueeTicker';

export default function HomePage() {
  const benefits = [
    {
      icon: '🛡️',
      title: 'Safe & Verified Drivers',
      desc: 'All our drivers undergo background checks and rigorous training to ensure passenger safety and cargo security.',
    },
    {
      icon: '💰',
      title: 'Transparent Pricing',
      desc: 'No hidden charges. Use our estimation tool or talk directly with our dispatch department to get honest rates.',
    },
    {
      icon: '⚡',
      title: 'Fast & Timely Service',
      desc: 'Punctuality is our priority. Whether it is catching a flight or delivering critical cargo, we are always on time.',
    },
  ];

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Hero Header */}
      <Hero />

      {/* Scrolling Contact Ticker Banner */}
      <MarqueeTicker />

      {/* Services Showcase Section */}
      <ServiceCard />

      {/* Trust Benefits Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-red-600 font-bold uppercase tracking-wider text-xs sm:text-sm">Why D Anmol?</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl mt-1">
              Your Trusted Logistics & Commute Partner
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 bg-slate-50 border border-slate-100 rounded-xl"
              >
                <span className="text-4xl mb-4 bg-white p-3 rounded-full shadow-sm border border-slate-100/50">
                  {benefit.icon}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Interface */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
