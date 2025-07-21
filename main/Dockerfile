# --- STAGE 1: Build Stage ---
# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Build the app for production. This creates the 'dist' folder.
RUN npm run build


# --- STAGE 2: Production Stage ---
# Use a lightweight Nginx image to serve the static files
FROM nginx:stable-alpine AS production-stage

# Copy the built files from the build stage to the Nginx public HTML directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy our custom Nginx configuration file
# This is crucial for Vue Router to work correctly
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# The command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]
