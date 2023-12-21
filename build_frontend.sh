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

tar -czvf next-build.tar.gz .next

# Return to the original directory
cd "$original_dir"
