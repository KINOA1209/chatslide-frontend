#!/bin/bash

# Save the current directory
original_dir=$(pwd)

# Navigate to the frontend build directory
cd /home/ubuntu/build/drlambda-frontend

npm install
# Your complex series of commands for building the frontend
npm run build

# ... other operations ...

# Return to the original directory
cd "$original_dir"
