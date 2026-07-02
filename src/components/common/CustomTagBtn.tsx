import type { ReviewStatus } from '../../types';

const STATUS_CONFIG: Record<
  ReviewStatus,
  { label: string; className: string }
> = {
  public: {
    label: '공개',
    className: 'border border-border bg-white text-text-primary',
  },
  private: {
    label: '비공개',
    className: 'border border-border bg-bg-muted text-text-muted',
  },
};

interface CustomTagBtnProps {
  status: ReviewStatus;
}

export const CustomTagBtn = ({ status }: CustomTagBtnProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center rounded px-[9px] py-[3px] text-xs font-bold ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default CustomTagBtn;
