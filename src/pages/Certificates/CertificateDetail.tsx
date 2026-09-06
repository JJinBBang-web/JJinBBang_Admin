import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import { useCertificateDetail } from '../../hooks/useCertificateDetail';
import { useCertificateActions } from '../../hooks/useCertificateActions';
import { CertificateDetailView } from './components/CertificateDetailView';
import { ApproveModal } from './components/ApproveModal';
import { RejectModal } from './components/RejectModal';

type ModalKind = 'approve' | 'reject' | null;

const CertificateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [modal, setModal] = useState<ModalKind>(null);

  const { data: detail = null, isLoading } = useCertificateDetail(id ?? null);
  const { approve, reject } = useCertificateActions();

  const handleBackToList = () => {
    setModal(null);
    navigate('/certificates');
  };

  const handleApprove = () => {
    if (!id) return;
    approve.mutate(id, {
      onSuccess: () => {
        message.success('합격증이 승인되었습니다.');
        handleBackToList();
      },
    });
  };

  const handleReject = (reason: string) => {
    if (!id) return;
    reject.mutate(
      { id, reason },
      {
        onSuccess: () => {
          message.success('합격증이 반려되었습니다.');
          handleBackToList();
        },
      },
    );
  };

  return (
    <>
      <CertificateDetailView
        certificate={detail}
        loading={isLoading}
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
};

export default CertificateDetail;
