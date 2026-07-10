import { useState } from 'react';
import { message } from 'antd';
import type { CertificateStatus } from '../../types';
import { useCertificates } from '../../hooks/useCertificates';
import { useCertificateDetail } from '../../hooks/useCertificateDetail';
import { useCertificateActions } from '../../hooks/useCertificateActions';
import CertificateTabs from './components/CertificateTabs';
import CertificateTable from './components/CertificateTable';
import { CertificateDetailView } from './components/CertificateDetailView';
import { ApproveModal } from './components/ApproveModal';
import { RejectModal } from './components/RejectModal';

type ModalKind = 'approve' | 'reject' | null;

const Certificates = () => {
  const [activeTab, setActiveTab] = useState<CertificateStatus>('pending');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalKind>(null);

  const { data: certificates = [], isLoading } = useCertificates();
  const { data: detail = null, isLoading: isDetailLoading } = useCertificateDetail(selectedId);
  const { approve, reject } = useCertificateActions();

  const pendingCount = certificates.filter((c) => c.status === 'pending').length;
  const visibleCertificates = certificates
    .filter((c) => c.status === activeTab)
    .sort((a, b) => a.appliedAt.localeCompare(b.appliedAt));

  const handleBackToList = () => {
    setSelectedId(null);
    setModal(null);
  };

  const handleApprove = () => {
    if (!selectedId) return;
    approve.mutate(selectedId, {
      onSuccess: () => {
        message.success('합격증이 승인되었습니다.');
        handleBackToList();
      },
    });
  };

  const handleReject = (reason: string) => {
    if (!selectedId) return;
    reject.mutate(
      { id: selectedId, reason },
      {
        onSuccess: () => {
          message.success('합격증이 반려되었습니다.');
          handleBackToList();
        },
      },
    );
  };

  if (selectedId) {
    return (
      <>
        <CertificateDetailView
          certificate={detail}
          loading={isDetailLoading}
          onBack={handleBackToList}
          onApprove={() => setModal('approve')}
          onReject={() => setModal('reject')}
        />
        <ApproveModal
          open={modal === 'approve'}
          onCancel={() => setModal(null)}
          onConfirm={handleApprove}
          confirmLoading={approve.isPending}
        />
        <RejectModal
          open={modal === 'reject'}
          onCancel={() => setModal(null)}
          onConfirm={handleReject}
          confirmLoading={reject.isPending}
        />
      </>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <CertificateTabs activeTab={activeTab} onChange={setActiveTab} pendingCount={pendingCount} />
      <CertificateTable
        certificates={visibleCertificates}
        loading={isLoading}
        status={activeTab}
        onReview={setSelectedId}
      />
      <p className="text-[11.5px] text-text-disabled">
        ※ 업로드 오래된 순 정렬 · SLA 24시간 초과 건은 경과 시간을 빨간색으로 강조합니다.
      </p>
    </div>
  );
};

export default Certificates;
