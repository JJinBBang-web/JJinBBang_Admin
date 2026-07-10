import { useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Report, ReportCategory, ReportTab } from '../../types';
import {FilterSelect} from '../../components/common/FilterSelect';
import { ForbiddenWordModal } from '../../components/common/ForbiddenWordModal';
import RejectModal from '../../components/common/RejectModal';
import { reportFilterStyles, reportTableStyles } from './styles';

const CATEGORY_STYLE: Record<ReportCategory, string> = {
  '욕설·비방': 'bg-danger-bg text-danger',
  허위정보: 'bg-[#fff8e6] text-[#d9832e]',
  스팸: 'bg-[#e8f0ff] text-primary',
  기타: 'bg-bg-muted text-text-muted',
};

const MOCK_REPORTS: Record<ReportTab, Report[]> = {
  접수: [
    {
      id: '1',
      reportedAt: '2026-06-02',
      categories: ['욕설·비방'],
      reportCount: 3,
      targetReview: '집주인이 [욕설] 진짜 별로예요 — 부산대',
      reporterSummary: 'user_8821 외 2명',
      details: [
        { reporter: 'user_8821', reportedAt: '2026-06-02 14:30', reason: '욕설 표현이 그대로 노출되어 있어요.' },
        { reporter: 'user_1043', reportedAt: '2026-06-02 18:05', reason: '비방성 표현이 과해 신고합니다.' },
        { reporter: 'user_5577', reportedAt: '2026-06-03 08:11', reason: '부적절한 내용이라 생각합니다.' },
      ],
    },
  ],
  검토중: [],
  처리완료: [],
};

const TAB_COUNTS: Record<ReportTab, number> = { 접수: 3, 검토중: 1, 처리완료: 12 };
const TABS: ReportTab[] = ['접수', '검토중', '처리완료'];

type ReportSortOrder = 'latest' | 'most_reported';

const REPORT_SORT_OPTIONS: { value: ReportSortOrder; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'most_reported', label: '신고 많은순' },
];

interface ExpandedReporterRowProps {
  details: Report['details'];
}

const ExpandedReporterRow = ({ details }: ExpandedReporterRowProps) => (
  <div className="bg-bg-light pl-14 pr-[18px] pb-2.5 pt-1">
    {details.map((d, i) => (
      <div
        key={`${d.reporter}-${i}`}
        className={`flex gap-2.5 items-start py-[9px] ${
          i < details.length - 1 ? 'border-b border-dashed border-border-light' : ''
        }`}
      >
        <span className="min-w-[120px] shrink-0 text-xs font-bold text-text-secondary">
          {d.reporter}
        </span>
        <span className="min-w-[130px] shrink-0 text-xs text-text-disabled">
          {d.reportedAt}
        </span>
        <span className="flex-1 min-w-0 text-xs text-text-secondary">{d.reason}</span>
      </div>
    ))}
  </div>
);

const Reports = () => {
  const [activeTab, setActiveTab] = useState<ReportTab>('접수');
  const [sortOrder, setSortOrder] = useState<ReportSortOrder>('latest');
  const [rejectTargetId, setRejectTargetId] = useState<string | null>(null);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>(['1']);
  const [isforbiddenWordModalOpen, setIsForbiddenWordModalOpen] = useState(false);

  const columns: ColumnsType<Report> = [
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
            setRejectTargetId(record.id);
          }}
          className="border-border! text-danger! font-semibold! text-[12.5px]! h-auto! rounded-sm! shadow-none! py-1! px-[11px]!"
        >
          기각
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1 border-b border-border">
        {TABS.map(tab => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-0.5 px-4 pb-3 pt-2.5 cursor-pointer bg-transparent border-b-2 -mb-[1px] ${
                isActive ? 'border-primary' : 'border-transparent'
              }`}
            >
              <span
                className={`text-sm font-semibold ${
                  isActive ? 'text-primary' : 'text-text-muted'
                }`}
              >
                {tab}{' '}
              </span>
              <span
                className={`text-sm font-bold ${
                  isActive ? 'text-primary' : 'text-text-disabled'
                }`}
              >
                {TAB_COUNTS[tab]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-end gap-2.5">
        <FilterSelect
          value={sortOrder}
          onChange={(value: ReportSortOrder) => setSortOrder(value)}
          options={REPORT_SORT_OPTIONS}
          className={reportFilterStyles.select}
        />
        <Button
          onClick={() => setIsForbiddenWordModalOpen(true)}
          className="h-9! rounded-sm! border-border! px-3.5! text-[13px]! font-semibold! text-text-primary! shadow-none!"
        >
          금칙어 사전 관리
        </Button>
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        <Table<Report>
          rowKey="id"
          columns={columns}
          dataSource={MOCK_REPORTS[activeTab]}
          pagination={false}
          className={reportTableStyles.table}
          expandable={{
            expandedRowRender: record => <ExpandedReporterRow details={record.details} />,
            showExpandColumn: false,
            expandRowByClick: true,
            expandedRowKeys,
            onExpand: (expanded, record) =>
              setExpandedRowKeys(
                expanded
                  ? [...expandedRowKeys, record.id]
                  : expandedRowKeys.filter(k => k !== record.id),
              ),
          }}
          onRow={() => ({ className: 'cursor-pointer' })}
        />
      </div>

      <p className="text-[11.5px] text-text-disabled leading-[16.68px]">
        ※ 동일 리뷰에 신고가 여러 건이면 한 행으로 묶이고 &quot;신고 N건&quot; 뱃지가 붙습니다.
        검토중(1)·처리완료(12)는 상단 탭에서 확인합니다.
      </p>

      <RejectModal
        open={rejectTargetId !== null}
        onClose={() => setRejectTargetId(null)}
        onConfirm={(_reason, _note) => {
          setRejectTargetId(null);
        }}
      />

      <ForbiddenWordModal
        open={isforbiddenWordModalOpen}
        onClose={() => setIsForbiddenWordModalOpen(false)}
      />
    </div>
  );
};

export default Reports;
