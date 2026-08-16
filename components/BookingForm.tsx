'use client';

import React, { useState, useEffect } from 'react';
import CabBookingForm from './CabBookingForm';
import TempoBookingForm from './TempoBookingForm';

export default function BookingForm() {
  const [activeTab, setActiveTab] = useState<'cab' | 'tempo'>('cab');

  useEffect(() => {
    const handleTabChange = (e: Event) => {
      const customEvent = e as CustomEvent<'cab' | 'tempo'>;
      if (customEvent.detail === 'cab' || customEvent.detail === 'tempo') {
        setActiveTab(customEvent.detail);
      }
    };

    const handleUrlCheck = () => {
      const hash = window.location.hash;
      if (hash.includes('tab=tempo')) {
        setActiveTab('tempo');
      } else if (hash.includes('tab=cab')) {
        setActiveTab('cab');
      }
    };

    handleUrlCheck(); // Run on mount to check if routed from other page

    window.addEventListener('change-booking-tab', handleTabChange);
    window.addEventListener('hashchange', handleUrlCheck);

    return () => {
      window.removeEventListener('change-booking-tab', handleTabChange);
      window.removeEventListener('hashchange', handleUrlCheck);
    };
  }, []);

  return (
    <div id="booking-section" className="w-full max-w-4xl mx-auto scroll-mt-24">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
          Book Your Ride / Transport
        </h2>
        <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm sm:text-base">
          Fill out the details below to request a service. Our team will review and confirm your booking instantly.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center p-1 bg-slate-100 rounded-xl max-w-md mx-auto mb-8 border border-slate-200">
        <button
          onClick={() => setActiveTab('cab')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer
            ${
              activeTab === 'cab'
                ? 'bg-navy-950 text-white shadow-md'
                : 'text-slate-600 hover:text-navy-950 hover:bg-slate-50'
            }`}
        >
          <span className="text-base">🚕</span> Cab Booking
        </button>
        <button
          onClick={() => setActiveTab('tempo')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer
            ${
              activeTab === 'tempo'
                ? 'bg-navy-950 text-white shadow-md'
                : 'text-slate-600 hover:text-navy-950 hover:bg-slate-50'
            }`}
        >
          <span className="text-base">🚚</span> Tempo Booking
        </button>
      </div>

      {/* Active Form Container with animation-fade */}
      <div className="transition-opacity duration-300 ease-in-out">
        {activeTab === 'cab' ? (
          <div className="animate-fadeIn">
            <CabBookingForm />
          </div>
        ) : (
          <div className="animate-fadeIn">
            <TempoBookingForm />
          </div>
        )}
      </div>
    </div>
  );
}
