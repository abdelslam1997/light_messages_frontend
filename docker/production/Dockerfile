#
# Stage 1: Build
#
FROM node:18-alpine AS build

# Create app directory
WORKDIR /app

# Copy package files first so Docker can cache dependencies
COPY package*.json ./

# Install dependencies (npm ci is preferable if you have a package-lock.json)
RUN npm ci

# Copy the rest of your files
COPY . .

# Build your production bundle
RUN npm run build


#
# Stage 2: Serve
#
FROM nginx:1.23-alpine

# Copy the production-ready build artifacts
# Vite, by default, outputs to the "dist" folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
