import type { ReportTab } from '../../../types';
import { REPORT_TABS } from '../constants';

interface ReportTabsProps {
  activeTab: ReportTab;
  onChange: (tab: ReportTab) => void;
  tabCounts: Record<ReportTab, number>;
}

export const ReportTabs = ({ activeTab, onChange, tabCounts }: ReportTabsProps) => {
  return (
    <div className="flex gap-1 border-b border-border">
      {REPORT_TABS.map(tab => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={`flex items-center gap-0.5 px-4 pb-3 pt-2.5 cursor-pointer bg-transparent border-b-2 -mb-px ${
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
              {tabCounts[tab]}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ReportTabs;
