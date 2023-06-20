# Get an base image
FROM node:lts-alpine

# Set a working directory
WORKDIR /app

# Copy the package.json file and package-lock.json (if it exist)
COPY package*.json ./

# Install depedencies 
RUN npm install --production

# Copy everything 
COPY . .

CMD [ "node", "index.js" ]

