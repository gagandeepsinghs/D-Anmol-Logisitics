import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, createSessionToken, setAdminSessionCookie } from '@/lib/auth-session';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Find user with ADMIN role
    const user = await prisma.user.findFirst({
      where: {
        email: email.trim().toLowerCase(),
        role: 'ADMIN',
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials or unauthorized.' },
        { status: 401 }
      );
    }

    // Verify Password hash
    const isValid = verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid credentials or unauthorized.' },
        { status: 401 }
      );
    }

    // Create session token and cookie
    const token = createSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    await setAdminSessionCookie(token);

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error('Admin login API error:', error);
    return NextResponse.json(
      { message: 'An error occurred during authentication.' },
      { status: 500 }
    );
  }
}
