import { useMemo, useState } from 'react';
import { Table } from 'antd';
import type { Report, ReporterDetail, ReportedReview, ReportSortOrder, ReportTab } from '../../types';
import { RejectModal } from '../../components/common/RejectModal';
import { useReports } from '../../hooks/useReports';
import { useReportActions } from '../../hooks/useReportActions';
import { ReportTabs } from './components/ReportTabs';
import { ReportFilter } from './components/ReportFilter';
import { ExpandedReporterRow } from './components/ExpandedReporterRow';
import { getReportColumns } from './reportColumns';
import { reportTableStyles } from './styles';

const PAGE_SIZE = 50;

function toReportRows(reviews: ReportedReview[]): Report[] {
  return reviews.map(review => {
    const details: ReporterDetail[] = review.subReports.map(sub => ({
      reportId: sub.reportId,
      reporter: `user_${sub.reporterId}`,
      reportedAt: sub.reportedAt,
      reason: sub.reason,
      status: sub.status,
    }));

    const reasons = Array.from(new Set(details.map(d => d.reason)));
    const latestReportedAt = details.reduce(
      (latest, d) => (d.reportedAt > latest ? d.reportedAt : latest),
      details[0]?.reportedAt ?? '',
    );
    const reporterSummary =
      details.length > 1 ? `${details[0].reporter} 외 ${details.length - 1}명` : (details[0]?.reporter ?? '-');

    return {
      id: String(review.reviewId),
      reviewId: review.reviewId,
      reportedAt: latestReportedAt,
      reasons,
      reportCount: review.totalReportCount,
      targetReview: `${review.content} — ${review.schoolName}`,
      reporterSummary,
      details,
    };
  });
}

function sortReports(reports: Report[], sortOrder: ReportSortOrder): Report[] {
  const sorted = [...reports];
  if (sortOrder === 'most_reported') {
    sorted.sort((a, b) => b.reportCount - a.reportCount);
  } else {
    sorted.sort((a, b) => b.reportedAt.localeCompare(a.reportedAt));
  }
  return sorted;
}

const Reports = () => {
  const [activeTab, setActiveTab] = useState<ReportTab>('접수');
  const [sortOrder, setSortOrder] = useState<ReportSortOrder>('latest');
  const [rejectTarget, setRejectTarget] = useState<{ reviewId: number; reportId: number } | null>(null);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const pendingQuery = useReports({ status: 'PENDING', page: 0, size: PAGE_SIZE });
  const rejectedQuery = useReports({ status: 'REJECT', page: 0, size: PAGE_SIZE });
  const { dismiss } = useReportActions();

  const activeQuery = activeTab === '접수' ? pendingQuery : rejectedQuery;

  const reports = useMemo(
    () => sortReports(toReportRows(activeQuery.data?.reportReviewList ?? []), sortOrder),
    [activeQuery.data, sortOrder],
  );

  const tabCounts: Record<ReportTab, number> = {
    접수: pendingQuery.data?.pageInfo.totalElements ?? 0,
    처리완료: rejectedQuery.data?.pageInfo.totalElements ?? 0,
  };

  const columns = getReportColumns(activeTab, (reviewId, reportId) => setRejectTarget({ reviewId, reportId }));

  return (
    <div className="flex flex-col gap-3">
      <ReportTabs activeTab={activeTab} onChange={setActiveTab} tabCounts={tabCounts} />

      <ReportFilter sortOrder={sortOrder} onSortOrderChange={setSortOrder} />

      <div className="overflow-hidden rounded-md border border-border">
        <Table<Report>
          rowKey="id"
          columns={columns}
          dataSource={reports}
          loading={activeQuery.isLoading}
          pagination={false}
          className={reportTableStyles.table}
          expandable={{
            expandedRowRender: record => (
              <ExpandedReporterRow
                details={record.details}
                onReject={reportId => setRejectTarget({ reviewId: record.reviewId, reportId })}
              />
            ),
            showExpandColumn: false,
            expandRowByClick: true,
            expandedRowKeys,
            onExpand: (expanded, record) =>
              setExpandedRowKeys(
                expanded ? [...expandedRowKeys, record.id] : expandedRowKeys.filter(k => k !== record.id),
              ),
          }}
          onRow={() => ({ className: 'cursor-pointer' })}
        />
      </div>

      <p className="text-[11.5px] text-text-disabled leading-[16.68px]">
        ※ 동일 리뷰에 신고가 여러 건이면 한 행으로 묶이고 &quot;신고 N건&quot; 뱃지가 붙습니다.
        행을 펼치면 신고 건별로 개별 기각할 수 있습니다.
      </p>

      <RejectModal
        open={rejectTarget !== null}
        onClose={() => setRejectTarget(null)}
        confirmLoading={dismiss.isPending}
        onConfirm={(rejectReasonType, customReason) => {
          if (!rejectTarget) return;
          dismiss.mutate(
            { reportId: rejectTarget.reportId, payload: { rejectReasonType, customReason } },
            { onSuccess: () => setRejectTarget(null) },
          );
        }}
      />
    </div>
  );
};

export default Reports;
