#!/usr/bin/env bash
set -euo pipefail

echo ""
echo "Rapid Docker image build..."
echo ""

# Enable BuildKit
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1
export BUILDKIT_PROGRESS=plain

# Build
echo "[INFO] Building frontend and backend..."
docker compose build \
  --no-cache \
  --parallel \
  --build-arg NODE_OPTIONS="--max-old-space-size=8192"

echo ""
echo "[SUCCESS] Build completed!"
echo ""
echo "[INFO] Exporting images..."
echo ""

# Export
docker save \
  vpkebanii-frontend:latest \
  vpkebanii-backend:latest \
  -o vpkebanii-images.tar

echo ""
echo "[SUCCESS] Images saved to vpkebanii-images.tar"
echo ""
echo "[INFO] Archive size:"
ls -lh vpkebanii-images.tar | awk '{print "  " $5}'

echo ""
echo "[SUCCESS] Ready to upload to server!"
echo ""
echo "[NEXT STEP] Upload archive:"
echo "  scp vpkebanii-images.tar root@wmpby:~/VPKebanii/"
echo ""
echo "[NEXT STEP] On server run:"
echo "  cd ~/VPKebanii"
echo "  docker load -i vpkebanii-images.tar"
echo "  rm vpkebanii-images.tar"
echo "  docker compose down --remove-orphans"
echo "  docker compose up -d"
echo "  docker compose ps"
echo ""
