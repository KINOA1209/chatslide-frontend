# This script is used to generate aws-exports.js file for AWS Amplify

rm -f aws-exports.js

sed \
-e "s|AWS_COGNITO_IDENTITY_POOL_ID|${AWS_COGNITO_IDENTITY_POOL_ID}|g" \
-e "s|AWS_USER_POOLS_ID|${AWS_USER_POOLS_ID}|g" \
-e "s|AWS_USER_POOLS_WEB_CLIENT_ID|${AWS_USER_POOLS_WEB_CLIENT_ID}|g" \
 aws-exports.js.template >> aws-exports.js