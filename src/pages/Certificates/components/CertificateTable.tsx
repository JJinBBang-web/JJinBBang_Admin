import { Table } from 'antd';
import type { Certificate, CertificateStatus, PageInfo } from '../../../types';
import { getCertificateColumns } from '../certificateColumns';
import { certificateTableStyles } from '../styles';

interface CertificateTableProps {
  certificates: Certificate[];
  loading: boolean;
  status: CertificateStatus;
  pageInfo?: PageInfo;
  onReview: (id: string) => void;
  onPageChange: (page: number, size: number) => void;
};

const CertificateTable = ({
  certificates,
  loading,
  status,
  pageInfo,
  onReview,
  onPageChange,
}: CertificateTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table<Certificate>
        rowKey="id"
        columns={getCertificateColumns(status, onReview)}
        dataSource={certificates}
        loading={loading}
        pagination={{
          current: (pageInfo?.currentPage ?? 0) + 1,
          pageSize: pageInfo?.pageSize ?? 10,
          total: pageInfo?.totalElements ?? 0,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50],
          onChange: (nextPage, nextSize) => onPageChange(nextPage - 1, nextSize),
        }}
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
