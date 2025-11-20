# Multi-stage Dockerfile for nodeapi (TypeScript Express backend) - ОПТИМИЗИРОВАН
FROM node:20-alpine AS build
WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=8192"

COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --no-fund

COPY tsconfig.json ./
COPY src ./src
COPY public ./public

# Параллельная компиляция TypeScript
RUN npx tsc -p tsconfig.json --incremental

# Удалить dev зависимости
RUN npm prune --production

# Очистить от ненужных файлов
RUN find . -name "*.ts" -delete && \
    find . -name "*.map" -delete && \
    find node_modules -name "*.test.js" -delete

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache curl

COPY package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

CMD ["node", "dist/app.js"]
