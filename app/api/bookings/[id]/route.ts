import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth-session';

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Search by either ID (UUID) or Booking Number (e.g., CAB-2026-00001)
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { id: id },
          { bookingNumber: id.toUpperCase() },
        ],
      },
    });

    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve booking information.' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1. Authorize Admin
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { status } = body;

    const validStatuses = ['PENDING', 'CONFIRMED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
    if (!status || !validStatuses.includes(status.toUpperCase())) {
      return NextResponse.json(
        { message: 'Invalid status value.' },
        { status: 400 }
      );
    }

    // 2. Check if booking exists
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { id: id },
          { bookingNumber: id.toUpperCase() },
        ],
      },
    });

    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found.' },
        { status: 404 }
      );
    }

    // 3. Update status
    const updatedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: { status: status.toUpperCase() as BookingStatus },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { message: 'Failed to update booking status.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1. Authorize Admin
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    // 2. Check if booking exists
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { id: id },
          { bookingNumber: id.toUpperCase() },
        ],
      },
    });

    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found.' },
        { status: 404 }
      );
    }

    // 3. Delete booking
    await prisma.booking.delete({
      where: { id: booking.id },
    });

    return NextResponse.json({ message: 'Booking deleted successfully.' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { message: 'Failed to delete booking.' },
      { status: 500 }
    );
  }
}
