FROM node:14.16.0-alpine3.10
RUN apk add --no-cache python g++ make
RUN apk update && apk upgrade && apk add bash
WORKDIR /app
COPY . ./app
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm instal
CMD ["node", "./app/server.js"]

# FROM node:14.16.0-alpine3.10
# RUN mkdir -p /app/node_modules && chown -R node:node /app/
# WORKDIR /app
# COPY package*.json .
# USER node

# RUN npm install
# COPY --chown=node:node . .
# EXPOSE 3000
# CMD ["node", "./app/server.js"]