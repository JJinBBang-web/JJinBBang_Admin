import { Table } from 'antd';
import type { Certificate, CertificateStatus } from '../../../types';
import { getCertificateColumns } from '../certificateColumns';
import { certificateTableStyles } from '../styles';

interface CertificateTableProps {
  certificates: Certificate[];
  loading: boolean;
  status: CertificateStatus;
  onReview: (id: string) => void;
};

const CertificateTable = ({ certificates, loading, status, onReview }: CertificateTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table<Certificate>
        rowKey="id"
        columns={getCertificateColumns(status, onReview)}
        dataSource={certificates}
        loading={loading}
        pagination={false}
        onRow={(record) => ({
          onClick: () => onReview(record.id),
          className: 'cursor-pointer',
        })}
        className={certificateTableStyles.table}
      />
    </div>
  );
};

export default CertificateTable;
