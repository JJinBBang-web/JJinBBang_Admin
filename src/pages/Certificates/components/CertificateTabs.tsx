import type { CertificateStatus } from '../../../types';
import { CERTIFICATE_TABS } from '../constants';

interface CertificateTabsProps {
  activeTab: CertificateStatus;
  onChange: (tab: CertificateStatus) => void;
  pendingCount: number;
};

export const CertificateTabs = ({ activeTab, onChange, pendingCount }: CertificateTabsProps) => {
  return (
    <div className="flex gap-1 border-b border-border">
      {CERTIFICATE_TABS.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-1 border-b-2 px-4 pb-3 pt-[10px] text-sm font-semibold ${
              isActive ? 'border-primary text-primary' : 'border-transparent text-text-muted'
            }`}
          >
            {tab.label}
            {tab.key === 'pending' && (
              <span className={`font-bold ${isActive ? 'text-primary' : 'text-text-muted'}`}>
                {pendingCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CertificateTabs;
