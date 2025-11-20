@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Быстрая сборка Docker образов...
echo.

REM Включить BuildKit для максимальной оптимизации
set DOCKER_BUILDKIT=1
set COMPOSE_DOCKER_CLI_BUILD=1
set BUILDKIT_PROGRESS=plain

REM Сборка с максимальным параллелизмом
echo [INFO] Сборка frontend и backend...
docker compose build ^
  --no-cache ^
  --parallel ^
  --build-arg NODE_OPTIONS="--max-old-space-size=8192"

if errorlevel 1 (
  echo [ERROR] Ошибка при сборке образов
  pause
  exit /b 1
)

echo.
echo ✅ Сборка завершена!
echo.
echo 📦 Экспорт образов...
echo.

REM Экспорт образов в архив
docker save ^
  vpkebanii/frontend:latest ^
  vpkebanii/backend:latest ^
  postgres:16-alpine ^
  caddy:2-alpine ^
  -o vpkebanii-images.tar

if errorlevel 1 (
  echo [ERROR] Ошибка при экспорте образов
  pause
  exit /b 1
)

echo.
echo ✅ Образы сохранены в vpkebanii-images.tar
echo.
echo 📊 Размер архива:
for %%A in (vpkebanii-images.tar) do echo   %%~zA байт

echo.
echo ✅ Готово к загрузке на сервер!
echo.
echo 📤 Для загрузки выполните:
echo   scp vpkebanii-images.tar root@wmpby:~/VPKebanii/
echo.
echo 🚀 На сервере выполните:
echo   cd ~/VPKebanii
echo   docker load -i vpkebanii-images.tar
echo   rm vpkebanii-images.tar
echo   docker compose down --remove-orphans
echo   docker compose up -d
echo   docker compose ps
echo.

pause
