#!/bin/bash

echo "Starting build process..."

set -e

npm install --prefix frontend
npm install --prefix backend

npm run build --prefix frontend
rm -rf ./backend/dist
cp -r ./frontend/dist ./backend

echo "Build process completed"