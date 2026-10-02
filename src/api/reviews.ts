import type {
  MaskingReasonCategory,
  PageInfo,
  Review,
  ReviewDetail,
  ReviewSortOrder,
  ReviewStatus,
} from '../types';
import { http } from './client';

// 타입
export type ReviewPeriodType = 'LAST_7_DAYS' | 'LAST_30_DAYS' | 'LAST_1_YEAR';
export type ReviewApiStatus = 'PUBLIC' | 'PRIVATE';
export type ReviewApiSort = 'LATEST' | 'REPORT' | 'RATING_HIGH' | 'RATING_LOW';
export type ReviewMaskReason =
  | 'BAD_WORD'
  | 'PRIVACY_EXPOSURE'
  | 'FALSE_SUSPICION'
  | 'ETC';

// 화면 표시용 마스킹 사유 → API 코드
export const MASK_REASON_CODE: Record<MaskingReasonCategory, ReviewMaskReason> = {
  '욕설·비방': 'BAD_WORD',
  '개인정보 노출': 'PRIVACY_EXPOSURE',
  '허위 의심': 'FALSE_SUSPICION',
  '기타': 'ETC',
};

export interface ReviewMaskPreviewDto {
  maskedContent: string;
}

export interface ReviewMaskRequest {
  reasons: ReviewMaskReason[];
  detailReason: string;
}

// 리뷰 리스트 쿼리
export interface ReviewListQuery {
  searchKeyword?: string;
  schoolNames?: string[];
  periodType?: ReviewPeriodType;
  status?: ReviewApiStatus;
  hasBadWordOnly?: boolean;
  sort?: ReviewApiSort;
  page?: number;
  size?: number;
}

// 리뷰 리스트 아이템 타입
export interface ReviewListItemDto {
  id: number;
  status: ReviewApiStatus;
  hasBadWord: boolean;
  schoolName: string;
  title: string;
  content: string;
  userName: string | null;
  rating: number;
  reportCount: number;
  createdAt: string;
}

// 리뷰 리스트 데이터 타입
export interface ReviewListData {
  reviewList: ReviewListItemDto[];
  pageInfo: PageInfo;
}

// 리뷰 신고 타입
export interface ReviewReportDto {
  reportReason: string;
  reporterId: number;
  reportedAt: string;
}

// 리뷰 히스토리 타입
export interface ReviewHistoryDto {
  actionNames: string[];
  actionAt: string;
  handler: string;
  reason: string;
}

// 리뷰 상세 타입
export interface ReviewDetailDto {
  reviewId: number;
  status: ReviewApiStatus;
  schoolName: string;
  hasBadWordFlag: boolean;
  rating: number;
  createdAt: string;
  reportCount: number;
  content: string;
  images: string[];
  userId: number;
  nickname: string;
  email: string;
  reportList: ReviewReportDto[];
  historyList: ReviewHistoryDto[];
}

// 리뷰 리스트 필터 타입
export interface ReviewListFilters {
  keyword?: string;
  school?: string;
  period?: string;
  status?: string;
  bannedWordsOnly?: boolean;
  sortOrder?: ReviewSortOrder;
  page?: number;
  size?: number;
}

// 리뷰 리스트 결과 타입
export interface ReviewListResult {
  reviews: Review[];
  pageInfo: PageInfo;
}

// 타입 매핑
const PERIOD_TYPE_MAP: Record<string, ReviewPeriodType> = {
  '7d': 'LAST_7_DAYS',
  '30d': 'LAST_30_DAYS',
  '1y': 'LAST_1_YEAR',
};
const STATUS_MAP: Record<string, ReviewApiStatus> = {
  public: 'PUBLIC',
  private: 'PRIVATE',
};
const SORT_MAP: Record<ReviewSortOrder, ReviewApiSort> = {
  latest: 'LATEST',
  reportest: 'REPORT',
  rating_high: 'RATING_HIGH',
  rating_low: 'RATING_LOW',
};

const ACTION_LABELS: Record<string, string> = {
  BAD_WORD: '금칙어 처리',
  PRIVACY_EXPOSURE: '개인정보 노출',
};

