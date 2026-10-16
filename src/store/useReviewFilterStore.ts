import { create } from 'zustand';
import type { ReviewSortOrder } from '../types';

interface ReviewFilterState {
  keyword: string;
  school: string;
  period: string;
  status: string;
  bannedWordsOnly: boolean;
  sortOrder: ReviewSortOrder;
  page: number;
  size: number;
  setKeyword: (keyword: string) => void;
  setSchool: (school: string) => void;
  setPeriod: (period: string) => void;
  setStatus: (status: string) => void;
  setBannedWordsOnly: (value: boolean) => void;
  setSortOrder: (order: ReviewSortOrder) => void;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}

export const useReviewFilterStore = create<ReviewFilterState>((set) => ({
  keyword: '',
  school: 'all',
  period: 'all',
  status: 'all',
  bannedWordsOnly: false,
  sortOrder: 'latest',
  page: 0,
  size: 10,
  setKeyword: (keyword) => set({ keyword, page: 0 }),
  setSchool: (school) => set({ school, page: 0 }),
  setPeriod: (period) => set({ period, page: 0 }),
  setStatus: (status) => set({ status, page: 0 }),
  setBannedWordsOnly: (bannedWordsOnly) => set({ bannedWordsOnly, page: 0 }),
  setSortOrder: (sortOrder) => set({ sortOrder, page: 0 }),
  setPage: (page) => set({ page }),
  setSize: (size) => set({ size, page: 0 }),
}));
