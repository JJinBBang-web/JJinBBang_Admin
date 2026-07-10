import type { ColumnsType } from 'antd/es/table';
import type { Certificate, CertificateStatus } from '../../types';
import { formatElapsed } from './utils';

const ACTION_LABEL: Record<CertificateStatus, string> = {
  pending: '검토',
  approved: '상세',
  rejected: '상세',
};

export function getCertificateColumns(
  status: CertificateStatus,
  onReview: (id: string) => void,
): ColumnsType<Certificate> {
  return [
    {
      title: '신청일시',
      dataIndex: 'appliedAt',
      width: 160,
      render: (appliedAt: string) => (
        <span className="text-[13px] text-text-muted">{appliedAt}</span>
      ),
    },
    {
      title: '경과 시간',
      dataIndex: 'elapsedHours',
      width: 150,
      render: (elapsedHours: number) => {
        const { label, isOverdue } = formatElapsed(elapsedHours);
        return (
          <span
            className={`text-[13px] font-bold ${isOverdue ? 'text-danger' : 'text-text-secondary'}`}
          >
            {label}
          </span>
        );
      },
    },
    {
      title: '신청자 닉네임',
      dataIndex: 'nickname',
      render: (_: string, record: Certificate) => (
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-text-primary">{record.nickname}</span>
          {record.isReupload && (
            <span className="rounded-xl border border-border bg-bg-light px-2.5 py-1 text-xs font-semibold text-text-secondary">
              재업로드
            </span>
          )}
        </div>
      ),
    },
    {
      title: '신청 학교',
      dataIndex: 'school',
      width: 130,
      render: (school: string) => (
        <span className="text-[13px] text-text-primary">{school}</span>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 110,
      render: (_: unknown, record: Certificate) => (
        <button
          type="button"
          onClick={() => onReview(record.id)}
          className="rounded-sm border border-border px-[11px] py-[7px] text-[12.5px] font-semibold text-text-primary hover:bg-bg-light"
        >
          {ACTION_LABEL[status]}
        </button>
      ),
    },
  ];
}
