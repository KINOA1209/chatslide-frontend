#!/bin/bash

# Save the current directory
original_dir=$(pwd)

# Navigate to the frontend build directory
cd /home/ubuntu/build/drlambda-frontend/tailwindui
git pull

npm install
npm run build

latest_commit=$(git log -1 --format="%H")
echo "{\"version\": \"$latest_commit\"}" > .next/metadata.json

timestamp=$(date "+%Y%m%d%H%M%S")
tar -czvf frontend-build.tar.gz.$timestamp .next

BIN_PATH="/home/ubuntu/build/drlambda-frontend/bin"
mkdir -p "$BIN_PATH"
mv frontend-build.tar.gz.$timestamp "$BIN_PATH"
ln -s $BIN_PATH/frontend-build.tar.gz.$timestamp $BIN_PATH/latest-build.tar.gz

# Return to the original directory
cd "$original_dir"
