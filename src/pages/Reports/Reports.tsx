import { useState } from 'react';
import { Button, Input, Select, Switch, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ForbiddenWordModal from '../../components/common/ForbiddenWordModal';

type ReviewStatus = '공개' | '블라인드';

interface ReviewRecord {
  key: string;
  status: ReviewStatus;
  flagged: boolean;
  school: string;
  content: string;
  author: string;
  rating: number;
  reportCount: number;
  createdAt: string;
}

const mockData: ReviewRecord[] = [
  {
    key: '1',
    status: '공개',
    flagged: false,
    school: '경상국립대',
    content: '가좌동 ○○원룸 — 방음 안 되고 벌레 많아요',
    author: '익명의찐빵이',
    rating: 2.5,
    reportCount: 0,
    createdAt: '2026-06-03',
  },
  {
    key: '2',
    status: '공개',
    flagged: true,
    school: '부산대',
    content: '집주인이 [욕설] 진짜 별로예요',
    author: '장전동거주자',
    rating: 1.0,
    reportCount: 3,
    createdAt: '2026-06-02',
  },
  {
    key: '3',
    status: '블라인드',
    flagged: false,
    school: '전남대',
    content: '운영 정책에 따라 숨김 처리된 리뷰',
    author: '–',
    rating: 4.0,
    reportCount: 1,
    createdAt: '2026-05-30',
  },
  {
    key: '4',
    status: '공개',
    flagged: false,
    school: '충남대',
    content: '궁동 ○○빌 — 학교 가깝고 관리비 저렴',
    author: '새내기곰',
    rating: 4.5,
    reportCount: 0,
    createdAt: '2026-06-01',
  },
  {
    key: '5',
    status: '공개',
    flagged: false,
    school: '경북대',
    content: '산격동 투룸 후기, 주차 가능해서 만족',
    author: '복현동주민',
    rating: 4.0,
    reportCount: 0,
    createdAt: '2026-05-28',
  },
];

const Reviews = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const columns: ColumnsType<ReviewRecord> = [
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (status: ReviewStatus) =>
        status === '블라인드' ? (
          <Tag
            style={{
              background: '#f2f2f2',
              border: '1px solid #d6d6d6',
              color: '#767676',
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            {status}
          </Tag>
        ) : (
          <Tag
            style={{
              background: 'white',
              border: '1px solid #d6d6d6',
              color: '#1a1a1a',
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            {status}
          </Tag>
        ),
    },
    {
      title: '⚠️',
      dataIndex: 'flagged',
      key: 'flagged',
      width: 60,
      render: (flagged: boolean) => (
        <span
          style={{
            color: flagged ? '#d83a3a' : '#9a9a9a',
            fontWeight: flagged ? 700 : 400,
            fontSize: 13,
          }}
        >
          {flagged ? '⚠️' : '–'}
        </span>
      ),
    },
    {
      title: '학교',
      dataIndex: 'school',
      key: 'school',
      width: 120,
      render: (v: string) => <span className="text-[13px] text-[#1a1a1a]">{v}</span>,
    },
    {
      title: '제목·내용',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      render: (v: string) => <span className="text-[13px] text-[#1a1a1a]">{v}</span>,
    },
    {
      title: '작성자',
      dataIndex: 'author',
      key: 'author',
      width: 140,
      render: (v: string) => (
        <span className={`text-[13px] ${v === '–' ? 'text-[#9a9a9a]' : 'text-[#1a1a1a]'}`}>{v}</span>
      ),
    },
    {
      title: '별점',
      dataIndex: 'rating',
      key: 'rating',
      width: 90,
      align: 'right',
      render: (rating: number) => (
        <span className="text-[13px] text-[#1a1a1a]">★ {rating.toFixed(1)}</span>
      ),
    },
    {
      title: '신고',
      dataIndex: 'reportCount',
      key: 'reportCount',
      width: 70,
      align: 'right',
      render: (count: number) => (
        <span
          className="text-[13px]"
          style={{ color: count > 0 ? '#1a1a1a' : '#9a9a9a', fontWeight: count > 0 ? 700 : 400 }}
        >
          {count}
        </span>
      ),
    },
    {
      title: '작성일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date: string) => <span className="text-[13px] text-[#767676]">{date}</span>,
    },
  ];

  const filteredData = mockData
    .filter(r => !flaggedOnly || r.flagged)
    .filter(
      r =>
        !searchValue ||
        r.content.includes(searchValue) ||
        r.author.includes(searchValue),
    );

  return (
    <div className="flex flex-col gap-4">
      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <Input
          prefix={<span className="text-[#9a9a9a]">🔍</span>}
          placeholder="키워드·작성자 검색"
          style={{ width: 240, borderRadius: 18 }}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <Select defaultValue="all_school" style={{ width: 115 }}>
          <Select.Option value="all_school">학교 전체</Select.Option>
        </Select>
        <Select defaultValue="all_period" style={{ width: 115 }}>
          <Select.Option value="all_period">기간 전체</Select.Option>
        </Select>
        <Select defaultValue="all_status" style={{ width: 115 }}>
          <Select.Option value="all_status">상태 전체</Select.Option>
        </Select>
        <div className="flex items-center gap-2 ml-1">
          <Switch
            checked={flaggedOnly}
            onChange={setFlaggedOnly}
            size="small"
            style={flaggedOnly ? { background: '#2f6df0' } : undefined}
          />
          <span className="text-[13px] font-semibold text-[#4b4b4b] whitespace-nowrap">
            ⚠️ 금칙어만 보기
          </span>
        </div>
        <div className="flex-1" />
        <Select defaultValue="latest" style={{ width: 100 }}>
          <Select.Option value="latest">최신순</Select.Option>
        </Select>
        <Button onClick={() => setModalOpen(true)}>금칙어 사전 관리</Button>
      </div>

      {/* Review table */}
      <div className="bg-white border border-[#d6d6d6] rounded-lg overflow-hidden">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          size="small"
          rowClassName="hover:bg-gray-50"
        />
      </div>

      <ForbiddenWordModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Reviews;
