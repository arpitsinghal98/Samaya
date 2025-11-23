import { pgTable, uuid, varchar, text, boolean, timestamp, index, uniqueIndex } from 'drizzle-orm/pg-core';

// ==================== USERS TABLE ====================
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Basic Info
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }), // NULL for OAuth-only users
  // Note: Application logic must ensure users have either passwordHash OR an oauth_connections record
  username: varchar('username', { length: 50 }).notNull().unique(),
  fullName: varchar('full_name', { length: 255 }),
  avatarUrl: text('avatar_url'), // Gravatar or OAuth profile pic
  
  // Settings
  timezone: varchar('timezone', { length: 100 }).default('UTC'),
  
  // Account Status
  emailVerified: boolean('email_verified').default(false),
  isActive: boolean('is_active').default(true),
  
  // Subscription (for future)
  subscriptionTier: varchar('subscription_tier', { length: 50 }).default('free'), // free, pro, business
  
  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
}, (table) => ({
  emailIdx: index('idx_users_email').on(table.email),
  usernameIdx: index('idx_users_username').on(table.username),
}));

// ==================== OAUTH CONNECTIONS TABLE ====================
// Tracks Google/Microsoft OAuth connections + permissions
export const oauthConnections = pgTable('oauth_connections', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  // OAuth Provider Info
  provider: varchar('provider', { length: 50 }).notNull(), // 'google' or 'microsoft'
  providerUserId: varchar('provider_user_id', { length: 255 }).notNull(), // Google/MS user ID
  
  // Tokens
  // SECURITY: These tokens should be encrypted at the application layer before storage
  // Consider using AES-256-GCM encryption with a key from environment variables
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  tokenExpiresAt: timestamp('token_expires_at', { withTimezone: true }),
  
  // 🔑 IMPORTANT: Track what permissions user granted
  scope: text('scope'), // e.g., "openid email profile https://www.googleapis.com/auth/calendar"
  
  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
}, (table) => ({
  // Ensure one connection per provider per user
  providerIdx: uniqueIndex('idx_oauth_provider').on(table.provider, table.providerUserId),
  userIdx: index('idx_oauth_user').on(table.userId),
}));