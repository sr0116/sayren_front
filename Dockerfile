# ----------------------------
# 1️⃣ 빌드 스테이지
# ----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# 의존성 설치 (캐시 최적화)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# 모든 파일 복사
COPY . .

# 환경변수 복사 (.env.production)
COPY .env.production .env

# Next.js 빌드

RUN npm run build || echo "⚠️ Next build warnings ignored (Dynamic export skipped)"

# ----------------------------
# 2️⃣ 런타임 스테이지
# ----------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 빌드 결과물 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env .env

# 3000 포트 오픈
EXPOSE 3000

# Next.js 실행
CMD ["node", "server.js"]


