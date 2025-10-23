# 1. Node 20 기반 이미지
FROM node:20-alpine AS builder

# 2. 작업 디렉토리
WORKDIR /app

# 3. 의존성 설치 파일 복사
COPY package*.json ./

# 4. npm 설치 (React18-ToastUI 호환용)
RUN npm install --legacy-peer-deps

# 5. 소스 복사
COPY . .

# 6. Next.js 프로덕션 빌드
RUN npm run build

# -----------------------------
# 🚀 2단계: 경량 실행 환경
# -----------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 빌드 결과물만 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY .env.production .env

# 의존성 설치 (프로덕션만)
RUN npm install --omit=dev --legacy-peer-deps

# 포트 오픈
EXPOSE 3000

# Next.js 시작
CMD ["npm", "start"]
