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
export type ReportTab = '접수' | '검토중' | '처리완료';
export type ReportCategory = '욕설·비방' | '허위정보' | '스팸' | '기타';
export type ReportSortOrder = 'latest' | 'most_reported';

export interface ReporterDetail {
  reporter: string;
  reportedAt: string;
  reason: string;
}

export interface Report {
  id: string;
  reportedAt: string;
  categories: ReportCategory[];
  reportCount: number;
  targetReview: string;
  reporterSummary: string;
  details: ReporterDetail[];
}
