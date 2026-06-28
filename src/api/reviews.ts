import type { Review, ReviewDetail, ReviewSortOrder } from '../types';

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    status: 'public',
    hasBannedWord: false,
    school: '경상국립대',
    title: '가좌동 ○○원룸 — 방음 안 되고 벌레 많아요',
    author: '익명의찐빵이',
    rating: 2.5,
    reportCount: 0,
    createdAt: '2026-06-03',
  },
  {
    id: '2',
    status: 'public',
    hasBannedWord: true,
    school: '부산대',
    title: '집주인이 [욕설] 진짜 별로예요',
    author: '장전동거주자',
    rating: 1.0,
    reportCount: 3,
    createdAt: '2026-06-02',
  },
  {
    id: '3',
    status: 'private',
    hasBannedWord: false,
    school: '전남대',
    title: '운영 정책에 따라 숨김 처리된 리뷰',
    author: null,
    rating: 4.0,
    reportCount: 1,
    createdAt: '2026-05-30',
  },
  {
    id: '4',
    status: 'public',
    hasBannedWord: false,
    school: '충남대',
    title: '궁동 ○○빌 — 학교 가깝고 관리비 저렴',
    author: '새내기곰',
    rating: 4.5,
    reportCount: 0,
    createdAt: '2026-06-01',
  },
  {
    id: '5',
    status: 'public',
    hasBannedWord: false,
    school: '경북대',
    title: '산격동 투룸 후기, 주차 가능해서 만족',
    author: '복현동주민',
    rating: 4.0,
    reportCount: 0,
    createdAt: '2026-05-28',
  },
];

export interface ReviewQueryParams {
  keyword?: string;
  school?: string;
  period?: string;
  status?: string;
  bannedWordsOnly?: boolean;
  sortOrder?: ReviewSortOrder;
}

export async function fetchReviews(params: ReviewQueryParams = {}): Promise<Review[]> {
  const {
    keyword = '',
    school = 'all',
    status = 'all',
    bannedWordsOnly = false,
    sortOrder = 'latest',
  } = params;

  let results = [...MOCK_REVIEWS];

  if (keyword.trim()) {
    const q = keyword.trim().toLowerCase();
    results = results.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.author?.toLowerCase().includes(q),
    );
  }

  if (school !== 'all') {
    results = results.filter((r) => r.school === school);
  }

  if (status !== 'all') {
    results = results.filter((r) => r.status === status);
  }

  if (bannedWordsOnly) {
    results = results.filter((r) => r.hasBannedWord);
  }

  results.sort((a, b) => {
    switch (sortOrder) {
      case 'reportest':
        return b.reportCount - a.reportCount;
      case 'rating_high':
        return b.rating - a.rating;
      case 'rating_low':
        return a.rating - b.rating;
      case 'latest':
      default:
        return b.createdAt.localeCompare(a.createdAt);
    }
  });

  return results;
}

const MOCK_REVIEW_DETAILS: Record<string, ReviewDetail> = {
  '2': {
    id: '2',
    status: 'public',
    hasBannedWord: true,
    school: '부산대',
    title: '집주인이 [욕설] 진짜 별로예요',
    author: '장전동거주자',
    rating: 1.0,
    reportCount: 3,
    createdAt: '2026-06-02',
    content:
      '계약 연장을 문의했더니 집주인이 [욕설] 하면서 응대했습니다. 보일러 고장을 신고해도 2주 넘게 방치했고요. 장전동 일대를 알아보시는 분들은 참고하세요. 다시는 안 살 집입니다.',
    photos: ['사진 1', '사진 2'],
    authorInfo: {
      nickname: '장전동거주자',
      email: 'kim***@pusan.ac.kr',
    },
    reports: [
      {
        id: 'r1',
        category: '욕설·비방',
        reporter: 'user_8821',
        reportedAt: '2026-06-02 14:30',
      },
      {
        id: 'r2',
        category: '욕설·비방',
        reporter: 'user_1043',
        reportedAt: '2026-06-02 18:05',
      },
      {
        id: 'r3',
        category: '욕설·비방',
        reporter: 'user_5577',
        reportedAt: '2026-06-03 08:11',
      },
    ],
    actions: [
      {
        id: 'a1',
        title: '게시 승인',
        actor: 'ddochi',
        actedAt: '2026-06-02 14:02',
        reason: '사유: 정책상 즉시 게시 — 사후 검토 대상',
      },
      {
        id: 'a2',
        title: '금칙어 자동 플래그',
        actor: 'system',
        actedAt: '2026-06-02 14:02',
        reason: '사유: 사전 등록 단어 감지',
      },
    ],
  },
};

function buildReviewDetail(review: Review): ReviewDetail {
  return {
    ...review,
    content: review.title,
    photos: [],
    authorInfo: {
      nickname: review.author ?? '–',
      email: '–',
    },
    reports: [],
    actions: [],
  };
}

export async function fetchReviewDetail(reviewId: string): Promise<ReviewDetail | null> {
  if (MOCK_REVIEW_DETAILS[reviewId]) {
    return MOCK_REVIEW_DETAILS[reviewId];
  }

  const review = MOCK_REVIEWS.find((item) => item.id === reviewId);
  if (!review) {
    return null;
  }

  return buildReviewDetail(review);
}
