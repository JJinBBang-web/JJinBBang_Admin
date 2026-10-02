import type { ColumnsType } from "antd/es/table";
import type { PageInfo, Review } from "../../../types";
import { Table } from 'antd';
import { reviewTableStyles } from "../styles";

type ReviewTableProps = {
    reviews: Review[];
    loading: boolean;
    columns: ColumnsType<Review>;
    pageInfo?: PageInfo;
    onRowClick: (id: string) => void;
    onPageChange: (page: number, size: number) => void;
};

const ReviewTable = ({
    reviews,
    loading,
    columns,
    pageInfo,
    onRowClick,
    onPageChange,
}: ReviewTableProps) => {
    return (
        <div className="overflow-hidden rounded-lg border border-border">
            <Table<Review>
                rowKey="id"
                columns={columns}
                dataSource={reviews}
                loading={loading}
                pagination={{
                    current: (pageInfo?.currentPage ?? 0) + 1,
                    pageSize: pageInfo?.pageSize ?? 10,
                    total: pageInfo?.totalElements ?? 0,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50],
                    onChange: (nextPage, nextSize) =>
                        onPageChange(nextPage - 1, nextSize),
                }}
                onRow={(record) => ({
                    onClick: () => onRowClick(record.id),
                    className: 'cursor-pointer',
                })}
                className={reviewTableStyles.table}
            />
        </div>
    );
};

export default ReviewTable;
