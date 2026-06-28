import type { ColumnsType } from 'antd/es/table';
import type { Review } from '../../types';
import CustomTagBtn from '../../components/common/CustomTagBtn';

export const reviewColumns: ColumnsType<Review> = [
    {
      title: '상태',
      dataIndex: 'status',
      width: 100,
      render: (status: Review['status']) => <CustomTagBtn status={status} />
    },
    {
      title: '금칙어',
      dataIndex: 'hasBannedWord',
      width: 72,
      align: 'center',
      render: (hasBannedWord: boolean) =>
        hasBannedWord ? (
          <span className="text-xs font-bold text-danger">⚠️</span>
        ) : (
          <span className="text-xs text-text-disabled">–</span>
        ),
    },
    {
      title: '학교',
      dataIndex: 'school',
      width: 120,
      render: (school: string) => (
        <span className="text-xs text-text-primary">{school}</span>
      ),
    },
    {
      title: '제목·내용',
      dataIndex: 'title',
      ellipsis: true,
      render: (title: string) => (
        <span className="text-xs text-text-primary">{title}</span>
      ),
    },
    {
      title: '작성자',
      dataIndex: 'author',
      width: 130,
      render: (author: string | null) =>
        author ? (
          <span className="text-xs text-text-primary">{author}</span>
        ) : (
          <span className="text-xs text-text-disabled">–</span>
        ),
    },
    {
      title: '별점',
      dataIndex: 'rating',
      width: 80,
      align: 'right',
      render: (rating: number) => (
        <span className="text-xs text-text-primary">★ {rating.toFixed(1)}</span>
      ),
    },
    {
      title: '신고',
      dataIndex: 'reportCount',
      width: 64,
      align: 'right',
      render: (count: number) =>
        count > 0 ? (
          <span className="text-xs font-bold text-text-primary">{count}</span>
        ) : (
          <span className="text-xs text-text-disabled">0</span>
        ),
    },
    {
      title: '작성일',
      dataIndex: 'createdAt',
      width: 120,
      render: (date: string) => (
        <span className="text-xs text-text-muted">{date}</span>
      ),
    },
];