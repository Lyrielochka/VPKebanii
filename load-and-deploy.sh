#!/usr/bin/env bash
set -euo pipefail

cd ~/VPKebanii

echo "Loading Docker images..."
docker load -i vpkebanii-images.tar
rm vpkebanii-images.tar

echo "Images loaded!"
echo ""
echo "Starting containers..."

docker-compose down || true
docker-compose up -d

echo "Waiting for services to start (15 sec)..."
sleep 15

echo ""
echo "Container status:"
docker-compose ps

echo ""
echo "Deploy completed!"
echo ""
echo "Website available at:"
echo "  https://wmp.by"
