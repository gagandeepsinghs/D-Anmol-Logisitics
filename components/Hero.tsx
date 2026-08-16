'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
      title: 'Passenger Cabs'
    },
    {
      img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
      title: 'Cargo Tempos'
    },
    {
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      title: 'Logistics Shifting'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-navy-950 to-slate-950 text-white py-16 sm:py-24 lg:py-28">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content (left column) */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6 text-left">
            <span className="px-3.5 py-2 bg-brand-orange-500/10 border border-brand-orange-500/25 text-brand-orange-500 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 shadow-xs">
              🚚 Passenger Cabs & Small Trucks 🚚
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Reliable <br />
              <span className="text-red-500">Cab & Small Trucks</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-350 max-w-xl leading-relaxed">
              Book passenger rides or small trucks for goods delivery. Professional drivers, secure transport, and premium service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
              <Link
                href="#booking-section"
                className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold text-center shadow-md transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-red-400"
              >
                Book a Service
              </Link>
              <a
                href="tel:+919041687157"
                className="px-8 py-3.5 border border-slate-700 hover:border-slate-500 hover:bg-slate-900 text-white rounded-lg text-sm font-bold text-center transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-slate-700 flex items-center justify-center gap-2"
              >
                {/* Phone SVG Icon */}
                <svg className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
            </div>
            
            {/* Features Row */}
            <div className="grid grid-cols-3 gap-6 border-t border-slate-800/80 pt-8 w-full mt-6 text-xs sm:text-sm text-slate-400 font-medium">
              <div className="flex flex-col gap-1">
                <span className="text-white font-bold text-lg leading-none">24/7</span>
                <span>Availability</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white font-bold text-lg leading-none">Safe</span>
                <span>Verified Drivers</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white font-bold text-lg leading-none">Flexible</span>
                <span>Cab & Cargo</span>
              </div>
            </div>
          </div>

          {/* Hero Visuals (right column) - Extended width */}
          <div className="lg:col-span-7 relative w-full h-[320px] sm:h-[400px] lg:h-[450px] mt-6 lg:mt-0 flex items-center justify-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-slate-700 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] bg-slate-900 group">
              {/* Slides */}
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                    ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gentle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-85"></div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 outline-none cursor-pointer border border-white/5 z-20"
                aria-label="Previous slide"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 outline-none cursor-pointer border border-white/5 z-20"
                aria-label="Next slide"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Centered Dot Indicators */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-slate-950/40 px-3 py-1.5 rounded-full backdrop-blur-xs">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 outline-none cursor-pointer
                      ${index === currentSlide ? 'w-5 bg-red-650 bg-red-600' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
