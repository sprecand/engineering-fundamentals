# Use an official Node.js runtime as the base image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile --ignore-scripts

# Copy the rest of the app's source code
COPY src ./src
COPY vite.config.ts ./vite.config.ts

# Build the React app
RUN npm run build

# Use a lightweight web server for static files
FROM node:18-alpine AS serve

# Install a simple static server
RUN npm install --ignore-scripts -g serve

# Set working directory
WORKDIR /app

# Copy build artifacts from previous stage
COPY --from=build /app/dist .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", ".", "-l", "3000"]
