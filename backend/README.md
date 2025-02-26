# Backend Infrastructure

This directory contains the CloudFormation templates and parameters for deploying the core backend infrastructure.

## Files

- `backend-stack.yaml` - Main infrastructure stack template using Aurora Serverless v2
- `backend-stack-with-rds.yaml` - Alternative infrastructure stack template using RDS instance
- `params.json` - Parameters file for main stack
- `params-with-rds.json` - Parameters file for RDS stack

## Infrastructure Components

### Core Infrastructure
- VPC with public and private subnets across multiple AZs
- Internet Gateway and routing configuration
- Application Load Balancer (ALB) with HTTPS support
- WAF configuration for ALB protection
- S3 buckets for ALB logs and API storage

### Database
- Aurora PostgreSQL Serverless v2 (main stack)
- RDS instance (legacy stack)
- RDS Proxy for connection pooling
- Enhanced monitoring and performance insights
- Automated backups and encryption

### Compute
- ECS Cluster with EC2 capacity providers
- Auto Scaling configuration
- Spot Instance support (optional)
- Bastion host for secure access

### Integration
- SQS queue for job processing
- SQS deadletter queue for messages that can't be processed successfully

### Security
- Security Groups for all components
- SSL/TLS termination at ALB
- WAF rules for application protection
- Private subnets for sensitive resources
- Secrets management for database credentials
- SSH key pair for EC2 instances

## Prerequisites

- AWS CLI installed and configured
- Appropriate AWS permissions
- SSL/TLS certificate in AWS Certificate Manager

## Usage

1. Choose the appropriate stack template:
   - `backend-stack.yaml` for Aurora Serverless v2
   - `backend-stack-with-rds.yaml` for traditional RDS

2. Configure the corresponding parameters file:
   - `params.json` for Aurora stack
   - `params-with-rds.json` for RDS stack

## Deployment Instructions

1. Create a parameters file:

```json
[
  {
    "ParameterKey": "MyProjectName",
    "ParameterValue": "your-project-name"
  },
  // ... other parameters
]
```

2. Deploy the stack:
### Deploy main backend stack
```bash
aws cloudformation create-stack \
  --stack-name your-stack-name \
  --template-body file://backend-stack.yaml \
  --parameters file://params.json \
  --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
```
## Deployment Parameters

Key parameters that need to be configured:

- `MyProjectName`: Name of your project
- `Environment`: Deployment environment (dev/staging/prod)
- `MyIPAddress`: Whitelisted IP address for SSH access
- `CertificateArn`: SSL certificate ARN (if using HTTPS)
- `RDSInstanceType`: Aurora capacity range (ACUs) or RDS instance type
- Database credentials:
  - `MyDatabaseName`
  - `MyDatabaseUser`
  - `MyDatabasePassword`

## Monitoring

The stacks include:
- CloudWatch alarms for database metrics
- Enhanced monitoring for detailed OS metrics
- Performance Insights for query analysis
- Automated backup monitoring

## Security Best Practices

1. Database Access
   - Use RDS Proxy for connection pooling
   - Restrict direct access to private subnets
   - Implement least privilege IAM roles

2. Network Security  
   - Place database in private subnets
   - Configure security groups for minimal access
   - Enable encryption in transit

3. Data Protection
   - Enable encryption at rest
   - Configure automated backups
   - Use secrets management for credentials

## Cost Optimization

- Aurora Serverless v2 for cost-effective database scaling
- Optional Spot Instance support for ECS
- S3 lifecycle policies for log management
- Auto-scaling based on demand
