import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CertificateStatus } from '../../types';
import { useCertificates } from '../../hooks/useCertificates';
import CertificateTabs from './components/CertificateTabs';
import CertificateTable from './components/CertificateTable';

const Certificates = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<CertificateStatus>('pending');

  const { data: certificates = [], isLoading } = useCertificates();

  const pendingCount = certificates.filter((c) => c.status === 'pending').length;
  const visibleCertificates = certificates
    .filter((c) => c.status === activeTab)
    .sort((a, b) => a.appliedAt.localeCompare(b.appliedAt));

  return (
    <div className="flex flex-col gap-3">
      <CertificateTabs activeTab={activeTab} onChange={setActiveTab} pendingCount={pendingCount} />
      <CertificateTable
        certificates={visibleCertificates}
        loading={isLoading}
        status={activeTab}
        onReview={(id) => navigate(`/certificates/${id}`)}
      />
      <p className="text-[11.5px] text-text-disabled">
        ※ 업로드 오래된 순 정렬 · SLA 24시간 초과 건은 경과 시간을 빨간색으로 강조합니다.
      </p>
    </div>
  );
};

export default Certificates;
