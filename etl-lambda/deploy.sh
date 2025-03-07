#!/bin/bash
set -eo pipefail
ARTIFACT_BUCKET=$(cat bucket-name.txt)
aws cloudformation package --template-file template.yml --s3-bucket $ARTIFACT_BUCKET --output-template-file out.yml --profile Devman
aws cloudformation deploy --template-file out.yml --stack-name etl-lambda --capabilities CAPABILITY_NAMED_IAM --profile Devman