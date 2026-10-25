import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { message } from 'antd';
import type { CertificateStatus } from '../../types';
import { useCertificateDetail } from '../../hooks/useCertificateDetail';
import { useCertificateActions } from '../../hooks/useCertificateActions';
import { CertificateDetailView } from './components/CertificateDetailView';
import { ApproveModal } from './components/ApproveModal';
import { RejectModal } from './components/RejectModal';

type ModalKind = 'approve' | 'reject' | null;

const CERTIFICATE_STATUSES: CertificateStatus[] = ['pending', 'approved', 'rejected'];

// 쿼리에 status가 없거나 잘못된 값이면 대기(pending)로 간주
function parseStatus(value: string | null): CertificateStatus {
  return CERTIFICATE_STATUSES.includes(value as CertificateStatus)
    ? (value as CertificateStatus)
    : 'pending';
}

const CertificateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const status = parseStatus(searchParams.get('status'));
  const navigate = useNavigate();
  const [modal, setModal] = useState<ModalKind>(null);

  const {
    data: detail = null,
    isLoading,
    isError,
    error,
  } = useCertificateDetail(id ?? null, status);
  const { approve, reject } = useCertificateActions();

  const handleBackToList = () => {
    setModal(null);
    navigate('/certificates');
  };

  // 승인/반려 API는 certificateId가 아니라 userId를 path로 받음
  const handleApprove = () => {
    if (!detail) return;
    approve.mutate(detail.userId, {
      onSuccess: () => {
        message.success('합격증이 승인되었습니다.');
        handleBackToList();
      },
      onError: (err) => {
        message.error(err.message || '승인 처리에 실패했습니다.');
      },
    });
  };

  const handleReject = (reason: string) => {
    if (!detail) return;
    reject.mutate(
      { userId: detail.userId, reason },
      {
        onSuccess: () => {
          message.success('합격증이 반려되었습니다.');
          handleBackToList();
        },
        onError: (err) => {
          message.error(err.message || '반려 처리에 실패했습니다.');
        },
      },
    );
  };

  return (
    <>
      <CertificateDetailView
        certificate={detail}
        loading={isLoading}
        errorMessage={isError ? error?.message || '증명서 정보를 불러오지 못했습니다.' : null}
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
