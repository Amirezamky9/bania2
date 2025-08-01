# --- Stage 1: Build Stage ---
# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Build the application for production
# This will create a 'dist' folder with static files
RUN npm run build

# --- Stage 2: Production Stage ---
# Use a lightweight Nginx image to serve the static files
FROM nginx:stable-alpine AS production-stage

# Copy the built files from the build stage to the Nginx public directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
# We will create this file next
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
