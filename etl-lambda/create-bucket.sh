#!/bin/bash
set -eo pipefail

# Generate a unique bucket name
BUCKET_ID=$(dd if=/dev/random bs=8 count=1 2>/dev/null | od -An -tx1 | tr -d ' \t\n')
BUCKET_NAME=lambda-artifacts-$BUCKET_ID

# Create the artifacts bucket
aws s3 mb s3://$BUCKET_NAME

# Create the data bucket
aws s3 mb s3://capstone-rh-dashboard-bucket --region us-east-1

# Save the bucket name for later use
echo $BUCKET_NAME > bucket-name.txt

echo "Created buckets:"
echo "Artifacts bucket: $BUCKET_NAME"
echo "Data bucket: capstone-rh-dashboard-bucket"
