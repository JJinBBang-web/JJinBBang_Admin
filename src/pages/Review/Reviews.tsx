import { AsideTab } from './components/AsideTab';
import {reviewColumns} from './reviewColumns';
import { useReviewDetail } from '../../hooks/useReviewDetail';
import { useReviews } from '../../hooks/useReviews';
import { useReviewAsideStore } from '../../store/useReviewAsideStore';
import { useReviewFilterStore } from '../../store/useReviewFilterStore';
import ReviewFilter from './components/ReviewFilter';
import ReviewTable from './components/ReviewTable';

const Reviews = () => {
  const { data, isLoading } = useReviews();
  const { page, size, setPage, setSize } = useReviewFilterStore();
  const { selectedReviewId, isOpen, openAside, closeAside } =
    useReviewAsideStore();
  const { data: selectedReview = null, isLoading: isDetailLoading } =
    useReviewDetail(selectedReviewId);

  const reviews = data?.reviews ?? [];
  const pageInfo = data?.pageInfo ?? {
    currentPage: page,
    pageSize: size,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: true,
  };

  return (
    <>
    <div className="flex flex-col gap-4">
      <ReviewFilter/>
      <ReviewTable 
        reviews={reviews}
        loading={isLoading}
        columns={reviewColumns}
        pageInfo={pageInfo}
        onRowClick={openAside}
        onPageChange={(nextPage, nextSize) => {
          if (nextSize !== size) {
            setSize(nextSize);
            return;
          }
          setPage(nextPage);
        }}
      />
    </div>
    <AsideTab
      open={isOpen}
      onClose={closeAside}
      review={selectedReview}
      isLoading={isDetailLoading}
    />
    </>
  );
};

export default Reviews;
