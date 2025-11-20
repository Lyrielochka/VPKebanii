# Multi-stage Dockerfile for nodeapi (TypeScript Express backend)
FROM node:20-alpine AS build
WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=2048"

# Install all dependencies (including dev) for build
COPY package*.json ./
RUN npm install --no-audit --no-fund --prefer-offline --no-optional

# Copy source and build
COPY tsconfig.json ./
COPY src ./src
COPY public ./public

RUN npx tsc -p tsconfig.json

# Remove dev dependencies to slim down for runtime
RUN npm prune --production

### Runtime image
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install curl for healthcheck
RUN apk add --no-cache curl

COPY package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD curl -f http://localhost:3001/health || exit 1

CMD ["node", "dist/app.js"]
