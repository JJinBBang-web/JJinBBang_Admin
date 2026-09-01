# JJinBBang Admin Frontend Convention

## Tech Stack

* React
* TypeScript
* Vite
* React Router
* Ant Design
* Tailwind CSS
* TanStack Query (React Query)
* Axios
* Zustand

---

## Project Structure

```text
src
├── api                 # API 요청 및 서버 통신
├── assets              # 이미지, 아이콘 등 정적 리소스
├── components
│   ├── common          # 공통 컴포넌트
│   └── layout          # 레이아웃 컴포넌트
├── hooks               # React Query 기반 커스텀 훅
├── pages               # 페이지 단위 컴포넌트
├── store               # Zustand 전역 상태
├── types               # 공통 타입 정의
├── App.tsx             # 라우터 설정
├── main.tsx            # 앱 진입점
└── index.css           # 전역 스타일
```

### Folder Description

| Folder            | Description                 |
| ----------------- | --------------------------- |
| api               | API 요청 및 서버 통신              |
| assets            | 이미지, 아이콘 등 정적 리소스           |
| components/common | 재사용 가능한 공통 컴포넌트             |
| components/layout | Sidebar, Header 등 레이아웃 컴포넌트 |
| hooks             | React Query 기반 커스텀 훅        |
| pages             | 라우팅 단위 페이지                  |
| store             | Zustand 전역 상태 관리            |
| types             | 공통 타입 정의                    |

---

## Naming Convention

### Constants

```ts
const MAX_RETRY_COUNT = 3;
const DEFAULT_PAGE_SIZE = 20;
```

* UPPER_SNAKE_CASE 사용

### Variables / Functions / Hooks

```ts
const reviews = [];

const isLoading = false;
const hasError = true;

const getReviewList = () => {};
const handleSubmit = () => {};

const useReviews = () => {};
```

* camelCase 사용
* 배열은 복수형 사용
* Boolean 값은 `is`, `has`, `can` 접두어 사용
* 이벤트 함수는 `handle`
* API 함수는 HTTP Method로 시작

### Components

```tsx
const ReviewTable = () => {
  return <div />;
};
```

* PascalCase 사용

---

## Type Rules

### Interface

Props 및 객체 타입

```ts
export interface ReviewTableProps {
  title: string;
}
```

### Type

유니온 및 단순 타입

```ts
export type ReviewStatus =
  | 'ACTIVE'
  | 'BLINDED';
```

---

## Component Rules

### Page Component

```tsx
const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default Dashboard;
```

### Common Component

```tsx
export interface CustomTagBtnProps {
  label: string;
}

export const CustomTagBtn = (
  props: CustomTagBtnProps,
) => {
  const { label } = props;

  return <button>{label}</button>;
};
```

### Rules

* 페이지 컴포넌트는 `default export`
* 공통 컴포넌트는 `named export`
* Props는 `interface` 사용
* 컴포넌트는 화살표 함수 사용

---

## State Management

### React Query

서버 상태 관리

예시

* 리뷰 목록
* 신고 목록
* 합격증 목록

### Zustand

클라이언트 상태 관리

예시

* 로그인 상태
* Access Token
* 관리자 정보

---

## Architecture

```text
Page
 ↓
Hook
 ↓
API
 ↓
Axios Client
```

### Page

* UI 렌더링 담당
* Hook만 호출

### Hook

* 비즈니스 로직 담당
* API 호출 담당

### API

* 서버 요청 정의
* Axios Client 사용

### Client

* Axios 인스턴스
* 공통 헤더 및 인터셉터 관리

---

## API Convention

### File Structure

```text
api/
├── client.ts
├── reviews.ts
├── reports.ts
└── certificates.ts
```

### Method Naming

```ts
getReviewList();
getReviewDetail();

postBlindReview();

putReviewStatus();

deleteReview();
```

* HTTP Method 기반 네이밍 사용

---

## Hook Convention

```text
hooks/
├── useReviews.ts
├── useReports.ts
└── useCertificates.ts
```

```ts
const useReviews = () => {};
```

### Rules

* `use + 기능명`
* API 로직은 Hook 내부에서 관리
* Page는 Hook만 호출

---

## Styling

### Tailwind CSS

클래스 순서

```text
Layout
→ Size
→ Spacing
→ Color
→ Typography
→ Etc
```

예시

```tsx
<div
  className="
    flex items-center
    w-full h-12
    px-4 py-2
    bg-white
    text-sm font-medium
    rounded-lg
  "
/>
```

### Ant Design

공통 UI는 Ant Design 사용

예시

* Layout
* Table
* Form
* Modal
* Pagination
* Tag
* Dropdown

---

## Security

### Environment Variables

```ts
const BASE_URL =
  import.meta.env.VITE_API_URL;
```

### Rules

* API Key 하드코딩 금지
* Access Token 하드코딩 금지
* 개인정보 코드 저장 금지
* `.env` 파일 Git 업로드 금지

---

## Git Convention

### Branch

```text
feature/review-management
feature/report-management

fix/sidebar-navigation

refactor/api-layer
```

### Commit

```text
feat: 리뷰 관리 페이지 구현
fix: 사이드바 라우팅 오류 수정
refactor: API 구조 개선
style: UI 스타일 수정
chore: 의존성 추가
```

### Commit Types

| Type     | Description |
| -------- | ----------- |
| feat     | 새로운 기능      |
| fix      | 버그 수정       |
| refactor | 리팩토링        |
| style    | 스타일 변경      |
| chore    | 설정 및 의존성 변경 |
| docs     | 문서 수정       |
| test     | 테스트 코드      |

---

## Checklist

* [ ] 변수/함수/Hook은 camelCase 사용
* [ ] 상수는 UPPER_SNAKE_CASE 사용
* [ ] 컴포넌트는 PascalCase 사용
* [ ] Props는 interface 사용
* [ ] 컴포넌트는 화살표 함수 사용
* [ ] 페이지는 default export 사용
* [ ] 공통 컴포넌트는 named export 사용
* [ ] 서버 상태는 React Query 사용
* [ ] 클라이언트 상태는 Zustand 사용
* [ ] API 호출은 Hook을 통해 수행
* [ ] Tailwind 클래스 순서 준수
* [ ] 민감 정보 하드코딩 금지
* [ ] 환경 변수 사용
