const awsmobile = {
    "aws_project_region": "us-east-2",
    "aws_cognito_identity_pool_id": "us-east-2:474762b3-d386-4c33-84c8-c532098d98e4",
    "aws_cognito_region": "us-east-2",
    "aws_user_pools_id": "us-east-2_XgJbG8iv1",
    "aws_user_pools_web_client_id": "5s1gm29qjolp4mv9v35gcstpog",
    "oauth": {
        "domain": "yfbjukov7va1-staging.auth.us-east-2.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "https://6k2c0wuvy4.execute-api.us-east-2.amazonaws.com/sso",
        "redirectSignOut": "https://6k2c0wuvy4.execute-api.us-east-2.amazonaws.com/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [
        "GOOGLE"
    ],
    "aws_cognito_signup_attributes": [],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": [
            "REQUIRES_LOWERCASE",
            "REQUIRES_NUMBERS",
            "REQUIRES_SYMBOLS",
            "REQUIRES_UPPERCASE"
        ]
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;