function toUiStatus(status: string): ReviewStatus {
  return status.toUpperCase() === 'PRIVATE' ? 'private' : 'public';
}

function toListQuery(filters: ReviewListFilters = {}): ReviewListQuery {
  const {
    keyword = '',
    school = 'all',
    period = 'all',
    status = 'all',
    bannedWordsOnly = false,
    sortOrder = 'latest',
    page = 0,
    size = 10,
  } = filters;

  const query: ReviewListQuery = {
    hasBadWordOnly: bannedWordsOnly,
    sort: SORT_MAP[sortOrder],
    page,
    size,
  };

  const searchKeyword = keyword.trim();
  if (searchKeyword) {
    query.searchKeyword = searchKeyword;
  }

  if (school !== 'all') {
    query.schoolNames = [school];
  }

  if (period !== 'all' && PERIOD_TYPE_MAP[period]) {
    query.periodType = PERIOD_TYPE_MAP[period];
  }

  if (status !== 'all' && STATUS_MAP[status]) {
    query.status = STATUS_MAP[status];
  }

  return query;
}

function toReview(item: ReviewListItemDto): Review {
  return {
    id: String(item.id),
    status: toUiStatus(item.status),
    hasBannedWord: item.hasBadWord,
    school: item.schoolName,
    title: item.title,
    author: item.userName,
    rating: item.rating,
    reportCount: item.reportCount,
    createdAt: item.createdAt,
  };
}

function toActionTitle(actionNames: string[]): string {
  return actionNames
    .map((name) => ACTION_LABELS[name] ?? name)
    .join(', ');
}

function toReviewDetail(item: ReviewDetailDto): ReviewDetail {
  return {
    id: String(item.reviewId),
    status: toUiStatus(item.status),
    hasBannedWord: item.hasBadWordFlag,
    school: item.schoolName,
    title: '',
    author: item.nickname,
    rating: item.rating,
    reportCount: item.reportCount,
    createdAt: item.createdAt,
    content: item.content,
    photos: item.images ?? [],
    authorInfo: {
      nickname: item.nickname,
      email: item.email,
    },
    reports: (item.reportList ?? []).map((report, index) => ({
      id: `${item.reviewId}-report-${index}`,
      category: report.reportReason,
      reporter: String(report.reporterId),
      reportedAt: report.reportedAt,
    })),
    actions: (item.historyList ?? []).map((history, index) => ({
      id: `${item.reviewId}-history-${index}`,
      title: toActionTitle(history.actionNames ?? []),
      actor: history.handler,
      actedAt: history.actionAt,
      reason: history.reason,
    })),
  };
}

// 리뷰 리스트 조회
export async function fetchReviews(
  filters: ReviewListFilters = {},
): Promise<ReviewListResult> {
  const data = await http.get<ReviewListData>(
    '/admin/reviews',
    toListQuery(filters),
  );

  return {
    reviews: (data.reviewList ?? []).map(toReview),
    pageInfo: data.pageInfo,
  };
}

// 리뷰 상세 조회
export async function fetchReviewDetail(
  reviewId: string,
): Promise<ReviewDetail | null> {
  const data = await http.get<ReviewDetailDto>(`/admin/reviews/${reviewId}`);
  return data ? toReviewDetail(data) : null;
}

// 리뷰 삭제
export async function deleteReview(reviewId: string): Promise<void> {
  await http.delete<null>(`/admin/reviews/${reviewId}`);
}

// 리뷰 상태 변경
export async function patchReviewStatus(
  reviewId: string,
  status: ReviewApiStatus,
): Promise<void> {
  await http.patch<null>(`/admin/reviews/${reviewId}/status`, { status });
}

// 리뷰 마스킹 미리보기 조회
export async function fetchReviewMaskPreview(reviewId: string): Promise<string> {
  const data = await http.get<ReviewMaskPreviewDto>(
    `/admin/reviews/${reviewId}/mask`,
  );
  return data?.maskedContent ?? '';
}

// 리뷰 마스킹 확정
export async function postReviewMask(
  reviewId: string,
  body: ReviewMaskRequest,
): Promise<void> {
  await http.post<null>(`/admin/reviews/${reviewId}/mask`, body);
}
