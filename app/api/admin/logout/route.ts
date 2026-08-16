import { NextResponse } from 'next/server';
import { clearAdminSessionCookie } from '@/lib/auth-session';

export async function POST() {
  try {
    await clearAdminSessionCookie();
    return NextResponse.json({ message: 'Logged out successfully.' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'An error occurred during logout.' },
      { status: 500 }
    );
  }
}
