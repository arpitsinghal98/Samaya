import { type ActionFunctionArgs } from 'react-router';
import { db } from '~/db/server';
import { users } from '~/db/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword, createUserSession } from '~/services/auth.server';
import { validateEmail } from '~/welcome/utils/validation';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validation
    const errors: Record<string, string> = {};

    if (!email || !validateEmail(email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!password) {
        errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
        return Response.json({ errors }, { status: 400 });
    }

    try {
        // Find user by email
        const [user] = await db.select().from(users).where(eq(users.email, email));

        if (!user || !user.passwordHash) {
            return Response.json({ errors: { email: 'Invalid email or password' } }, { status: 401 });
        }

        // Check if email is verified
        if (!user.emailVerified) {
            return Response.json({
                errors: { email: 'Please verify your email address before logging in. Check your inbox for the verification link.' }
            }, { status: 403 });
        }

        // Verify password
        const isValidPassword = await verifyPassword(password, user.passwordHash);

        if (!isValidPassword) {
            return Response.json({ errors: { password: 'Invalid email or password' } }, { status: 401 });
        }

        // Create session and redirect to dashboard
        return createUserSession(user.id, '/dashboard');

    } catch (error) {
        console.error('Login error:', error);
        return Response.json({ errors: { general: 'An error occurred during login. Please try again.' } }, { status: 500 });
    }
}
