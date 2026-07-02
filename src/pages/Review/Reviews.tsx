import { AsideTab } from './components/AsideTab';
import {reviewColumns} from './reviewColumns';
import { useReviewDetail } from '../../hooks/useReviewDetail';
import { useReviews } from '../../hooks/useReviews';
import { useReviewAsideStore } from '../../store/useReviewAsideStore';
import ReviewFilter from './components/ReviewFilter';
import ReviewTable from './components/ReviewTable';

const Reviews = () => {
  const { data: reviews = [], isLoading } = useReviews();
  const { selectedReviewId, isOpen, openAside, closeAside } =
    useReviewAsideStore();
  const { data: selectedReview = null, isLoading: isDetailLoading } =
    useReviewDetail(selectedReviewId);

  return (
    <>
    <div className="flex flex-col gap-4">
      <ReviewFilter/>
      <ReviewTable 
        reviews={reviews}
        loading={isLoading}
        columns={reviewColumns}
        onRowClick={openAside}    
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
