# Build stage
FROM node:20-alpine AS builder

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
COPY . .

# Generate types and build the application
WORKDIR /app/apps/web
RUN pnpm react-router:typegen
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

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

# Copy environment files (if they exist)
COPY --from=builder --chown=nodejs:nodejs /app/apps/web/.env* ./apps/web/ || true
COPY --from=builder --chown=nodejs:nodejs /app/.env* ./ || true

# Switch to node user
USER nodejs

# Expose the port the app runs on
EXPOSE 3000

# Start the application
WORKDIR /app/apps/web
CMD ["pnpm", "run", "start"]