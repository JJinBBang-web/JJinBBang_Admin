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

## Authentik 로그인

- 보호된 화면에 세션이 없으면 `/login`으로 이동한다.
- 로그인 버튼은 같은 출처의 `/oauth2/authorization/authentik`으로 이동한다.
- 회원가입 UI는 제공하지 않으며 계정·비밀번호·MFA는 Authentik에서 관리한다.
- 로그인 정보는 `/api/admin/auth/me`에서 조회하고 HttpOnly 세션 쿠키를
  사용하므로 브라우저 저장소에 OIDC 토큰을 저장하지 않는다.
- 로그아웃은 `/api/admin/auth/csrf`에서 받은 토큰을 포함해
  `/api/admin/auth/logout`에 POST한 뒤 Authentik 세션까지 종료한다.

로컬에서는 관리자 서버를 `8080` 포트에 실행하고 아래 명령을 사용한다.

```bash
npm ci
npm run dev
npm run lint
npm run build
```

`develop` 또는 `main` push가 검증을 통과하면 전체 Git SHA 태그로
`ghcr.io/jjinbbang-web/jjinbbang-admin` 이미지를 게시한다. 이어서 GitHub App으로
`jjinbbang-lab`에 `admin-image-built` dispatch를 보내며, `develop`은 `dev`,
`main`은 `prod`로 지정한다. Dispatch에는 이미지·태그·소스 저장소/브랜치/SHA와
Buildx manifest digest를 포함한다. Pull request에서는 검증만 실행한다.
