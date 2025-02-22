FROM node:lts-alpine AS base

RUN apk add --no-cache openssl

WORKDIR /tmp

COPY package.json yarn.lock ./

FROM node:lts-alpine as tmp

ARG NODE_OPTIONS="--max-old-space-size=4096"
ENV NODE_OPTIONS=${NODE_OPTIONS}

RUN apk update 
RUN apk add bash jq postgresql procps curl
RUN npm install -g @nestjs/cli
RUN apk add --no-cache openssl

WORKDIR /app/tmp

COPY --from=base /tmp ./
COPY yarn.lock ./

COPY . /app/tmp/

RUN yarn install
RUN yarn prisma generate && yarn build

RUN true \
    && rm -rf ./src

RUN true \
  && yarn --ignore-scripts --production=false

FROM node:lts-alpine as prod

ARG NODE_OPTIONS="--max-old-space-size=4096"
ENV NODE_OPTIONS=${NODE_OPTIONS}

RUN apk update 
RUN apk add bash jq postgresql procps curl
RUN apk add --no-cache openssl

USER node

WORKDIR /app/web

COPY --from=tmp --chown=node:node /app/tmp /app/web

EXPOSE 3000

CMD [ "node", "dist/main" ]
