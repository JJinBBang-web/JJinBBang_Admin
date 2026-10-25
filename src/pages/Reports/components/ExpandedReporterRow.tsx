import { Button } from 'antd';
import type { ReporterDetail } from '../../../types';

interface ExpandedReporterRowProps {
  details: ReporterDetail[];
  onReject?: (reportId: number) => void;
}

export const ExpandedReporterRow = ({ details, onReject }: ExpandedReporterRowProps) => (
  <div className="bg-bg-light pl-14 pr-[18px] pb-2.5 pt-1">
    {details.map((d, i) => (
      <div
        key={d.reportId}
        className={`flex gap-2.5 items-center py-[9px] ${
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
        {onReject && d.status === 'PENDING' && (
          <Button
            size="small"
            onClick={e => {
              e.stopPropagation();
              onReject(d.reportId);
            }}
            className="border-border! text-danger! font-semibold! text-[12px]! h-auto! rounded-sm! shadow-none! py-1! px-[10px]! shrink-0"
          >
            기각
          </Button>
        )}
      </div>
    ))}
  </div>
);

export default ExpandedReporterRow;
