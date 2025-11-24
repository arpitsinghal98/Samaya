import { type ActionFunctionArgs } from 'react-router';
import { db } from '~/db/server';
import { users } from '~/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword, generateVerificationToken, getTokenExpiry } from '~/services/auth.server';
import { sendVerificationEmail } from '~/services/email.server';
import { validateEmail, validatePassword } from '~/welcome/utils/validation';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validation
    const errors: Record<string, string> = {};

    if (!email || !validateEmail(email)) {
        errors.email = 'Please enter a valid email address';
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        errors.password = passwordValidation.errors[0] || 'Invalid password';
    }

    if (Object.keys(errors).length > 0) {
        return Response.json({ errors }, { status: 400 });
    }

    try {
        // Check if user already exists
        const [existingUser] = await db.select().from(users).where(eq(users.email, email));

        if (existingUser) {
            return Response.json({ errors: { email: 'An account with this email already exists' } }, { status: 400 });
        }

        // Generate username from email (before @)
        const username = email.split('@')[0] + '_' + Math.random().toString(36).substring(7);

        // Hash password
        const passwordHash = await hashPassword(password);

        // Generate verification token
        const verificationToken = generateVerificationToken();
        const verificationTokenExpiry = getTokenExpiry();

        // Create user
        const [newUser] = await db.insert(users).values({
            email,
            passwordHash,
            username,
            emailVerified: false,
            verificationToken,
            verificationTokenExpiry,
        }).returning();

        // Send verification email
        const baseUrl = new URL(request.url).origin;
        await sendVerificationEmail({
            email,
            token: verificationToken,
            baseUrl,
        });

        return Response.json({
            success: true,
            message: 'Account created! Please check your email to verify your account.'
        });

    } catch (error) {
        console.error('Signup error:', error);
        return Response.json({ errors: { general: 'An error occurred during signup. Please try again.' } }, { status: 500 });
    }
}
