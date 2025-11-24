import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { createCookieSessionStorage, redirect } from 'react-router';
import { db } from '~/db/server';
import { users } from '~/db/schema';
import { eq } from 'drizzle-orm';

// ==================== PASSWORD HASHING ====================

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

// ==================== VERIFICATION TOKENS ====================

export function generateVerificationToken(): string {
    return randomBytes(32).toString('hex');
}

export function getTokenExpiry(): Date {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24); // 24 hours from now
    return expiry;
}

// ==================== SESSION MANAGEMENT ====================

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set in environment variables');
}

const storage = createCookieSessionStorage({
    cookie: {
        name: 'samaya_session',
        secure: process.env.NODE_ENV === 'production',
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
    },
});

export async function createUserSession(userId: string, redirectTo: string) {
    const session = await storage.getSession();
    session.set('userId', userId);

    // Update last login time
    await db.update(users)
        .set({ lastLoginAt: new Date() })
        .where(eq(users.id, userId));

    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    });
}

export async function getUserSession(request: Request) {
    return storage.getSession(request.headers.get('Cookie'));
}

export async function getUserId(request: Request): Promise<string | null> {
    const session = await getUserSession(request);
    const userId = session.get('userId');
    if (!userId || typeof userId !== 'string') return null;
    return userId;
}

export async function requireUserId(request: Request, redirectTo: string = '/') {
    const userId = await getUserId(request);
    if (!userId) {
        throw redirect(redirectTo);
    }
    return userId;
}

export async function getUser(request: Request) {
    const userId = await getUserId(request);
    if (!userId) return null;

    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user || null;
}

export async function requireUser(request: Request) {
    const userId = await requireUserId(request);
    const [user] = await db.select().from(users).where(eq(users.id, userId));

    if (!user) {
        throw redirect('/');
    }

    return user;
}

export async function logout(request: Request) {
    const session = await getUserSession(request);
    return redirect('/', {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        },
    });
}
