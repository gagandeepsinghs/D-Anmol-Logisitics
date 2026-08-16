import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import BookingConfirmation from '@/components/BookingConfirmation';

interface ConfirmPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingConfirmPage({ params }: ConfirmPageProps) {
  const { id } = await params;

  // Search by UUID or by custom Booking Number (e.g. CAB-2026-00001)
  const booking = await prisma.booking.findFirst({
    where: {
      OR: [
        { id: id },
        { bookingNumber: id.toUpperCase() },
      ],
    },
  });

  if (!booking) {
    notFound();
  }

  // Map to the plain serializable object for the client component
  const serializableBooking = {
    bookingNumber: booking.bookingNumber,
    serviceType: booking.serviceType as 'CAB' | 'TEMPO',
    customerName: booking.customerName,
    customerPhone: booking.customerPhone,
    pickupLocation: booking.pickupLocation,
    dropLocation: booking.dropLocation,
    vehicleType: booking.vehicleType,
    bookingDate: booking.bookingDate.toISOString(),
    bookingTime: booking.bookingTime,
    passengers: booking.passengers,
    goodsType: booking.goodsType,
    estimatedWeight: booking.estimatedWeight,
    estimatedFare: booking.estimatedFare,
    status: booking.status as 'PENDING' | 'CONFIRMED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[70vh] flex items-center justify-center">
      <div className="w-full">
        <BookingConfirmation booking={serializableBooking} />
      </div>
    </div>
  );
}
