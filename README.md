# JJinBBang_Admin (찐빵 백오피스)

## 프로젝트 구조

```text
src
├── api                # API 요청 관리
├── assets             # 이미지, 아이콘 등 정적 리소스
├── components
│   ├── common         # 공통 UI 컴포넌트
│   └── layout         # 레이아웃 컴포넌트 (Sidebar, Header 등)
├── hooks              # React Query 커스텀 훅
├── pages              # 페이지 단위 컴포넌트
├── store              # Zustand 전역 상태 관리
├── types              # 공통 타입 정의
├── App.tsx            # 라우터 설정
├── main.tsx           # 앱 진입점
└── index.css          # 전역 스타일
```

## 주요 역할

* **api**: Axios 기반 API 호출 로직 관리
* **components/common**: 재사용 가능한 공통 컴포넌트
* **components/layout**: 관리자 레이아웃(사이드바, 헤더)
* **hooks**: React Query를 활용한 데이터 조회 및 상태 관리
* **pages**: 라우팅 단위 화면 구성
* **store**: Zustand 기반 클라이언트 상태 관리
* **types**: 공통 TypeScript 타입 정의

## 상태 관리 전략

* **React Query**: 서버 데이터 관리
* **Zustand**: 로그인 정보 등 클라이언트 전역 상태 관리

## 기술 스택

* React
* TypeScript
* Vite
* Ant Design
* Tailwind CSS
* React Router
* TanStack Query
* Axios
* Zustand