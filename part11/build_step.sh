#!/bin/bash

echo "Starting build process..."

set -e

npm install
npm run build

echo "Build process completed"
echo "Testing auto deployment..."
echo "New branch for pull request check"