import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth-session';

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

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // 2. Fetch counts in parallel
    const [
      total,
      today,
      pending,
      completed,
      cab,
      tempo,
    ] = await prisma.$transaction([
      prisma.booking.count(),
      prisma.booking.count({
        where: {
          createdAt: {
            gte: startOfToday,
          },
        },
      }),
      prisma.booking.count({
        where: {
          status: 'PENDING',
        },
      }),
      prisma.booking.count({
        where: {
          status: 'COMPLETED',
        },
      }),
      prisma.booking.count({
        where: {
          serviceType: 'CAB',
        },
      }),
      prisma.booking.count({
        where: {
          serviceType: 'TEMPO',
        },
      }),
    ]);

    return NextResponse.json({
      total,
      today,
      pending,
      completed,
      cab,
      tempo,
    });
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve statistics.' },
      { status: 500 }
    );
  }
}
