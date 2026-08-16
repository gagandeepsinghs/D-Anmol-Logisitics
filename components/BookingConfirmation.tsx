'use client';

import React from 'react';
import Link from 'next/link';

interface BookingData {
  bookingNumber: string;
  serviceType: 'CAB' | 'TEMPO';
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  dropLocation: string;
  vehicleType: string;
  bookingDate: string;
  bookingTime: string;
  passengers?: number | null;
  goodsType?: string | null;
  estimatedWeight?: number | null;
  estimatedFare?: number | null;
  status: 'PENDING' | 'CONFIRMED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export default function BookingConfirmation({ booking }: { booking: BookingData }) {
  // Format Date cleanly
  const formattedDate = new Date(booking.bookingDate).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'COMPLETED':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'CANCELLED':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getVehicleLabel = (type: string) => {
    const labels: Record<string, string> = {
      hatchback: 'Hatchback (Alto, Nios, WagonR)',
      sedan: 'Sedan (Dzire, Aura, Etios)',
      suv: 'SUV (Ertiga, Innova)',
      premium: 'Premium Sedan/SUV',
      tempo: 'Tempo Traveller (12-20 Seater)',
      tata_ace: 'Tata Ace Gold',
      mahindra_supro: 'Mahindra Supro',
      pickup: 'Bolero Pickup',
      small_truck: 'Small Truck (4-Tyre)',
      medium_truck: 'Medium Truck (6-Tyre)',
    };
    return labels[type.toLowerCase()] || type;
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-6 sm:p-8 max-w-2xl mx-auto flex flex-col gap-6">
      
      {/* Success Banner */}
      <div className="text-center flex flex-col items-center gap-3 pb-5 border-b border-slate-100">
        <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 border border-green-200">
          {/* Check Circle SVG Icon */}
          <svg className="h-9 w-9 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex flex-col gap-1 mt-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Booking Request Submitted Successfully!
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Your request is currently under review by our operations department.
          </p>
        </div>
      </div>

      {/* Booking Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-1 text-sm bg-slate-50 rounded-xl p-5 border border-slate-100">
        {/* Booking ID */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Booking ID</span>
          <span className="font-mono font-bold text-slate-900">{booking.bookingNumber}</span>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Booking Status</span>
          <span className={`inline-flex self-start px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeClass(booking.status)}`}>
            {booking.status}
          </span>
        </div>

        {/* Service Type */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Service booked</span>
          <span className="font-bold text-slate-800">
            {booking.serviceType === 'CAB' ? '🚕 Passenger Cab' : '🚚 Tempo Goods Transport'}
          </span>
        </div>

        {/* Customer Name */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Customer Name</span>
          <span className="font-bold text-slate-800">{booking.customerName}</span>
        </div>

        {/* Vehicle Model */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Vehicle Model</span>
          <span className="font-bold text-slate-800">{getVehicleLabel(booking.vehicleType)}</span>
        </div>

        {/* Schedule */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Scheduled Date & Time</span>
          <span className="font-bold text-slate-800">{formattedDate} at {booking.bookingTime}</span>
        </div>

        {/* Pickup Location */}
        <div className="flex flex-col gap-0.5 sm:col-span-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Pickup Location</span>
          <span className="font-semibold text-slate-700 leading-relaxed">{booking.pickupLocation}</span>
        </div>

        {/* Drop Location */}
        <div className="flex flex-col gap-0.5 sm:col-span-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Drop Location</span>
          <span className="font-semibold text-slate-700 leading-relaxed">{booking.dropLocation}</span>
        </div>

        {/* Cab / Tempo Specific Fields */}
        {booking.serviceType === 'CAB' ? (
          booking.passengers && (
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Passengers</span>
              <span className="font-bold text-slate-800">{booking.passengers} Pax</span>
            </div>
          )
        ) : (
          <>
            {booking.goodsType && (
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Goods Description</span>
                <span className="font-bold text-slate-800">{booking.goodsType}</span>
              </div>
            )}
            {booking.estimatedWeight && (
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Est. Weight</span>
                <span className="font-bold text-slate-800">{booking.estimatedWeight} kg</span>
              </div>
            )}
          </>
        )}

        {/* Price estimation */}
        <div className="flex flex-col gap-0.5 border-t border-slate-200/80 pt-3 sm:col-span-2 mt-1">
          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Estimated Fare</span>
          <span className="text-lg font-black text-navy-950">
            {booking.estimatedFare ? `₹${booking.estimatedFare}` : 'Fare will be confirmed by operations team'}
          </span>
        </div>
      </div>

      {/* Info notice */}
      <p className="text-xs text-slate-500 leading-relaxed text-center px-4 bg-slate-50 rounded-lg py-3 border border-dashed border-slate-200">
        📌 <strong>Note:</strong> We will contact you at <strong>+91 {booking.customerPhone}</strong> within 15 minutes to confirm the driver details and final fare.
      </p>

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full border-t border-slate-100 pt-6">
        <Link
          href="/"
          className="flex-1 py-3 text-center border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-bold shadow-sm transition-colors cursor-pointer"
        >
          Back to Home
        </Link>
        <a
          href="tel:+919041687157"
          className="flex-1 py-3 text-center bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          {/* Phone Icon */}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Us Now
        </a>
      </div>

    </div>
  );
}
