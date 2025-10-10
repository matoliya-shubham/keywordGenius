FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 5174

CMD ["pnpm", "dev"]