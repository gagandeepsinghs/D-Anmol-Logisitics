import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth-session';
import { validateCabBooking, validateTempoBooking } from '@/lib/validations';
import { calculateCabFare, calculateTempoFare } from '@/lib/fare-calculator';

// Admin GET all bookings
export async function GET() {
  try {
    // 1. Authorize Admin
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    // 2. Fetch all bookings sorted by newest first
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve bookings list.' },
      { status: 500 }
    );
  }
}

// Public booking creation
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceType } = body;

    if (!serviceType || (serviceType !== 'CAB' && serviceType !== 'TEMPO')) {
      return NextResponse.json(
        { message: 'Invalid service type. Must be CAB or TEMPO.' },
        { status: 400 }
      );
    }

    // 1. Server-side validation
    let validationResult;
    if (serviceType === 'CAB') {
      validationResult = validateCabBooking(body);
    } else {
      validationResult = validateTempoBooking(body);
    }

    if (!validationResult.success) {
      return NextResponse.json(
        { errors: validationResult.errors },
        { status: 400 }
      );
    }

    // 2. Generate sequential booking number
    const currentYear = new Date().getFullYear();
    const prefix = serviceType === 'CAB' ? 'CAB' : 'TMP';
    
    // Count bookings of this type created in the current year to determine sequence
    const yearPrefix = `${prefix}-${currentYear}-`;
    const count = await prisma.booking.count({
      where: {
        serviceType: serviceType,
        bookingNumber: {
          startsWith: yearPrefix,
        },
      },
    });

    const nextSequence = String(count + 1).padStart(5, '0');
    const bookingNumber = `${yearPrefix}${nextSequence}`;

    // 3. Calculate Estimated Fare
    let estimatedFare: number | null = null;
    const distanceKm = body.distanceKm ? parseFloat(body.distanceKm) : undefined;
    
    if (serviceType === 'CAB') {
      estimatedFare = calculateCabFare(body.vehicleType, distanceKm);
    } else {
      estimatedFare = calculateTempoFare(body.vehicleType, distanceKm);
    }

    // 4. Save booking to database
    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        serviceType,
        customerName: body.customerName.trim(),
        customerPhone: body.customerPhone.trim(),
        customerEmail: body.customerEmail ? body.customerEmail.trim() : null,
        pickupLocation: body.pickupLocation.trim(),
        dropLocation: body.dropLocation.trim(),
        vehicleType: body.vehicleType,
        bookingDate: new Date(body.bookingDate),
        bookingTime: body.bookingTime.trim(),
        passengers: serviceType === 'CAB' ? parseInt(body.passengers) : null,
        goodsType: serviceType === 'TEMPO' ? body.goodsType.trim() : null,
        estimatedWeight: serviceType === 'TEMPO' && body.estimatedWeight ? parseFloat(body.estimatedWeight) : null,
        additionalRequirements: body.additionalRequirements ? body.additionalRequirements.trim() : null,
        estimatedFare,
        status: 'PENDING',
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your booking request. Please try again.' },
      { status: 500 }
    );
  }
}
