# 2403VCCO Grupo 2 - Capstone Project
## Human Rights Incidents Dashboard

A full-stack application for tracking and visualizing human rights incidents, built with React and AWS infrastructure.

## Repository Structure

This repository contains the complete infrastructure and application code for the Human Rights Incidents Dashboard.

### Web Application

The web application is built with React and is located in the `web` directory.

### Backend API

The backend API is built with Node.js and is located in the `API` directory.

### ETL Lambda

The ETL Lambda is built with Python and is located in the `etl-lambda` directory.

### Backend Infrastructure

The backend infrastructure is built with CloudFormation and is located in the `backend` directory.

## Prerequisites

- AWS CLI installed and configured
- Appropriate AWS permissions
- SSL/TLS certificate in AWS Certificate Manager
- Python 3.10 or higher
- Node.js 18 or higher
- Docker

## Infrastructure Diagram

```mermaid
graph TD
    Internet[Internet] --> ALB[Application Load Balancer]
    ALB --> WAF[WAF]
    ALB --> ECS[ECS Cluster API & WEB]
    ECS --> RDSProxy[RDS Proxy]
    ECS --> Lambda[ETL Lambda]
    Lambda --> RDSProxy
    SQS --> S3[Reports]
    RDSProxy --> Aurora[Aurora PostgreSQL]
    Bastion[Bastion Host] --> RDSProxy
    Lambda --> SQS[Job Queue]
```


