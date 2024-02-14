# This script is used to generate aws-exports.js file for AWS Amplify

rm -f aws-exports.js

# check if env vars are set
if [ -z "$AWS_COGNITO_IDENTITY_POOL_ID" ]; then
  echo "AWS_COGNITO_IDENTITY_POOL_ID is not set"
  exit 1
fi

if [ -z "$AWS_USER_POOLS_ID" ]; then
  echo "AWS_USER_POOLS_ID is not set"
  exit 1
fi

if [ -z "$AWS_USER_POOLS_WEB_CLIENT_ID" ]; then
  echo "AWS_USER_POOLS_WEB_CLIENT_ID is not set"
  exit 1
fi

sed \
-e "s|AWS_COGNITO_IDENTITY_POOL_ID|${AWS_COGNITO_IDENTITY_POOL_ID}|g" \
-e "s|AWS_USER_POOLS_ID|${AWS_USER_POOLS_ID}|g" \
-e "s|AWS_USER_POOLS_WEB_CLIENT_ID|${AWS_USER_POOLS_WEB_CLIENT_ID}|g" \
 aws-exports.js.template >> aws-exports.js