import { sectionTitleClassName } from "../styles";

type ReviewActiveCardProps = {
  id: string;
  title: string;
  actor: string;
  actedAt: string;
  reason: string;
};

const ReviewActiveCard = ({
  id,
  title,
  actor,
  actedAt,
  reason
}:ReviewActiveCardProps) => {
  return (
      <>
          <div
            key={id}
            className="relative rounded-sm border border-border-light px-3 py-2.5"
          >
            <span className="absolute left-[-23px] top-[15px] size-[13px] rounded-full border-2 border-white bg-primary" />
            <div className="text-[13px] font-semibold text-text-primary">
              {title}
            </div>
            <div className="text-xs text-text-muted">
              {actedAt} · {actor}
            </div>
            <div className="mt-1 rounded bg-bg-light px-2 py-1.5 text-[12.5px] text-text-secondary">
              {reason}
            </div>
          </div>
      </>
  )
}


const ReviewActionHistory = ({review}) => {
    return (
        <>
            {review.actions.length > 0 && (
                <div className="flex flex-col items-end gap-2.5">
                  <span className={`${sectionTitleClassName} self-start`}>
                    조치 이력
                  </span>
                  <div className="w-full border-l-2 border-border pl-4">
                    <div className="flex flex-col gap-2">
                      {review.actions.map((action) => (
                        <ReviewActiveCard 
                          id={action.id} 
                          title={action.title} 
                          actor={action.actor} 
                          actedAt={action.actedAt}
                          reason={action.reason}                          
                        />
                      ))}
                    </div>
                  </div>
                </div>
            )}
        </>
    )
}

export default ReviewActionHistory;