import { useQuery } from '@tanstack/react-query';
import { fetchReviewDetail } from '../api/reviews';

export function useReviewDetail(reviewId: string | null) {
  return useQuery({
    queryKey: ['review', reviewId],
    queryFn: () => fetchReviewDetail(reviewId!),
    enabled: !!reviewId,
  });
}
