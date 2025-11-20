@echo off
setlocal enabledelayedexpansion

echo.
echo Rapid Docker image build...
echo.

REM Enable BuildKit
set DOCKER_BUILDKIT=1
set COMPOSE_DOCKER_CLI_BUILD=1
set BUILDKIT_PROGRESS=plain

REM Build
echo [INFO] Building frontend and backend...
docker compose build ^
  --no-cache ^
  --parallel ^
  --build-arg NODE_OPTIONS="--max-old-space-size=8192"

if errorlevel 1 (
  echo [ERROR] Build failed
  pause
  exit /b 1
)

echo.
echo [SUCCESS] Build completed!
echo.
echo [INFO] Exporting images...
echo.

REM Export
docker save ^
  vpkebanii-frontend:latest ^
  vpkebanii-backend:latest ^
  -o vpkebanii-images.tar

if errorlevel 1 (
  echo [ERROR] Export failed
  pause
  exit /b 1
)

echo.
echo [SUCCESS] Images saved to vpkebanii-images.tar
echo.
echo [INFO] Archive size:
for %%A in (vpkebanii-images.tar) do (
  set /A size=%%~zA / 1048576
  echo   !size! MB
)

echo.
echo [SUCCESS] Ready to upload to server!
echo.
echo [NEXT STEP] Upload archive:
echo   scp vpkebanii-images.tar root@wmpby:~/VPKebanii/
echo.
echo [NEXT STEP] On server run:
echo   cd ~/VPKebanii
echo   docker load -i vpkebanii-images.tar
echo   rm vpkebanii-images.tar
echo   docker compose down --remove-orphans
echo   docker compose up -d
echo   docker compose ps
echo.

pause
