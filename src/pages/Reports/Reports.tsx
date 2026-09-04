import { useState } from 'react';
import { Table } from 'antd';
import type { Report, ReportSortOrder, ReportTab } from '../../types';
import { RejectModal } from '../../components/common/RejectModal';
import { ReportTabs } from './components/ReportTabs';
import { ReportFilter } from './components/ReportFilter';
import { ExpandedReporterRow } from './components/ExpandedReporterRow';
import { getReportColumns } from './reportColumns';
import { reportTableStyles } from './styles';

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

const Reports = () => {
  const [activeTab, setActiveTab] = useState<ReportTab>('접수');
  const [sortOrder, setSortOrder] = useState<ReportSortOrder>('latest');
  const [rejectTargetId, setRejectTargetId] = useState<string | null>(null);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>(['1']);

  const columns = getReportColumns(activeTab, setRejectTargetId);

  return (
    <div className="flex flex-col gap-3">
      <ReportTabs activeTab={activeTab} onChange={setActiveTab} tabCounts={TAB_COUNTS} />

      <ReportFilter sortOrder={sortOrder} onSortOrderChange={setSortOrder} />

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
        onConfirm={() => {
          setRejectTargetId(null);
        }}
      />
    </div>
  );
};

export default Reports;
