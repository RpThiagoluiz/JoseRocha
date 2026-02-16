# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Injetar variáveis de ambiente no momento do build do Vite
ARG VITE_BASE_URL
ARG VITE_AUTH_STORAGE_KEY
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_AUTH_STORAGE_KEY=$VITE_AUTH_STORAGE_KEY
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
