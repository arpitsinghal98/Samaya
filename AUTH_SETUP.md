# Authentication Setup Guide

## Prerequisites

1. **PostgreSQL Database**: You need a PostgreSQL database running
2. **Resend Account**: Sign up at [resend.com](https://resend.com) and get your API key
3. **Node.js**: Version 18 or higher

## Setup Steps

### 1. Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` and add:

- `DATABASE_URL`: Your PostgreSQL connection string
- `SESSION_SECRET`: Generate with `openssl rand -base64 32`
- `RESEND_API_KEY`: Your Resend API key
- `APP_URL`: Your app URL (http://localhost:5173 for development)

### 2. Database Migration

Run the database migration to add the new verification token fields:

```bash
npm run db:push
```

This will update your database schema with:
- `verificationToken` field
- `verificationTokenExpiry` field

### 3. Install Dependencies

All dependencies should already be installed, but if needed:

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

## Testing the Authentication Flow

### Signup Flow

1. Click "Sign Up" button on landing page
2. Enter email and password (must meet requirements)
3. Click "Create Account"
4. Check your email for verification link
5. Click the verification link
6. You'll be redirected to the dashboard

### Login Flow

1. Click "Login" button on landing page
2. Enter your email and password
3. Click "Sign In"
4. If email is verified, you'll be redirected to dashboard
5. If not verified, you'll see an error message

### Email Verification

- Verification links expire after 24 hours
- If you try to verify with an expired token, you'll see an error
- Already verified emails will automatically log you in

## API Endpoints

- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login existing user
- `GET /api/auth/verify-email?token=xxx` - Verify email
- `POST /api/auth/logout` - Logout user

## Security Features

✅ Password hashing with bcrypt (10 rounds)  
✅ Email verification required before login  
✅ Secure session cookies (httpOnly, sameSite)  
✅ Verification token expiry (24 hours)  
✅ Password requirements enforced  

## Troubleshooting

### "Cannot find module '~/db'"

Make sure your `tsconfig.json` has the path alias configured:

```json
{
  "compilerOptions": {
    "paths": {
      "~/*": ["./app/*"]
    }
  }
}
```

### Emails not sending

1. Check your `RESEND_API_KEY` is correct
2. Verify your domain is verified in Resend
3. Check the server console for error messages

### Database connection errors

1. Verify `DATABASE_URL` is correct
2. Ensure PostgreSQL is running
3. Check database credentials

## Next Steps

- [ ] Add password reset functionality
- [ ] Implement OAuth (Google, Microsoft)
- [ ] Add rate limiting for signup/login
- [ ] Email verification resend functionality
- [ ] Remember me checkbox
