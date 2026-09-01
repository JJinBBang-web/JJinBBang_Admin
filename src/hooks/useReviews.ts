import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '../api/reviews';
import { useReviewFilterStore } from '../store/useReviewFilterStore';

export function useReviews() {
  const { keyword, school, period, status, bannedWordsOnly, sortOrder } =
    useReviewFilterStore();

  return useQuery({
    queryKey: ['reviews', keyword, school, period, status, bannedWordsOnly, sortOrder],
    queryFn: () =>
      fetchReviews({ keyword, school, period, status, bannedWordsOnly, sortOrder }),
  });
}
