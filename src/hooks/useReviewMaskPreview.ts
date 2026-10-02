import { useQuery } from '@tanstack/react-query';
import { fetchReviewMaskPreview } from '../api/reviews';

// 마스킹 모달이 열려 있을 때만 미리보기를 조회한다.
export function useReviewMaskPreview(reviewId: string, enabled: boolean) {
  return useQuery({
    queryKey: ['review', reviewId, 'mask-preview'],
    queryFn: () => fetchReviewMaskPreview(reviewId),
    enabled: enabled && !!reviewId,
  });
}
