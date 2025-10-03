# Use a secure and lightweight Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies first to leverage Docker's layer caching
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose Hardhat's default port (optional, for connecting to a local node)
EXPOSE 8545

# Keep the container running to allow exec commands
CMD ["tail", "-f", "/dev/null"]
