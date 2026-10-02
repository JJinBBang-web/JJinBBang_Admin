import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteReview,
  patchReviewStatus,
  postReviewMask,
  type ReviewApiStatus,
  type ReviewMaskRequest,
} from '../api/reviews';

export function useReviewActions() {
  const queryClient = useQueryClient();

  const invalidateReview = (reviewId: string) => {
    queryClient.invalidateQueries({ queryKey: ['reviews'] });
    queryClient.invalidateQueries({ queryKey: ['review', reviewId] });
  };

  const remove = useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: (_data, reviewId) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.removeQueries({ queryKey: ['review', reviewId] });
    },
  });

  const updateStatus = useMutation({
    mutationFn: ({
      reviewId,
      status,
    }: {
      reviewId: string;
      status: ReviewApiStatus;
    }) => patchReviewStatus(reviewId, status),
    onSuccess: (_data, { reviewId }) => invalidateReview(reviewId),
  });

  const maskReview = useMutation({
    mutationFn: ({
      reviewId,
      ...body
    }: { reviewId: string } & ReviewMaskRequest) =>
      postReviewMask(reviewId, body),
    onSuccess: (_data, { reviewId }) => invalidateReview(reviewId),
  });

  return { deleteReview: remove, updateStatus, maskReview };
}
