# Stage 1: Build
FROM node:22-slim AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY artifacts/api-server/package.json ./artifacts/api-server/
COPY lib/ ./lib/
RUN pnpm install --frozen-lockfile

COPY artifacts/api-server/ ./artifacts/api-server/
RUN npx pnpm --filter @workspace/api-server run build
RUN npx pnpm --filter @workspace/api-server --prod deploy --legacy /app/deployed

# Stage 2: Run
FROM node:22-slim
WORKDIR /app
COPY --from=builder /app/deployed ./
COPY --from=builder /app/artifacts/api-server/dist ./dist

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Use absolute path to node to be 100% sure
CMD ["/usr/local/bin/node", "dist/index.mjs"]
