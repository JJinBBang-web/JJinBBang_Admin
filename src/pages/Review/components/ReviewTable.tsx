import type { ColumnsType } from "antd/es/table";
import type { Review } from "../../../types";
import { Table } from 'antd';
import { reviewTableStyles } from "../styles";

type ReviewTableProps = {
    reviews: Review[];
    loading: boolean;
    columns: ColumnsType<Review>;
    onRowClick: (id: string) => void;
};

const ReviewTable = ({
    reviews,
    loading,
    columns,
    onRowClick,
}: ReviewTableProps) => {
    return (
        <div className="overflow-hidden rounded-lg border border-border">
            <Table<Review>
                rowKey="id"
                columns={columns}
                dataSource={reviews}
                loading={loading}
                pagination={false}
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
