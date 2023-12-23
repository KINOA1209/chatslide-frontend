BUILD_PATH="/home/ubuntu/drlambda-frontend/build"
SERVE_PATH="/home/ubuntu/drlambda-frontend/tailwindui"
mkdir -p $BUILD_PATH
cd $BUILD_PATH

timestamp=$(date "+%Y%m%d%H%M%S")

# Download and save file
BUILD_FILE="latest-build.tar.gz"
echo "Downloading $BUILD_FILE"
curl https://dev.drlambda.ai/api/build_frontend\?key\=ayeP6I0oyRemxMa10sCrAgUtkfL5ADzjr3IKImXS7rTdbpXWPmSUoROo5jZbODjX\&lazy\=true --output $BUILD_FILE

# Check if the download was successful
if [ $? -ne 0 ]; then
    echo "Download failed, exiting..."
    exit 1
fi

# Decompress the file
echo "Decompressing $BUILD_FILE"
tar -xzvf $BUILD_FILE
if [ $? -ne 0 ]; then
    exit 1
fi

echo "Stopping pm2"
pm2 stop tailwindui

echo "Backing up .next dir"
cd $SERVE_PATH
if [ -d ".next" ]; then
    # If it exists, rename directory 'a' to 'b'
    mv ".next" ".next.backup.$timestamp"
fi

echo "Moving new .next dir"
mv "$BUILD_PATH/.next" $SERVE_PATH

# restart frontend
echo "Restarting pm2"
pm2 restart tailwindui

# archive the file with current timestamp
ARCHIVE_FILE="$BUILD_FILE.$timestamp"
echo "Archiving $BUILD_FILE to $ARCHIVE_FILE"
if [ -f "$BUILD_FILE" ]; then
    mv $BUILD_FILE $ARCHIVE_FILE
fi

echo "Restarted frontend!"
