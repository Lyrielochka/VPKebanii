@echo off
REM Redeploy script for project VPKebanii
REM Русский: Удаляет предыдущие контейнеры, ставит зависимости и запускает новую сборку.
REM English: Removes previous containers/images, installs deps, rebuilds and starts fresh containers.
SETLOCAL ENABLEDELAYEDEXPANSION

REM Determine script directory (repo root)
set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%"

REM Prefer 'docker compose' if available
set COMPOSE_CMD=docker compose
for /f "tokens=*" %%i in ('docker compose version 2^>nul') do set FOUND=1
if not defined FOUND (
  for /f "tokens=*" %%i in ('docker-compose version 2^>nul') do set COMPOSE_CMD=docker-compose
)

echo [1/6] Stopping and removing previous containers/images...
%COMPOSE_CMD% down --rmi local --volumes --remove-orphans 2>nul

echo [2/6] Pruning dangling images (optional)...
docker image prune -f 1>nul 2>nul

echo [3/6] Installing frontend dependencies (my-app)...
cd /d "%SCRIPT_DIR%my-app"
if not exist package.json (
  echo package.json not found in my-app
  exit /b 1
)
npm install || exit /b 1

echo [4/6] Installing backend dependencies (nodeapi)...
cd /d "%SCRIPT_DIR%nodeapi"
if not exist package.json (
  echo package.json not found in nodeapi
  exit /b 1
)
npm install || exit /b 1

cd /d "%SCRIPT_DIR%"

echo [5/6] Building containers with --no-cache...
%COMPOSE_CMD% build --no-cache || exit /b 1

echo [6/6] Starting containers (detached)...
%COMPOSE_CMD% up -d || exit /b 1

echo Redeploy complete. Use "docker compose ps" to check status.
ENDLOCAL