import crypto from 'crypto';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'danmol_admin_session';
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Get secret from environment or fallback for development
const getSecret = () => {
  return process.env.ADMIN_SECRET || process.env.NEXTAUTH_SECRET || 'danmol_default_secret_key_123456789_danmol';
};

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
  expiresAt: number;
}

/**
 * Hashes a password using PBKDF2.
 * Returns "salt:hash"
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verifies a password against a stored "salt:hash"
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split(':');
  if (parts.length !== 2) return false;
  const [salt, hash] = parts;
  const testHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return testHash === hash;
}

/**
 * Creates a signed session token.
 */
export function createSessionToken(payload: Omit<SessionPayload, 'expiresAt'>): string {
  const secret = getSecret();
  const fullPayload: SessionPayload = {
    ...payload,
    expiresAt: Date.now() + SESSION_EXPIRY,
  };
  
  const payloadStr = JSON.stringify(fullPayload);
  const payloadBase64 = Buffer.from(payloadStr).toString('base64');
  
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payloadBase64)
    .digest('hex');
    
  return `${payloadBase64}.${signature}`;
}

/**
 * Verifies a signed session token and returns the payload.
 */
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const secret = getSecret();
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    
    const [payloadBase64, signature] = parts;
    
    // Validate signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payloadBase64)
      .digest('hex');
      
    if (expectedSignature !== signature) return null;
    
    // Parse payload
    const payloadStr = Buffer.from(payloadBase64, 'base64').toString('utf8');
    const payload: SessionPayload = JSON.parse(payloadStr);
    
    // Check expiry
    if (payload.expiresAt < Date.now()) return null;
    
    return payload;
  } catch {
    return null;
  }
}

/**
 * Gets the current admin session from request cookies.
 */
export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie) return null;
  
  const payload = verifySessionToken(sessionCookie.value);
  if (!payload || payload.role !== 'ADMIN') return null;
  
  return payload;
}

/**
 * Sets the admin session cookie.
 */
export async function setAdminSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 24 hours in seconds
    path: '/',
  });
}

/**
 * Clears the admin session cookie.
 */
export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
