import { Descriptions } from 'antd';
import type { CertificateDetail } from '../../../types';
import { sectionTitleClassName } from '../styles';
import { formatElapsedDetail } from '../utils';

interface CertificateInfoPanelProps {
  certificate: CertificateDetail;
};

const CertificateInfoPanel = ({ certificate }: CertificateInfoPanelProps) => {
  const { label: elapsedLabel, isOverdue } = formatElapsedDetail(certificate.elapsedHours);

  return (
    <div className="flex w-[320px] flex-col gap-1.5">
      <h2 className="mb-0! text-lg font-bold text-text-primary">{certificate.nickname}</h2>
      <p className={`text-[12.5px] font-bold ${isOverdue ? 'text-danger' : 'text-text-secondary'}`}>
        {elapsedLabel}
      </p>

      <div className="flex flex-col gap-2.5 rounded-md border border-border px-[19px] py-6">
        <span className={sectionTitleClassName}>신청 정보 (개인정보 마스킹)</span>
        <Descriptions
          column={1}
          colon={false}
          labelStyle={{ width: 80, color: '#9A9A9A', fontSize: 13, padding: 0 }}
          contentStyle={{ color: '#1A1A1A', fontSize: 13, padding: 0 }}
          className="
            [&_.ant-descriptions-row]:mb-1.5!
            [&_.ant-descriptions-item]:pb-0!
          "
          items={[
            { key: 'school', label: '신청 학교', children: certificate.school },
            { key: 'appliedAt', label: '신청일시', children: certificate.appliedAt },
            { key: 'joinedAt', label: '가입일', children: certificate.joinedAt },
            { key: 'email', label: '이메일', children: certificate.email },
          ]}
        />
      </div>

      {certificate.isReupload && (
        <span className="w-fit rounded-xl border border-border bg-bg-light px-2.5 py-1 text-xs font-semibold text-text-secondary">
          재업로드 건
        </span>
      )}
    </div>
  );
};

export default CertificateInfoPanel;
