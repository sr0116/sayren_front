#########################
# 1) Build Stage
#########################
FROM node:20-alpine AS builder
WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=production

# 패키지 설치
COPY package.json package-lock.json ./
RUN npm ci

# ⭐ 반드시 필요: 빌드 시 env.production 적용
COPY .env.production .env.production

# 소스 전체 복사
COPY . .

# Next.js 빌드 (App Router / SSR / npm start 기반)
RUN npm run build



#########################
# 2) Runtime Stage
#########################
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# package.json, node_modules 복사
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# 빌드 산출물 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# ⭐ 실행 시 env.production도 다시 복사
COPY .env.production .env.production

EXPOSE 3000

# npm start (next start 실행)
CMD ["npm", "start"]
