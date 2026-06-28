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
