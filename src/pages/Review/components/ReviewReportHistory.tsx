import type { ReviewDetail } from "../../../types";
import { sectionTitleClassName } from "../styles";

type ReviewReportCardProps = {
    id: string;
    category: string;
    reporter: string;
    reportedAt: string;
};

const ReviewReportCard = ({
    id,
    category,
    reporter,
    reportedAt
}:ReviewReportCardProps) => {
    return (
        <>
            <div
                key={id}
                className="rounded-sm border border-border-light px-3 py-2.5"
            >
                <div className="text-[13px] font-semibold text-text-primary">
                    {category}
                </div>
                <div className="text-xs text-text-muted">
                    {reporter} · {reportedAt}
                </div>
            </div>
        </>
    )
}

interface ReviewReportHistoryProps {
    review: ReviewDetail;
}

const ReviewReportHistory = ({review}: ReviewReportHistoryProps) => {
    return (
        <>
            <div className="flex flex-col gap-2">
                <span className={sectionTitleClassName}>
                신고 이력 ({review.reports.length})
                </span>
                {review.reports.length > 0 ? (
                    <div className="flex flex-col gap-2">
                    {review.reports.map((report) => (
                        <ReviewReportCard 
                            id={report.id} 
                            category={report.category}
                            reporter={report.reporter}
                            reportedAt={report.reportedAt}
                        />
                    ))}
                    </div>
                ) : <div>없음</div>}
            </div>
        </>
    )
}

export default ReviewReportHistory;