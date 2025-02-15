#!/bin/bash
set -eo pipefail

# Get the bucket name from the bucket-name.txt file
ARTIFACT_BUCKET=$(cat bucket-name.txt)

# Package and deploy
aws cloudformation package \
    --template-file ./aws-sh/template.yml \
    --s3-bucket $ARTIFACT_BUCKET \
    --output-template-file ./aws-sh/out.yml

aws cloudformation deploy \
    --template-file ./aws-sh/out.yml \
    --stack-name funpres-function \
    --capabilities CAPABILITY_NAMED_IAM

aws s3api put-bucket-notification-configuration --bucket capstone-rh-dashboard-bucket --notification-configuration file://bucket-config/s3-notif-config.json