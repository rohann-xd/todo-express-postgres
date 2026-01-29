# Use official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install openssl (required for JWT RSA keys)
RUN apk add --no-cache openssl

# Copy dependency files first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose application port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start"]
