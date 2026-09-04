import type { ReporterDetail } from '../../../types';

interface ExpandedReporterRowProps {
  details: ReporterDetail[];
}

export const ExpandedReporterRow = ({ details }: ExpandedReporterRowProps) => (
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

export default ExpandedReporterRow;
