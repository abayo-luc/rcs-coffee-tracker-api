# Use the official Node.js image as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./
COPY yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application files into the container
COPY . .

RUN yarn build

# Set the environment variable for the Node.js app
ENV NODE_ENV production

# Expose the port that the Node.js app will listen on
EXPOSE 3000

# Start the Node.js app
CMD ["yarn", "start"]