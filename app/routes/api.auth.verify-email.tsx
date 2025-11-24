import { type LoaderFunctionArgs } from 'react-router';
import { db } from '~/db/server';
import { users } from '~/db/schema';
import { eq } from 'drizzle-orm';
import { createUserSession } from '~/services/auth.server';
import { sendWelcomeEmail } from '~/services/email.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    if (!token) {
        return Response.json({ error: 'Verification token is missing' }, { status: 400 });
    }

    try {
        // Find user by verification token
        const [user] = await db.select().from(users).where(eq(users.verificationToken, token));

        if (!user) {
            return Response.json({ error: 'Invalid verification token' }, { status: 400 });
        }

        // Check if already verified
        if (user.emailVerified) {
            // Already verified, just log them in
            return createUserSession(user.id, '/dashboard');
        }

        // Check token expiry
        if (user.verificationTokenExpiry && new Date() > user.verificationTokenExpiry) {
            return Response.json({ error: 'Verification token has expired. Please request a new one.' }, { status: 400 });
        }

        // Update user - mark as verified and clear token
        await db.update(users)
            .set({
                emailVerified: true,
                verificationToken: null,
                verificationTokenExpiry: null,
            })
            .where(eq(users.id, user.id));

        // Send welcome email
        await sendWelcomeEmail({
            email: user.email,
            name: user.fullName || undefined
        });

        // Create session and redirect to dashboard
        return createUserSession(user.id, '/dashboard');

    } catch (error) {
        console.error('Email verification error:', error);
        return Response.json({ error: 'An error occurred during verification. Please try again.' }, { status: 500 });
    }
}
