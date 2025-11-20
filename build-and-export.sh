#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Быстрая сборка Docker образов..."

# Включить BuildKit для максимальной оптимизации
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1
export BUILDKIT_PROGRESS=plain

# Сборка с максимальным параллелизмом
docker compose build \
  --no-cache \
  --parallel \
  --build-arg NODE_OPTIONS="--max-old-space-size=8192"

echo "✅ Сборка завершена!"
echo ""
echo "📦 Экспорт образов..."

# Экспорт образов в архив
docker save \
  vpkebanii/frontend:latest \
  vpkebanii/backend:latest \
  postgres:16-alpine \
  caddy:2-alpine \
  -o vpkebanii-images.tar

echo "✅ Образы сохранены в vpkebanii-images.tar"
echo ""
echo "📊 Размер архива:"
ls -lh vpkebanii-images.tar

echo ""
echo "✅ Готово к загрузке на сервер!"
echo ""
echo "📤 Для загрузки выполните:"
echo "  scp vpkebanii-images.tar root@wmpby:~/VPKebanii/"
echo ""
echo "🚀 На сервере выполните:"
echo "  cd ~/VPKebanii"
echo "  docker load -i vpkebanii-images.tar"
echo "  rm vpkebanii-images.tar"
echo "  docker compose down --remove-orphans"
echo "  docker compose up -d"
echo "  docker compose ps"
