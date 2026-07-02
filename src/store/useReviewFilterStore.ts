import { create } from 'zustand';
import type { ReviewSortOrder } from '../types';

interface ReviewFilterState {
  keyword: string;
  school: string;
  period: string;
  status: string;
  bannedWordsOnly: boolean;
  sortOrder: ReviewSortOrder;
  setKeyword: (keyword: string) => void;
  setSchool: (school: string) => void;
  setPeriod: (period: string) => void;
  setStatus: (status: string) => void;
  setBannedWordsOnly: (value: boolean) => void;
  setSortOrder: (order: ReviewSortOrder) => void;
}

export const useReviewFilterStore = create<ReviewFilterState>((set) => ({
  keyword: '',
  school: 'all',
  period: 'all',
  status: 'all',
  bannedWordsOnly: false,
  sortOrder: 'latest',
  setKeyword: (keyword) => set({ keyword }),
  setSchool: (school) => set({ school }),
  setPeriod: (period) => set({ period }),
  setStatus: (status) => set({ status }),
  setBannedWordsOnly: (bannedWordsOnly) => set({ bannedWordsOnly }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
}));
