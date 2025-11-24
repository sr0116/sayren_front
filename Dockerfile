# --- 1단계: 빌드 단계 ---
FROM node:20-alpine AS builder

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


# --- 2단계: 런타임 단계 ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
