#!/usr/bin/env bash
# Redeploy script for project VPKebanii
# Оптимизирован для работы с ограниченной памятью (< 1GB)
set -euo pipefail

# Resolve repo root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Detect docker compose command
COMPOSE_CMD="docker compose"
if ! docker compose version >/dev/null 2>&1; then
  if command -v docker-compose >/dev/null 2>&1; then
    COMPOSE_CMD="docker-compose"
  else
    echo "ERROR: docker compose not found" >&2
    exit 1
  fi
fi

# Check available memory
AVAILABLE_MEM=$(free -m | awk 'NR==2 {print $7}')
echo "Available memory: ${AVAILABLE_MEM}MB"
if [ "$AVAILABLE_MEM" -lt 300 ]; then
  echo "WARNING: Less than 300MB available. Build may fail."
  echo "Waiting 30 seconds... (Press Ctrl+C to cancel)"
  sleep 30
fi

echo "[1/6] Stopping containers (keeping images)..."
$COMPOSE_CMD stop || true

echo "[2/6] Removing old containers and volumes..."
$COMPOSE_CMD down --remove-orphans || true

echo "[3/6] Pruning unused Docker resources..."
docker image prune -f || true
docker system prune -f || true

echo "[4/6] Building containers with BuildKit (memory optimized)..."
export DOCKER_BUILDKIT=1
export BUILDKIT_PROGRESS=plain

# Build with memory limits
$COMPOSE_CMD build \
  --no-cache \
  --build-arg NODE_OPTIONS="--max-old-space-size=1024" \
  || {
    echo "Build failed. Trying with reduced memory..." >&2
    export NODE_OPTIONS="--max-old-space-size=512"
    $COMPOSE_CMD build --no-cache || exit 1
  }

echo "[5/6] Starting containers..."
$COMPOSE_CMD up -d

echo "[6/6] Waiting for services to be healthy..."
sleep 10

$COMPOSE_CMD ps

if $COMPOSE_CMD logs --tail=20 | grep -i error >/dev/null 2>&1; then
  echo ""
  echo "⚠️  WARNING: Errors detected in logs. Run: docker compose logs"
else
  echo ""
  echo "✅ Redeploy complete!"
fi
