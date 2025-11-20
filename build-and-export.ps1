# Requires admin privileges
# If scripts are forbidden, run:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

Write-Host "`nRapid Docker image build..." -ForegroundColor Cyan
Write-Host "`n"

# Enable BuildKit
$env:DOCKER_BUILDKIT = "1"
$env:COMPOSE_DOCKER_CLI_BUILD = "1"
$env:BUILDKIT_PROGRESS = "plain"

# Generate timestamp
$timestamp = Get-Date -Format 'yyyyMMdd-HHmm'
Write-Host "[INFO] Build timestamp: $timestamp" -ForegroundColor Yellow

# Build using docker-compose.build.yml
Write-Host "[INFO] Building frontend and backend..." -ForegroundColor Blue
docker-compose -f docker-compose.build.yml build `
  --no-cache `
  --parallel `
  --build-arg NODE_OPTIONS="--max-old-space-size=8192" `
  --build-arg BUST_CACHE="$(Get-Random)"

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Build failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`n[SUCCESS] Build completed!" -ForegroundColor Green
Write-Host "`n[INFO] Exporting images...`n" -ForegroundColor Cyan

# Export with timestamp
$archiveName = "vpkebanii-images-$timestamp.tar"
docker save `
  vpkebanii/frontend:latest `
  vpkebanii/backend:latest `
  -o $archiveName

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Export failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`n[SUCCESS] Images saved to $archiveName" -ForegroundColor Green

# File size
$fileSize = (Get-Item $archiveName).Length
$fileSizeMB = [math]::Round($fileSize / 1MB, 2)
Write-Host "`n[INFO] Archive size: $fileSizeMB MB" -ForegroundColor Yellow

Write-Host "`n[SUCCESS] Ready to upload to server!" -ForegroundColor Green
Write-Host "`n[NEXT STEP] Upload archive:" -ForegroundColor Cyan
Write-Host "  scp $archiveName root@wmpby:~/VPKebanii/" -ForegroundColor White

Write-Host "`n[NEXT STEP] On server run:" -ForegroundColor Cyan
Write-Host "  cd ~/VPKebanii" -ForegroundColor White
Write-Host "  docker load -i $archiveName" -ForegroundColor White
Write-Host "  rm $archiveName" -ForegroundColor White
Write-Host "  docker-compose down" -ForegroundColor White
Write-Host "  docker-compose up -d" -ForegroundColor White
Write-Host "  docker-compose ps" -ForegroundColor White

Write-Host "`n"
Read-Host "Press Enter to exit"
