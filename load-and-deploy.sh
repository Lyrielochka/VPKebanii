#!/usr/bin/env bash
set -euo pipefail

cd ~/VPKebanii

# Find the latest tar file
ARCHIVE=$(ls -t vpkebanii-images-*.tar 2>/dev/null | head -1)

if [ -z "$ARCHIVE" ]; then
    echo "[ERROR] No vpkebanii-images-*.tar file found"
    exit 1
fi

echo "Loading Docker images from $ARCHIVE..."
docker load -i "$ARCHIVE"

# Keep archive for reference, but you can delete it
# rm "$ARCHIVE"

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
echo ""
echo "Used archive: $ARCHIVE"
