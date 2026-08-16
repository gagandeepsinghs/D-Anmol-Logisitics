'use client';

import React from 'react';

export default function MarqueeTicker() {
  const tickerText = "📞 Call Booking Support: +91 90416 87157, +91 99113 44396 \u00a0\u00a0|\u00a0\u00a0 ⏰ Available 24/7 for Passenger Cabs & Small Trucks \u00a0\u00a0|\u00a0\u00a0 ";

  return (
    <div className="w-full bg-brand-orange-600 text-white overflow-hidden py-3.5 font-bold text-xs sm:text-sm border-y border-brand-orange-700 shadow-sm">
      <div className="flex select-none">
        <div className="animate-ticker whitespace-nowrap flex">
          <span className="pr-4">{tickerText}</span>
          <span className="pr-4">{tickerText}</span>
          <span className="pr-4">{tickerText}</span>
          <span className="pr-4">{tickerText}</span>
        </div>
      </div>
    </div>
  );
}
