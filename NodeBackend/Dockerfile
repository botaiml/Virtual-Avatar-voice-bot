# Use an official Node runtime as a parent image
FROM ubuntu:22.04

Run apt update
Run apt install -y nodejs
Run apt install -y npm


COPY package*.json /app/

WORKDIR /app

RUN npm install
# Set the working directory to /app

# Install app dependencies
# RUN npm install

# Make port 3000 available to the world outside this container
# EXPOSE 5173

# Define the command to run your app
# CMD ["npm", "start"]
