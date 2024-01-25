#!/bin/bash

# Save the current directory
original_dir=$(pwd)

# Navigate to the frontend build directory
cd /home/ubuntu/build/drlambda-frontend/tailwindui
# Check if the directory change was successful
if [ $? -ne 0 ]; then
    echo "failed change to working directory, exiting..."
    exit 1
fi

# Check if the current git branch is 'master'
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "master" ]; then
    echo "current git branch is not master, exiting..."
    exit 1
fi

# Get the latest commit before and after git pull
commit_before_pull=$(git rev-parse HEAD)
git pull
if [ $? -ne 0 ]; then
    echo "git pull failed"
    exit 1
fi
commit_after_pull=$(git rev-parse HEAD)

# Compare commits and run 'npm run build' if they are different
if [ "$commit_before_pull" != "$commit_after_pull" ]; then
    echo "New changes pulled, npm installing and building"
    npm install && npm run build
    if [ $? -ne 0 ]; then
        echo "npm install or run build failed"
        exit 1
    fi
else
    echo "No change detected, skip building."
fi

latest_commit=$(git log -1 --format="%H")
echo "{\"version\": \"$latest_commit\"}" > .next/metadata.json

echo "Compressing .next directory"
timestamp=$(date "+%Y%m%d%H%M%S")
tar -czvf frontend-build.tar.gz.$timestamp .next public
if [ $? -ne 0 ]; then
    echo "tar .next directory failed"
    exit 1
fi

echo "Moving binary"
BIN_PATH="/home/ubuntu/build/drlambda-frontend/bin"
mkdir -p "$BIN_PATH"
mv frontend-build.tar.gz.$timestamp "$BIN_PATH"
ln -f -s $BIN_PATH/frontend-build.tar.gz.$timestamp $BIN_PATH/latest-build.tar.gz

echo "Successfully completed build"
# Return to the original directory
cd "$original_dir"
