# --------------------------------------------------
# ✅ Stage 1 : Build
# --------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# 1️⃣ 의존성 설치
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 2️⃣ 전체 소스 복사 (app, src, scripts 등 포함)
COPY . .

# 3️⃣ Next.js 빌드 (빌드 실패 시 중단)
RUN npm run build

# --------------------------------------------------
# ✅ Stage 2 : Run
# --------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# 4️⃣ 빌드 산출물 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/scripts ./scripts

# 5️⃣ 런타임 의존성 설치 (개발용 제외)
RUN npm install --omit=dev --legacy-peer-deps

# 6️⃣ 포트 노출 및 실행
EXPOSE 3000
CMD ["npm", "run", "start"]
