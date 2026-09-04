import { Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Report, ReportCategory, ReportTab } from '../../types';
import { CATEGORY_STYLE } from './constants';

export function getReportColumns(
  activeTab: ReportTab,
  onReject: (id: string) => void,
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
      dataIndex: 'categories',
      key: 'categories',
      width: 237,
      render: (categories: ReportCategory[], record: Report) => (
        <div className="flex items-center gap-1 flex-wrap">
          {categories.map(c => (
            <span
              key={c}
              className={`inline-flex items-center rounded-[12px] px-2.5 py-[3px] text-xs font-semibold ${CATEGORY_STYLE[c] ?? 'bg-bg-muted text-text-muted'}`}
            >
              {c}
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
      render: (_, record: Report) => (
        <Button
          size="small"
          onClick={e => {
            e.stopPropagation();
            onReject(record.id);
          }}
          className="border-border! text-danger! font-semibold! text-[12.5px]! h-auto! rounded-sm! shadow-none! py-1! px-[11px]!"
        >
          기각
        </Button>
      ),
    },
  ];
}
