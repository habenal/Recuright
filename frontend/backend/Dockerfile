# -------------------------------
# 1. Base Image
# -------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Prisma client generation
RUN npx prisma generate

# Build NestJS for production
RUN npm run build


# -------------------------------
# 2. Production Image
# -------------------------------
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

COPY wait-for.sh .
RUN chmod +x wait-for.sh

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
