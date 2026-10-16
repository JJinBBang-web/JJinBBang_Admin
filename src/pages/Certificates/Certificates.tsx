import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CertificateStatus } from '../../types';
import { useCertificates, useCertificatePendingCount } from '../../hooks/useCertificates';
import CertificateTabs from './components/CertificateTabs';
import CertificateTable from './components/CertificateTable';

const Certificates = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<CertificateStatus>('pending');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const { data, isLoading } = useCertificates({ status: activeTab, page, size });
  const { data: pendingCount = 0 } = useCertificatePendingCount();

  const certificates = data?.certificates ?? [];
  const pageInfo = data?.pageInfo ?? {
    currentPage: page,
    pageSize: size,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: true,
  };

  const handleTabChange = (tab: CertificateStatus) => {
    setActiveTab(tab);
    setPage(0);
  };

  return (
    <div className="flex flex-col gap-3">
      <CertificateTabs activeTab={activeTab} onChange={handleTabChange} pendingCount={pendingCount} />
      <CertificateTable
        certificates={certificates}
        loading={isLoading}
        status={activeTab}
        pageInfo={pageInfo}
        onPageChange={(nextPage, nextSize) => {
          if (nextSize !== size) {
            setSize(nextSize);
            setPage(0);
            return;
          }
          setPage(nextPage);
        }}
        onReview={(id) => navigate(`/certificates/${id}`)}
      />
      <p className="text-[11.5px] text-text-disabled">
        ※ 업로드 오래된 순 정렬 · SLA 24시간 초과 건은 경과 시간을 빨간색으로 강조합니다.
      </p>
    </div>
  );
};

export default Certificates;
