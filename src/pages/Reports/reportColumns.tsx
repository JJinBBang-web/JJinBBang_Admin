import { Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Report, ReportTab } from '../../types';

export function getReportColumns(
  activeTab: ReportTab,
  onReject: (reviewId: number, reportId: number) => void,
): ColumnsType<Report> {
  return [
    {
      title: '신고일',
      dataIndex: 'reportedAt',
      key: 'reportedAt',
      width: 152,
      render: (v: string) => <span className="text-xs text-text-muted">{v}</span>,
    },
    {
      title: '유형',
      dataIndex: 'reasons',
      key: 'reasons',
      width: 237,
      render: (reasons: string[], record: Report) => (
        <div className="flex items-center gap-1 flex-wrap">
          {reasons.map(reason => (
            <span
              key={reason}
              className="inline-flex items-center rounded-[12px] bg-bg-muted px-2.5 py-[3px] text-xs font-semibold text-text-muted"
            >
              {reason}
            </span>
          ))}
          {record.reportCount > 1 && (
            <span className="inline-flex items-center rounded-[12px] bg-text-primary px-2.5 py-[3px] text-xs font-semibold text-white">
              신고 {record.reportCount}건
            </span>
          )}
        </div>
      ),
    },
    {
      title: '대상 리뷰',
      dataIndex: 'targetReview',
      key: 'targetReview',
      ellipsis: true,
      render: (v: string) => <span className="text-xs text-text-primary">{v}</span>,
    },
    {
      title: '신고자',
      dataIndex: 'reporterSummary',
      key: 'reporterSummary',
      width: 187,
      render: (v: string) => <span className="text-xs text-text-primary">{v}</span>,
    },
    {
      title: '상태',
      key: 'status',
      width: 103,
      render: () => (
        <span className="inline-flex items-center rounded-[12px] border border-border bg-bg-light px-2.5 py-[3px] text-xs font-semibold text-text-secondary">
          {activeTab}
        </span>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 108,
      render: (_, record: Report) =>
        activeTab === '접수' && record.details.length === 1 ? (
          <Button
            size="small"
            onClick={e => {
              e.stopPropagation();
              onReject(record.reviewId, record.details[0].reportId);
            }}
            className="border-border! text-danger! font-semibold! text-[12.5px]! h-auto! rounded-sm! shadow-none! py-1! px-[11px]!"
          >
            기각
          </Button>
        ) : null,
    },
  ];
}
