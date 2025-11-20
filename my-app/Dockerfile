# Multi-stage Dockerfile for React frontend (my-app) - ОПТИМИЗИРОВАН ДЛЯ СКОРОСТИ
FROM node:20-alpine AS build
WORKDIR /app

# Максимально использовать памяти при сборке (нет ограничений)
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Кэш npm packages между сборками
COPY package*.json ./
RUN npm install --prefer-offline --no-audit --no-fund

COPY . .

# Параллельная сборка
RUN npm run build -- --parallel 4

# Минимизировать финальный образ
RUN rm -rf node_modules src public tsconfig.json .eslintrc* .gitignore .env* && \
    find build -name "*.map" -delete

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache curl && \
    npm install -g serve@14 --no-save

COPY --from=build /app/build ./build

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["serve", "-s", "build", "-l", "3000"]
