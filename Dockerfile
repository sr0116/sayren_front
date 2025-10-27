########################################
# 🏗️ 1. Builder Stage
########################################
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 의존성 설치 (peer deps 무시로 호환성 확보)
RUN npm install --legacy-peer-deps

# 환경 파일 및 설정 파일 복사
COPY jsconfig.json ./
COPY next.config.js ./
COPY .env.production ./

# 프로젝트 리소스 복사
COPY src ./src
COPY public ./public

# 권한 수정 (root → node)
RUN chown -R node:node /app
USER node

# 환경 변수 설정 (빌드 시 SSR 비활성화)
ENV NODE_ENV=production
ENV NEXT_DISABLE_STATIC_EXPORT=true
ENV NEXT_TELEMETRY_DISABLED=1


ENV NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8080
ENV NEXT_PUBLIC_BUILD_MODE=true
# 빌드 수행
# ✅ 환경변수를 안전하게 로드하고 빌드 수행
RUN set -a && . ./.env.production && set +a && \
    NEXT_IGNORE_ESLINT=1 NEXT_DISABLE_STATIC_EXPORT=true npm run build


########################################
# 🚀 2. Runner Stage
########################################
FROM node:20-alpine AS runner

WORKDIR /app

# 런타임 환경 변수
ENV NODE_ENV=production
ENV NEXT_DISABLE_STATIC_EXPORT=true
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# 빌드 산출물 복사
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/.env.production ./.env.production

# 기본 실행 포트 오픈
EXPOSE 3000

# Next.js 실행
CMD ["npm", "start"]

