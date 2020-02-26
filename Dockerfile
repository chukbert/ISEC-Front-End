# base image
FROM node:12.16.1-alpine3.11

# set working directory
WORKDIR /app/
# add `/node_modules/.bin` to $PATH
COPY package.json yarn.lock /app/

RUN yarn install

# COPY . /app/

EXPOSE ${PORT}

# CMD [ "yarn", "start" ]