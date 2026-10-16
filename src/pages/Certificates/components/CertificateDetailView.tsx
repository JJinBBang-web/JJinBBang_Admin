import { Button } from 'antd';
import type { CertificateDetail } from '../../../types';
import CertificateViewer from './CertificateViewer';
import CertificateInfoPanel from './CertificateInfoPanel';

interface CertificateDetailViewProps {
  certificate: CertificateDetail | null;
  loading: boolean;
  errorMessage?: string | null;
  onBack: () => void;
  onApprove: () => void;
  onReject: () => void;
};

export const CertificateDetailView = ({
  certificate,
  loading,
  errorMessage,
  onBack,
  onApprove,
  onReject,
}: CertificateDetailViewProps) => {
  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onBack}
        className="w-fit text-sm text-text-muted hover:text-text-primary"
      >
        ← 목록으로 돌아가기
      </button>

      {errorMessage ? (
        <div className="py-20 text-center text-sm text-danger">{errorMessage}</div>
      ) : loading || !certificate ? (
        <div className="py-20 text-center text-sm text-text-muted">불러오는 중...</div>
      ) : (
        <>
          <div className="flex h-[75vh] min-h-130 items-start gap-5">
            <CertificateViewer imageUrl={certificate.imageUrl} />
            <CertificateInfoPanel certificate={certificate} />
          </div>

          {certificate.status === 'pending' && (
            <div className="flex justify-end gap-2.5">
              <Button
                onClick={onReject}
                className="h-auto! rounded-sm! border-border! px-3.75! py-2.25! text-[13px]! font-semibold! text-text-primary! shadow-none!"
              >
                반려
              </Button>
              <Button
                type="primary"
                onClick={onApprove}
                className="h-auto! rounded-sm !px-[15px]! py-2.25! text-[13px]! font-semibold! shadow-none!"
              >
                승인
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};