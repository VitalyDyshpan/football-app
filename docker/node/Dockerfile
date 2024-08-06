FROM node:20.11-alpine AS builder
# Create app directory
WORKDIR /app
COPY . .
# If you are building your code for production
#RUN npm ci --omit=dev && npm run build
RUN npm ci && npm run build

FROM node:20.11-alpine
ENV NODE_ENV=production
# Create app directory
WORKDIR /app
# Bundle app source
COPY --from=builder /app/.output/ .
EXPOSE 3000

CMD ["node", "./server/index.mjs"]