# SAREN Frontend

렌탈 · 구독 비즈니스 모델 기반 커머스 플랫폼 프론트엔드

![Next.js](https://img.shields.io/badge/Next.js-14.x-000000?style=flat&logo=nextdotjs&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=flat&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=flat&logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

---

## Overview

**SAREN**은 렌탈·구독 비즈니스 모델을 기반으로 한 커머스 플랫폼입니다.  
본 저장소는 SIREN 서비스의 **프론트엔드 영역**을 담당하며,  
상품 탐색부터 구독 신청, 결제 진행, 계약 상태 확인까지의  
**사용자 인터페이스 전반을 구현**합니다.

단순 화면 구현이 아니라,  
실제 서비스 운영 환경을 가정하여  
인증, 상태 관리, 서버 데이터 캐싱, 권한 분기, 반응형 UI 구조를  
종합적으로 고려하여 설계되었습니다.

---

## Goals

- 렌탈·구독 커머스 도메인에 적합한 UX 설계
- 프론트엔드와 백엔드가 분리된 구조에서의 협업 
- 결제 및 구독 상태 변화에 상태 변경 처리
- 유지보수를 고려한 공용 컴포넌트 설계

---

## Features

### User
- 렌탈 상품 목록 및 상세 페이지
- 구독 신청 및 결제 플로우 UI
- 로그인 / 로그아웃 및 인증 상태 유지

### Admin
- 관리자 전용 화면 접근 제어
- 상품 및 구독 관리 화면 UI 구성
- 결제 및 환불 상태 확인 UI

### Common
- JWT 기반 인증 상태 처리
- 서버 데이터 캐싱 및 자동 동기화
- 에러 및 로딩 상태 공통 처리
- 공용 컴포넌트 기반 UI 구성
- 모바일·태블릿·데스크톱 대응 반응형 레이아웃

---

## Tech Stack

### Frontend
- Next.js 14.x (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit (전역 상태 관리)
- Framer Motion (UI 애니메이션)

### Dev / Collaboration
- GitHub (형상 관리 및 코드 리뷰)
- Discord (팀 커뮤니케이션)

### Deployment
- Docker (컨테이너 기반 배포 환경)
---
