#!/bin/bash
set -eo pipefail

# Clean up previous builds
rm -rf package/
mkdir -p package/python/lib/python3.11/site-packages

# Install dependencies into the layer directory
pip3 install --platform manylinux2014_x86_64 \
    --target=package/python/lib/python3.11/site-packages \
    --implementation cp \
    --python-version 3.11 \
    --only-binary=:all: --upgrade \
    pandas==2.0.3 \
    numpy==1.24.3 \
    python-dotenv==1.0.0 \
    sqlalchemy==2.0.20 \
    psycopg2-binary==2.9.7 \
    boto3==1.28.0

# Remove unnecessary files to reduce layer size
cd package/python/lib/python3.11/site-packages
find . -type d -name "tests" -exec rm -rf {} +
find . -type d -name "__pycache__" -exec rm -rf {} +
rm -rf *.dist-info
rm -rf *.egg-info
