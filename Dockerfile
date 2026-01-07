# Stage 1: Build React frontend
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY client/package*.json ./client/
RUN cd client && npm install

# Copy frontend code
COPY client/ ./client
RUN cd client && npm run build

# Stage 2: Backend
FROM node:20-alpine
WORKDIR /app

# Install backend dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy backend code
COPY server/ ./server

# Copy frontend build into backend static folder
COPY --from=builder /app/client/dist ./server/client/dist

WORKDIR /app/server

# Expose port
EXPOSE 5000

# Start backend server (which serves frontend)
CMD ["node", "server.js"]