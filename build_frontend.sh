#!/bin/bash

# Save the current directory
original_dir=$(pwd)

# Navigate to the frontend build directory
cd /home/ubuntu/build/drlambda-frontend/tailwindui
# Check if the directory change was successful
if [ $? -ne 0 ]; then
    exit 1
fi

# Check if the current git branch is 'master'
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "master" ]; then
    exit 1
fi

# Get the latest commit before and after git pull
commit_before_pull=$(git rev-parse HEAD)
git pull
commit_after_pull=$(git rev-parse HEAD)

# Compare commits and run 'npm run build' if they are different
if [ "$commit_before_pull" != "$commit_after_pull" ]; then
    npm install
    npm run build
else
    echo "No change detected, skip building."
fi

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
