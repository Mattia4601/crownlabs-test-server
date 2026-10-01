FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src/server.js ./
COPY static ./static


EXPOSE 8080

CMD ["node", "server.js"]