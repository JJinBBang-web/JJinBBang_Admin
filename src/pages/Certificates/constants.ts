import type { CertificateStatus, RejectReasonCategory } from '../../types';

export const CERTIFICATE_SLA_HOURS = 24;

export const CERTIFICATE_TABS: { key: CertificateStatus; label: string }[] = [
  { key: 'pending', label: '대기' },
  { key: 'approved', label: '승인' },
  { key: 'rejected', label: '반려' },
];

export const REJECT_REASON_OPTIONS: RejectReasonCategory[] = [
  '이미지 식별 불가',
  '학교 불일치',
  '합격증 아님',
  '기타',
];
