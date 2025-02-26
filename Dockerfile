FROM node:bullseye-slim as deps

RUN apt update && apt-get install -y bash jq
RUN npm install -g @nestjs/cli

WORKDIR /tmp