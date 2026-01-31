# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json from the correct folder
COPY smart-notes-client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY smart-notes-client/. .

# Build React app
RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
