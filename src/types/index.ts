export type ReviewStatus = 'public' | 'private';

export interface Review {
  id: string;
  status: ReviewStatus;
  hasBannedWord: boolean;
  school: string;
  title: string;
  author: string | null;
  rating: number;
  reportCount: number;
  createdAt: string;
}

export type ReviewSortOrder = 'latest' | 'reportest' | 'rating_high' | 'rating_low';

export interface ReviewAuthor {
  nickname: string;
  email: string;
}

export interface ReviewReport {
  id: string;
  category: string;
  reporter: string;
  reportedAt: string;
}

export interface ReviewAction {
  id: string;
  title: string;
  actor: string;
  actedAt: string;
  reason: string;
}

export interface ReviewDetail extends Review {
  content: string;
  photos: string[];
  authorInfo: ReviewAuthor;
  reports: ReviewReport[];
  actions: ReviewAction[];
}

// ── Certificate ───────────────────────────────────────────────────────
export type CertificateStatus = 'pending' | 'approved' | 'rejected';

export type RejectReasonCategory = '이미지 식별 불가' | '학교 불일치' | '합격증 아님' | '기타';

export interface Certificate {
  id: string;
  appliedAt: string;
  elapsedHours: number;
  nickname: string;
  school: string;
  isReupload: boolean;
  status: CertificateStatus;
}

export interface CertificateDetail extends Certificate {
  joinedAt: string;
  email: string;
  imageUrl: string | null;
}

// ── Report ────────────────────────────────────────────────────────────
export type ReportTab = '접수' | '처리완료';
export type ReportSortOrder = 'latest' | 'most_reported';

export interface ReporterDetail {
  reportId: number;
  reporter: string;
  reportedAt: string;
  reason: string;
  status: ReportProcessStatus;
}

export interface Report {
  id: string;
  reviewId: number;
  reportedAt: string;
  reasons: string[];
  reportCount: number;
  targetReview: string;
  reporterSummary: string;
  details: ReporterDetail[];
}

// ── Prohibited Word (신고 관리 · 금칙어 사전) ────────────────────────────
export interface ProhibitedWord {
  id: number;
  word: string;
  enabled: boolean;
  createdAt: string;
}

export interface PageInfo {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
}

// ── Report Processing (신고 관리 · 신고 목록/기각) ───────────────────────
export type ReportProcessStatus = 'PENDING' | 'APPROVE' | 'REJECT';

export interface SubReport {
  reportId: number;
  reporterId: number;
  reason: string;
  status: ReportProcessStatus;
  reportedAt: string;
}

export interface ReportedReview {
  reviewId: number;
  schoolName: string;
  content: string;
  totalReportCount: number;
  subReports: SubReport[];
}

export type RejectReasonType = 'DUPLICATE' | 'NO_VIOLATION' | 'OTHER';
