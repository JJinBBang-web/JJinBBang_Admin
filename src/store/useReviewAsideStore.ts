import { create } from 'zustand';

interface ReviewAsideState {
  selectedReviewId: string | null;
  isOpen: boolean;
  openAside: (reviewId: string) => void;
  closeAside: () => void;
}

export const useReviewAsideStore = create<ReviewAsideState>((set) => ({
  selectedReviewId: null,
  isOpen: false,
  openAside: (reviewId) => set({ selectedReviewId: reviewId, isOpen: true }),
  closeAside: () => set({ isOpen: false, selectedReviewId: null }),
}));
