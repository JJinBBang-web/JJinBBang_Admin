import CustomTagBtn from "../../../components/common/CustomTagBtn"

type ReviewPhotoListProps = {
  photos: string[];
};

const ReviewPhotoList = ({ photos }: ReviewPhotoListProps) => {
  if (photos.length === 0) return null;

  return (
    <div className="flex gap-2 pt-2">
      {photos.map((photo) => (
        <div
          key={photo}
          className="flex size-[84px] items-center justify-center rounded-sm border border-dashed border-border bg-bg-muted text-[11px] text-text-disabled"
        >
          {photo}
        </div>
      ))}
    </div>
  );
};

const ReviewSummary = ({review}) => {
    return (
        <>
            <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <CustomTagBtn status={review.status} />
                  <span className="rounded-xl border border-border bg-bg-light px-2 py-0.5 text-xs font-semibold text-text-secondary">
                    {review.school}
                  </span>
                  {review.hasBannedWord && (
                    <span className="rounded-xl bg-danger-bg px-2 py-0.5 text-xs font-semibold text-danger">
                      ⚠️ 금칙어 플래그
                    </span>
                  )}
                  <span className="ml-auto text-sm text-text-primary">
                    ★ {review.rating.toFixed(1)}
                  </span>
                </div>

                <h3 className="pt-0.5 text-base font-bold leading-[23px] text-text-primary">
                  {review.title}
                </h3>

                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12.5px] text-text-muted">
                  <span>신고 {review.reportCount}건</span>
                  <span>작성일 {review.createdAt}</span>
                  {review.author && <span>작성자 {review.author}</span>}
                </div>

                <p className="pt-1 text-sm leading-[22.4px] text-text-secondary">
                  {review.content}
                </p>

                {review.photos.length > 0 && (
                  <ReviewPhotoList photos={review.photos} />
                )}
              </div>
        </>
    )
}

export default ReviewSummary;