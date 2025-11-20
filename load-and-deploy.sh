#!/usr/bin/env bash
set -euo pipefail

echo "📦 Загрузка Docker образов..."
docker load -i vpkebanii-images.tar
rm vpkebanii-images.tar

echo "✅ Образы загружены!"
echo ""

cd ~/VPKebanii

echo "🚀 Запуск контейнеров..."
docker compose down --remove-orphans || true
docker compose up -d

echo "⏳ Ожидание запуска сервисов..."
sleep 10

docker compose ps

echo "✅ Деплой завершен!"
docker compose logs --tail=20
