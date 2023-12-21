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
mkdir -p /home/ubuntu/build/drlambda-frontend/bin
mv frontend-build.tar.gz.$timestamp /home/ubuntu/build/drlambda-frontend/bin/.

# Return to the original directory
cd "$original_dir"
