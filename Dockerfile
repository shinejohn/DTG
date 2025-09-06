# Build stage - Updated to remove debug lines
FROM node:20-alpine AS builder

# Accept build arguments for Vite environment variables
ARG VITE_SITE_URL
ARG VITE_PRODUCT_NAME
ARG VITE_SITE_TITLE
ARG VITE_SITE_DESCRIPTION
ARG VITE_DEFAULT_LOCALE
ARG VITE_DEFAULT_THEME_MODE
ARG VITE_THEME_COLOR
ARG VITE_THEME_COLOR_DARK
ARG VITE_AUTH_PASSWORD
ARG VITE_AUTH_MAGIC_LINK
ARG VITE_DISPLAY_TERMS_AND_CONDITIONS_CHECKBOX
ARG VITE_BILLING_PROVIDER
ARG VITE_CMS_CLIENT
ARG VITE_KEYSTATIC_CONTENT_PATH
ARG VITE_LOCALES_PATH
ARG VITE_ENABLE_THEME_TOGGLE
ARG VITE_ENABLE_PERSONAL_ACCOUNT_DELETION
ARG VITE_ENABLE_PERSONAL_ACCOUNT_BILLING
ARG VITE_ENABLE_TEAM_ACCOUNTS_DELETION
ARG VITE_ENABLE_TEAM_ACCOUNTS_BILLING
ARG VITE_ENABLE_TEAM_ACCOUNTS
ARG VITE_ENABLE_TEAM_ACCOUNTS_CREATION
ARG VITE_LANGUAGE_PRIORITY
ARG VITE_ENABLE_SIDEBAR_TRIGGER
ARG VITE_ENABLE_NOTIFICATIONS
ARG VITE_REALTIME_NOTIFICATIONS
ARG VITE_ENABLE_VERSION_UPDATER
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_STRIPE_PUBLISHABLE_KEY
ARG EMAIL_SENDER
ARG EMAIL_HOST
ARG EMAIL_PORT
ARG EMAIL_USER
ARG EMAIL_PASSWORD
ARG EMAIL_TLS
ARG CONTACT_EMAIL
ARG MAILER_PROVIDER

# Set environment variables from build args
ENV VITE_SITE_URL=$VITE_SITE_URL
ENV VITE_PRODUCT_NAME=$VITE_PRODUCT_NAME
ENV VITE_SITE_TITLE=$VITE_SITE_TITLE
ENV VITE_SITE_DESCRIPTION=$VITE_SITE_DESCRIPTION
ENV VITE_DEFAULT_LOCALE=$VITE_DEFAULT_LOCALE
ENV VITE_DEFAULT_THEME_MODE=$VITE_DEFAULT_THEME_MODE
ENV VITE_THEME_COLOR=$VITE_THEME_COLOR
ENV VITE_THEME_COLOR_DARK=$VITE_THEME_COLOR_DARK
ENV VITE_AUTH_PASSWORD=$VITE_AUTH_PASSWORD
ENV VITE_AUTH_MAGIC_LINK=$VITE_AUTH_MAGIC_LINK
ENV VITE_DISPLAY_TERMS_AND_CONDITIONS_CHECKBOX=$VITE_DISPLAY_TERMS_AND_CONDITIONS_CHECKBOX
ENV VITE_BILLING_PROVIDER=$VITE_BILLING_PROVIDER
ENV VITE_CMS_CLIENT=$VITE_CMS_CLIENT
ENV VITE_KEYSTATIC_CONTENT_PATH=$VITE_KEYSTATIC_CONTENT_PATH
ENV VITE_LOCALES_PATH=$VITE_LOCALES_PATH
ENV VITE_ENABLE_THEME_TOGGLE=$VITE_ENABLE_THEME_TOGGLE
ENV VITE_ENABLE_PERSONAL_ACCOUNT_DELETION=$VITE_ENABLE_PERSONAL_ACCOUNT_DELETION
ENV VITE_ENABLE_PERSONAL_ACCOUNT_BILLING=$VITE_ENABLE_PERSONAL_ACCOUNT_BILLING
ENV VITE_ENABLE_TEAM_ACCOUNTS_DELETION=$VITE_ENABLE_TEAM_ACCOUNTS_DELETION
ENV VITE_ENABLE_TEAM_ACCOUNTS_BILLING=$VITE_ENABLE_TEAM_ACCOUNTS_BILLING
ENV VITE_ENABLE_TEAM_ACCOUNTS=$VITE_ENABLE_TEAM_ACCOUNTS
ENV VITE_ENABLE_TEAM_ACCOUNTS_CREATION=$VITE_ENABLE_TEAM_ACCOUNTS_CREATION
ENV VITE_LANGUAGE_PRIORITY=$VITE_LANGUAGE_PRIORITY
ENV VITE_ENABLE_SIDEBAR_TRIGGER=$VITE_ENABLE_SIDEBAR_TRIGGER
ENV VITE_ENABLE_NOTIFICATIONS=$VITE_ENABLE_NOTIFICATIONS
ENV VITE_REALTIME_NOTIFICATIONS=$VITE_REALTIME_NOTIFICATIONS
ENV VITE_ENABLE_VERSION_UPDATER=$VITE_ENABLE_VERSION_UPDATER
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_STRIPE_PUBLISHABLE_KEY=$VITE_STRIPE_PUBLISHABLE_KEY
ENV EMAIL_SENDER=$EMAIL_SENDER
ENV EMAIL_HOST=$EMAIL_HOST
ENV EMAIL_PORT=$EMAIL_PORT
ENV EMAIL_USER=$EMAIL_USER
ENV EMAIL_PASSWORD=$EMAIL_PASSWORD
ENV EMAIL_TLS=$EMAIL_TLS
ENV CONTACT_EMAIL=$CONTACT_EMAIL
ENV MAILER_PROVIDER=$MAILER_PROVIDER

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

# Install dependencies for native modules
RUN apk add --no-cache python3 make g++ cairo-dev pango-dev giflib-dev

WORKDIR /app

# Copy package files
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./

# Copy all workspace packages
COPY apps/web/package.json ./apps/web/
COPY packages/ ./packages/
COPY tooling/ ./tooling/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application source
COPY apps/ ./apps/
COPY packages/ ./packages/
COPY tooling/ ./tooling/

# Generate types and build the application
WORKDIR /app/apps/web
RUN pnpm react-router:typegen
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

# Accept runtime environment variables
ARG EMAIL_SENDER
ENV EMAIL_SENDER=$EMAIL_SENDER

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

# Create node user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

WORKDIR /app

# Copy package files
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nodejs:nodejs /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder --chown=nodejs:nodejs /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder --chown=nodejs:nodejs /app/turbo.json ./turbo.json
COPY --from=builder --chown=nodejs:nodejs /app/apps/web/package.json ./apps/web/package.json

# Copy workspace packages
COPY --from=builder --chown=nodejs:nodejs /app/packages ./packages
COPY --from=builder --chown=nodejs:nodejs /app/tooling ./tooling

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod --filter web...

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/apps/web/build ./apps/web/build
COPY --from=builder --chown=nodejs:nodejs /app/apps/web/public ./apps/web/public

# Copy environment files (if they exist) - Docker doesn't support optional copying
# Environment files should be provided at runtime or via build args instead of filesystem copy

# Switch to node user
USER nodejs

# Expose the port the app runs on
EXPOSE 3000

# Start the application
WORKDIR /app/apps/web
CMD ["pnpm", "run", "start"]