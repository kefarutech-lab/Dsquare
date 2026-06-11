#!/bin/bash
# Run this on the VPS after uploading files to /home/kefaru/dsquare
# Usage: bash deploy.sh

set -e
cd /home/kefaru/dsquare

echo ">>> Installing server dependencies..."
cd server && npm install --omit=dev && cd ..

echo ">>> Installing client dependencies..."
cd client && npm install && npm run build && cd ..

echo ">>> Starting / reloading PM2..."
pm2 startOrRestart ecosystem.config.js --env production
pm2 save

echo ">>> Done. Check status with: pm2 status"
