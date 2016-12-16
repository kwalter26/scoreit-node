FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install
RUN npm install -g gulp-cli
RUN gulp

EXPOSE 4444
