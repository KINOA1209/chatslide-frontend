# This script is used to generate aws-exports.js file for AWS Amplify

# check if env vars are set
if [ -z "$COGNITO_IDENTITY_POOL_ID" ]; then
  echo "COGNITO_IDENTITY_POOL_ID is not set"
  exit 1
fi

if [ -z "$USER_POOLS_ID" ]; then
  echo "USER_POOLS_ID is not set"
  exit 1
fi

if [ -z "$USER_POOLS_WEB_CLIENT_ID" ]; then
  echo "USER_POOLS_WEB_CLIENT_ID is not set"
  exit 1
fi

rm -f aws-exports.js

sed \
-e "s|COGNITO_IDENTITY_POOL_ID|${COGNITO_IDENTITY_POOL_ID}|g" \
-e "s|USER_POOLS_ID|${USER_POOLS_ID}|g" \
-e "s|USER_POOLS_WEB_CLIENT_ID|${USER_POOLS_WEB_CLIENT_ID}|g" \
 aws-exports.js.template >> aws-exports.js