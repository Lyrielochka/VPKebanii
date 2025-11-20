#!/usr/bin/env bash
# Redeploy script for project VPKebanii
# Русский: Скрипт удаляет предыдущую версию контейнеров, устанавливает зависимости и запускает новую сборку.
# English: Removes previous containers/images, installs deps, rebuilds and starts fresh containers.
set -euo pipefail

# Resolve repo root (directory of this script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

COMPOSE_CMD="docker compose"  # Fallback to docker-compose if needed
if ! docker compose version >/dev/null 2>&1; then
  if command -v docker-compose >/dev/null 2>&1; then
    COMPOSE_CMD="docker-compose"
  fi
fi

echo "[1/6] Stopping and removing previous containers/images..."
$COMPOSE_CMD down --rmi local --volumes --remove-orphans || true

echo "[2/6] Pruning dangling images (optional)..."
docker image prune -f || true

echo "[3/6] Installing frontend dependencies (my-app)..."
cd "$SCRIPT_DIR/my-app"
if [ ! -f package.json ]; then
  echo "package.json not found in my-app" >&2
  exit 1
fi
npm install

echo "[4/6] Installing backend dependencies (nodeapi)..."
cd "$SCRIPT_DIR/nodeapi"
if [ ! -f package.json ]; then
  echo "package.json not found in nodeapi" >&2
  exit 1
fi
npm install

cd "$SCRIPT_DIR"

echo "[5/6] Building containers with --no-cache..."
$COMPOSE_CMD build --no-cache

echo "[6/6] Starting containers (detached)..."
$COMPOSE_CMD up -d

echo "Redeploy complete. Use 'docker compose ps' to check status."