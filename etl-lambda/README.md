# ETL Lambda Functions

This directory contains the AWS Lambda functions and supporting scripts for ETL (Extract, Transform, Load) operations.

## Directory Structure

```
.
├── my_funtion
│   ├── my_function.py # Lambda function code
│   ├── requirements.txt # Lambda function dependencies
├── build-layer.sh            # Builds the Lambda layer
├── create-bucket.sh          # Creates S3 buckets
├── deploy.sh                 # Deploys the Lambda function
└── template.yml              # ETL Lambda infrastructure
```

## Lambda Function Components

### build-layer.sh

Builds the Lambda layer containing required Python dependencies.

### create-bucket.sh

Creates S3 buckets for storing data and logs.

### deploy.sh

Deploys the Lambda function to AWS.

### template.yml

CloudFormation template for deploying the Lambda function infrastructure.

## Usage

### Deploy ETL Lambda functions

```bash
# Make shell files executable
sudo chmod +x deploy.sh build-layer.sh create-bucket.sh

# Create artifacts and files bucket
sudo ./create-bucket.sh

# Build library dependencies for python
sudo ./build-layer.sh

# Deploy lambda functions dependencies
sudo ./deploy.sh
```

## Infrastructure

### Lambda Function

- Python 3.10 runtime
- Required Python packages:
  - pandas
  - boto3
  - sqlalchemy
  - python-dotenv
  - psycopg2-binary

### S3 Buckets

- `etl-lambda-data` - Stores API data files
- `etl-lambda-logs` - Stores log files

### CloudWatch Logs

- Logs are automatically rotated and retained for 30 days
- CloudWatch Logs Insights queries are available for analyzing logs

### IAM Role

- `etl-lambda-role` - IAM role for Lambda function execution
- Permissions:
  - S3 read/write access
  - CloudWatch Logs write access
  - IAM role for Lambda execution

## Cost Optimization

- Use AWS Lambda Layers for shared dependencies
- Implement S3 lifecycle policies for log management
- Use CloudWatch Logs Insights for cost-effective log analysis
- Implement proper IAM roles and policies
- Monitor function usage and performance


## Monitoring

- CloudWatch Logs for function execution logs
- CloudWatch Metrics for function performance
- CloudWatch Alarms for monitoring function errors
- AWS X-Ray for tracing function execution

## Security

- IAM roles and policies for Lambda function execution
- S3 bucket policies for data access
- CloudWatch Logs retention policy
- AWS X-Ray encryption at rest

