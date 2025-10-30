# -----------------------------
# 1. Build Stage
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# package.json 먼저 복사 (캐시 최적화)
COPY package*.json ./

# 패키지 설치
RUN npm ci

# 나머지 소스 복사
COPY . .

# 환경 변수 지정 (필요시 덮어쓰기 가능)
ENV NEXT_PUBLIC_API_BASE_URL=http://sayren-backend:8080
ENV NODE_ENV=production

# Next.js 빌드 (타입/린트 에러 무시)
RUN npm run build

# -----------------------------
# 2. Run Stage
# -----------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# builder 단계 결과물만 복사
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/next.config.js ./

# 3000 포트 노출
EXPOSE 3000

# 서버 실행
CMD ["npm", "start"]
