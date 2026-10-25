import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '../api/reviews';
import { useReviewFilterStore } from '../store/useReviewFilterStore';

export function useReviews() {
  const {
    keyword,
    school,
    period,
    status,
    bannedWordsOnly,
    sortOrder,
    page,
    size,
  } = useReviewFilterStore();

  return useQuery({
    queryKey: [
      'reviews',
      keyword,
      school,
      period,
      status,
      bannedWordsOnly,
      sortOrder,
      page,
      size,
    ],
    queryFn: () =>
      fetchReviews({
        keyword,
        school,
        period,
        status,
        bannedWordsOnly,
        sortOrder,
        page,
        size,
      }),
  });
}
