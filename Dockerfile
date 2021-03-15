FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Copy required files
COPY package.json tsconfig.json .env ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

EXPOSE 8080

# Start Node server
CMD [ "yarn", "start" ]
