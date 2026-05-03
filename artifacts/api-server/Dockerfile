# Stage 1: Build
FROM node:22-slim AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace configuration and dependencies
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY artifacts/api-server/package.json ./artifacts/api-server/
# Copy necessary libraries for the backend
COPY lib/ ./lib/

# Install dependencies for the entire workspace (needed for local library linking)
RUN pnpm install --frozen-lockfile

# Copy backend source code
COPY artifacts/api-server/ ./artifacts/api-server/

# Build the backend
RUN pnpm --filter @workspace/api-server run build

# Stage 2: Run
FROM node:22-slim
WORKDIR /app

# Copy built assets and node_modules from builder
COPY --from=builder /app /app

# Clean up unnecessary directories to reduce image size
RUN rm -rf artifacts/election-guide artifacts/mockup-sandbox scripts lib/*/src

# Environment configuration
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# The built file is at artifacts/api-server/dist/index.mjs
# We use node directly to avoid pnpm overhead at runtime
CMD ["node", "--enable-source-maps", "./artifacts/api-server/dist/index.mjs"]
