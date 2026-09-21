import type { ReportSortOrder, ReportTab } from '../../types';

export const REPORT_TABS: ReportTab[] = ['접수', '처리완료'];

export const REPORT_SORT_OPTIONS: { value: ReportSortOrder; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'most_reported', label: '신고 많은순' },
];
