BUILD_PATH="/home/ubuntu/drlambda-frontend/build"
mkdir -p BUILD_PATH
cd BUILD_PATH

timestamp=$(date "+%Y%m%d%H%M%S")

# Download and save file
BUILD_FILE="latest-build.tar.gz"
curl https://dev.drlambda.ai/api/build_frontend\?key\=ayeP6I0oyRemxMa10sCrAgUtkfL5ADzjr3IKImXS7rTdbpXWPmSUoROo5jZbODjX\&lazy\=true --output $BUILD_FILE

# Check if the download was successful
if [ $? -ne 0 ]; then
    exit 1
fi

# Decompress the file
tar -xzvf $BUILD_FILE
if [ $? -ne 0 ]; then
    exit 1
fi

# archive the file with current timestamp
if [ -f "$BUILD_FILE" ]; then
    mv $BUILD_FILE "$BUILD_FILE.$timestamp"
fi

# restart frontend
pm2 restart tailwindui