import type { ReportCategory, ReportSortOrder, ReportTab } from '../../types';

export const CATEGORY_STYLE: Record<ReportCategory, string> = {
  '욕설·비방': 'bg-danger-bg text-danger',
  허위정보: 'bg-[#fff8e6] text-[#d9832e]',
  스팸: 'bg-[#e8f0ff] text-primary',
  기타: 'bg-bg-muted text-text-muted',
};

export const REPORT_TABS: ReportTab[] = ['접수', '검토중', '처리완료'];

export const REPORT_SORT_OPTIONS: { value: ReportSortOrder; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'most_reported', label: '신고 많은순' },
];
