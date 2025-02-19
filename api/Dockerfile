FROM node:bullseye-slim as deps

RUN apt update && apt-get install -y bash jq
RUN npm install -g @nestjs/cli

WORKDIR /tmp

COPY package*.json ./

# FROM node:bullseye-slim as tmp

# RUN apt-get update && apt-get install -y procps
# RUN npm install -g @nestjs/cli

# WORKDIR /app/tmp

# COPY --from=deps /tmp ./
# COPY package-lock.json ./

# COPY . /app/tmp/

# RUN npm install

# RUN npm run build

# RUN true \
#     && rm -rf ./src

# RUN true \
#   && npm prune --omit=dev --omit-peer

# FROM node:bullseye-slim as prod

# USER node

# WORKDIR /app/web

# COPY --from=tmp --chown=node:node /app/tmp /app/web

# RUN chmod +x /app/web/sh/entrypoint.sh

# ENTRYPOINT [ "sh/entrypoint.sh" ]

# EXPOSE 3000

# CMD [ "node", "dist/main" ]