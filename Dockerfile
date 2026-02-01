# Use official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the project
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose application port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start"]
