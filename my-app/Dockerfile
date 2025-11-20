### Multi-stage Dockerfile for React frontend (my-app)
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache curl
RUN npm install -g serve@14
COPY --from=build /app/build ./build

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD curl -f http://localhost:3000/ || exit 1

CMD ["serve", "-s", "build", "-l", "3000"]