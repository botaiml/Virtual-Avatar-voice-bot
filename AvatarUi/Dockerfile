FROM ubuntu:22.04

RUN apt update
RUN apt install -y nodejs
RUN apt install -y npm


COPY package*.json /app/

WORKDIR /app

RUN npm install